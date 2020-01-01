//File that starts a server

//Dependancies

//Node.js Libraries
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//My Scripts
const api = require('./server/api');
const pages = require('./server/pages');
const games = require('./games');
const resources = require('./server/resources');
const config = require('./lib/config');
const socket = require("./socket");

//Create a mymodule container
const myModule = {};

//The server should respond to all requests
myModule.server = http.createServer((req, res) => {
    //Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    //Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //Get the querystring as an object
    const queryStringObject = parsedUrl.query;

    //Get the HTTP Method
    const method = req.method.toLowerCase();

    //Get the headers as an object
    const headers = req.headers;

    //Get the payload
    const decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', data => {
        buffer += decoder.write(data);
    });
    req.on('end', data => {
        buffer += decoder.end();

        //Choose The Handler

        //Get the array of the path
        const pathArray = trimmedPath.split('/');

        //Get the first segment of the path
        const pathRoute = pathArray[0];

        //Get the rest of the segments of the path
        var remainingPathArray = pathArray;
        remainingPathArray.shift();

        //Get the remaining path as one string
        const remainingPath = remainingPathArray.join('/');

        //Construct the data object to send to the handler
        var data = {
            path: remainingPath,
            fullPath: trimmedPath,
            queryStringObject: queryStringObject,
            method: method,
            headers: headers,
            payload: buffer
        };

        //Determine which handler to send to
        var chosenHandler;

        //If it starts with '/api' then choose api
        if (pathRoute == 'api') {
            chosenHandler = api;
        }

        //If it starts with '/games' then choose games
        else if (pathRoute == 'games') {
            chosenHandler = games;
        }

        //If it starts with '/resource' then choose resources
        else if (pathRoute == 'resource') {
            chosenHandler = resources;
        }

        //Else Assume it is a page
        else {
            chosenHandler = pages;
        }

        //Call the handler
        chosenHandler.process(data, (payload = '', statusCode = 200, type = 'text/plain') => {
            //Validate

            //Payload
            payload = typeof (payload) == 'string' ? payload : '';

            //statusCode
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            //Type
            type = typeof (type) == 'string' ? type : 'text/plain';

            //Return the response

            //write the content type
            res.setHeader('Content-Type', type);

            //write the statusCode
            res.writeHead(statusCode);

            //Payload
            res.end(payload);
        });
    });
});

//Init
myModule.init = () => {
    //Start the websocket
    socket.init(myModule.server);

    //Start the server, and have it listen on process.env.PORT
    myModule.server.listen(config.port, () => {
        console.log("The server is listening on port " + config.port + " in " + config.envName + " now");
    });
};

//Export the module
module.exports = myModule;