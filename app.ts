import * as Express from 'express';
import * as BodyParser from 'body-parser';
import { renderTemplate } from './Imports/MailRenderer/TemplateRenderer';
import { sendEmail } from './Imports/MailSender/MailSender';
import * as rp from 'request-promise';

let app = Express();

app.set('port', (process.env.PORT || 3000));

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

let email: string;
let template: string;
let apiLink: string;

app.get('/api/sendEmail', (req: any, res: any) => {
    email = req.query.email;
    template = req.query.template;
    apiLink = req.query.api_link;

    if (email === undefined || template === undefined || apiLink === undefined) {
        res.status(400).send("email, template and api_link is required");
        return;
    }

    let options = {
        uri: apiLink,
        json: true,
    }

    rp(options)
        .then((response) => {
            let compiled = renderTemplate(template, response);
            sendEmail(email, "BudgetManager", compiled!);
            log();
            res.status(200).send("Email sent");
        })
        .catch(function (err) {
            res.status(400).send("something went wrong with the request to the api link");
        });

});

app.get('/', (req, resp) => {
    resp.sendFile(__dirname + "/documentation.html");
});

function log() {
    let information = "An email was sent to " + email;
    let apikey = "tuEbeO8eYn-6K2N1yBwUS-Pq3HUhBrWA";

    let options = {
        uri: "http://10.152.121.22:3000/api/log?",
        form: { information: information, api_key: apikey },
        method: "POST",
        json: true
    }
 console.log(options)
    rp(options);
}

// test json object for email test
app.get('/json', (req, res) => {
    res.status(200).json({ Balance: 25, Total: 21 });
})

app.listen(app.get('port'), () => { console.log(`listening on port ${app.get('port')} ...`) });
