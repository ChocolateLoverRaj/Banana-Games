//HTML elements
//The display
const display = {
    email: document.getElementById("email"),
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    username: document.getElementById("yourUsername"),
    everything: document.getElementById("everything"),
    loading: document.getElementById("retrieving"),
    failed: document.getElementById("failed")
};
//The form
const changeAccountForm = document.getElementById("accountForm");
//The controls
const options = {
    edit: document.getElementById("edit"),
    change: document.getElementById("change"),
    save: document.getElementById("save"),
    back: document.getElementById("back"),
    delete: document.getElementById("delete"),
    permanant: document.getElementById("permanant")
};
//The form to change password
const passwordChangeForm = document.getElementById("passwordChangeForm");

//Show data status
const showDataStatus = status => {
    if (status == "good") {
        display.everything.classList.remove("hidden");
    }
    else {
        display.everything.classList.add("hidden");
    }
    if (status == "loading") {
        display.loading.classList.remove("hidden");
    }
    else {
        display.loading.classList.add("hidden");
    }
    if (status == "bad") {
        display.failed.classList.remove("hidden");
    }
    else {
        display.failed.classList.add("hidden");
    }
};
//Data
var userData = {};
//Update display
const updateDisplay = payload => {
    showDataStatus("good");
    //Show email, name, and username
    display.email.innerHTML = payload.email;
    display.firstName.innerHTML = payload.firstName;
    display.lastName.innerHTML = payload.lastName;
    display.username.innerHTML = payload.username;
    //Update userData
    userData = payload;
};
//Try to fetch
const tryToFetch = username => {
    //Show loading
    showDataStatus("loading");
    //Send the request  
    app.client.request(undefined, "/api/users", "GET", { username: username }, undefined, (statusCode, payload) => {
        //Check if it is 200
        if (statusCode == 200 && payload) {
            updateDisplay(payload);
        }
        //Show failed
        else {
            showDataStatus("bad");
        }
    });
};

