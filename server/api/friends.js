//Dependancies
const tokens = require("./tokens");
const mongodb = require("../../lib/mongodbhelper");

//Create a container for module
const friends = {};

//Proccess function
friends.process = (data, callback) => {
    //Check for a valid path
    //Acceptable paths
    //List means list of friends, invites means list of outgoing invites
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

//id to user
friends.idToUser = (ids, callback) => {
    //Check if ids has a length of 0
    if (ids.length > 0) {
        //Monbodb users
        const usersCollection = mongodb.collection("BananaGames", "Users");
        //Filter
        let filter = {
            $or: []
        };
        ids.forEach(id => {
            filter.$or.push({
                id: id
            });
        });
        //Search
        usersCollection.find(filter).toArray((err, res) => {
            if (!err && res) {
                var friendsList = [];
                res.forEach(friend => {
                    friendsList.push({
                        id: friend.id,
                        username: friend.username
                    });
                });
                callback(false, friendsList);
            }
            else {
                callback("Error finding users");
            }
        });
    }
    else {
        //Has no friends
        callback(false, []);
    }
};

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
                    //Database time
                    const usersCollection = mongodb.collection("BananaGames", "Users");
                    usersCollection.findOne({ id: token.userId }, (err, user) => {
                        if (!err && user) {
                            if (user) {
                                friends.idToUser(user.friends, (err, list) => {
                                    if (!err && list) {
                                        callback(200, list);
                                    }
                                    else {
                                        callback(500, { "Error": "Couldn't get friends\' data" });
                                    }
                                });
                            }
                        }
                        else {
                            callback(500, { "Error": "Could not find user" });
                        }
                    });
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

//List delete
friends.list.delete = (data, callback) => {
    //Validate
    let token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length > 0 ? data.headers.token.trim() : false;
    let id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;

    if (id) {
        //Check for token
        if (token) {
            //Make sure token is good
            tokens.check(token, (err, token) => {
                if (!err) {
                    if (token) {
                        //Database time
                        const usersCollection = mongodb.collection("BananaGames", "Users");
                        //Query
                        let query = {
                            id: token.userId,
                            friends: id
                        };
                        //Value
                        let value = {
                            $pull: {
                                friends: id
                            }
                        };
                        usersCollection.findOneAndUpdate(query, value, { returnOriginal: false }, (err, res) => {
                            if (!err) {
                                if (res && res.value) {
                                    friends.idToUser(res.value.friends, (err, list) => {
                                        if (!err && list) {
                                            callback(200, list);
                                        }
                                        else {
                                            callback(500, { "Error": "Couldn't get friends\' data" });
                                        }
                                    });
                                }
                                else {
                                    callback(404, { "Error": "Could not find friend" });
                                }
                            }
                            else {
                                callback(500, { "Error": "Couldn't update user" });
                            }
                        });
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
    }
    else {
        callback(400, { "Error": "Missing id in query string object" });
    }
};

//Invites
friends.invites = {};

//Invites process
friends.invites.process = (data, callback) => {
    //Acceptable methods
    const acceptableMethods = ["post", "get", "delete"];
    if (acceptableMethods.indexOf(data.method) > -1) {
        friends.invites[data.method](data, callback);
    }
    else {
        callback(405);
    }
};

//Invites post
friends.invites.post = (data, callback) => {
    //Validate
    let token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length > 0 ? data.headers.token.trim() : false;
    let id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;

    if (id) {
        //Check for token
        if (token) {
            //Make sure token is good
            tokens.check(token, (err, token) => {
                if (!err) {
                    if (token) {
                        //Make sure user that id is not the same person's id
                        if (id != token.userId) {
                            //Make sure user with that id exists
                            const usersCollection = mongodb.collection("BananaGames", "Users");
                            usersCollection.findOne({ id: id }, (err, res) => {
                                if (!err) {
                                    if (res) {
                                        //Check that the user hasn't already friended the person
                                        //Filter to find already existing friend
                                        let filter = {
                                            id: token.userId,
                                            friends: id
                                        };
                                        usersCollection.findOne(filter, (err, res) => {
                                            if (!err) {
                                                if (!res) {
                                                    //Database time
                                                    const friendsCollection = mongodb.collection("BananaGames", "FriendRequests");
                                                    //Request
                                                    let invite = {
                                                        from: token.userId,
                                                        to: id
                                                    };
                                                    friendsCollection.insertOne(invite, (err, res) => {
                                                        if (!err && res && res.result) {
                                                            callback(201);
                                                        }
                                                        else {
                                                            callback(500, { "Error": "Could not invite friend" });
                                                        }
                                                    });
                                                }
                                                else {
                                                    callback(409, { "Error": "You are already friends with that person" });
                                                }
                                            }
                                            else {
                                                callback(500, { "Error": "Could not read friends list" });
                                            }
                                        });
                                    }
                                    else {
                                        callback(404, { "Error": "User with that id does not exists" });
                                    }
                                }
                                else {
                                    callback(500, { "Error": "Couldn\'t find future friend" });
                                }
                            });
                        }
                        else {
                            callback(400, { "Error": "Sorry, you can\'t friend yourself!" });
                        }
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
    }
    else {
        callback(400, { "Error": "Missing id in query" });
    }
};

//Export the module
module.exports = friends;