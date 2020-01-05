//Serve static files

//Dependancies
const path = require("path");
const fs = require("fs");

//Container for module
const static = {};

//Router
const router = {
    "static/pong": {
        path: "/static/pong.html",
        type: "text/html",
    },
    "logic/pong": {
        path: "/logic/pong.js",
        type: "application/javascript"
    },
    "static/iframe.js": {
        path: "/static/iframe.js",
        type: "application/javascript"
    },
    "static/iframe.css": {
        path: "/static/iframe.css",
        type: "text/css"
    },
}

//Process
static.process = (data, callback) => {
    //Check if data matches router
    if (typeof (router[data.pathRoute + "/" + data.path]) == 'object') {
        //Read the file based on the path
        let joinedPath = path.join(__dirname, "../games", router[data.pathRoute + "/" + data.path].path);
        //Read the file
        fs.readFile(joinedPath, "utf8", (err, res) => {
            if (!err && res) {
                callback(res, 200, router[data.pathRoute + "/" + data.path].type);
            }
            else {
                callback("Error", 500);
            }
        });
    }
    else {
        callback("Page not found", 404);
    }
};

//Export the module
module.exports = static;