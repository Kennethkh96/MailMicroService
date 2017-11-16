import * as Express from 'express';
import * as BodyParser from 'body-parser';
import { renderTemplate } from './Imports/MailRenderer/TemplateRenderer';
import { sendEmail } from './Imports/MailSender/MailSender';
import * as rp from 'request-promise';
import * as amqp from 'amqplib/callback_api'

let app = Express();


amqp.connect('amqp://localhost', function (err, conn) {
        conn.createChannel(function (err, ch) {
            let ex = 'SendMail4';
            console.log('before assert');
            
            ch.assertExchange(ex, 'direct', { durable: false });
            console.log('before queue');
            ch.assertQueue('mail', { exclusive: false }, function (err, q) {
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                ch.bindQueue(q.queue, ex, 'mail');
                ch.consume(q.queue, function (data: any) {
                    console.log(data.content.toString());
                    
                }, { noAck: true });
            });
        });
    });
