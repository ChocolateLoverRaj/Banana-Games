//Handles Web Sockets

//Dependancies

//WebSocket
const WebSocket = require("ws");

//Node.js Modules
const EventEmitter = require("events");

//My Scripts
const status = require("./status");
const config = require("./lib/config");
const randomString = require("./lib/randomstring");
const tokens = require("./server/api/tokens");

//Create a container for websocket
const socket = {};

//Emitter that emits messages
socket.messages = new EventEmitter();

//Init Function
socket.init = server => {
    const wss = new WebSocket.Server({ server: server, clientTracking: true });

    wss.on("listening", ws => {
        console.log("The WebSocket is listening");
    });

    wss.on("connection", ws => {
        //Make a randomId for this client
        let randomId = randomString(config.socket.idLength);

        //Make the client object
        let client = {
            socket: ws,
            token: false,
            lastPinged: Date.now(),
            ping: NaN,
            connected: true,
            id: randomId
        };
        
        //Add the client to status
        status.clients.id[randomId] = client;

        //My own send
        client.send = (path, data, messageId) => {
            //Message object
            let messageObject = {
                path: path,
                data: data,
                timeSent: Date.now(),
                id: messageId
            };
            //Send
            ws.send(JSON.stringify(messageObject));
        };

        //Update lastPinged
        client.lastPinged = Date.now();
        //Ping
        client.send("ping", {});

        //If the socket gets closed
        ws.on("close", (ws, code, reason) => {
            //Update client
            client.connected = false;
        });

        //Handle a message
        ws.on("message", string => {
            //Try to parse the data as JSON
            var message;
            try {
                message = JSON.parse(string);
            }
            catch (e) {
                message = false;
            }

            if (message) {
                //Get the path key and data from the data
                let path = typeof (message.path) == 'string' && message.path.trim().length > 0 ? message.path.trim() : false;
                let data = typeof (message.data) == 'object' && message.data != null ? message.data : false;

                if (path && data) {
                    socket.messages.emit(path, message, client);
                }
                else {
                    client.send("error", { error: "Missing Required data. Must specify path and data" });
                }
            }
            else {
                client.send("error", { error: "Invalid JSON. Only JSON accepted" });
            }
        });
    });
};

//Pong
socket.messages.on("pong", (message, client) => {
    //Calculate ping
    client.ping = Date.now() - client.lastPinged;
    //Reply
    client.send("pong", {
        ping: client.ping
    }, message.id);

    //Ask for a ping again after x seconds
    setTimeout(() => {
        client.lastPinged = Date.now();
        client.send("ping", {});
    }, config.socket.pingFrequency);
});

//Token
socket.messages.on("token", (message, client) => {
    //Make sure message is good
    let id = typeof (message.data.id) == 'string' && message.data.id.trim().length > 0 ? message.data.id.trim() : false;
    if (id) {
        //Check the token
        tokens.check(id, (err, token) => {
            if (!err && token) {
                //Get more user info
                tokens.getUserInfo(token.userId, (err, user) => {
                    if (!err && user) {
                        //update the client
                        client.token = {
                            id: id,
                            username: user.username,
                            userId: user.id,
                            email: user.email
                        };
                        //Add the client to tokens
                        status.clients.token[id] = client;
                        console.log(status, client);
                    }
                    else {
                        client.send("token", { error: "Could not get user" }, message.id);
                    }
                });
            }
            else {
                client.send("token", { error: "Bad token" }, message.id);
            }
        });
    }
    else {
        client.send("token", { error: "No token specified" }, message.id);
    }
});

//Export the module
module.exports = socket;