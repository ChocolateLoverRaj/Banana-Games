//Container for the frontend application
const app = {};

//My custom libraries
class Emitter {
    constructor() {
        this.ons = {};
    };

    on = (message, action) => {
        //Make a randomId
        let randomId = Math.random();
        this.ons[randomId] = {
            message: message,
            action: action
        };
        return randomId;
    };

    //Cancel an 'on'
    nevermind = id => {
        delete this.ons[id];
    };

    emit = (message, data) => {
        //Loop through all ons
        for (var id in this.ons) {
            if (this.ons.hasOwnProperty(id)) {
                //Make sure the message matches
                let on = this.ons[id];
                if (on.message == message) {
                    //Make sure that the function has data parameter
                    if (on.action.length == 1) {
                        on.action(data);
                    }
                    else {
                        on.action();
                    }
                }
            }
        }
    };
}

const ElementTemplates = {};
class ElementTemplate {
    constructor(name, element) {
        ElementTemplates[name] = bindings => {
            var newElement = element.cloneNode(true);
            //Check if there is are bindings
            //Bindings are: key = class, value = innerHTMl for element with that class
            if (bindings) {
                for (var key in bindings) {
                    newElement.getElementsByClassName(key)[0].innerHTML = bindings[key];
                }
            }
            //Remove template class
            newElement.classList.remove("template");
            return newElement;
        };
    };
}

//Config
app.config = {
    sessionToken: false,
    socketId: false,
    styles: {
        CONNECTION: 0,
        TOKEN: 1
    }
};

//Status
app.status = {
    connection: new Emitter(),
    message: new Emitter(),
    token: new Emitter(),
    ping: NaN,
    lastPinged: NaN,
}

//AJAX client for REST api
app.client = {};

//Javascript controlled styleSheet
app.config.styles.element = document.createElement('style');
app.config.styles.element.title = "jsControlled";
document.body.appendChild(app.config.styles.element);
//Find the stylesheet
for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].title == "jsControlled") {
        app.config.styles.sheet = document.styleSheets[i];
        break;
    }
}

//Make an api request
app.client.request = (headers, path, method, queryStringObject, payload, callback) => {
    //Set defaults
    headers = typeof (headers) == 'object' && headers != null ? headers : {};
    path = typeof (path) == 'string' ? path : "/";
    const acceptableMethods = ["POST", "GET", "PUT", "DELETE"];
    method = typeof (method) == 'string' && acceptableMethods.indexOf(method) > -1 ? method : "GET";
    queryStringObject = typeof (queryStringObject) == 'object' && queryStringObject != null ? queryStringObject : {};
    payload = typeof (payload) == 'object' && payload != null ? payload : {};
    callback = typeof (callback) == 'function' ? callback : false;

    //For each queryString parameter sent, add it to the path
    var requestURL = path + "?";
    var first = true;
    for (var queryKey in queryStringObject) {
        if (queryStringObject.hasOwnProperty(queryKey)) {
            //If at least one string parameter is added, add "&"
            if (first) {
                requestURL += "&";
                first = false;
            }

            //Add the key and value
            requestURL += queryKey + "=" + queryStringObject[queryKey];
        }
    }

    //Form the http request as JSON type
    var xhr = new XMLHttpRequest();
    xhr.open(method, requestURL, true);
    xhr.setRequestHeader("Content-type", "application/json");

    //If there is a current session token, add it as a header
    if (app.config.sessionToken) {
        xhr.setRequestHeader("token", app.config.sessionToken.id);
    }

    //For each header sent, add it to the request
    for (var headerKey in headers) {
        if (headers.hasOwnProperty(headerKey)) {
            xhr.setRequestHeader(headerKey, headers[headerKey]);
        }
    }

    //When the request comes back, handle the response
    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var statusCode = xhr.status;
            var responseReturned = xhr.responseText;

            //Callback if requested
            if (callback) {
                try {
                    var parsedResponse = JSON.parse(responseReturned);
                    callback(statusCode, parsedResponse);
                }
                catch (e) {
                    callback(statusCode, false);
                }
            }
        }
    };

    //Send the payload as JSON
    var payloadString = JSON.stringify(payload);

    //Send
    xhr.send(payloadString);

    //Return the xhr object
    return xhr;
};

