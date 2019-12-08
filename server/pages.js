//Pages Handler

//Dependancies

//Node.js Modules
const path = require("path");
const fs = require("fs");

//My files
const config = require('../lib/config');

//Pages container
const pages = {};

//Costomizations
const costomizations = {
    "notfound": {
        title: "Not Found"
    },
    "home": {
        title: "Banana Games"
    },
    "verify": {
        title: "Verifying Your Banana Games Account"
    },
    "verify/please": {
        title: "Verify Your Banana Games Account"
    },
    "verify/failed": {
        title: "Account Verification Failed"
    },
    "verify/success": {
        title: "Congradulations on creating your Banana Games account."
    },
    "account/create": {
        title: "Create A Banana Games Account"
    },
    "account": {
        title: "My Account"
    },
    "terms": {
        title: "Banana Games Terms Of Service"
    }
};

//Router
const router = {
    "": "/home",
    "home": "/home",
    "notfound": "/notfound",
    "verify": "/verify",
    "verify/please": "/verify/please",
    "verify/failed": "/verify/failed",
    "verify/success": "/verify/success",
    "account/create": "/account/create",
    "account": "/account",
    "terms": "/terms"
};

//Process Function
pages.process = (data, callback, pageDir, pageName) => {
    //get the resource key from the queryStringObject
    const resourceTypes = ["javascript", "css", "html"];
    const resource = typeof (data.queryStringObject.resource) == 'string' && resourceTypes.indexOf(data.queryStringObject.resource.trim()) > -1 ? data.queryStringObject.resource.trim() : "html";

    if (!(typeof (pageDir) == 'string' && pageDir.length > 0 && typeof (pageName) == 'string' && pageName.length > 0)) {
        pageDir = router[data.fullPath];
        pageName = data.fullPath;
    }

    //Make exeption for route: ""
    if (pageName == "") {
        pageName = "home";
    }

    //See if the path is on the router
    if (typeof (pageDir) == 'string') {
        //Send the data
        if (resource == "javascript") {
            pages.get.javascript(pageDir, callback);
        }
        else if (resource == "css") {
            pages.get.css(pageDir, callback);
        }
        else if (resource == "html") {
            pages.get.html(pageName, pageDir, callback);
        }
    }
    else {
        //Force the notfound page
        pages.get.html(undefined, 404, callback);
    }
};

//Get container
pages.get = {};

//Read a template
pages.get.readTemplate = (fileType, callback) => {
    //Sanity Check
    const acceptedFileTypes = ["js", "css", "html"];
    fileType = typeof (fileType) == 'string' && fileType.trim().length > 0 && acceptedFileTypes.indexOf(fileType) > -1 ? fileType : false;

    if (fileType) {
        var fileDir = path.join(__dirname, "./pages/template/");

        fs.readFile(fileDir + "." + fileType, 'utf8', (err, str) => {
            if (!err && str) {
                //Split the template into a header and footer
                var splitString;
                if (fileType == "html") {
                    splitString = str.split("<!-- Main Html -->");
                }
                else if (fileType == "js") {
                    splitString = str.split("/*Main Javascript*/");
                }
                else if (fileType == "css") {
                    splitString = str.split("/*Main CSS*/");
                }
                callback(false, splitString);
            }
            else {
                callback("No template could be found");
            }
        });
    }
    else {
        callback("A valid template name was not specified");
    }
};

//Read a file
pages.get.read = (fileDirName, callback) => {
    //Sanity Check
    fileDirName = typeof (fileDirName) == 'string' && fileDirName.trim().length > 0 ? fileDirName : false;

    if (fileDirName) {
        var newFileDirName = path.join(__dirname, "./pages/" + fileDirName);

        fs.readFile(newFileDirName, 'utf8', (err, str) => {
            if (!err && str) {
                callback(false, str);
            }
            else {
                callback("No template could be found");
            }
        });
    }
    else {
        callback("A valid template name was not specified");
    }
};

