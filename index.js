//Main file for project

//Dependancies
const mongodb = require("./lib/mongodbhelper");

//Index container
const index = {};

//Init function
index.init = () => {
    //Start the database connection
    mongodb.init();
};

//Start the server
index.init();