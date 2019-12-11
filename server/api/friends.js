//Dependancies
const tokens = require("./tokens");
const mongodb = require("../../lib/mongodbhelper");

//Create a container for module
const friends = {};

//Proccess function
friends.process = (data, callback) => {
    //Check for a valid path
    //Acceptable paths
    const acceptablePaths = ["list", "invites", "requests"];
    if (acceptablePaths.indexOf(data.path) > -1) {
        friends[data.path].process(data, callback);
    }
    else {
        callback(404);
    }
};

//List
friends.list = {};

//List process
friends.list.process = (data, callback) => {
    //Acceptable methods
    const acceptableMethods = ["get", "delete"];
    if (acceptableMethods.indexOf(data.method) > -1) {
        friends.list[data.method](data, callback);
    }
    else {
        callback(405);
    }
};

//List get
friends.list.get = (data, callback) => {
    //Validate
    let token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length > 0 ? data.headers.token.trim() : false;

    //Check for token
    if (token) {
        //Make sure token is good
        tokens.check(token, (err, token) => {
            if (!err) {
                if (token) {
                    callback(418);
                }
                else {
                    callback(401);
                }
            }
            else {
                callback(500, { "Error": "Could not check token" });
            }
        });
    }
    else {
        callback(403);
    }
};

//Export the module
module.exports = friends;