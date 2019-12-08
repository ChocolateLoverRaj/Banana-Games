//Send a 200 Response

//Ping container
const ping = {};

//Process Function
ping.process = (data, callback) => {
    callback(200);
};

//Export the module
module.exports = ping;