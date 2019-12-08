"use strict";
//Check for bad words
Object.defineProperty(exports, "__esModule", { value: true });
//Dependancies
var Rest = require("./rest");
function check(text, callback) {
    //Make a rest call
    Rest.send("https", "www.purgomalum.com", "/service/containsprofanity", "GET", { text: text }, undefined, undefined, undefined, undefined, function (statusCode, payload) {
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
}
exports.check = check;
;
//# sourceMappingURL=profanity.js.map