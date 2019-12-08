//Resources Handler

//Dependancies
const fs = require("fs");
const path = require("path");

//Resources container
const resources = {};

//Process Function
resources.process = (data, callback) => {
    //Reject any method that isn't a get
    if (data.method == "get") {
        //Try to pare the path (it should be .something)
        if (data.path.split(".").length == 2) {
            //Get the file type
            const acceptedFileTypes = [""];
            var fileType = data.path.split(".")[1];
            fileType = typeof (fileType) == 'string' && acceptedFileTypes.indexOf(fileType) > -1 ? fileType : false;

            if (fileType) {
                //Join path
                const resourceDir = path.join(__dirname, "./resources/");

                //Try to find a file
                fs.readFile(resourceDir + data.path, (err, res) => {
                    if (!err && res) {
                        //Change the contentType according to fileType
                        var responseType;
                        if (fileType == "ico") {
                            responseType = "image/x-icon";
                        }

                        //Send the file
                        callback(res, 200, responseType);
                    }
                    else {
                        callback("File not found", 404);
                    }
                });
            }
            else {
                callback("Invalid file type", 400);
            }
        }
        else {
            callback("Must request a file", 400);
        }
    }
    else {
        callback("Only GET is allowed", 405);
    }
};

//Export the module
module.exports = resources;