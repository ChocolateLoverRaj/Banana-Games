//Hash a string

//Dependancies

//Node.js Modules
const crypto = require("crypto");

//My files
const config = require("./config")

// Create a SHA256 hash
const hash = str => {
    if (typeof (str) == 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

//Export the function
module.exports = hash;