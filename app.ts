import * as Express from 'express';
import * as BodyParser from 'body-parser';
import { renderTemplate } from './Imports/MailRenderer/TemplateRenderer';

let app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));


app.get('/api/sendEmail', (req: any, res: any) => {
    let email = req.body.email;
    let template = req.body.template;
    let compiled = renderTemplate(template);
    
    return null; // REPLACE THIS WITH REAL EMAIL SEND YES
});

app.listen(3000, () => {console.log("listening on port 3000...")});
