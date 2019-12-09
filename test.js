//Test
const mongodb = require("./lib/mongodbhelper");
const randomString = require("./lib/randomstring");

mongodb.init(() => {
    let tokensCollection = mongodb.database.db("BananaGames").collection("Tokens");

    tokensCollection.find().toArray((err, res) => {
        console.log(err, res);
    });
});