//Send a socket message
app.client.message = (path, data, timeoutMs, callback) => {
    //Check if socket connection
    if (ws.readyState == ws.OPEN) {
        //Make a randomId
        let randomId = Math.random().toString();

        //Message object
        let messageObject = {
            path: path,
            data: data,
            timeSent: Date.now(),
            id: randomId
        };
        //If callback is requested, add a listener and id
        if (timeoutMs && callback) {
            let id = app.status.message.on("reply:" + randomId, message => {
                //Cancel the canceling timer
                clearInterval(cancel);
                callback(false, message);
            });

            //Cancel
            let cancel = setTimeout(() => {
                //Cancel the 'on'
                app.status.message.nevermind(id);
                //Callback
                callback(true);
            }, timeoutMs);
        }
        //Send
        ws.send(JSON.stringify(messageObject));
    }
};

//Html Elements
//Resizing
const topDisplay = document.getElementById("top");
const mainDisplay = document.getElementById("main");

//Online and offline elements
const showConnectionStatus = online => {
    //Update the stylesheet
    if (app.config.styles.sheet.rules[app.config.styles.CONNECTION] != undefined) {
        app.config.styles.sheet.deleteRule(app.config.styles.CONNECTION);
    }
    if (online) {
        app.config.styles.sheet.insertRule(".offline { display: none;}", app.config.styles.CONNECTION);
    }
    else {
        app.config.styles.sheet.insertRule(".online { display: none;}", app.config.styles.CONNECTION);
    }
};
app.status.connection.on("connect", () => {
    showConnectionStatus(true);
});
app.status.connection.on("close", () => {
    showConnectionStatus(false);
});
//Initialialy we are offline
showConnectionStatus(false);

//Ping
const ping = {
    display: document.getElementById("ping"),
    onlineDisplay: document.getElementById("online"),
    offlineDisplay: document.getElementById("offline"),
    connectingDisplay: document.getElementById("connecting"),
    connectButton: document.getElementById("reconnect")
};
//Ping show
ping.show = status => {
    if (status == "connecting") {
        ping.connectingDisplay.classList.remove("hidden");
    }
    else {
        ping.connectingDisplay.classList.add("hidden");
    }
    if (status == "connected") {
        ping.onlineDisplay.classList.remove("hidden");
    }
    else {
        ping.onlineDisplay.classList.add("hidden");
    }
    if (status == "disconnect") {
        ping.offlineDisplay.classList.remove("hidden");
    }
    else {
        ping.offlineDisplay.classList.add("hidden");
    }
};

//Connect the emitter to ping show
app.status.connection.on("connecting", () => {
    ping.show("connecting");
});
app.status.connection.on("connect", () => {
    ping.show("connected");
});
app.status.connection.on("close", () => {
    ping.show("disconnect");
});
app.status.connection.on("ping", ms => {
    ping.display.innerHTML = ms;    
});
//Whenever the server asks for a ping, request a pong
app.status.message.on("ping", message => {
    app.status.lastPinged = Date.now();
    app.client.message("pong", {}, 5000, (timeOut, message) => {
        if (!timeOut && message) {
            //Update ping
            app.status.ping = message.data.ping;
            app.status.connection.emit("ping", app.status.ping);
        }
        else {
            //Show offline
            app.status.connection.emit("close");
        }
    });
});

