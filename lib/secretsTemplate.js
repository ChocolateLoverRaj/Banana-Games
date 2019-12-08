//Store API Keys in here

//Secrets
const secrets = {
    mongodbDatabase: process.env.mongodbDatabase,
    mongodbPassword: process.env.mongodbPassword,
    mongodbUsername: process.env.mongodbUsername,
    sendgridApiKey: process.env.sendgridApiKey,
    hashingSecret: process.env.hashingSecret
};

//Export the module
module.exports = secrets;