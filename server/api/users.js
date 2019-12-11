//Create, access, edit, and delete users

//Dependancies
const mongodb = require("../../lib/mongodbhelper");
const hash = require("../../lib/hash");
const config = require("../../lib/config");
const tokens = require("./tokens");
const randomString = require("../../lib/randomstring");
const sendgrid = require("../../lib/sendgrid").Email;
const profanity = require("../../lib/profanity");

//Create a users container
const users = {};

//Check if email is valid
const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Proccess function
users.process = (data, callback) => {
    //Acceptable methods
    const acceptableMethods = ["post", "get", "put", "delete"];
    if (acceptableMethods.indexOf(data.method) > -1) {
        //Call check if the path is check
        if (data.path == "check") {
            users.check(data, callback);
        }
        //Call check if the path is verify
        else if (data.path == "verify") {
            users.verify(data, callback);
        }
        //Call password if the path is password
        else if (data.path == "password") {
            users.password(data, callback);
        }
        //Call function named after method
        else if (data.path == '') {
            users[data.method](data, callback);
        }
        //Callback 404
        else {
            callback(404);
        }
    }
    else {
        callback(405);
    }
};

//Check if a username or email is available
//Required data: username xor email
//Optional data: none
users.check = (data, callback) => {
    //Make sure method is get
    if (data.method == "get") {
        //Sanity checking
        const username = typeof (data.queryStringObject.username) == 'string' && data.queryStringObject.username.trim().search(' ') == -1 && data.queryStringObject.username.trim().length > 0 && data.queryStringObject.username.trim().length <= config.accountRestrictions.usernameLimit ? data.queryStringObject.username.trim() : false;
        const email = typeof (data.queryStringObject.email) == 'string' && data.queryStringObject.email.trim().length > 0 && data.queryStringObject.email.trim().length <= config.accountRestrictions.emailLimit ? data.queryStringObject.email.trim() : false;

        //Make sure ONE of username or email is being checked
        if ((username || email) && !(username && email)) {
            if (username) {
                //Profanity check the username
                profanity.check(username, (err, profane) => {
                    if (!err) {
                        if (!profane) {
                            //Check if the username is taken
                            //Look for users
                            const usersCollection = mongodb.collection("BananaGames", "Users");
                            usersCollection.findOne({ username: username }, (err, res) => {
                                if (!err) {
                                    if (res == null) {
                                        callback(204);
                                    }
                                    else {
                                        callback(200);
                                    }
                                }
                                else {
                                    callback(500, { "Error": "Could not look for username" });
                                }
                            });
                        }
                        else {
                            callback(643, { "Error": "Nuaghty Username" });
                        }
                    }
                    else {
                        callback(500, { "Error": "Could not profanity check username" });
                    }
                });
            }
            else {
                //Validate the email
                if (validateEmail(email)) {
                    //Check if the email is taken
                    //Look for users
                    usersCollection.findOne({ email: email }, (err, res) => {
                        if (!err) {
                            if (res == null) {
                                callback(204);
                            }
                            else {
                                callback(200);
                            }
                        }
                        else {
                            callback(500, { "Error": "Could not look for email" });
                        }
                    });
                }
                else {
                    callback(601, { "Error": "Invalid Email Address" });
                }
            }
        }
        else {
            callback(400, { "Error": "Remember to specify ONE of username or email" });
        }
    }
    else {
        callback(405);
    }
};

