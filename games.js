//Dependancies
const static = require("./games/static");
const api = require("./games/api");

//Games container
const games = {};

//Games process
games.process = (data, callback) => {
    //Get the array of the path
    let pathArray = data.path.split('/');

    //Get the first segment of the path
    let pathRoute = pathArray[0];

    //Get the rest of the segments of the path
    let remainingPathArray = pathArray;
    remainingPathArray.shift();

    //Get the remaining path as one string
    let remainingPath = remainingPathArray.join('/');

    //update the path in data
    data.path = remainingPath;

    //Get the path
    if (pathRoute == "static") {
        static.process(data, callback);
    }
    else if (pathRoute == "api") {
        api.process(data, callback);
    }
    else {
        callback("Page not found", 404);
    }
};

//Export the module
module.exports = games;