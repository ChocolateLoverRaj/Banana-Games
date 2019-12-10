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
tokens.getUserInfo = (userId, callback) => {
    //Get the user information based on userId
    const usersCollection = mongodb.collection("BananaGames", "Users");
    usersCollection.findOne({ "id": userId }, (err, user) => {
        if (!err) {
            if (user) {
                callback(false, user);
            }
            else {
                callback("No user with that id");
            }
        }
        else {
            callback("Mongodb Error");
        }
    });
};

//Check if a token is valid
tokens.check = (id, callback) => {
    //Sanity check
    id = typeof (id) == 'string' && id.trim().length > 0 ? id.trim() : false;
    callback = typeof (callback) == 'function' ? callback : false;

    if (id && callback) {
        //Tokens collection
        let collection = mongodb.collection("BananaGames", "Tokens");
        //Find the token
        collection.findOne({ id: id }, (err, token) => {
            if (!err) {
                if (token) {
                    //Find out if it has expired
                    const valid = Date.now() <= token.expires;

                    if (valid) {
                        //Find the email of the person with the token
                        tokens.getUsername(token.email, (err, res) => {
                            if (!err && res) {
                                token.username = res;
                                callback(false, token);
                            }
                            callback("Error finding username");
                        });
                    }
                    else {
                        callback(false, false);
                    }
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

        //try to find an account that matches username and password
        //Create a filter
        let filter = {
            $and: [
                {
                    $or: [
                        {
                            "username": username
                        },
                        {
                            "email": username
                        }
                    ]
                },
                {
                    "hashedPassword": hashedPassword
                }
            ]
        }
        const usersCollection = mongodb.collection("BananaGames", "Users");
        usersCollection.findOne(filter, (err, user) => {
            if (!err) {
                if (user) {
                    //Create a token object
                    let token = {
                        id: randomString(config.tokens.idLength),
                        userId: user.id,
                        expires: Date.now() + config.tokens.expiryTime
                    }

                    //Store it in database
                    const tokensCollection = mongodb.collection("BananaGames", "Tokens");
                    tokensCollection.insertOne(token, (err, res) => {
                        if (!err && res && res.result && res.result.ok) {
                            //Create a token object to send to user
                            let clientToken = Object.assign(token, {
                                email: user.email,
                                username: user.username,
                                userId: user.id
                            });

                            //Send the client token to the client
                            callback(201, clientToken);
                        }
                        else {
                            callback(500, {"Error": ""})
                        }
                    });
                }
                else {
                    callback(404, { "Error": "User not found" });
                }
            }
            else {
                console.log(err);
                callback(500, { "Error": "Couldn't search for user" });
            }
        });
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
        let collection = mongodb.collection("BananaGames", "Tokens");
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
        let collection = mongodb.collection("BananaGames", "Tokens");
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