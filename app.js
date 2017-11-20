"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const BodyParser = require("body-parser");
const TemplateRenderer_1 = require("./Imports/MailRenderer/TemplateRenderer");
const MailSender_1 = require("./Imports/MailSender/MailSender");
const amqp = require("amqplib/callback_api");
let app = Express();
app.set('port', (process.env.PORT || 3000));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.get('/', (req, resp) => {
    resp.sendFile(__dirname + "/documentation.html");
});
//Recieve from Heroku master
amqp.connect('amqp://1doFhxuC:WGgk9kXy_wFIFEO0gwB_JiDuZm2-PrlO@black-ragwort-810.bigwig.lshift.net:10803/SDU53lDhKShK', function (err, conn) {
    conn.createChannel(function (err, ch) {
        let ex = 'Rapid';
        ch.assertExchange(ex, 'direct', { durable: false });
        ch.assertQueue('mail', { exclusive: false }, function (err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, ex, 'mailtag');
            ch.consume(q.queue, function (data) {
                try {
                    console.log(" before Data parsed");
                    console.log(data.content.toString());
                    console.log(data.data);
                    console.log(data.email);
                    data = JSON.parse(data.content.toString());
                    console.log("after Data parsed");
                }
                catch (e) {
                    return;
                }
                console.log(data);
                CompileAndSendEmail(data.template, data.email, data.data);
            }, { noAck: true });
        });
    });
});
//Send to logqueue on Rapid
function log(email) {
    let apikey = "tuEbeO8eYn-6K2N1yBwUS-Pq3HUhBrWA";
    let information = {
        info: "An email was sent to " + email,
        apikey: apikey
    };
    amqp.connect('amqp://1doFhxuC:WGgk9kXy_wFIFEO0gwB_JiDuZm2-PrlO@black-ragwort-810.bigwig.lshift.net:10802/SDU53lDhKShK', function (err, conn) {
        conn.createChannel(function (err, ch) {
            let ex = 'Rapid';
            let msg = JSON.stringify(information);
            ch.assertExchange(ex, 'direct', { durable: false });
            ch.publish(ex, 'logtag', new Buffer(msg));
            console.log(" [x] Sent %s: '%s'", msg);
        });
        setTimeout(function () { conn.close(); process.exit(0); }, 500);
    });
    // let apikey = "tuEbeO8eYn-6K2N1yBwUS-Pq3HUhBrWA";
    // let options = {
    //     uri: "http://10.152.121.22:3000/api/log?",
    //     form: { information: information, api_key: apikey },
    //     method: "POST",
    //     json: true
    // }
    // rp(options);
}
app.get('/api/sendEmail', (req, res) => {
    let email = req.query.email;
    let template = req.query.template;
    let apiLink = req.query.api_link;
    if (email === undefined || template === undefined || apiLink === undefined) {
        res.status(400).send("email, template and api_link is required");
        return;
    }
    CompileAndSendEmail(template, email, apiLink);
});
//Send emailconfirmation to Heroku Master
function emailConfirmation(confirmation) {
    amqp.connect('amqp://1doFhxuC:WGgk9kXy_wFIFEO0gwB_JiDuZm2-PrlO@black-ragwort-810.bigwig.lshift.net:10802/SDU53lDhKShK', function (err, conn) {
        console.log(err);
        conn.createChannel(function (err, ch) {
            var ex = 'Rapid';
            var msg = JSON.stringify(confirmation);
            ch.assertExchange(ex, 'direct', { durable: false });
            ch.publish(ex, 'mailconfirmation', new Buffer("" + msg)); //ex = den exchange vi vil publish til, mail er det tag som vi vil ramme
            console.log(" [x] Sent %s: '%s'", msg);
        });
        setTimeout(function () { conn.close(); process.exit(0); }, 500);
    });
}
function CompileAndSendEmail(template, email, data) {
    let ok = {
        status: 200,
        result: 'Mail was succesfully sent'
    };
    let fail = {
        status: 400,
        result: "Mail failed to compile"
    };
    console.log("Compiled and sent start");
    let compiled = TemplateRenderer_1.renderTemplate(template, data);
    console.log(compiled);
    if (compiled === null) {
        /* res.status(400).send("failed to compile email template because response from api was not valid or template was empty"); */
        emailConfirmation(fail);
        return false;
    }
    MailSender_1.sendEmail(email, "BudgetManager", compiled);
    emailConfirmation(ok);
    log(email);
    return true;
    /* res.status(200).send("Email sent"); */
}
// test json object for email test
app.get('/json', (req, res) => {
    res.status(200).json({ Balance: 25, Total: 21 });
});
app.listen(app.get('port'), () => { console.log(`listening on port ${app.get('port')} ...`); });
