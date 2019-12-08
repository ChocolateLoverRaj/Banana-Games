"use strict";
//Send Sendgrid Emails
Object.defineProperty(exports, "__esModule", { value: true });
//Dependancies
var Rest = require("./rest");
var Config = require("./config");
//Email Namespace
var Email;
(function (Email) {
    ;
    //Change String or person or to to to
    function toTo(to) {
        var newTo;
        if (typeof (to) == "string") {
            newTo = { to: [{ email: to }] };
        }
        if (typeof (to) == 'object' && "email" in to) {
            newTo = { to: [to] };
        }
        else if (typeof (to) == 'object' && "cc" in to) {
            newTo = to;
        }
        return newTo;
    }
    ;
    //Change Content or contents to contents
    function toContents(content) {
        var newContents;
        if (Array.isArray(content)) {
            newContents = content;
        }
        else {
            newContents = [content];
        }
        return newContents;
    }
    //Actual function
    function send(arg1, arg2, arg3, arg4) {
        //Identify the parameters
        var to;
        var subject;
        var content;
        var callback;
        var templateId;
        var templateData;
        //Locate to
        if (arg1) {
            to = arg1;
        }
        //Locate subject
        if (arg2 && arg3 && typeof (arg3) == 'object') {
            subject = arg2;
        }
        //Locate content
        if (arg3 && typeof (arg3) == 'object') {
            content = arg3;
        }
        //Locate callback
        if (arg3 && typeof (arg3) == 'function') {
            callback = arg3;
        }
        else if (arg4 && typeof (arg4) == 'function') {
            callback = arg4;
        }
        //Locate templateId
        if (arg2 && typeof (arg2) == "string" && arg3 && typeof (arg3) == 'function') {
            templateId = arg2;
        }
        else if (arg2 && typeof (arg2) == 'object' && arg3 && typeof (arg3) == 'function') {
            templateId = arg2["templateId"];
        }
        //Locate templateData
        if (arg2 && typeof (arg2) == 'object') {
            templateData = arg2;
        }
        //Reformat To
        var newTo;
        if (to) {
            newTo = toTo(to);
        }
        //Reformat contents
        var newContent;
        if (content) {
            newContent = toContents(content);
        }
        //Send
        function send(payload, callback) {
            console.log(payload);
            //Send to Sendgrid
            Rest.send("https", "api.sendgrid.com", "/v3/mail/send", "POST", undefined, { "Authorization": "Bearer " + Config.sendgrid.apiKey }, payload, "json", undefined, function (statusCode, payload) {
                //Callback false if successful
                if (statusCode == 202) {
                    callback(false);
                }
                else {
                    callback("Status Code Returned Was: " + statusCode);
                }
            });
        }
        //Figure out which function was called
        //Method 1
        if (newTo && subject && newContent && callback) {
            //Create payload object
            var payload = {
                "personalizations": [newTo],
                "from": Config.sendgrid.from,
                "subject": subject,
                "content": newContent,
            };
            //Send
            send(payload, callback);
        }
        //Method 2
        else if (newTo && templateData && callback) {
            //Create payload object
            var payload = {
                "personalizations": [
                    {
                        "to": newTo.to,
                        "dynamic_template_data": templateData
                    }
                ],
                "from": Config.sendgrid.from,
                "template_id": templateData.templateId,
            };
            //Add on cc and bcc
            if (newTo.cc) {
                payload["personalizations"][0]["cc"] = newTo.cc;
            }
            if (newTo.bcc) {
                payload["personalizations"][0]["bcc"] = newTo.bcc;
            }
            //Send
            send(payload, callback);
        }
        //Method 3
        else if (newTo && templateId && callback) {
            //Create payload object
            var payload = {
                "personalizations": [
                    {
                        "to": newTo.to
                    }
                ],
                "from": Config.sendgrid.from,
                "template_id": templateId,
            };
            //Add on cc and bcc
            if (newTo.cc) {
                payload["personalizations"][0]["cc"] = newTo.cc;
            }
            if (newTo.bcc) {
                payload["personalizations"][0]["bcc"] = newTo.bcc;
            }
            //Send
            send(payload, callback);
        }
        //No Proper Method
        else {
            console.warn("Error, No proper method used");
        }
    }
    Email.send = send;
    ;
})(Email || (Email = {}));
exports.Email = Email;
//# sourceMappingURL=sendgrid.js.map