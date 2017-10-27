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
function sendEmail(to, subjects, text) {
    return '';
}
exports.sendEmail = sendEmail;
var from = 'BudgetManager" <elitebudgetmanager@gmail.com>';
var to = "kooogt@gmail.com";
var subjects = "fisk";
var text = "Hello world?";
var body = "<b>Hello world?</b>";
// setup email data with unicode symbols
/*
let mailOptions = {
    from: from, // sender address
    to: to, // list of receivers
    subject: subjects, // Subject line
    text: text, // plain text body
    html: body // html body :)
};
 */
/* transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', Nodemailer.getTestMessageUrl(info)); måske udkommentere senere

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}); */
