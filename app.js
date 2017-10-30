"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var BodyParser = require("body-parser");
var TemplateRenderer_1 = require("./Imports/MailRenderer/TemplateRenderer");
var MailSender_1 = require("./Imports/MailSender/MailSender");
var rp = require("request-promise");
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.get('/api/sendEmail', function (req, res) {
    var email = req.query.email;
    var template = req.query.template;
    var apiLink = req.query.api_link;
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
        MailSender_1.sendEmail(email, "BudgetManager", compiled);
        res.status(200).send("Email sent");
    })
        .catch(function (err) {
        res.status(400).send("something went wrong with the request to the api link");
    });
});
app.get('/api/documentation', function (req, resp) {
    resp.sendFile(__dirname + "/documentation.html");
});
app.get('/api/general_information', function (req, res) {
    var obj = {
        'name': 'Kenneth',
        'balance': 100000,
        'owner': 'Christian'
    };
    res.status(200).json(obj);
});
app.listen(3000, function () { console.log("listening on port 3000..."); });