//Check if a password is good
users.password = (data, callback) => {
    //make sure the method is get
    if (data.method == "get") {
        //Sanity checking
        const token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length > 0 ? data.headers.token.trim() : false;
        const password = typeof (data.headers.password) == 'string' && data.headers.password.trim().length > 0 ? data.headers.password.trim() : false;

        if (password) {
            if (token) {
                //Make sure token is valid
                tokens.check(token, (err, token) => {
                    if (!err) {
                        if (token) {
                            //Get the email from the token
                            tokens.getUserInfo(token.userId, (err, user) => {
                                if (!err && user) {
                                    //Hash the password
                                    const hashedPassword = hash(password);

                                    //Check the users account
                                    const usersCollection = mongodb.collection("BananaGames", "Users");
                                    usersCollection.findOne({ email: user.email, hashedPassword: hashedPassword }, (err, res) => {
                                        if (!err) {
                                            if (res) {
                                                callback(200);
                                            }
                                            else {
                                                callback(404, { "Error": "Wrong Password" });
                                            }
                                        }
                                        else {
                                            callback(500, { "Error": "Could not find user" });
                                        }
                                    });
                                }
                                else {
                                    callback(500, { "Error": "Couldn't get user info" });
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
            callback(400);
        }
    }
    else {
        callback(405);
    }
};

//Post
//Required data: firstName, lastName, email, password, tosAgreement
//Optional Data: none
users.post = (data, callback) => {
    //Users collection
    const usersCollection = mongodb.collection("BananaGames", "Users");

    //Sanity checking
    const firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 && data.payload.firstName.trim().length <= config.accountRestrictions.firstNameLimit && data.payload.firstName.match(/[^a-z,0-9,\-,\_,\ ]/gi) == null ? data.payload.firstName.trim() : false;
    const lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 && data.payload.lastName.trim().length <= config.accountRestrictions.lastNameLimit && data.payload.lastName.match(/[^a-z,0-9,\-,\_,\ ]/gi) == null ? data.payload.lastName.trim() : false;
    const username = typeof (data.payload.username) == 'string' && data.payload.username.trim().search(' ') == -1 && data.payload.username.trim().length > 0 && data.payload.username.trim().length <= config.accountRestrictions.usernameLimit && !data.payload.username.match(/\W/g) ? data.payload.username.trim() : false;
    const email = typeof (data.payload.email) == 'string' && data.payload.email.trim().length > 0 && data.payload.email.trim().length <= config.accountRestrictions.emailLimit ? data.payload.email.trim() : false;
    const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 && data.payload.password.trim().length <= config.accountRestrictions.passwordLimit ? data.payload.password.trim() : false;
    const tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

    if (firstName && lastName && username && email && password && tosAgreement) {
        //Make sure email address is valid
        if (validateEmail(email)) {
            //Make sure username is clean
            profanity.check(username, (err, profane) => {
                if (!err) {
                    if (!profane) {
                        //Make sure that the user doesn't already exist
                        usersCollection.findOne({ $or: [{ email: email }, { username: username }] }, (err, res) => {
                            if (!err) {
                                if (res == null) {
                                    //Hash the password
                                    const hashedPassword = hash(password);

                                    //Create a account verification code
                                    const verificationCode = randomString(config.users.verificationCodeLength);

                                    //Create a random id
                                    const randomId = randomString(config.users.idLength);

                                    //Create the user object
                                    const userObject = {
                                        id: randomId,
                                        firstName: firstName,
                                        lastName: lastName,
                                        username: username,
                                        email: email,
                                        hashedPassword: hashedPassword,
                                        notValid: verificationCode,
                                        created: Date.now(),
                                        friends: []
                                    };

                                    console.log(userObject, config.users.idLength);

                                    //Insert the user object to the collection
                                    usersCollection.insertOne(userObject, (err, res) => {
                                        if (!err && res) {
                                            //Send the email
                                            //Prepare the data object
                                            const data = {
                                                templateId: "d-5f98b1d176df4e6ebee8f233b3a6fc17",
                                                firstName: userObject.firstName,
                                                lastName: userObject.lastName,
                                                link: config.envName == "staging" ? "localhost:" + config.port + "/verify?email=" + userObject.email + "&code=" + verificationCode : "banana-games.herokuapp.com/verify?email=" + userObject.email + "&code=" + verificationCode
                                            }

                                            //Prepare the person object
                                            const person = {
                                                email: userObject.email,
                                                name: userObject.firstName + " " + userObject.lastName
                                            };

                                            //Send to sendgrid
                                            sendgrid.send(person, data, (err) => {
                                                if (!err) {
                                                    callback(201);
                                                }
                                                else {
                                                    callback(500, { "Error": "Could not send verification email" });
                                                }
                                            })
                                        }
                                        else {
                                            callback(500, { "Error": "Could not insert user" });
                                        }
                                    });
                                }
                                else {
                                    //Figure out if the email is the same
                                    if (res.email == email) {
                                        callback(409, { "Error": "User with that email already exists" });
                                    }
                                    else {
                                        callback(409, { "Error": "User with that username already exists" });
                                    }
                                }
                            }
                            else {
                                callback(500, { "Error": "Error reading list of users" });
                            }
                        });
                    }
                    else {
                        callback(643, { "Error": "Naughty Username" });
                    }
                }
                else {
                    callback(500, { "Error": "Could not profanity check username" });
                }
            });
        }
        else {
            callback(601, { "Error": "Invalid email address" });
        }
    }
    else {
        callback(400, { "Error": "Missing required fields" });
    }
};

//Verify
//Required data: email, code
//Optional Data: none
users.verify = (data, callback) => {
    //Users collection
    const usersCollection = mongodb.collection("BananaGames", "Users");

    //Sanity checking
    const email = typeof (data.payload.email) == 'string' && data.payload.email.trim().length > 0 && data.payload.email.trim().length <= config.accountRestrictions.emailLimit ? data.payload.email.trim() : false;
    const code = typeof (data.payload.code) == 'string' && data.payload.code.trim().length > 0 ? data.payload.code.trim() : false;

    if (email && code) {
        //Try to find the user based on email
        //Make a filter for finding the account to verify
        let filter = {
            $expr: {
                $and: [
                    {
                        $eq: [
                            "$email",
                            email
                        ]
                    },
                    {
                        $lt: [
                            Date.now(),
                            {
                                $add: [
                                    "$created",
                                    config.users.expiryTime
                                ]
                            }
                        ]
                    },
                    {
                        $eq: [
                            "$notValid",
                            code
                        ]
                    }
                ]
            }
        };
        //Try to update notValid to be false
        usersCollection.findOneAndUpdate(filter, { $set: { notValid: false } }, (err, res) => {
            if (!err && res && res.ok) {
                if (res.value) {
                    callback(200);
                }
                else {
                    callback(404, { "Error": "No account with valid code and matching code and email exists." });
                }
            }
            else {
                console.log(err, res);
                callback(500, { "Error": "Could not update user" });
            }
        });
    }
    else {
        callback(400, { "Error": "Missing required fields", urPayload: data.payload });
    }
};

//Get
//Required data: email
//Optional data: token
users.get = (data, callback) => {
    //Sanity Checking
    const username = typeof (data.queryStringObject.username) == 'string' && data.queryStringObject.username.trim().length > 0 ? data.queryStringObject.username.trim() : false;
    const token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length > 0 ? data.headers.token.trim() : false;

    //Make sure they have specified a username
    if (username) {
        //find the user
        const usersCollection = mongodb.collection("BananaGames", "Users");
        usersCollection.findOne({ "username": username }, (err, res) => {
            if (!err) {
                if (res) {
                    //get the basic information from the user
                    let info = {
                        username: res.username,
                        id: res.id,
                    }

                    //Check if token is given
                    if (token) {
                        //Validate
                        tokens.check(token, (err, token) => {
                            if (!err) {
                                if (token) {
                                    //Get more info
                                    let moreInfo = Object.assign(info, {
                                        firstName: res.firstName,
                                        lastName: res.lastName,
                                        email: res.email
                                    });

                                    callback(200, moreInfo);
                                }
                                else {
                                    callback(403, info);
                                }
                            }
                            else {
                                callback(500, info);
                            }
                        });
                    }
                    else {
                        callback(200, info);
                    }
                }
                else {
                    callback(404, { "Error": "User with that username does not exist." });
                }
            }
            else {
                callback(500, { "Error": "Could not search for user" });
            }
        });
    }
    else {
        callback(400, { "Error": "You must specify a username" });
    }
};

//Required data: token
//Optional data: firstName, lastName, username, password
users.put = (data, callback) => {
    //Sanity checking
    const token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length > 0 ? data.headers.token.trim() : false;
    const firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 && data.payload.firstName.trim().length <= config.accountRestrictions.firstNameLimit ? data.payload.firstName.trim() : false;
    const lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 && data.payload.lastName.trim().length <= config.accountRestrictions.lastNameLimit ? data.payload.lastName.trim() : false;
    const username = typeof (data.payload.username) == 'string' && data.payload.username.trim().search(' ') == -1 && data.payload.username.trim().length > 0 && data.payload.username.trim().length <= config.accountRestrictions.usernameLimit ? data.payload.username.trim() : false;
    const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 && data.payload.password.trim().length <= config.accountRestrictions.passwordLimit ? data.payload.password.trim() : false;
    const ogPassword = typeof (data.payload.ogPassword) == 'string' && data.payload.ogPassword.trim().length > 0 && data.payload.ogPassword.trim().length <= config.accountRestrictions.passwordLimit ? data.payload.ogPassword.trim() : false;
    const email = typeof (data.payload.email) == 'string' && data.payload.email.trim().length > 0 && data.payload.email.trim().length <= config.accountRestrictions.emailLimit ? data.payload.email.trim() : false;

    if (email) {
        if (token) {
            //Check if the token is valid
            tokens.check(token, (err, token) => {
                if (!err) {
                    if (token) {
                        //Get email
                        tokens.getUserInfo(token.userId, (err, user) => {
                            if (!err && user) {
                                if (user.email == email) {
                                    if (firstName || lastName || username || (password && ogPassword)) {
                                        //Hash password if there is
                                        var hashedPassword;
                                        if (password) {
                                            hashedPassword = hash(password);
                                        }
                                        var hashedOgPassword;
                                        if (ogPassword) {
                                            hashedOgPassword = hash(ogPassword);
                                        }
                                        //Get the user based on email
                                        const usersCollection = mongodb.collection("BananaGames", "Users");
                                        //Filter
                                        let filter = {
                                            "email": email
                                        };
                                        if (hashedOgPassword) {
                                            filter.hashedPassword = hashedOgPassword
                                        }
                                        //What to update to
                                        let value = {
                                            $set: {}
                                        };
                                        if (firstName) {
                                            value.$set.firstName = firstName;
                                        }
                                        if (lastName) {
                                            value.$set.lastName = lastName;
                                        }
                                        if (username) {
                                            value.$set.username = username;
                                        }
                                        if (hashedPassword) {
                                            value.$set.hashedPassword = hashedPassword;
                                        }
                                        usersCollection.findOneAndUpdate(filter, value, {returnOriginal: false},(err, res) => {
                                            if (!err) {
                                                if (res && res.value) {
                                                    //User object for client
                                                    let userObject = {
                                                        firstName: res.value.firstName,
                                                        lastName: res.value.lastName,
                                                        username: res.value.username,
                                                        email: res.value.email
                                                    };
                                                    //Send the user object to the client
                                                    callback(200, userObject);
                                                }
                                                else {
                                                    callback(404, { "Error": "No user with matching email and password found"});
                                                }
                                            }
                                            else {
                                                callback(500, { "Error": "Couldn't update user" });
                                            }
                                        });
                                    }
                                    else {
                                        callback(421, { "Error": "There is nothing to change" });
                                    }
                                }
                                else {
                                    callback(403, { "Error": "Email must match token" });
                                }
                            }
                            else {
                                callback(500, { "Error": "Could not get user info" });
                            }
                        });
                    }
                    else {
                        callback(401);
                    }
                }
                else {
                    callback(500, { "Error": "Could not authorize" });
                }
            });
        }
        else {
            callback(403);
        }
    }
    else {
        callback(400, { "Error": "Missing email" });
    }
};

//Delete
//Required data: token, email
//Optional data: none
users.delete = (data, callback) => {
    //Sanity checking
    const token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length > 0 ? data.headers.token.trim() : false;
    const email = typeof (data.queryStringObject.email) == 'string' && data.queryStringObject.email.trim().length > 0 && data.queryStringObject.email.trim().length <= config.accountRestrictions.emailLimit ? data.queryStringObject.email.trim() : false;

    if (token) {
        if (email) {
            //Make sure token is valid
            tokens.check(token, (err, token) => {
                if (!err) {
                    if (token) {
                        //Get more info
                        tokens.getUserInfo(token.userId, (err, user) => {
                            if (!err && user) {
                                //Email must match token email
                                if (user.email == email) {
                                    //Delete the account
                                    const userCollection = mongodb.collection("BananaGames", "Users");
                                    userCollection.findOneAndDelete({ email: email }, (err, res) => {
                                        if (!err && res && res.value) {
                                            callback(200);
                                        }
                                        else {
                                            callback(500, { "Error": "Could not delete account" });
                                        }
                                    });
                                }
                                else {
                                    callback(401);
                                }
                            }
                            else {
                                callback(500, { "Error": "Could not get email" });
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
            callback(400, { "Erorr": "Missing email in query" });
        }
    }
    else {
        callback(403, { "Error": "Missing token in headers" });
    }
};

//Export the module
module.exports = users;