//Make REST calls

//Dependancies
const protocols = {
    http: require('http'),
    https: require('https')
}
const querystring = require('querystring');
const stringDecoder = require('string_decoder').StringDecoder;

//Create a container for everything
const rest = {};

//Send a request
rest.send = (protocol, domain, path, method, querys, headers, payload, payloadType, auth, callback) => {
    const acceptableProtocols = ['https', 'http'];
    const acceptableMethods = ['POST', 'GET', 'PUT', 'DELETE'];
    const acceptablePayloadTypes = ['none', 'json', 'querystring'];

    protocol = typeof (protocol) == 'string' && protocol.trim().length > 0 && acceptableProtocols.indexOf(protocol.trim().toLowerCase()) > -1 ? protocol.trim().toLowerCase() : 'https';
    domain = typeof (domain) == 'string' && domain.trim().length > 0 ? domain.trim() : false;
    path = typeof (path) == 'string' && path.trim().length > 0 ? path.trim() : '/';
    method = typeof (method) == 'string' && method.trim().length > 0 && acceptableMethods.indexOf(method.trim().toUpperCase()) > -1 ? method.trim().toUpperCase() : 'GET';
    querys = typeof (querys) == 'object' ? querys : {};
    headers = typeof (headers) == 'object' ? headers : {};
    payload = typeof (payload) == 'object' ? payload : {};
    payloadType = typeof (payloadType) == 'string' && payloadType.trim().length > 0 && acceptablePayloadTypes.indexOf(payloadType.trim().toLowerCase()) > -1 ? payloadType.trim().toLowerCase() : 'none';
    auth = typeof (auth) == 'string' ? auth.trim() : false;
    callback = typeof (callback) == 'function' ? callback : () => { };

    if (domain) {
        //Stringify the payload
        var stringPayload;
        if (payloadType == 'json') {
            stringPayload = JSON.stringify(payload);
        }
        else if (payloadType == 'querystring') {
            stringPayload = querystring.stringify(payload);
        }

        //Add content-type to the headers
        if (payloadType == 'json') {
            headers['Content-Type'] = 'application/json';
        }
        else if (payloadType == 'querystring') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
            headers['Content-Length'] = Buffer.byteLength(stringPayload);
        }

        //Add the the querys to the path
        path += '?';
        for (var key in querys) {
            path += key + '=' + querys[key] + '&';
        };

        //Configure the request details
        const requestDetails = {
            protocol: protocol + ':',
            hostname: domain,
            method: method,
            path: path,
            auth: auth ? auth : undefined,
            headers: headers,
        };

        //Instantiate the request object
        const req = protocols[protocol].request(requestDetails, res => {
            //Grab the status of the sent request
            const statusCode = res.statusCode;

            //Get the payload
            const decoder = new stringDecoder('utf-8');
            var buffer = '';
            res.on('data', data => {
                buffer += decoder.write(data);
            });
            res.on('end', data => {
                buffer += decoder.end();

                //Callback
                callback(statusCode, buffer);
            });
        });

        //Bind to the error event so it doesn't get thrown
        req.on('error', e => {
            callback(e);
        });

        //Add the payload
        if (payloadType != 'none') {
            req.write(stringPayload);
        }

        //Send the request
        req.end();

        console.log("Sent");
    }
    else {
        callback("Missing or invalid parameters");
    }
};

//Export the module
module.exports = rest;