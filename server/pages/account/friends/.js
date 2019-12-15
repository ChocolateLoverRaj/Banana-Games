//Friend list
let friendTemplate = document.getElementById("friend");
new ElementTemplate("friend", friendTemplate);

//Invite list
let inviteTemplate = document.getElementById("invite");
new ElementTemplate("invite", inviteTemplate);

//Request list
let requestTemplate = document.getElementById("request");
new ElementTemplate("request", requestTemplate);

//Result
let resultTemplate = document.getElementById("result");
new ElementTemplate("result", resultTemplate);

let ui = {
    tabs: document.getElementById("topHolder"),
    loading: document.getElementById("loading"),
    error: document.getElementById("error"),
    retry: document.getElementById("retry"),
    friends: {
        holder: document.getElementById("friendsHolder"),
        none: document.getElementById("noFriends"),
        grid: document.getElementById("friendsGrid"),
        tab: document.getElementById("friends")
    },
    invites: {
        holder: document.getElementById("invitesHolder"),
        none: document.getElementById("noInvites"),
        grid: document.getElementById("invitesGrid"),
        tab: document.getElementById("invites")
    },
    requests: {
        holder: document.getElementById("requestsHolder"),
        none: document.getElementById("noRequests"),
        grid: document.getElementById("requestsGrid"),
        tab: document.getElementById("requests")
    },
    results: {
        form: document.getElementById("form"),
        display: document.getElementById("results"),
        number: document.getElementById("numberOfResults"),
        data: document.getElementById("resultsGrid"),
        loading: document.getElementById("loadingResults")
    }
};

var currentProccess = {
    abort: () => { }
};
var tryingTo;

