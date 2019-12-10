//Main file for project

//Dependancies
const mongodb = require("./lib/mongodbhelper");
const server = require("./server");
const workers = require("./workers");

//Index container
const index = {};

//Init function
index.init = () => {
    //Start the database connection
    mongodb.init(() => {
        //Start the server
        server.init();

        //Start the workers
        workers.init();
    });
};

//Start the server
index.init();