//Login
//only logged in and only logged out elements
const showLoginStatus = loggedIn => {
    //Update the stylesheet
    if (app.config.styles.sheet.rules[app.config.styles.TOKEN] != undefined) {
        app.config.styles.sheet.deleteRule(app.config.styles.TOKEN);
    }
    if (loggedIn) {
        app.config.styles.sheet.insertRule(".notLoggedIn { display: none;}", app.config.styles.TOKEN);
    }
    else {
        app.config.styles.sheet.insertRule(".loggedIn { display: none;}", app.config.styles.TOKEN);
    }
};
app.status.token.on("login", () => {
    showLoginStatus(true);
});
app.status.token.on("logout", () => {
    showLoginStatus(false);
});
//Initialialy we are not logged in
showLoginStatus(false);
//HTML elements
const loginElements = {
    form: document.getElementById("login"),
    loginDiv: document.getElementById("login"),
    loggingInDiv: document.getElementById("loggingIn"),
    loginFailedDiv: document.getElementById("loginFailed"),
    retryLoginButton: document.getElementById("retryLogin"),
    welcomeDiv: document.getElementById("welcome"),
    usernameDisplay: document.getElementById("username"),
    logoutButton: document.getElementById("logoutButton"),
    loggedOutDisplay: document.getElementById("loggedOut"),
    logoutSuccess: document.getElementById("logoutSuccess"),
    okButton: document.getElementById("ok"),
    expiredOkButton: document.getElementById("expired")
};
//Show
const showLoginElements = status => {
    if (status == "login") {
        loginElements.form.classList.remove("hidden");
    }
    else {
        loginElements.form.classList.add("hidden");
    }
    if (status == "loading") {
        loginElements.loggingInDiv.classList.remove("hidden");
    }
    else {
        loginElements.loggingInDiv.classList.add("hidden");
    }
    if (status == "failed") {
        loginElements.loginFailedDiv.classList.remove("hidden");
    }
    else {
        loginElements.loginFailedDiv.classList.add("hidden");
    }
    if (status == "success") {
        loginElements.welcomeDiv.classList.remove("hidden");
    }
    else {
        loginElements.welcomeDiv.classList.add("hidden");
    }
    if (status == "loggedOut") {
        loginElements.logoutSuccess.classList.remove("hidden");
    }
    else {
        loginElements.logoutSuccess.classList.add("hidden");
    }
    if (status == "expired") {
        loginElements.loggedOutDisplay.classList.remove("hidden");
    }
    else {
        loginElements.loggedOutDisplay.classList.add("hidden");
    }
};
//Once connected
app.status.connection.on("connect", () => {
    showLoginElements("login");

    //Check if there is a token in localStorage
    let token = localStorage.getItem("token");
    if (token) {
        //Show logging in
        showLoginElements("loading");

        //Check the token
        app.client.request(undefined, "/api/tokens", "GET", { id: token }, undefined, (statusCode, payload) => {
            //Check that the token is valid
            if (statusCode == 200 && payload && payload.valid) {
                //Connect the token to the websocket
                app.client.message("token", { id: payload.id });
                //Show loggedIn
                showLoginElements("success");
                app.status.token.emit("login", payload);
            }
            else {
                //Remove the token from localStorage
                localStorage.removeItem("token");
                //Show login
                showLoginElements("login");
            }
        });
    }
});
//Once logged in
app.status.token.on("login", data => {
    app.config.sessionToken = data;
    loginElements.usernameDisplay.innerHTML = data.username;

    //Renew the token
    var renewToken = function () {
        //Send the request
        app.client.request(undefined, "/api/tokens", "PUT", { id: app.config.sessionToken.id }, undefined, (statusCode, payload) => {
            //Make sure that token is valid
            if (statusCode == 200) {
                //Update the token expiry
                app.config.sessionToken.expires = payload.expires;
            }
            else {
                //Oh no, somehow the token got expired or deleted and we got logged out 
                app.status.token.emit("logout");
                //Show expired
                showLoginElements("expired");
                //Delete the token from local storage
                localStorage.removeItem("token");
            }
        });
    };

    //Keep renewing the token every minute
    var renewalLoop = setInterval(renewToken, 1000 * 60);

    //If we get loggedOut, clear the interval
    app.status.token.on("logout", () => {
        //Stop trying to renew the token
        clearInterval(renewalLoop);
    });

    //If we go offline, clear the interval, then start it again when back online
    app.status.connection.on("close", () => {
        clearInterval(renewalLoop);

        var reconnectOn = app.status.connection.on("connect", () => {
            renewalLoop = setInterval(renewToken, 1000 * 60);
            app.status.token.nevermind(cancelReconnectOn);
        });

        var cancelReconnectOn = app.status.token.on("logout", () => {
            app.status.socket.nevermind(reconnectOn);
        });
    });
});
//retry button
loginElements.retryLoginButton.onclick = () => {
    showLoginElements("login");
};
//Ok button
loginElements.okButton.onclick = () => {
    showLoginElements("login");
};
//Expired ok button
loginElements.expiredOkButton.onclick = () => {
    showLoginElements("login");
};
//Form submit
loginElements.form.onsubmit = e => {
    //Prevent the page from reloading
    e.preventDefault();

    //Show loading
    showLoginElements("loading");

    //Prepare the payload
    let payload = {
        username: loginElements.form.username.value,
        password: loginElements.form.password.value
    };

    //Send the request
    app.client.request(undefined, "/api/tokens", "POST", undefined, payload, (statusCode, payload) => {
        //Check if the status code is 201 - created
        if (statusCode == 201) {
            //Connect the token to the websocket
            app.client.message("token", { id: payload.id });
            showLoginElements("success");
            app.status.token.emit("login", payload);
            //Save the token in localStorage
            localStorage.setItem("token", payload.id);
        }
        //Check if the status code is 606 - not verified
        else if (statusCode == 606) {
            //Take them to the verify page
            window.location.replace("/verify/please");
        }
        //Otherwise, show failed
        else {
            showLoginElements("failed");
        }
    });
};
//Logout
loginElements.logoutButton.onclick = () => {
    //Send the logout request
    app.client.request(undefined, "/api/tokens", "DELETE", { id: app.config.sessionToken.id }, undefined, undefined);

    //Show logout success
    showLoginElements("loggedOut");
    app.status.token.emit("logout");

    //Remove the token from local storage
    localStorage.removeItem("token");
};

