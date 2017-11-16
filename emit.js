"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = require("amqplib/callback_api");
amqp.connect('amqp://1doFhxuC:WGgk9kXy_wFIFEO0gwB_JiDuZm2-PrlO@black-ragwort-810.bigwig.lshift.net:10802/SDU53lDhKShK', function (err, conn) {
    console.log(err);
    conn.createChannel(function (err, ch) {
        var ex = 'Rapid';
        var msg = 'lasse';
        ch.assertExchange(ex, 'direct', { durable: false });
        ch.publish(ex, 'mailtag', new Buffer("" + msg)); //ex = den exchange vi vil publish til, mail er det tag som vi vil ramme
        console.log(" [x] Sent %s: '%s'", msg);
    });
    setTimeout(function () { conn.close(); process.exit(0); }, 500);
});
