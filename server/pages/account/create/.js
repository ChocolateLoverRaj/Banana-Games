//Html form
const form = document.getElementById("form");

//Check if email is valid
const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Html inputs and messages, and config
const ui = {
    allGood: true,
    firstName: {
        input: form.firstName,
        valid: false,
        ok: document.getElementById("firstNameOk"),
        missing: document.getElementById("noFirstName"),
        tooLong: document.getElementById("firstNameTooLong"),
        spacing: document.getElementById("firstNameSpacing"),
        bad: document.getElementById("badFirstName")
    },
    lastName: {
        input: form.lastName,
        valid: false,
        ok: document.getElementById("lastNameOk"),
        missing: document.getElementById("noLastName"),
        tooLong: document.getElementById("lastNameTooLong"),
        spacing: document.getElementById("lastNameSpacing"),
        bad: document.getElementById("badLastName")
    },
    email: {
        input: form.emailInput,
        valid: false,
        requesting: false,
        ok: document.getElementById("emailConfirmed"),
        checking: document.getElementById("checkingEmail"),
        missing: document.getElementById("noEmail"),
        tooLong: document.getElementById("emailTooLong"),
        taken: document.getElementById("emailTaken"),
        bad: document.getElementById("badEmail"),
        error: document.getElementById("emailError")
    },
    username: {
        input: form.username,
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
    password: {
        input: form.password,
        valid: false,
        ok: document.getElementById("passwordOk"),
        missing: document.getElementById("noPassword"),
        spacing: document.getElementById("passwordSpacing")
    },
    confirmPassword: {
        input: form.confirmPassword,
        valid: false,
        match: document.getElementById("passwordsMatch"),
        noMatch: document.getElementById("passwordsDoNotMatch")
    },
    tosAgreement: {
        input: form.tosAgreement,
        valid: false,
        agreed: document.getElementById("agreed"),
        notAgreed: document.getElementById("notAgreed")
    },
    result: {
        creating: document.getElementById("creatingAccount"),
        failed: document.getElementById("couldNotCreateAccount"),
        bad: document.getElementById("badInfo")
    }
};

//Hide create messages
const hideCreateMessages = () => {
    ui.result.creating.classList.add("hidden");
    ui.result.failed.classList.add("hidden");
    ui.result.bad.classList.add("hidden");
};

//Check first name
const checkFirstName = () => {
    //Hide the create messages
    hideCreateMessages();

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
    //Hide the create messages
    hideCreateMessages();

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

//Check email
const checkEmail = () => {
    //Hide the create messages
    hideCreateMessages();

    const show = message => {
        if (message == "ok") {
            ui.email.ok.classList.remove("hidden");
            ui.email.valid = true;
        }
        else {
            ui.email.ok.classList.add("hidden");
            ui.email.valid = false;
        }
        if (message == "checking") {
            ui.email.checking.classList.remove("hidden");
        }
        else {
            ui.email.checking.classList.add("hidden");
            if (ui.email.requesting) {
                ui.email.requesting.abort();
            }
        }
        if (message == "missing") {
            ui.email.missing.classList.remove("hidden");
        }
        else {
            ui.email.missing.classList.add("hidden");
        }
        if (message == "tooLong") {
            ui.email.tooLong.classList.remove("hidden");
        }
        else {
            ui.email.tooLong.classList.add("hidden");
        }
        if (message == "taken") {
            ui.email.taken.classList.remove("hidden");
        }
        else {
            ui.email.taken.classList.add("hidden");
        }
        if (message == "bad") {
            ui.email.bad.classList.remove("hidden");
        }
        else {
            ui.email.bad.classList.add("hidden");
        }
        if (message == "error") {
            ui.email.error.classList.remove("hidden");
        }
        else {
            ui.email.error.classList.add("hidden");
        }
    };

    if (ui.email.input.value.trim() == "") {
        show("missing");
    }
    else if (ui.email.input.value.trim().length > 100) {
        show("tooLong");
    }
    else if (!validateEmail(ui.email.input.value)) {
        show("bad");
    }
    else {
        //Show not valid while checking
        ui.email.valid = false;

        //Check that the email exists
        //Abort old request
        if (ui.email.requesting) {
            ui.email.requesting.abort();
        }

        //Show loading
        show("checking");

        //Send the request
        ui.email.requesting = app.client.request(undefined, "/api/users/check", "GET", { email: ui.email.input.value }, undefined, (statusCode, payload) => {
            //If status code says that email is available, show that
            if (statusCode == 204) {
                show("ok");
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
};
//Bind to input
ui.email.input.oninput = checkEmail;

//Check username
const checkUsername = () => {
    //Hide the create messages
    hideCreateMessages();

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
        //Check that the username exists
        //Abort old request
        if (ui.username.requesting) {
            ui.username.requesting.abort();
        }

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
            if (statusCode == 643) {
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
};
//Bind to input
ui.username.input.oninput = checkUsername;

//Check password
const checkPassword = () => {
    //Hide the create messages
    hideCreateMessages();

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
    //Hide the create messages
    hideCreateMessages();

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

//Check the tosAgreement
const checkTosAgreement = () => {
    //Hide the create messages
    hideCreateMessages();

    const show = didAgree => {
        if (didAgree == "yes") {
            ui.tosAgreement.agreed.classList.remove("hidden");
            ui.tosAgreement.valid = true;
        }
        else {
            ui.tosAgreement.agreed.classList.add("hidden");
            ui.tosAgreement.valid = false;
        }
        if (didAgree == "no") {
            ui.tosAgreement.notAgreed.classList.remove("hidden");
        }
        else {
            ui.tosAgreement.notAgreed.classList.add("hidden");
        }
    };

    if (ui.tosAgreement.input.checked) {
        show("yes");
    }
    else {
        show("no");
    }
};
//Bind to input
ui.tosAgreement.input.oninput = checkTosAgreement;

//Check all
const checkAll = () => {
    //Hide the create messages
    hideCreateMessages();

    ui.allGood = true;

    checkFirstName();
    checkLastName();
    checkEmail();
    checkUsername();
    checkPassword();
    checkConfirmPassword();
    checkTosAgreement();

    return (
        ui.firstName.valid &&
        ui.lastName &&
        ui.email.valid &&
        ui.username.valid &&
        ui.password.valid &&
        ui.confirmPassword.valid &&
        ui.tosAgreement.valid
    );
}
checkAll();

//Form Submit
form.onsubmit = e => {
    //Prevent default from happening
    e.preventDefault();

    //Show result
    const show = message => {
        if (message == "creating") {
            ui.result.creating.classList.remove("hidden");
        }
        else {
            ui.result.creating.classList.add("hidden");
        }
        if (message == "failed") {
            ui.result.failed.classList.remove("hidden");
        }
        else {
            ui.result.failed.classList.add("hidden");
        }
        if (message == "bad") {
            ui.result.bad.classList.remove("hidden");
        }
        else {
            ui.result.bad.classList.add("hidden");
        }
    };

    if (ui.firstName.valid &&
        ui.lastName &&
        ui.email.valid &&
        ui.username.valid &&
        ui.password.valid &&
        ui.confirmPassword.valid &&
        ui.tosAgreement.valid
    ) {
        //Disable everything function
        const disable = () => {
            ui.firstName.input.setAttribute("disabled", "disabled");
            ui.lastName.input.setAttribute("disabled", "disabled");
            ui.email.input.setAttribute("disabled", "disabled");
            ui.username.input.setAttribute("disabled", "disabled");
            ui.password.input.setAttribute("disabled", "disabled");
            ui.confirmPassword.input.setAttribute("disabled", "disabled");
            ui.tosAgreement.input.setAttribute("disabled", "disabled");
            form.submitButton.setAttribute("disabled", "disabled");
        };
        //Enable everything function
        const enable = () => {
            ui.firstName.input.removeAttribute("disabled");
            ui.lastName.input.removeAttribute("disabled");
            ui.email.input.removeAttribute("disabled");
            ui.username.input.removeAttribute("disabled");
            ui.password.input.removeAttribute("disabled");
            ui.confirmPassword.input.removeAttribute("disabled");
            ui.tosAgreement.input.removeAttribute("disabled");
            form.submitButton.removeAttribute("disabled");
        };

        //Call disable function
        disable();

        //Show user that account is being created
        show("creating");

        //Get the request ready
        const payload = {
            firstName: ui.firstName.input.value,
            lastName: ui.lastName.input.value,
            username: ui.username.input.value,
            email: ui.email.input.value,
            password: ui.password.input.value,
            tosAgreement: true
        }

        //Send the request
        app.client.request(undefined, "/api/users", "POST", undefined, payload, (statusCode, payload) => {
            //400 returned - this shouldn't happen!
            if (statusCode == 400) {
                //Enable everything
                enable();

                //Recheck stuff
                checkAll();
            }
            //201 returned - this should happen
            else if (statusCode == 201) {
                //relocate url to verify page
                window.location.replace("/verify/please");
            }
            //server error
            else {
                //Enable everything
                enable();

                //Show error
                show("failed");
            }
        });
    }
    else {
        show("bad");
    }
};