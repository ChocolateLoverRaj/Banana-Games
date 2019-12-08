//Create, veiw, and renew tokens

//Dependancies
const mongodb = require("../../lib/mongodbhelper");
const hash = require("../../lib/hash");
const config = require("../../lib/config");
const randomString = require("../../lib/randomstring");

//Create a tokens container
const tokens = {};

//Proccess function
tokens.process = (data, callback) => {
    //Acceptable methods
    const acceptableMethods = ["post", "get", "put", "delete"];
    if (acceptableMethods.indexOf(data.method) > -1) {
        tokens[data.method](data, callback);
    }
    else {
        callback(405);
    }
};

//Get the username of a user based on email
tokens.getUsername = (email, callback) => {
    //Validate
    email = typeof (email) == 'string' && email.trim().length > 0 ? email.trim() : false;
    callback = typeof (callback) == 'function' ? callback : false;

    if (callback) {
        if (email) {
            //Connect to the database
            mongodb.edit("BananaGames", "Users", collection => {
                if (typeof (collection) == 'object') {
                    //Find the user
                    collection.findOne({ email: email }, (err, res) => {
                        if (!err && res) {
                            callback(false, res.username);
                        }
                        else {
                            callback("Couldn't find user");
                        }
                    });
                }
                else {
                    callback("Couldn't Connect to database");
                }
            });
        }
        else {
            callback("Missing email");
        }
    }
};

//Check if a token is valid
tokens.check = (id, callback) => {
    //Sanity check
    id = typeof (id) == 'string' && id.trim().length > 0 ? id.trim() : false;
    callback = typeof (callback) == 'function' ? callback : false;

    if (id && callback) {
        //Connect to database
        mongodb.edit("BananaGames", "Tokens", collection => {
            if (typeof (collection) == 'object') {
                //Find the token
                collection.findOne({ id: id }, (err, token) => {
                    if (!err) {
                        if (token) {
                            //Find out if it has expired
                            const valid = Date.now() <= token.expires;

                            //Find the email of the person with the token
                            tokens.getUsername(token.email, (err, res) => {
                                if (!err && res) {
                                    token.username = res;
                                }
                                callback(false, valid ? token : false);
                            });
                        }
                        else {
                            callback(false, false);
                        }
                    }
                    else {
                        callback("Error searching for token");
                    }
                });
            }
            else {
                callback("Could not connect to database");
            }
        });
    }
    else {
        callback("Missing parameters");
    }
};

//Post
//Required data: username (can be email) && password
tokens.post = (data, callback) => {
    //Sanity Check
    const username = typeof (data.payload.username) == 'string' && data.payload.username.trim().search(' ') == -1 && data.payload.username.trim().length > 0 ? data.payload.username.trim() : false;
    const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 && data.payload.password.trim().length <= config.accountRestrictions.passwordLimit ? data.payload.password.trim() : false;

    if (username && password) {
        //Hash the password
        const hashedPassword = hash(password);

        //Find the user based on username
        mongodb.edit("BananaGames", "Users", collection => {
            if (typeof (collection) == 'object') {
                collection.findOne({ username: username, hashedPassword: hashedPassword }, (err, res) => {
                    if (!err) {
                        if (res) {
                            createToken(res);
                        }
                        else {
                            //Find the user based on email
                            mongodb.edit("BananaGames", "Users", collection => {
                                if (typeof (collection) == 'object') {
                                    collection.findOne({ email: username, hashedPassword: hashedPassword }, (err, res) => {
                                        if (!err) {
                                            if (res) {
                                                createToken(res);
                                            }
                                            else {
                                                callback(404, { "Error": "Email / Username and password did not match" });
                                            }
                                        }
                                        else {
                                            callback(500, { "Error": "Could not look for user" });
                                        }
                                    });
                                }
                                else {
                                    callback(500, { "Error": "Could not read users" });
                                }
                            });
                        }
                    }
                    else {
                        callback(500, { "Error": "Could not look for user" });
                    }
                });
            }
            else {
                callback(500, { "Error": "Could not read users" });
            }
        });

        //Create the token
        const createToken = user => {
            //Check that the user is verified
            if (!user.notValid) {
                //Create token object
                const token = {
                    expires: Date.now() + config.tokens.expiryTime,
                    email: user.email,
                    username: user.username,
                    id: randomString(config.tokens.tokenLength)
                };

                const tokenForWriting = Object.assign({}, token);

                //Write to the database
                mongodb.edit("BananaGames", "Tokens", collection => {
                    if (typeof (collection) == 'object') {
                        collection.insertOne(tokenForWriting, (err, res) => {
                            if (!err && res) {
                                callback(201, token);
                            }
                            else {
                                callback(500, { "Error": "Could not create token" });
                            }
                        });
                    }
                    else {
                        callback(500, { "Error": "Could not connect to database" });
                    }
                });
            }
            else {
                callback(606, { "Error": "Your account isn\'t verified. Please verify your account" });
            }
        };
    }
    else {
        callback(400, { "Error": "Missing required data" });
    }
};