//Load Friends
let loadFriends = () => {
    //Also load results
    loadResults();
    tryingTo = () => {
        scene.scene = scene.LOADING;
        loadFriends();
    };
    ui.friends.tab.setAttribute("selected", undefined);
    //Make a request
    app.client.request(undefined, "/api/friends/list", "GET", undefined, undefined, (statusCode, payload) => {
        //200 is a good status code
        if (statusCode == 200 && payload) {
            //Load each friend
            if (payload.length > 0) {
                payload.forEach(friend => {
                    let friendElement = ElementTemplates.friend({ username: friend.username });
                    friendElement.getElementsByClassName("delete")[0].onclick = () => {
                        //Add delete attribute to friendElement
                        friendElement.setAttribute("delete", undefined);
                        //Show deletee
                        friendElement.getElementsByClassName("deletee")[0].innerHTML = friend.username;
                    };
                    friendElement.getElementsByClassName("cancel")[0].onclick = () => {
                        //Remove delete attribute to friendElement
                        friendElement.removeAttribute("delete");
                    };
                    friendElement.getElementsByClassName("sure")[0].onclick = () => {
                        //Show loading
                        scene.scene = scene.LOADING;
                        //Remove the friend
                        app.client.request(undefined, "/api/friends/list", "DELETE", { id: friend.id }, undefined, (statusCode, payload) => {
                            if (statusCode == 200) {
                                loadFriends();
                            }
                            else {
                                scene.scene = scene.ERROR;
                            }
                        });
                    };
                    //Add the friend to the grid
                    ui.friends.grid.appendChild(friendElement);
                });
            }
            else {
                //Show no friends
                ui.friends.none.classList.remove("hidden");
            }
            //Show friends
            scene.scene = scene.FRIENDS;
        }
        else {
            //Show error
            scene.scene = scene.ERROR;
        }
    });
};
//Load Invites
let loadInvites = () => {
    //Also load results
    loadResults();
    tryingTo = () => {
        scene.scene = scene.LOADING;
        loadInvites();
    };
    ui.invites.tab.setAttribute("selected", undefined);
    //Make a request
    app.client.request(undefined, "/api/friends/invites", "GET", undefined, undefined, (statusCode, payload) => {
        //200 is a good status code
        if (statusCode == 200 && payload) {
            //Load each friend
            if (payload.length > 0) {
                payload.forEach(invite => {
                    let inviteElement = ElementTemplates.invite({ username: invite.username });
                    inviteElement.getElementsByClassName("delete")[0].onclick = () => {
                        //Show loading
                        scene.scene = scene.LOADING;
                        //Cancel the invite
                        app.client.request(undefined, "/api/friends/invites", "DELETE", { id: invite.id }, undefined, (statusCode, payload) => {
                            if (statusCode == 200) {
                                loadInvites();
                            }
                            else {
                                scene.scene = scene.ERROR;
                            }
                        });
                    };
                    //Add the friend to the grid
                    ui.invites.grid.appendChild(inviteElement);
                });
            }
            else {
                //Show no friends
                ui.invites.none.classList.remove("hidden");
            }
            //Show friends
            scene.scene = scene.INVITES;
        }
        else {
            //Show error
            scene.scene = scene.ERROR;
        }
    });
};
//Load Requests
let loadRequests = () => {
    //Also load results
    loadResults();
    tryingTo = () => {
        scene.scene = scene.LOADING;
        loadRequests();
    };
    ui.requests.tab.setAttribute("selected", undefined);
    //Make a request
    app.client.request(undefined, "/api/friends/requests", "GET", undefined, undefined, (statusCode, payload) => {
        //200 is a good status code
        if (statusCode == 200 && payload) {
            //Load each friend
            if (payload.length > 0) {
                payload.forEach(request => {
                    let requestElement = ElementTemplates.request({ username: request.username });
                    requestElement.getElementsByClassName("accept")[0].onclick = () => {
                        //Show loading
                        scene.scene = scene.LOADING;
                        //Accept the request
                        app.client.request(undefined, "/api/friends/requests", "PUT", { id: request.id }, undefined, (statusCode, payload) => {
                            if (statusCode == 200) {
                                loadFriends();
                            }
                            else {
                                scene.scene = scene.ERROR;
                            }
                        });
                    };
                    requestElement.getElementsByClassName("delete")[0].onclick = () => {
                        //Show loading
                        scene.scene = scene.LOADING;
                        //Reject the request
                        app.client.request(undefined, "/api/friends/requests", "DELETE", { id: request.id }, undefined, (statusCode, payload) => {
                            if (statusCode == 200) {
                                loadRequests();
                            }
                            else {
                                scene.scene = scene.ERROR;
                            }
                        });
                    };
                    //Add the friend to the grid
                    ui.requests.grid.appendChild(requestElement);
                });
            }
            else {
                //Show no friends
                ui.requests.none.classList.remove("hidden");
            }
            //Show friends
            scene.scene = scene.REQUESTS;
        }
        else {
            //Show error
            scene.scene = scene.ERROR;
        }
    });
};

let scene = {
    LOADING: 0,
    FRIENDS: 1,
    INVITES: 2,
    REQUESTS: 3,
    ERROR: 4,
    _scene: 0,
    get scene() {
        return this._scene;
    },
    set scene(scene) {
        this._scene = scene;
        if (scene == this.LOADING || scene == this.ERROR) {
            currentProccess.abort();
            if (scene == this.LOADING) {
                ui.loading.classList.remove("hidden");
                ui.error.classList.add("hidden");
            }
            else {
                ui.error.classList.remove("hidden");
                ui.loading.classList.add("hidden");
            }
            ui.tabs.classList.add("hidden");
            ui.friends.tab.removeAttribute("selected");
            ui.invites.tab.removeAttribute("selected");
            ui.requests.tab.removeAttribute("selected");
            ui.results.form.classList.add("hidden");
            ui.friends.grid.innerHTML = "";
            ui.friends.none.classList.add("hidden");
            ui.invites.grid.innerHTML = "";
            ui.invites.none.classList.add("hidden");
            ui.requests.grid.innerHTML = "";
            ui.requests.none.classList.add("hidden");
        }
        else {
            ui.loading.classList.add("hidden");
            ui.error.classList.add("hidden");
            ui.tabs.classList.remove("hidden");
            ui.results.form.classList.remove("hidden");
        }
        if (scene == this.FRIENDS) {
            ui.friends.holder.classList.remove("hidden");
        }
        else {
            ui.friends.holder.classList.add("hidden");
        }
        if (scene == this.INVITES) {
            ui.invites.holder.classList.remove("hidden");
        }
        else {
            ui.invites.holder.classList.add("hidden");
        }
        if (scene == this.REQUESTS) {
            ui.requests.holder.classList.remove("hidden");
        }
        else {
            ui.requests.holder.classList.add("hidden");
        }
    }
};