//Check the inputs
const ui = {
    popups: {
        first: {
            display: document.getElementById("popup1"),
            closeButton: document.getElementById("close1")
        },
        second: {
            display: document.getElementById("popup2"),
            closeButton: document.getElementById("close2")
        },
        third: {
            display: document.getElementById("popup3"),
            closeButton: document.getElementById("close3")
        }
    },
    firstName: {
        input: changeAccountForm.firstName,
        valid: false,
        ok: document.getElementById("firstNameOk"),
        missing: document.getElementById("noFirstName"),
        tooLong: document.getElementById("firstNameTooLong"),
        spacing: document.getElementById("firstNameSpacing"),
        bad: document.getElementById("badFirstName")
    },
    lastName: {
        input: changeAccountForm.lastName,
        valid: false,
        ok: document.getElementById("lastNameOk"),
        missing: document.getElementById("noLastName"),
        tooLong: document.getElementById("lastNameTooLong"),
        spacing: document.getElementById("lastNameSpacing"),
        bad: document.getElementById("badLastName")
    },
    username: {
        input: changeAccountForm.username,
        valid: false,
        requesting: false,
        ok: document.getElementById("usernameOk"),
        checking: document.getElementById("checkingUsername"),
        missing: document.getElementById("noUsername"),
        tooLong: document.getElementById("usernameTooLong"),
        taken: document.getElementById("usernameTaken"),
        bad: document.getElementById("badUsername"),
        error: document.getElementById("usernameError"),
        naughty: document.getElementById("naughtyUsername")
    },
    oldPassword: {
        input: passwordChangeForm.oldPassword,
        valid: false,
        requesting: false,
        ok: document.getElementById("oldPasswordOk"),
        checking: document.getElementById("oldPasswordChecking"),
        bad: document.getElementById("oldPasswordBad"),
        error: document.getElementById("oldPasswordFailed")
    },
    password: {
        input: passwordChangeForm.password,
        valid: false,
        ok: document.getElementById("passwordOk"),
        missing: document.getElementById("noPassword"),
        spacing: document.getElementById("passwordSpacing")
    },
    confirmPassword: {
        input: passwordChangeForm.confirmPassword,
        valid: false,
        match: document.getElementById("passwordsMatch"),
        noMatch: document.getElementById("passwordsDoNotMatch")
    }
}
//Check first name
const checkFirstName = () => {
    const show = message => {
        if (message == "ok") {
            ui.firstName.ok.classList.remove("hidden");
            ui.firstName.valid = true;
        }
        else {
            ui.firstName.ok.classList.add("hidden");
            ui.firstName.valid = false;
        }
        if (message == "missing") {
            ui.firstName.missing.classList.remove("hidden");
        }
        else {
            ui.firstName.missing.classList.add("hidden");
        }
        if (message == "tooLong") {
            ui.firstName.tooLong.classList.remove("hidden");
        }
        else {
            ui.firstName.tooLong.classList.add("hidden");
        }
        if (message == "spacing") {
            ui.firstName.spacing.classList.remove("hidden");
        }
        else {
            ui.firstName.spacing.classList.add("hidden");
        }
        if (message == "bad") {
            ui.firstName.bad.classList.remove("hidden");
        }
        else {
            ui.firstName.bad.classList.add("hidden");
        }
    };

    if (ui.firstName.input.value.trim() == "") {
        show("missing");
    }
    else if (ui.firstName.input.value.match(/[^a-z,0-9,\-,\_,\ ]/gi) != null) {
        show("bad");
    }
    else if (ui.firstName.input.value.trim().length > 24) {
        show("tooLong");
    }
    else if (ui.firstName.input.value != ui.firstName.input.value.trim()) {
        show("spacing");
    }
    else {
        show("ok");
    }
};
//Bind to input
ui.firstName.input.oninput = checkFirstName;
//Check last name
const checkLastName = () => {
    const show = message => {
        if (message == "ok") {
            ui.lastName.ok.classList.remove("hidden");
            ui.lastName.valid = true;
        }
        else {
            ui.lastName.ok.classList.add("hidden");
            ui.lastName.valid = false;
        }
        if (message == "missing") {
            ui.lastName.missing.classList.remove("hidden");
        }
        else {
            ui.lastName.missing.classList.add("hidden");
        }
        if (message == "tooLong") {
            ui.lastName.tooLong.classList.remove("hidden");
        }
        else {
            ui.lastName.tooLong.classList.add("hidden");
        }
        if (message == "spacing") {
            ui.lastName.spacing.classList.remove("hidden");
        }
        else {
            ui.lastName.spacing.classList.add("hidden");
        }
        if (message == "bad") {
            ui.lastName.bad.classList.remove("hidden");
        }
        else {
            ui.lastName.bad.classList.add("hidden");
        }
    };

    if (ui.lastName.input.value.trim() == "") {
        show("missing");
    }
    else if (ui.lastName.input.value.match(/[^a-z,0-9,\-,\_,\ ]/gi) != null) {
        show("bad");
    }
    else if (ui.lastName.input.value.trim().length > 24) {
        show("tooLong");
    }
    else if (ui.lastName.input.value != ui.lastName.input.value.trim()) {
        show("spacing");
    }
    else {
        show("ok");
    }
};
//Bind to input
ui.lastName.input.oninput = checkLastName;
//Check username
const checkUsername = () => {
    const show = message => {
        if (message == "ok") {
            ui.username.ok.classList.remove("hidden");
            ui.username.valid = true;
        }
        else {
            ui.username.ok.classList.add("hidden");
            ui.username.valid = false;
        }
        if (message == "checking") {
            ui.username.checking.classList.remove("hidden");
        }
        else {
            ui.username.checking.classList.add("hidden");
            if (ui.username.requesting) {
                ui.username.requesting.abort();
            }
        }
        if (message == "missing") {
            ui.username.missing.classList.remove("hidden");
        }
        else {
            ui.username.missing.classList.add("hidden");
        }
        if (message == "tooLong") {
            ui.username.tooLong.classList.remove("hidden");
        }
        else {
            ui.username.tooLong.classList.add("hidden");
        }
        if (message == "taken") {
            ui.username.taken.classList.remove("hidden");
        }
        else {
            ui.username.taken.classList.add("hidden");
        }
        if (message == "bad") {
            ui.username.bad.classList.remove("hidden");
        }
        else {
            ui.username.bad.classList.add("hidden");
        }
        if (message == "error") {
            ui.username.error.classList.remove("hidden");
        }
        else {
            ui.username.error.classList.add("hidden");
        }
        if (message == "naughty") {
            ui.username.naughty.classList.remove("hidden");
        }
        else {
            ui.username.naughty.classList.add("hidden");
        }
    };

    if (ui.username.input.value.trim() == "") {
        show("missing");
    }
    else if (ui.username.input.value.trim().length > 24) {
        show("tooLong");
    }
    else if (ui.username.input.value.match(/\W/g) !== null) {
        show("bad");
    }
    else {
        //Abort old request
        if (ui.username.requesting) {
            ui.username.requesting.abort();
        }
        //If nothing has been changed, show ok
        if (ui.username.input.value == userData.username) {
            show("ok");
        }
        else {
            //Show not valid while checking
            ui.username.valid = false;

            //Show loading
            show("checking");

            //Send the request
            ui.username.requesting = app.client.request(undefined, "/api/users/check", "GET", { username: ui.username.input.value }, undefined, (statusCode, payload) => {
                //If status code says that username is available, show that
                if (statusCode == 204) {
                    show("ok");
                }
                //If username contains bad words, show naughty
                else if (statusCode == 643) {
                    show("naughty");
                }
                //If it does exist, show taken
                else if (statusCode == 200) {
                    show("taken");
                }
                //If server error, show error
                else if (statusCode == 500) {
                    show("error");
                }
            });
        }
    }
};
//Bind to input
ui.username.input.oninput = checkUsername;
//Check edit
const checkEdit = () => {
    checkFirstName();
    checkLastName();
    checkUsername();
};
//Check edit right away
checkEdit();

