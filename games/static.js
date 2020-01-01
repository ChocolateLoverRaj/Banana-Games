//Serve static files

//Dependancies
const path = require("path");
const fs = require("fs");

//Container for module
const static = {};

//Router
const router = {
    "pong": {
        path: "/pong.html",
        type: "text/html",
    },
    "iframe.js": {
        path: "/iframe.js",
        type: "application/javascript"
    },
    "iframe.css": {
        path: "/iframe.css",
        type: "text/css"
    }
}

//Process
static.process = (data, callback) => {
    //Check if data matches router
    if (typeof (router[data.path]) == 'object') {
        //Read the file based on the path
        let joinedPath = path.join(__dirname, "./static", router[data.path].path);
        //Read the file
        fs.readFile(joinedPath, "utf8", (err, res) => {
            if (!err && res) {
                callback(res, 200, router[data.path].type);
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