//When logged in, change the scene
app.status.token.on("login", token => {
    scene.scene = scene.LOADING;
    loadFriends();
});
//Let the tabs control the loading
ui.friends.tab.onclick = () => {
    //Make sure the scene is different
    if (scene.scene != scene.FRIENDS) {
        scene.scene = scene.LOADING;
        loadFriends();
    }
};
ui.invites.tab.onclick = () => {
    //Make sure the scene is different
    if (scene.scene != scene.INVITES) {
        scene.scene = scene.LOADING;
        loadInvites();
    }
};
ui.requests.tab.onclick = () => {
    //Make sure the scene is different
    if (scene.scene != scene.REQUESTS) {
        scene.scene = scene.LOADING;
        loadRequests();
    }
};
//Retry
ui.retry.onclick = () => {
    scene.scene = scene.LOADING;
    tryingTo();
};

//Load results
let loadResults = () => {
    //Hide results
    ui.results.display.classList.add("hidden");
    if (ui.results.form.username.value) {
        //Show loading
        ui.results.loading.classList.remove("hidden");

        //Abort old request
        if (ui.results.request) {
            ui.results.request.abort();
        }

        //Api request
        ui.results.request = app.client.request(undefined, "/api/friends/search", "GET", { username: ui.results.form.username.value }, undefined, (statusCode, payload) => {
            if (statusCode == 200) {
                //Show number of results
                ui.results.number.innerHTML = payload.length;

                //Clear the results
                ui.results.data.innerHTML = "";

                //Loop throught the results
                payload.forEach(result => {
                    //Result element
                    let resultElement = ElementTemplates.result({ username: result.username });
                    //is that person friended or invited?
                    if (result.alreadyFriends) {
                        resultElement.setAttribute("scene", "alreadyFriends");
                    }
                    else if (result.alreadyInvited) {
                        resultElement.setAttribute("scene", "alreadyInvited");
                    }
                    //Add a friend
                    resultElement.getElementsByClassName("add")[0].onclick = () => {
                        //Show loading
                        tryingTo = () => {
                            scene.scene = scene.LOADING;
                            loadResults();
                        };
                        scene.scene = scene.LOADING;

                        //Send a request
                        app.client.request(undefined, "/api/friends/invites", "POST", { id: result.id }, undefined, (statusCode, payload) => {
                            if (statusCode == 201) {
                                //Load invites
                                loadInvites();
                            }
                            else if (statusCode == 200) {
                                //Load friends
                                loadFriends();
                            }
                            else if (statusCode != 0) {
                                //Error
                                scene.scene = scene.ERROR;
                            }
                        });
                    };
                    //add it to data
                    ui.results.data.appendChild(resultElement);
                });

                //Show results
                ui.results.display.classList.remove("hidden");

                //Hide loading
                ui.results.loading.classList.add("hidden");
            }
            else if (statusCode != 0) {
                scene.scene = scene.ERROR;
            }
        });
    }
};

//Bind to input
ui.results.form.username.oninput = loadResults;

//Don't submit form
ui.results.form.onsubmit = e => {
    e.preventDefault();
};