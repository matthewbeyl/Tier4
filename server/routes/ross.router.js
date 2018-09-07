const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const cron = require('node-cron')
const twilio = require('twilio');

// Find your account sid and auth token in your Twilio account Console.
const client = new twilio('AC825029a6021477c068c79cc2e9af98a5', '65ce7c34c615670d4c55b35c66bb9898');

// Send the text message.
// client.messages.create({
//   to: '7633336393',
//   from: '5313001564',
//   body: 'Hello from Twilio!'
// });

cron.schedule('00 12 13 * * *', function(){
    //client.sendMessage()
    console.log('happy birthday ross!');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: 'prime.tierfour@gmail.com',
            pass: 'jefftylermattmaiyer'
        },
        // for handling request from local host 
        tls: { 
            rejectUnauthorized: false
        }
    });

    const mailList = [
        'tysehr37@gmail.com'
    ];

    const output = `<p>Happy Birthday Ross...... https://pastebin.com/bsWjFRyQ/p>`;

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'God', // sender address
        to: mailList, // list of receivers
        subject: 'Im watching you', // Subject line
        text: 'Happy Birthday.....', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('info rawL ', info);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        console.log('email has been sent');
    });

});

module.exports = router;