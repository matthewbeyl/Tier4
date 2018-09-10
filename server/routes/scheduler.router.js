const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const cron = require('node-cron')
const pool = require('../modules/pool');
const rp = require('request-promise')

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


//daily email function '0 18 * * * '
// cron.schedule('*/20 * * * * * ', function () {
//     console.log('getting email stuff');
//     pool.query(`SELECT "github", "email" FROM "users" WHERE "daily_email_reminders" = true;`)
//         .then((response) => {

//             let mailList = [];
//             response.rows.forEach(user=>{
//                 mailList.push(user.email)
//             })

//             let userList = response.rows

//             let currentDate = new Date();
//             currentDate = JSON.stringify(currentDate)
//             currentDate = currentDate.substring(1, 11)

//             const requestPromises = []
//             userList.forEach(user => {
//                 const requestOptions = {
//                     uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:${currentDate}&sort=committer-date&per_page=100`,
//                     headers: { "User-Agent": 'KingGodGodGodKing', Accept: 'application/vnd.github.cloak-preview+json', Authorization: 'token  559904b34effa3e34f4990c5132fa5e852bcd0f3'},
//                     method: 'GET',
//                     json: true
//                 }
//                 requestPromises.push(rp(requestOptions));
//             })
//             Promise.all(requestPromises)
//             .then((data)=>{

//                 console.log(data);
//                 console.log(mailList);
                






//                 // console.log(mailList);

//                 // const output = `<p>Happy Birthday Ross...... ${userList}</p>`;
    
//                 // // setup email data with unicode symbols
//                 // let mailOptions = {
//                 //     from: 'God', // sender address
//                 //     to: mailList, // list of receivers
//                 //     subject: 'Hi Im God', // Subject line
//                 //     text: 'Happy Birthday.....', // plain text body
//                 //     html: output // html body
//                 // };
    
//                 // // send mail with defined transport object
//                 // transporter.sendMail(mailOptions, (error, info) => {
//                 //     if (error) {
//                 //         return console.log(error);
//                 //     }
//                 //     console.log('Message sent: %s', info.messageId);
//                 //     console.log('info rawL ', info);
//                 //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//                 //     console.log('email has been sent');
//                 // });
//             })

//         })

// });

module.exports = router;