//Change inputs
//Check old password
const checkOldPassword = () => {
    const show = message => {
        if (message == "ok") {
            ui.oldPassword.ok.classList.remove("hidden");
            ui.oldPassword.valid = true;
        }
        else {
            ui.oldPassword.ok.classList.add("hidden");
            ui.oldPassword.valid = false;
        }
        if (message == "loading") {
            ui.oldPassword.checking.classList.remove("hidden");
        }
        else {
            ui.oldPassword.checking.classList.add("hidden");
        }
        if (message == "bad") {
            ui.oldPassword.bad.classList.remove("hidden");
        }
        else {
            ui.oldPassword.bad.classList.add("hidden");
        }
        if (message == "error") {
            ui.oldPassword.error.classList.remove("hidden");
        }
        else {
            ui.oldPassword.error.classList.add("hidden");
        }
    };

    //Invalid while sending
    ui.oldPassword.valid = false;

    //If there is an old request, abort it
    if (ui.oldPassword.requesting) {
        ui.oldPassword.requesting.abort();
    }

    //Show checking
    show("loading");

    //Send the new request
    ui.oldPassword.requesting = app.client.request({ password: ui.oldPassword.input.value }, "/api/users/password", "GET", undefined, undefined, (statusCode, payload) => {
        //Done with request
        ui.oldPassword.requesting = false;
        //Ok
        if (statusCode == 200) {
            show("ok");
        }
        //Bad password
        else if (statusCode == 404 || statusCode == 400) {
            show("bad");
        }
        //Server error
        else {
            show("error");
        }
    });
};
//Bind to input
ui.oldPassword.input.oninput = checkOldPassword;

