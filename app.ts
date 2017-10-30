import * as Express from 'express';
import * as BodyParser from 'body-parser';
import { renderTemplate } from './Imports/MailRenderer/TemplateRenderer';
import { sendEmail } from './Imports/MailSender/MailSender';
import * as rp from 'request-promise';

let app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));


app.get('/api/sendEmail', (req: any, res: any) => {
    let email = req.query.email;
    let template = req.query.template;
    let apiLink = req.query.api_link;
    
    if (email === undefined || template === undefined || apiLink === undefined)
    {
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
            res.status(200).send("Email sent");
        })
        .catch(function (err) {
            res.status(400).send("something went wrong with the request to the api link");
        });

});

app.get('/api/documentation', (req, resp) => {
    resp.sendFile(__dirname + "/documentation.html");
});

app.get('/api/general_information', (req: any, res: any) => {
    let obj = {
        'name': 'Kenneth',
        'balance': 100000,
        'owner': 'Christian'
    }
    res.status(200).json(obj);
});

app.listen(3000, () => {console.log("listening on port 3000...")});