//Get
//Required data: tokenId
tokens.get = (data, callback) => {
    const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;

    if (id) {
        //Connect to the database
        mongodb.edit("BananaGames", "Tokens", collection => {
            if (typeof (collection) == 'object') {
                //Find the token
                collection.findOne({ id: id }, (err, res) => {
                    if (!err) {
                        if (res) {
                            //Get the username
                            tokens.getUsername(res.email, (err, username) => {
                                if (!err && username) {
                                    //Token object
                                    const token = {
                                        expires: res.expires,
                                        id: res.id,
                                        email: res.email,
                                        username: username,
                                        valid: Date.now() <= res.expires
                                    };

                                    callback(200, token);
                                }
                                else {
                                    callback(500, { "Error": "Could not get username" });
                                }
                            });
                        }
                        else {
                            callback(404, { "Error": "Token with specified id does not exist; Token may have expired" });
                        }
                    }
                    else {
                        callback(500, { "Error": "Could not search for your token" });
                    }
                });
            }
            else {
                callback(500, { "Error": "Could not connect to database" });
            }
        });
    }
    else {
        callback(400, { "Error": "Missing token id" });
    }
};

//Put
//Required data: tokenId
tokens.put = (data, callback) => {
    //Sanity Check
    const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;

    if (id) {
        //Connect to database
        mongodb.edit("BananaGames", "Tokens", collection => {
            if (typeof (collection) == 'object') {
                //Find the token
                collection.findOne({ id: id }, (err, res) => {
                    if (!err) {
                        if (res) {
                            //Figure out if the token has expired
                            if (Date.now() <= res.expires) {
                                //Calculate the new expiry time
                                const expires = Date.now() + config.tokens.expiryTime;

                                //Token object
                                const token = {
                                    expires: expires,
                                    id: res.id,
                                    email: res.email,
                                    valid: Date.now() <= res.expires
                                };

                                //Update the token
                                mongodb.edit("BananaGames", "Tokens", collection => {
                                    if (typeof (collection) == 'object') {
                                        collection.updateOne({ id: id }, { $set: { expires: expires } }, (err, res) => {
                                            if (!err && res) {
                                                if (res.result.nModified) {
                                                    callback(200, token);
                                                }
                                                else {
                                                    callback(500, { "Error": "Failed to update token" });
                                                }
                                            }
                                            else {
                                                callback(500, { "Error": "Could not update token" });
                                            }
                                        });
                                    }
                                    else {
                                        callback(500, { "Error": "Could not connect to database" });
                                    }
                                });
                            }
                            else {
                                callback(410, { "Error": "The token you requested has expired" });
                            }
                        }
                        else {
                            callback(404, { "Error": "Token with that id does not exist" });
                        }
                    }
                    else {
                        callback(500, { "Error": "Could not search for token" });
                    }
                });
            }
            else {
                callback(500, { "Error": "Couldn't read tokens" });
            }
        });
    }
    else {
        callback(400, { "Error": "Missing token id" });
    }
};

//Delete
//Required data: tokenId
tokens.delete = (data, callback) => {
    //Sanity Check
    const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;

    if (id) {
        //Connect to database
        mongodb.edit("BananaGames", "Tokens", collection => {
            if (typeof (collection) == 'object') {
                //Find the token
                collection.findOne({ id: id }, (err, res) => {
                    if (!err) {
                        if (res) {
                            //Delete the token
                            mongodb.edit("BananaGames", "Tokens", collection => {
                                if (typeof (collection) == 'object') {
                                    collection.deleteOne({ id: id }, (err, res) => {
                                        if (!err && res) {
                                            callback(200);
                                        }
                                        else {
                                            callback(500, { "Error": "Could not delete token" });
                                        }
                                    });
                                }
                                else {
                                    callback(500, { "Error": "Could not connect to database" });
                                }
                            });
                        }
                        else {
                            callback(404, { "Error": "Token with that id does not exist" });
                        }
                    }
                    else {
                        callback(500, { "Error": "Could not search for token" });
                    }
                });
            }
            else {
                callback(500, { "Error": "Couldn't read tokens" });
            }
        });
    }
    else {
        callback(400, { "Error": "Missing token id" });
    }
};

//Export the module
module.exports = tokens;