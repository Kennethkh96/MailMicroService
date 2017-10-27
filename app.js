"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var BodyParser = require("body-parser");
var TemplateRenderer_1 = require("./Imports/MailRenderer/TemplateRenderer");
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.get('/api/sendEmail', function (req, res) {
    var email = req.body.email;
    var template = req.body.template;
    var compiled = TemplateRenderer_1.renderTemplate(template);
    return null; // REPLACE THIS WITH REAL EMAIL SEND YES
});
app.listen(3000, function () { console.log("listening on port 3000..."); });
