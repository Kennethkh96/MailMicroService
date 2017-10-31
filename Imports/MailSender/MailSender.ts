import * as Nodemailer from 'nodemailer';

let transporter = Nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'elitebudgetmanager@gmail.com',
        pass: 'elitebudgetmanager123456789'
    }
});

export function sendEmail(to: string, subject: string, text: string) {
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.text = text;

    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('Message sent: %s', info.messageId);
        return true;
    });
}

let from = 'BudgetManager" <elitebudgetmanager@gmail.com>';
let to: string = "";
let subject: string = "";
let text: string = "";
let body: string = "";

let mailOptions = {
    from: 'BudgetManager" <elitebudgetmanager@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: body // html body :)
};
