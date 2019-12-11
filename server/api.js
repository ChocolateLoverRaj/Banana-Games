//Api Handler

//Dependancies
const users = require("./api/users");
const tokens = require("./api/tokens");
const ping = require("./api/ping");
const friends = require("./api/friends");

//Api container
const api = {};

//Router
api.router = {
    users: users,
    tokens: tokens,
    ping: ping,
    //friends: friends
};

//Process Function
api.process = (data, callback) => {
    //Choose The Handler

    //Get the array of the path
    const pathArray = data.path.split('/');

    //Get the first segment of the path
    const pathRoute = pathArray[0];

    //Get the rest of the segments of the path
    var remainingPathArray = pathArray;
    remainingPathArray.shift();

    //Get the remaining path as one string
    const remainingPath = remainingPathArray.join('/');

    //update the path in data
    data.path = remainingPath;

    //Attempt to parse the JSON payload
    try {
        data.payload = JSON.parse(data.payload);
    }
    catch (e) {
        data.payload = {};
    }

    //Find the api to call whith the route

    //If the router has the route
    if (api.router[pathRoute] != undefined) {
        api.router[pathRoute].process(data, (statusCode, payload = {}) => {
            var stringPayload;
            try {
                stringPayload = JSON.stringify(payload);
            }
            catch(e){
                stringPayload = "{}";
            }
            callback(stringPayload, statusCode, 'application/json');
        });
    }

    //If no such route exists, callback not found
    else {
        callback(undefined, 404);
    }
};

//Export the module
module.exports = api;