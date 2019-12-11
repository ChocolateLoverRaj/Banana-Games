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
    //Users collection
    const usersCollection = mongodb.collection("BananaGames", "Users");

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
    //Users collection
    const usersCollection = mongodb.collection("BananaGames", "Users");

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
                            //Hash the password
                            const hashedPassword = hash(password);

                            //Check the users account
                            usersCollection.findOne({ email: token.email, hashedPassword: hashedPassword }, (err, res) => {
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

//Put @TODO make this better
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
                        if (token.email == email) {
                            if (firstName || lastName || username || (password && ogPassword)) {
                                //Connect to database
                                mongodb.edit("BananaGames", "Users", collection => {
                                    if (typeof (collection) == 'object') {
                                        //Find the user
                                        collection.findOne({ email: email }, (err, res) => {
                                            if (!err) {
                                                if (res) {
                                                    //The object to send back
                                                    const newUser = {
                                                        email: res.email,
                                                        username: res.username,
                                                        firstName: res.firstName,
                                                        lastName: res.lastName
                                                    };

                                                    //New user content
                                                    const newUserContent = {};

                                                    const continueLogic = () => {
                                                        if (firstName) {
                                                            newUserContent.firstName = firstName;
                                                            newUser.firstName = firstName;
                                                        }
                                                        if (lastName) {
                                                            newUserContent.lastName = lastName;
                                                            newUser.lastName = lastName;
                                                        }
                                                        if (username) {
                                                            newUserContent.username = username;
                                                            newUser.username = username;
                                                        }

                                                        //Connect to database
                                                        mongodb.edit("BananaGames", "Users", collection => {
                                                            if (typeof (collection) == 'object') {
                                                                //Update the user
                                                                collection.updateOne({ email: email }, { $set: newUserContent }, (err, res) => {
                                                                    if (!err && res.result.ok) {
                                                                        callback(200, newUser);
                                                                    }
                                                                    else {
                                                                        callback(500, { "Error": "Could not update user" });
                                                                        console.log(err, res);
                                                                    }
                                                                });
                                                            }
                                                            else {
                                                                callback(500, { "Error": "Could not connect to users" });
                                                            }
                                                        });
                                                    };

                                                    if (password) {
                                                        //Check that the passwords match
                                                        const hashedOgPassword = hash(ogPassword);

                                                        if (res.hashedPassword == hashedOgPassword) {
                                                            //Hash the new password
                                                            const hashedPassword = hash(password);
                                                            newUserContent.hashedPassword = hashedPassword;

                                                            continueLogic();
                                                        }
                                                        else {
                                                            callback(401, { "Error": "To update password you must have a valid old password" });
                                                        }
                                                    }
                                                    else {
                                                        continueLogic();
                                                    }
                                                }
                                                else {
                                                    callback(404, { "Error": "User with that email does not exist" });
                                                }
                                            }
                                            else {
                                                callback(500, { "Error": "Could not find user" });
                                            }
                                        });
                                    }
                                    else {
                                        callback(500, { "Error": "Could not connect to database" });
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
                //Make sure email matches token
                if (token.email == email) {
                    if (!err) {
                        if (token) {
                            //Connect to database
                            mongodb.edit("BananaGames", "Users", collection => {
                                if (typeof (collection) == 'object') {
                                    //Find the account
                                    collection.findOne({ email: token.email }, (err, res) => {
                                        if (!err) {
                                            if (res) {
                                                //Connect to database
                                                mongodb.edit("BananaGames", "Users", collection => {
                                                    if (typeof (collection) == 'object') {
                                                        //Delete the account
                                                        collection.deleteOne({ email: token.email }, (err, res) => {
                                                            if (!err && res.result.ok) {
                                                                //Connect to database
                                                                mongodb.edit("BananaGames", "Tokens", collection => {
                                                                    if (typeof (collection) == 'object') {
                                                                        //Delete the tokens
                                                                        collection.deleteMany({ email: token.email }, (err, res) => {
                                                                            if (!err && res.result.ok) {
                                                                                callback(200);
                                                                            }
                                                                            else {
                                                                                callback(206, { "Error": "Could not delete the tokens associated with your account. However, the account itself has been removed" });
                                                                            }
                                                                        });
                                                                    }
                                                                    else {
                                                                        callback(206, { "Error": "Could not connect to database to remove the tokens associated with your account. However, the account itself has been removed" });
                                                                    }
                                                                });
                                                            }
                                                            else {
                                                                callback(500, { "Error": "Could not delete your account" });
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        callback(500, { "Error": "Error connecting to database" });
                                                    }
                                                });
                                            }
                                            else {
                                                callback(404, { "Error": "Token not found" });
                                            }
                                        }
                                        else {
                                            callback(500, { "Error": "Error searching for user" });
                                        }
                                    });
                                }
                                else {
                                    callback(500, { "Error": "Could not search for your user" });
                                }
                            });
                        }
                        else {
                            callback(401, { "Error": "Invalid token" });
                        }
                    }
                    else {
                        callback(500, { "Error": "Could not validate token" });
                    }
                }
                else {
                    callback(409, { "Error": "Email must match token" });
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