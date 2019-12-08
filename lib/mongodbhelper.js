//Connects to mongodb atlas

//Dependancies
const MongoClient = require('mongodb').MongoClient;

//My dependancies
const config = require('./config');

//Monodb container
const mongodb = {};

//Perform tasks
mongodb.edit = (database, collectionName, callback) => {
    //Sanity Checking
    database = typeof (database) == 'string' && database.trim().length > 0 ? database.trim() : false;
    collectionName = typeof (collectionName) == 'string' && collectionName.trim().length > 0 ? collectionName.trim() : false;

    if (database && collectionName) {
        //Check that the mongodb information is available
        if (config.mongodb.username && config.mongodb.password && config.mongodb.database) {

            // Connection string
            const uri = 'mongodb+srv://' + config.mongodb.username + ':' + config.mongodb.password + '@' + config.mongodb.database + '.mongodb.net / test ? retryWrites = true & w=majority';

            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            client.connect(err => {
                if (!err) {
                    const collection = client.db(database).collection(collectionName);

                    // perform actions on the collection object
                    callback(collection);

                    client.close();
                }
                else {
                    callback("Error: " + err);
                }
            });

        }
        else {
            callback("Error, no mongodb credentials in environmental variables");
        }
    }
    else {
        callback("Error, unknown database or collection");
    }
};

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

//Export the module
module.exports = mongodb;