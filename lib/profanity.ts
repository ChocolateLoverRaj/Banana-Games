//Check for bad words

//Dependancies
import Rest = require("./rest");

export function check(text: String, callback: (err: boolean, profane?: boolean) => void): void {
    //Make a rest call
    Rest.send("https", "www.purgomalum.com", "/service/containsprofanity", "GET", { text: text }, undefined, undefined, undefined, undefined, (statusCode: number, payload) => {
        if (statusCode == 200) {
            if (payload == "true") {
                callback(false, true);
            }
            else if (payload == "false") {
                callback(false, false);
            }
            else {
                callback(true);
            }
        }
        else {
            callback(true);
            console.log(statusCode, payload);
        }
    });
};