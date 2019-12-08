//Send Sendgrid Emails

//Dependancies
import Rest = require("./rest");
import Config = require("./config");


//Email Namespace
namespace Email {
    //Recipient Interface
    export interface Person {
        email: String;
        name?: String;
    };

    //To Interface
    export interface To {
        to: Array<Person>;
        cc?: Array<Person>;
        bcc?: Array<Person>;
    }

    //Template Data interface
    export interface TemplateData {
        templateId: String;
    }

    //Callback For Send
    export interface Callback { (err: String | false): void }

    //Content Interface
    export interface Content {
        type: "text/plain" | "text/html";
        value: String;
    }

    export type Contents = [{
            type: "text/plain";
            value: String;
        }, {
            type: "text/html";
            value: String;
        }] | [{
            type: "text/html";
            value: String;
        }, {
        type: "text/plain";
            value: String;
        }] | [Content];

    //Change String or person or to to to
    function toTo(to: String | Person | To): To {
        let newTo: To;

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
    };

    //Change Content or contents to contents
    function toContents(content: Content | Contents): Contents {
        let newContents: Contents;

        if (Array.isArray(content)) {
            newContents = content;
        }
        else {
            newContents = [content];
        }

        return newContents;
    }

    //Method 1: User email, subject, and content
    export function send(to: String | Person | To, subject: String, content: Content | Contents, callback: Callback): void;

    //Method 2: User email, templateId, and templateData
    export function send(to: String | Person | To, templateData: TemplateData, callback: Callback): void;

    //Method 3: User email and templateId
    export function send(to: String | Person | To, templateId: String, callback: Callback): void;

    //Actual function
    export function send(arg1?, arg2?, arg3?, arg4?): void {
        //Identify the parameters
        let to: String | Person | To;
        let subject: String;
        let content: Content | Contents;
        let callback: Callback;
        let templateId: String;
        let templateData: TemplateData;

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
        let newTo: To;
        if (to) {
            newTo = toTo(to);
        }

        //Reformat contents
        let newContent: Contents;
        if (content) {
            newContent = toContents(content);
        }

        //Send
        function send(payload: Object, callback: Callback): void {
            console.log(payload);

            //Send to Sendgrid
            Rest.send("https", "api.sendgrid.com", "/v3/mail/send", "POST", undefined, { "Authorization": "Bearer " +    Config.sendgrid.apiKey }, payload, "json", undefined, (statusCode, payload) => {
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
            let payload: Object = {
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
            let payload: Object = {
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
            let payload: Object = {
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
    };
}

//Export the module
export {
    Email
};