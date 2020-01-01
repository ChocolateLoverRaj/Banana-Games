//Games Api

//Container for module
const api = {};

//Games
const games = [
    {
        name: "Pong",
        link: "/games/static/pong"
    }
];

//Process
api.process = (data, callback) => {
    if (data.method == "get") {
        callback(JSON.stringify(games), 200, "application/json");
    }
    else {
        callback(405);
    }
}; 

//Export the module
module.exports = api;