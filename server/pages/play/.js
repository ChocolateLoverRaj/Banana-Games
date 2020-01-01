//The stuff on top of page specific content
const stuffOnTop = document.getElementById("top");

//Our stuff
const ourStuff = document.getElementById("main");

//Games template
const gameTemplate = document.getElementById("game");
new ElementTemplate("game", gameTemplate);

//Games container
const games = document.getElementById("games"); 

//Game that the user is currently playing
var activeGame = false;
//Once online, request for games
var once = app.status.connection.on("connect", () => {
    //Nevermind
    app.status.connection.nevermind(once);
    //Request
    app.client.request(undefined, "/games/api", "GET", undefined, undefined, (statusCode, payload) => {
        if (payload) {
            //Loop through the games
            for (var i = 0; i < payload.length; i++) {
                let game = payload[i];
                let gameElement = ElementTemplates.game({ name: game.name });
                //Remove template class
                gameElement.classList.remove("template");
                //Configure iframe
                let content = gameElement.getElementsByClassName("content")[0];
                let iframe = content.getElementsByClassName("iframe")[0];
                //Set the src
                iframe.setAttribute("src", game.link);
                //Perfect height
                let perfectHeight = screen.height + "px";
                //Calculate Perfect Height
                function calculatePerfectHeight() {
                    //Do the calculations
                    //Height of stuff on top
                    let topStuffHeight = stuffOnTop.offsetHeight;
                    //Height of game header
                    let headerHeight = gameElement.getElementsByClassName("button")[0].offsetHeight;
                    //Do some subtraction
                    perfectHeight = (window.innerHeight - topStuffHeight - headerHeight) + "px";
                    //Set the height to be perfect
                    iframe.style.height = perfectHeight;
                    //Set the max height to be perfect
                    if (content.style.maxHeight) {
                        content.style.maxHeight = perfectHeight;
                    }
                };
                //Calculate the perfect height
                calculatePerfectHeight();
                //When the screen resizes, recalculate the perfect height
                window.addEventListener("resize", calculatePerfectHeight);
                //Toggle
                gameElement.getElementsByClassName("button")[0].addEventListener("click", function () {
                    if (this.classList.contains("active")) {
                        //Hide this content
                        this.classList.remove("active");
                        //No active games
                        activeGame = false;
                    }
                    else {
                        //Hide all content
                        let gameElements = document.getElementsByClassName("game");
                        for (var i = 0; i < gameElements.length; i++) {
                            gameElements[i].classList.remove("active");
                        }
                        //Show this content
                        this.classList.add("active");
                        //Set this as the active game
                        activeGame = iframe.contentWindow;
                    }
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    }
                    else {
                        //Set the max height to be perfect
                        content.style.maxHeight = perfectHeight;
                    }
                    //Calculate the perfect height
                    calculatePerfectHeight();
                });
                //Add to games
                games.appendChild(gameElement);
            };
        }
    });
});
//Handle key events
window.addEventListener("keydown", e => {
    //Make sure it is trusted
    if (e.isTrusted) {
        //Check if playing a game
        if (activeGame) {
            //Stop the scrolling
            e.preventDefault();
            //Send the message to the game
            activeGame.postMessage({
                path: "keydown",
                data: e.key
            }, "*");
        }
    }
});
//Handle key events
window.addEventListener("keyup", e => {
    //Make sure it is trusted
    if (e.isTrusted) {
        //Check if playing a game
        if (activeGame) {
            //Send the message to the game
            activeGame.postMessage({
                path: "keyup",
                data: e.key
            }, "*");
        }
    }
});