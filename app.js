"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var BodyParser = require("body-parser");
var TemplateRenderer_1 = require("./Imports/MailRenderer/TemplateRenderer");
var MailSender_1 = require("./Imports/MailSender/MailSender");
var rp = require("request-promise");
var app = Express();
app.set('port', (process.env.PORT || 3000));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var email;
var template;
var apiLink;
app.get('/api/sendEmail', function (req, res) {
    email = req.query.email;
    template = req.query.template;
    apiLink = req.query.api_link;
    if (email === undefined || template === undefined || apiLink === undefined) {
        res.status(400).send("email, template and api_link is required");
        return;
    }
    var options = {
        uri: apiLink,
        json: true,
    };
    rp(options)
        .then(function (response) {
        var compiled = TemplateRenderer_1.renderTemplate(template, response);
        console.log(compiled);
        if (compiled === null) {
            res.status(400).send("failed to compile email template because response from api was not valid or template was empty");
            return;
        }
        MailSender_1.sendEmail(email, "BudgetManager", compiled);
        log();
        res.status(200).send("Email sent");
    })
        .catch(function (err) {
        res.status(400).send("something went wrong with the request to the api link");
    });
});
app.get('/', function (req, resp) {
    resp.sendFile(__dirname + "/documentation.html");
});
function log() {
    var information = "An email was sent to " + email;
    var apikey = "tuEbeO8eYn-6K2N1yBwUS-Pq3HUhBrWA";
    var options = {
        uri: "http://10.152.121.22:3000/api/log?",
        form: { information: information, api_key: apikey },
        method: "POST",
        json: true
    };
    rp(options);
}
// test json object for email test
app.get('/json', function (req, res) {
    res.status(200).json({ Balance: 25, Total: 21 });
});
app.listen(app.get('port'), function () { console.log("listening on port " + app.get('port') + " ..."); });
