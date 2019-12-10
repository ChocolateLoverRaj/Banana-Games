//Configurations

//Dependancies
var secrets;
try {
    secrets = require("./secrets");
}
catch (e) {
    secrets = require("./secretsTemplate");
}

//Container for all the environments
const environments = {};

//Common environment
environments.common = {
    mongodb: {
        username: secrets.mongodbUsername,
        password: secrets.mongodbPassword,
        database: secrets.mongodbDatabase
    },
    sendgrid: {
        apiKey: secrets.sendgridApiKey,
        from: {
            email: "noreply.bananagames@gmail.com",
            name: "Banana Games"
        },
    },
    hashingSecret: secrets.hashingSecret,
    accountRestrictions: {
        emailLimit: 100,
        usernameLimit: 24,
        firstNameLimit: 24,
        lastNameLimit: 24,
        passwordLimit: 100
    },
    tokens: {
        expiryTime: 1000 * 60 * 60 * 3,
        idLength: 20
    },
    users: {
        expiryTime: 1000 * 60 * 60 * 24,
        verificationCodeLength: 20,
        idLength: 50
    },
    workers: {
        tokens: {
            checkInterval: 1000 * 60
        },
        accounts: {
            checkInterval: 1000 * 60 * 60 * 24
        }
    },
    templateGlobals: {
        companyName: "Banana Games"
    }
};

//Staging (default) environment
environments.staging = {
    port: 3000,
    envName: "staging"
};

//Production environment
environments.production = {
    port: process.env.PORT,
    envName: "production"
};

//Determine which environment to export
var currentEnv = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check that the current environment is one of the environments above. if not, default to staging.
var environmentToExport = typeof (environments[currentEnv]) == 'object' ? Object.assign(environments.common, environments[currentEnv]) : Object.assign(environments.common, environments.staging);

//Make sure that the environmental variables are defined
if (!(environmentToExport.mongodb.username && environmentToExport.mongodb.password && environmentToExport.mongodb.database)) {
    console.warn("Missing Mlab Details");
}
if (!environmentToExport.sendgrid.apiKey) {
    console.warn("Missing Sendgrid Api Key");
}
if (!environmentToExport.hashingSecret) {
    console.warn("Missing Hashing Secret");
}
//Export the module
module.exports = environmentToExport;

