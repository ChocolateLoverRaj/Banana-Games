//Perform background tasks

//Dependancies
const config = require("./lib/config");
const mongodb = require("./lib/mongodbhelper");
const status = require("./status");

//Workers container
const workers = {};

//Workers tokens
workers.tokens = {};

//Check the tokens, deleting the expired ones
workers.tokens.check = () => {
    //Tokens collection
    const collection = mongodb.collection("BananaGames", "Tokens");
    //Find accounts to delete
    //Create a filter
    const queryFilter = {
        $cond: {
            if: {
                $gt: [Date.now(), "$expires"] 
            },
            then: true,
            else: false
        }
    };
    //Delete accounts based on filter
    collection.deleteMany({ $expr: { $eq: [queryFilter, true] } }, (err, res) => {
        if (!err && res.result.ok) {
            console.log("Deleted " + res.result.n + " tokens");
        }
        else {
            console.warn("Couldn't delete expired tokens");
        }
    });
};
workers.tokens.init = () => {
    //Check the tokens once right away
    workers.tokens.check();

    //Check the tokens every {milliseconds}
    setInterval(workers.tokens.check, config.workers.tokens.checkInterval);
};

//Workers accounts
workers.accounts = {};

//Check the accounts, deleting the ones that weren't verified for the past 24 hours
workers.accounts.check = () => {
    //Users collection
    let collection = mongodb.collection("BananaGames", "Users");
    //Find accounts to delete
    //Create a filter
    const queryFilter = {
        $cond: {
            if: {
                $and: [
                    { $eq: [{ $type: "$notValid" }, "string"] },
                    { $gt: [Date.now(), { $add: ["$created", config.users.expiryTime] }] }
                ]
            },
            then: true,
            else: false
        }
    };
    //Delete accounts based on filter
    collection.deleteMany({ $expr: { $eq: [queryFilter, true] } }, (err, res) => {
        if (!err && res.result.ok) {
            console.log("Deleted " + res.result.n + " accounts");
        }
        else {
            console.warn("Couldn't delete old, unverified accounts");
        }
    });
};
workers.accounts.init = () => {
    //Check the accounts once right away
    workers.accounts.check();

    //Set a loop to check the accounts
    setInterval(workers.accounts.check, config.workers.accounts.checkInterval);
};

//Init Function
workers.init = () => {
    //Start the tokens
    workers.tokens.init();

    //Start the accounts
    workers.accounts.init();
};

//Export the module
module.exports = workers;