//Get a file that's wrapped with the template
pages.get.wrapped = (fileDirName, callback) => {
    //Sanity Check
    fileDirName = typeof (fileDirName) == 'string' && fileDirName.trim().length > 0 ? fileDirName : false;
    const acceptedFileTypes = ["html", "css", "js"];
    var fileType = fileDirName.split(".")[1];
    fileType = typeof (fileType) == 'string' && fileType.length > 0 && acceptedFileTypes.indexOf(fileType) > -1 ? fileType : false;


    if (fileDirName && fileType) {
        //Read the wrapper
        pages.get.readTemplate(fileType, (err, res) => {
            if (!err && res) {
                //Get the main file
                pages.get.read(fileDirName, (err, mainFile) => {
                    if (!err && mainFile) {
                        //Join the two files together
                        const result = res[0] + mainFile + res[1];
                        callback(false, result);
                    }
                    else {
                        callback("Error reading main file");
                        console.log(fileDirName);
                    }
                });
            }
            else {
                callback("Error reading wrapper");
            }
        });
    }
    else {
        callback("Invalid file name and type");
    }
};

//Take a given string and a data object and find/replace all the keys in it
pages.interpolate = (str, data = {}) => {
    //Sanity check
    str = typeof (str) == 'string' && str.length > 0 ? str : '';
    data = typeof (data) == 'object' && data != null ? data : {};

    //Add the templateGlobals to the data object, prepending thier key name with "global"
    for (var keyname in config.templateGlobals) {
        if (config.templateGlobals.hasOwnProperty(keyname)) {
            data["global." + keyname] = config.templateGlobals[keyname];
        }
    }

    //For each key in the data object, insert its value into the string at the corresponding placeholder
    for (var key in data) {
        if (data.hasOwnProperty(key) && typeof (data[key]) == 'string') {
            var replace = data[key];
            var find = new RegExp("{" + key + "}", 'g');

            str = str.replace(find, replace);
        } 
    }

    //Return the string
    return str;
};

//Get html
pages.get.html = (page, fileDirName, callback) => {
    //Sanity Checking
    fileDirName = typeof (fileDirName) == 'string' && fileDirName.length > 0 ? fileDirName : false;
    page = typeof (page) == 'string' && page.length > 0 ? page : false;

    //Not found Function
    const notfound = () => {
        //Get the wrapped file for 404
        pages.get.wrapped("/notfound/.html", (err, res) => {
            if (!err && res) {
                //Interpolate
                var interpolationsObject = Object.assign({}, costomizations["notfound"] != undefined ? costomizations["notfound"] : {});

                //Add "not found' as the title and the "notfound" as page
                interpolationObject = Object.assign(interpolationsObject, {
                    title: "Not Found",
                    page: "notfound"
                });
                const htmlToSend = pages.interpolate(res, interpolationObject);

                //Send the html
                callback(htmlToSend, 404, "text/html");
            }
            else {
                callback("Something went wrong", 503);
            }
        });
    };

    if (page && fileDirName) {
        //Get the wrapped file
        pages.get.wrapped(fileDirName + "/.html", (err, res) => {
            if (!err && res) {
                //Interpolate
                var interpolationsObject = Object.assign({}, costomizations[page] != undefined ? costomizations[page] : {});

                //Add variable page
                interpolationObject = Object.assign(interpolationsObject, {
                    page: page
                });
                const htmlToSend = pages.interpolate(res, interpolationObject);

                //Send the html
                callback(htmlToSend, 200, "text/html");
            }
            else {
                console.log("ERROR READING FILE", err);
                notfound();
            }
        });
    }
    else {
        notfound();
    }
};

//Get javascript
pages.get.javascript = (fileDirName, callback) => {
    //Sanity Checking
    fileDirName = typeof (fileDirName) == 'string' && fileDirName.length > 0 ? fileDirName : false

    if (fileDirName) {
        //Get the wrapped file
        pages.get.wrapped(fileDirName + "/.js", (err, res) => {
            if (!err && res) {
                //Send the javascript
                callback(res, 200, "application/javascript");
            }
            else {
                callback(undefined, 404)
            }
        });
    }
    else {
        callback(undefined, 404);
    }
};

//Get css
pages.get.css = (fileDirName, callback) => {
    //Sanity Checking
    fileDirName = typeof (fileDirName) == 'string' && fileDirName.length > 0 ? fileDirName : false

    if (fileDirName) {
        //Get the wrapped file
        pages.get.wrapped(fileDirName + "/.css", (err, res) => {
            if (!err && res) {
                //Send the css
                callback(res, 200, "text/css");
            }
            else {
                callback(undefined, 404)
            }
        });
    }
    else {
        callback(undefined, 404);
    }
};

//Export the module
module.exports = pages;