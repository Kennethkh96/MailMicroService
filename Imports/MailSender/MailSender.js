"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nodemailer = require("nodemailer");
var transporter = Nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'elitebudgetmanager@gmail.com',
        pass: 'elitebudgetmanager123456789'
    }
});
function sendEmail(to, subject, text) {
    mailOptions.from = 'BudgetManager <elitebudgetmanager@gmail.com>';
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.text = text;
    console.log(to);
    console.log(subject);
    console.log(text);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}
exports.sendEmail = sendEmail;
var from = 'BudgetManager <elitebudgetmanager@gmail.com>';
var to = "";
var subject = "";
var text = "";
var body = "";
var mailOptions = {
    from: 'BudgetManager <elitebudgetmanager@gmail.com>',
    to: to,
    subject: subject,
    text: text,
    html: body // html body :)
};