//Window Sizing
const resize = () => {
    mainDisplay.style.height = "calc(100% - " + topDisplay.offsetHeight + "px)";
};
window.onresize = resize;
resize();

//Websocket
var ws;
//Message List
var messagesToSend = [];
//Connect to websocket
const connect = () => {
    //Emit connecting message
    app.status.connection.emit("connecting");

    //Create a websocket
    if (window.location.protocol == "https:") {
        ws = new WebSocket("wss://" + window.location.host);
    }
    else {
        ws = new WebSocket("ws://" + window.location.host);
    }

    //Bind to the connect event
    ws.onopen = () => {
        //Send everything on the message list
        messagesToSend.forEach(message => {
            ws.send(JSON.parse(message));
        });
        //Emit connection
        app.status.lastPinged = Date.now();
        app.status.connection.emit("connect");
    };

    //Bind to close and error events
    ws.onclose = () => {
        app.status.connection.emit("close");
    };
    ws.onerror = () => {
        app.status.connection.emit("close");
    };
    //Bind to the message event
    ws.onmessage = stringMessage => {
        //Try to parse the message
        var message;
        try {
            message = JSON.parse(stringMessage.data);
        }
        catch (e) {
            //Warn the user
            console.warn("A websocket message was received with invalid JSON format.", stringMessage);
            message = {};
        }
        //Check if there is an error
        if (message.data.error) {
            console.error("server error");
        }
        //Try to find the path of the message
        if (message.path) {
            //Emit the message
            app.status.message.emit(message.path, message);
        }
        //Try to find the id
        if (message.id) {
            //Emit the id
            app.status.message.emit("reply:" + message.id, message);
        }
    };
};
//Connect
connect();
//Bind connect button to connect
ping.connectButton.addEventListener("click", () => {
    connect();
});

/*Main Javascript*/

//Bottom js