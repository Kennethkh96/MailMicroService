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
    mailOptions.from = 'BudgetManager <elitebudgetmanager@gmail.com>';
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.text = text;


    console.log(to);
    console.log(subject);
    console.log(text);

    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
}

let from = 'BudgetManager <elitebudgetmanager@gmail.com>';
let to: string = "";
let subject: string = "";
let text: string = "";
let body: string = "";

let mailOptions = {
    from: 'BudgetManager <elitebudgetmanager@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: body // html body :)
};

