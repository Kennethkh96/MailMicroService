import * as Express from 'express';
import * as BodyParser from 'body-parser';
import { renderTemplate } from './Imports/MailRenderer/TemplateRenderer';
import { sendEmail } from './Imports/MailSender/MailSender';
import * as rp from 'request-promise';
import * as amqp from 'amqplib/callback_api'

let app = Express();

app.set('port', (process.env.PORT || 3000));

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


app.get('/', (req, resp) => {
    resp.sendFile(__dirname + "/documentation.html");
});
amqp.connect('amqp://1doFhxuC:WGgk9kXy_wFIFEO0gwB_JiDuZm2-PrlO@black-ragwort-810.bigwig.lshift.net:10803/SDU53lDhKShK', function (err, conn) {
    conn.createChannel(function (err, ch) {
        let ex = 'Rapid';

        ch.assertExchange(ex, 'direct', { durable: false });
        ch.assertQueue('mail', { exclusive: false }, function (err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, ex, 'mailtag');
            ch.consume(q.queue, function (data: any) {
                try {
                                    
                    data = JSON.parse(data);         
                }
                catch (e) {
                    return;
                }             
                CompileAndSendEmail(data.template, data.email, data.apiLink);

            }, { noAck: true });
        });
    });
});

function log() {
    let apikey = "tuEbeO8eYn-6K2N1yBwUS-Pq3HUhBrWA";
    let information = {
        info: "An email was sent to ",
        apikey: apikey
    }

    amqp.connect('amqp://1doFhxuC:WGgk9kXy_wFIFEO0gwB_JiDuZm2-PrlO@black-ragwort-810.bigwig.lshift.net:10802/SDU53lDhKShK', function (err, conn) {
        conn.createChannel(function (err, ch) {
            let ex = 'Rapid';
            let msg = JSON.stringify(information);

            ch.assertExchange(ex, 'direct', { durable: true });
            ch.publish(ex, '', new Buffer(msg));
            console.log(" [x] Sent %s: '%s'", msg);
        });

        setTimeout(function () { conn.close(); process.exit(0) }, 500);
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
app.get('/api/sendEmail', (req: any, res: any) => {
    let email = req.query.email;
    let template = req.query.template;
    let apiLink = req.query.api_link;

    if (email === undefined || template === undefined || apiLink === undefined) {
        res.status(400).send("email, template and api_link is required");
        return;
    }
    CompileAndSendEmail(template, email, apiLink);
});
function emailConfirmation(confirmation: string){
    amqp.connect('amqp://1doFhxuC:WGgk9kXy_wFIFEO0gwB_JiDuZm2-PrlO@black-ragwort-810.bigwig.lshift.net:10802/SDU53lDhKShK', function(err, conn) {
        console.log(err);
        conn.createChannel(function(err, ch) {
          var ex = 'Rapid';  
          var msg = confirmation;
      
          ch.assertExchange(ex, 'direct', {durable: false});
          ch.publish(ex, 'mailconfirmation', new Buffer("" + msg)); //ex = den exchange vi vil publish til, mail er det tag som vi vil ramme
                console.log(" [x] Sent %s: '%s'", msg);
        });
      
        setTimeout(function() { conn.close(); process.exit(0) }, 500);
      });
}
function CompileAndSendEmail(template: string, email: string, apiLink: string) {
    let ok = 'Mail was succesfully sent'
    let fail = 'Failed to compile email'
    let wrong = 'Something went went wrong with the request'
    let options = {
        uri: apiLink,
        json: true,
    }
    rp(options)
    .then((response) => {
        let compiled = renderTemplate(template, response);
        console.log(compiled);
        if (compiled === null) {
            /* res.status(400).send("failed to compile email template because response from api was not valid or template was empty"); */
            emailConfirmation(fail)
            return false;
        }
        sendEmail(email, "BudgetManager", compiled!);
        emailConfirmation(ok)
        log();
        return true;
        /* res.status(200).send("Email sent"); */
    })
    .catch(function (err) {
       /*  res.status(400).send("something went wrong with the request to the api link"); */
       emailConfirmation(wrong)
    });

    return false;
}

// test json object for email test
app.get('/json', (req, res) => {
    res.status(200).json({ Balance: 25, Total: 21 });
})

app.listen(app.get('port'), () => { console.log(`listening on port ${app.get('port')} ...`) });
