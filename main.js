"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nodemailer = require("nodemailer");
var Express = require("express");
var app = Express();
var transporter = Nodemailer.createTransport("SMTP", {
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: 'elitebudgetmanager@gmail.com',
        pass: 'elitebudgetmanager123456789'
    }
});
var from = 'BudgetManager" <elitebudgetmanager@gmail.com>';
var to = "kooogt@gmail.com";
var subject = "fisk";
var text = "Hello world?";
var body = "<b>Hello world?</b>";
// setup email data with unicode symbols
var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: body // html body :)
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', Nodemailer.getTestMessageUrl(info)); måske udkommentere senere
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});
app.listen(3000, function () { return console.log('server started...'); });
