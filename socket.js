//Handles Web Sockets

//Dependancies

//WebSocket
const WebSocket = require("ws");

//Node.js Modules
const EventEmitter = require("events");

//My Scripts
const status = require("./status");
const tokens = require("./server/api/tokens");

//Create a container for websocket
const socket = {};

//Init Function
socket.init = server => {
    //Emitter that emits messages
    socket.messages = new EventEmitter();

    //Ping Event
    socket.messages.on("ping", (data, clientId, ws) => {
        //Get the id
        const id = typeof (data.id) == 'string' && data.id.trim().length > 0 ? data.id.trim() : false;

        ws.send(JSON.stringify({ error: false, id: id }));
    });

    //Token Event
    socket.messages.on("token", (data, clientId, ws) => {
        //Get the id and token
        const id = typeof (data.id) == 'string' && data.id.trim().length > 0 ? data.id.trim() : false;
        const token = typeof (data.token) == 'string' && data.token.trim().length > 0 ? data.token.trim() : false;

        //Make sure there is a token
        if (token) {
            //Check the token
            tokens.check(token, (err, token) => {
                if (!err && token) {
                    //Make sure the client exists
                    if (typeof (status.clients[clientId]) == 'object' && status.clients[clientId] != null) {
                        //Add the token to the client
                        status.clients[clientId].token = {
                            id: token.id,
                            email: token.email,
                            username: token.username
                        }

                        //Send back a friendly reply
                        ws.send(JSON.stringify({ error: false, id: id }));
                    }
                    else {
                        ws.send(JSON.stringify({ error: "You don't esist", id: id }));
                    }
                }
                else {
                    ws.send(JSON.stringify({ error: "Couldn't login", id: id }));
                }
            });
        }
        else {
            ws.send(JSON.stringify({ error: "No token specified", id: id }));
        }
    });

    const wss = new WebSocket.Server({ server: server, clientTracking: true });

    wss.on("listening", ws => {
        console.log("The WebSocket is listening");
    });

    wss.on("connection", ws => {
        //Make a randomId for this client
        const randomId = Math.random().toString();

        //Add the client to status
        status.clients[randomId] = {
            socket: ws,
            token: false,
        };

        //Send the id to the client
        ws.send(JSON.stringify({
            path: "id",
            yourId: randomId
        }));

        ws.on("close", (ws, code, reason) => {
            delete status.clients[randomId];
        });

        ws.on("message", string => {
            //Try to parse the data as JSON
            try {
                var data = JSON.parse(string);
            }
            catch (e) {
                var data = false;
            }

            if (data) {
                //Get the path key and id key from the data
                const path = typeof (data.path) == 'string' && data.path.trim().length > 0 ? data.path.trim() : false;

                if (path) {
                    socket.messages.emit(data.path, data, randomId, ws);
                }
                else {
                    ws.send(JSON.stringify({ error: "Missing Required data. Must specify path and id" }));
                }
            }
            else {
                ws.send(JSON.stringify({ error: "Invalid JSON. Only JSON accepted" }));
            }
        });
    });
};

//Export the module
module.exports = socket;