//Check password
const checkPassword = () => {
    const show = message => {
        if (message == "ok") {
            ui.password.ok.classList.remove("hidden");
            ui.password.valid = true;
        }
        else {
            ui.password.ok.classList.add("hidden");
            ui.password.valid = false;
        }
        if (message == "missing") {
            ui.password.missing.classList.remove("hidden");
        }
        else {
            ui.password.missing.classList.add("hidden");
        }
        if (message == "spacing") {
            ui.password.spacing.classList.remove("hidden");
        }
        else {
            ui.password.spacing.classList.add("hidden");
        }
    };

    if (ui.password.input.value.trim() == "") {
        show("missing");
    }
    else if (ui.password.input.value != ui.password.input.value.trim()) {
        show("spacing");
    }
    else {
        show("ok");
    }
};
//Bind to input
ui.password.input.oninput = checkPassword;

//Check confirm password
const checkConfirmPassword = () => {
    const show = message => {
        if (message == "match") {
            ui.confirmPassword.match.classList.remove("hidden");
            ui.confirmPassword.valid = true;
        }
        else {
            ui.confirmPassword.match.classList.add("hidden");
            ui.confirmPassword.valid = false;
        }
        if (message == "noMatch") {
            ui.confirmPassword.noMatch.classList.remove("hidden");
        }
        else {
            ui.confirmPassword.noMatch.classList.add("hidden");
        }
    };

    if (ui.password.input.value != ui.confirmPassword.input.value) {
        show("noMatch");
    }
    else {
        show("match");
    }
};
//Bind to inputs password and confirm password
ui.confirmPassword.input.oninput = checkConfirmPassword;
//We need to use addEventListener so we don't ovveride its primary function
ui.password.input.addEventListener("input", checkConfirmPassword);

//Check Change
const checkChange = () => {
    checkOldPassword();
    checkPassword();
    checkConfirmPassword();
};
//Check Change right away
checkChange();

//Scenes
const pageScene = {
    START: 0,
    EDIT: 1,
    CHANGE: 2,
    DELETE: 3,
    _scene: 0,
    get scene() {
        return this._scene;
    },
    set scene(scene) {
        //Save the scene
        this._scene = scene;

        //Hide all the buttons
        options.edit.classList.add("hidden");
        options.change.classList.add("hidden");
        options.back.classList.add("hidden");
        options.save.classList.add("hidden");
        options.delete.classList.add("hidden");
        options.permanant.classList.add("hidden");
        //Hide forms
        changeAccountForm.classList.add("hidden");
        passwordChangeForm.classList.add("hidden");
        //Show specific buttons
        if (scene == this.START) {
            //Show edit, change and delete
            options.edit.classList.remove("hidden");
            options.change.classList.remove("hidden");
            options.delete.classList.remove("hidden");
            //Show change account form
            changeAccountForm.classList.remove("hidden");
        }
        //Remove rule 2 from stylesheet
        if (app.config.styles.sheet.rules[2] != undefined) {
            app.config.styles.sheet.deleteRule(2);
        }
        if (scene == this.EDIT) {
            //Show back and save
            options.back.classList.remove("hidden");
            options.save.classList.remove("hidden");
            //Hide display class elements
            app.config.styles.sheet.insertRule(".display { display: none !important;}", 2);
            //Update value of the form elements based on userData
            changeAccountForm.emailInput.value = userData.email;
            changeAccountForm.firstName.value = userData.firstName;
            changeAccountForm.lastName.value = userData.lastName;
            changeAccountForm.username.value = userData.username;
            //Show change account form
            changeAccountForm.classList.remove("hidden");
            //Update the validators
            checkEdit();
        }
        else {
            //Hide change class elements
            app.config.styles.sheet.insertRule(".change { display: none !important;}", 2);
        }
        if (scene == this.CHANGE) {
            //Show back and save
            options.back.classList.remove("hidden");
            options.save.classList.remove("hidden");
            //Show password change form
            passwordChangeForm.classList.remove("hidden");
            //Update the validators
            checkChange();
            //Clear the inputs
            ui.oldPassword.input.value = "";
            ui.password.input.value = "";
            ui.confirmPassword.input.value = "";
        }
        if (scene == this.DELETE) {
            //Show back and premanant
            options.back.classList.remove("hidden");
            options.permanant.classList.remove("hidden");
            //Alert them if they are sure
            alert("Are you sure that you want to DELETE your Banana Games account?");
            //Show change account form
            changeAccountForm.classList.remove("hidden");
        }
    }
}
//Start with scene 0
pageScene.scene = pageScene.START;

