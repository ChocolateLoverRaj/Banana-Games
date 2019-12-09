//Connects to mongodb atlas

//Dependancies
const MongoClient = require('mongodb').MongoClient;

//My dependancies
const config = require('./config');
const server = require("../server");
const workers = require("../workers");

//Mongodb
const mongodb = {
    database: false
};

// Connection string
const uri = 'mongodb+srv://' + config.mongodb.username + ':' + config.mongodb.password + '@' + config.mongodb.database + '.mongodb.net / test ? retryWrites = true & w=majority';

//Init
mongodb.init = () => {
    //The mongodb database
    mongodb.database = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    //Connect
    mongodb.database.connect(err => {
        if (!err) {
            console.log(mongodb.database);

            //Start the server
            server.init();

            //Start the workers
            workers.init();
        }
        else {
            throw new Error(err);
        }
    });
};

//Export the module
module.exports = mongodb;

/* Example Find
mongodb.edit("BananaGames", "Users", collection => {
    collection.find({ "Magical": true, "On": false }).toArray((err, res) => {
        console.log(res);
    });
}); */

/* Example InsertOne
mongodb.edit("BananaGames", "Users", collection => {
    collection.insertOne({ hi: true }, (err, res) => {
        console.log(err, res.toArray);
    });
}); */

/* Example Find one and update
mongodb.edit("BananaGames", "Users", collection => {
    if (typeof (collection) == 'object') {
        collection.findOneAndUpdate({ firstName: "Jojos" }, { $set: { hashedPassword: "as;fjasfc9&*(0" } }, (err, res) => {
            console.log(err, res);
        });
    }
}); */

/* Example Update
mongodb.edit("BananaGames", "Users", collection => {
    collection.updateOne({ firstName: "Jojo" }, { $set: { hashedPassword: "as;fjasfc9&*(0" } }, (err, res) => {
        console.log(err, res.result);
    });
}); */