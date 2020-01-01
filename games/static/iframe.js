//Detect if in an iframe or not
if (window.self == window.top) {
    //Game can't be played by itself
    alert("Idiot, You Need Banana Games To Play The Game");
}

//App
const app = {};

//Screen
app.screen = {
    width: NaN,
    height: NaN
}

//My Custom Libraries
//Change Scenes
class Scene {
    constructor(...sceneNames) {
        //The first scene is the current scene
        this.scene = sceneNames[0];

        //Set functions
        sceneNames.forEach(name => {
            this["on" + name] = function () { };
        });

        //Set function for everything
        this.on = function (scene) { };
    }

    get currentScene() {
        return this.scene;
    };

    set currentScene(scene) {
        //Set the scene
        this.scene = scene;
        //Call the 'on' functions
        if (typeof (this["on" + scene]) == 'function') {
            this["on" + scene]();
        };
        //Call the 'on' function
        this.on(scene);
    }
}

//Maintain Ratio of Height and Width of an element
function maintainRatio(element, ratio) {
    //Calculate ratio
    function calculate() {
        //Get the ratioed height and width
        let maxWidthScale = app.screen.width / ratio.width;
        let maxHeightScale = app.screen.height / ratio.height;

        //Figure out which on is smaller, and use that one
        let scale = Math.min(maxWidthScale, maxHeightScale);

        //Scale the height and width
        let scaledWidth = ratio.width * scale;
        let scaledHeight = ratio.height * scale;

        //Calculate the padding
        let horizontalPadding = (app.screen.width - scaledWidth) / 2;
        let verticalPadding = (app.screen.height - scaledHeight) / 2;

        //Adjust the element
        element.style.width = scaledWidth + "px";
        element.style.height = scaledHeight + "px";
        element.style.paddingLeft = horizontalPadding + "px";
        element.style.paddingRight = horizontalPadding + "px";
        element.style.paddingTop = verticalPadding + "px";
        element.style.paddingBottom = verticalPadding + "px";
    };
    //calculate once
    calculate();
    //Calculate every time screen size changes
    window.addEventListener("resize", calculate);
};

//Calculate the screen size
function resize() {
    app.screen.width = window.innerWidth;
    app.screen.height = window.innerHeight;
}
//Calculate the screen size initially
resize();
//When the screen size changes, calculate the screen size
window.onresize = resize;

//Status
app.status = {
    //Whether or not user is online
    online: true,
    //Whether or not user is logged in
    loggedIn: false,
    //keysPressed
    keysPressed: {}
}

//When this loads
window.addEventListener("message", e => {
    if (e.data.path == "hello") {
        app.screen.x = e.data.data.screenX;
        app.screen.y = e.data.data.screenY;
    }
});

//Don't let arrow app.status.keys scroll
window.addEventListener("keydown", e => {
    //Stop the scrolling
    e.preventDefault();
});
//Key down DOM
window.addEventListener("keydown", e => {
    //Make sure it is trusted
    if (e.isTrusted) {
        app.status.keysPressed[e.key] = true;
    }
});
//Key down window message
window.addEventListener("message", e => {
    if (e.data.path == "keydown") {
        app.status.keysPressed[e.data.data] = true;
    }
});
//Key up DOM
window.addEventListener("keyup", e => {
    //Make sure it is trusted
    if (e.isTrusted) {
        app.status.keysPressed[e.key] = false;
    }
});
//Key up window message
window.addEventListener("message", e => {
    if (e.data.path == "keyup") {
        app.status.keysPressed[e.data.data] = false;
    }
});