//Change info
options.edit.onclick = () => {
    pageScene.scene = pageScene.EDIT;
};
options.change.onclick = () => {
    pageScene.scene = pageScene.CHANGE;
};
options.back.onclick = () => {
    pageScene.scene = pageScene.START;
};
options.delete.onclick = () => {
    pageScene.scene = pageScene.DELETE;
};
//Save button
options.save.onclick = () => {
    //Figure out what the scene is
    if (pageScene.scene == pageScene.EDIT) {
        //Figure out if everything is good
        if (ui.firstName.valid && ui.lastName.valid && ui.username.valid) {
            //Show sending
            options.save.innerHTML = "Saving...";

            //Create a payload
            const payload = {
                email: userData.email,
                firstName: ui.firstName.input.value,
                lastName: ui.lastName.input.value,
                username: ui.username.input.value
            };

            //Send the payload
            app.client.request(undefined, "/api/users", "PUT", undefined, payload, (statusCode, payload) => {
                //Update the display
                updateDisplay(payload);
                //Make the button say save
                options.save.innerHTML = "Save";
                //back to first scene
                pageScene.scene = pageScene.START;
                //Check if the status code is not 200
                if (statusCode != 200) {
                    ui.popups.first.display.classList.remove("hidden");
                }
            });
        }
    }
    else if (pageScene.scene == pageScene.CHANGE) {
        //Figure out if everything is good
        if (ui.oldPassword.valid && ui.password.valid && ui.confirmPassword.valid) {
            //Show sending
            options.save.innerHTML = "Saving...";

            //Create a payload
            const payload = {
                email: userData.email,
                ogPassword: ui.oldPassword.input.value,
                password: ui.password.input.value
            };

            //Send the payload
            app.client.request(undefined, "/api/users", "PUT", undefined, payload, (statusCode, payload) => {
                //Update the display
                updateDisplay(payload);
                //Make the button say save
                options.save.innerHTML = "Save";
                //back to first scene
                pageScene.scene = pageScene.START;
                //Check if the status code is not 200
                if (statusCode != 200) {
                    ui.popups.second.display.classList.remove("hidden");
                }
            });
        }
    }
};
//Delete account
options.permanant.onclick = () => {
    if (prompt("Type \"goodbye\" if you want to PERMANANTLY DELETE your Banana Games account") == "goodbye") {
        //Show deleting
        options.permanant.innerHTML = "Deleting...";

        //Send the payload
        app.client.request(undefined, "/api/users", "DELETE", { email: userData.email }, undefined, (statusCode, payload) => {
            //Update the display
            updateDisplay(payload);
            //Make the button say I'm sure
            options.save.innerHTML = "I\'m Sure";
            //back to first scene
            pageScene.scene = pageScene.START;
            //Check if the status code is not 200
            if (statusCode != 200) {
                ui.popups.third.display.classList.remove("hidden");
            }
            //If their account was deleted, relocate them to the home page
            else {
                window.location.replace("/");
            }
        });
    }
    else {
        pageScene.scene = EditScene.START;
    }
};
//Close popups
ui.popups.first.closeButton.onclick = () => {
    ui.popups.first.display.classList.add("hidden");
};
ui.popups.second.closeButton.onclick = () => {
    ui.popups.second.display.classList.add("hidden");
};
ui.popups.third.closeButton.onclick = () => {
    ui.popups.third.display.classList.add("hidden");
};
//Once logged in, retrive information about the user
app.status.token.on("login", data => {
    tryToFetch(data.username);
});
//If logged out or disconnected, scene is reset
app.status.connection.on("close", () => {
    pageScene.scene = pageScene.START;
});
app.status.token.on("logout", () => {
    pageScene.scene = pageScene.START;
});