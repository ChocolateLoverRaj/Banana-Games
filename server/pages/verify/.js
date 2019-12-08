//Get the code from the query
var query = window.location.search;

//Failed
const failed = () => {
    window.location.replace("/verify/failed");
};

//Make sure that that the query starts with "?"
if (query.startsWith("?")) {
    query = query.replace("?", "");

    //Get the code 
    query = query.split("&");
    if (query.length >= 2) {
        //Check for email
        var email = query[0].split("=");
        if (email.length == 2) {
            if (email[0] == "email") {
                email = email[1];

                //Check for code
                var code = query[1].split("=");
                if (code.length == 2) {
                    if (code[0] == "code") {
                        code = code[1];

                        //Attempt to verify the account
                        app.client.request(undefined, "/api/users/verify", "POST", undefined, { email: email, code: code }, (statusCode, payload) => {
                            if (statusCode == 200) {
                                window.location.replace("/verify/success");
                            }
                            else {
                                failed();
                            }
                        });
                    }
                    else {
                        failed();
                    }
                }
            }
            else {
                failed();
            }
        }
        else {
            failed();
        }
    }
    else {
        failed();
    }
}
else {
    failed();
}