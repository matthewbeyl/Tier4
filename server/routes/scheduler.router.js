const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const cron = require('node-cron')
const pool = require('../modules/pool');
const rp = require('request-promise')

let didChallengeFinishRecently = false;
let challengeDate = '01-01-2018'

router.get('/challenge-status', (req, res) => {
    res.send(didChallengeFinishRecently)
})

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


function dailyEmail() {
    console.log('getting email stuff');
    pool.query(`SELECT "github", "email" FROM "users" WHERE "daily_email_reminders" = true;`)
        .then((response) => {

            let tempMailList = [];
            response.rows.forEach(user => {
                tempMailList.push(user.email)
            })

            let userList = response.rows

            let currentDate = new Date();
            currentDate = JSON.stringify(currentDate)
            currentDate = currentDate.substring(1, 11)

            const requestPromises = []
            userList.forEach(user => {
                const requestOptions = {
                    uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:${currentDate}&sort=committer-date&per_page=1`,
                    headers: { "User-Agent": 'reverended', Accept: 'application/vnd.github.cloak-preview+json', Authorization: 'token  23982af669baa75e29e52bbd5a45594c65b7f7b2' },
                    method: 'GET',
                    json: true
                }
                requestPromises.push(rp(requestOptions));
            })
            Promise.all(requestPromises)
                .then((data) => {

                    console.log(data);
                    console.log(tempMailList);
                    let mailList = [];

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].total_count !== 0) {
                            mailList.push(tempMailList[i])
                        }

                    }

                    console.log(mailList);


                    //adjust email content


                    const output = `<p>daily email...... ${JSON.stringify(userList)}</p>`;

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: 'God', // sender address
                        to: mailList, // list of receivers
                        subject: 'Hi Im God', // Subject line
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
                })
        })
}

function weeklyEmail() {
    console.log('getting email stuff');
    pool.query(`SELECT "github", "email" FROM "users" WHERE "weekly_email_reminders" = true;`)
        .then((response) => {

            let mailList = [];
            response.rows.forEach(user => {
                mailList.push(user.email)
            })

            //adjust email content


            const output = `<p>weekly email...... ${JSON.stringify(mailList)}</p>`;

            // setup email data with unicode symbols
            let mailOptions = {
                from: 'God', // sender address
                to: mailList, // list of receivers
                subject: 'Hi Im God', // Subject line
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
        })
}

function expireChallenge() {
    //checks if 30 days have passed from the last challenge. if they have, then the last challenge expires.

    pool.query(`SELECT "date", "id" FROM "challenges" WHERE "active" = true`)
        .then((response) => {
            if (response.rows.length !== 0) {
                let date = JSON.stringify(response.rows[0].date);
                let currentDate = JSON.stringify(new Date());
                let date1 = new Date(date.substring(1, 11));
                let date2 = new Date(currentDate.substring(1, 11));
                let timeDiff = Math.abs(date2.getTime() - date1.getTime());
                let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                challengeDate = date.substring(1, 11)
                
                if (diffDays === 30) {
                    pool.query(`UPDATE "challenges" SET "active" = false WHERE "id" =  ${response.rows[0].id};`)
                        .then((response) => {
                            
                            didChallengeFinishRecently = true;
                            console.log('challenge finished!', didChallengeFinishRecently);
                        })
                }
                console.log('this is the challengeDate',challengeDate);
                return response.rows[0].date
            }
        })
        .catch((error)=>{
            console.log(error);
        })

}

function activateChallenge() {
    
    pool.query(`SELECT "date", "id" FROM "challenges" WHERE "active" = false AND "date" > '${challengeDate}' GROUP BY "date", "id";`)
        .then((response) => {
            let date = JSON.stringify(response.rows[0].date);
            let currentDate = JSON.stringify(new Date());
            let date1 = date.substring(1, 11)
            let date2 = currentDate.substring(1, 11)
            console.log('just before date comparison');
            console.log(date1, date2);
            if (date1 === date2) {
                console.log('date1 = date2');

                pool.query(`UPDATE "challenges" SET "active" = true WHERE "id" = ${response.rows[0].id};`)
                    .then((response) => {
                        didChallengeFinishRecently = false;
                    })
                    .catch((error)=>{
                        console.log(error);
                        
                    })
            }
        })
        .catch((error)=>{
            console.log(error);
            
        })
}


//daily email function '0 18 * * * '
cron.schedule('* 0 18 * * * ', function () {
    dailyEmail();
});

cron.schedule('* * 18 * * 1 ', function () {
    weeklyEmail();
});

cron.schedule('*/20 * * * * *', function () {
    console.log('checking the challenge')
    expireChallenge();
    console.log(didChallengeFinishRecently, challengeDate);
    
    if (didChallengeFinishRecently) {
        console.log('challenge was recently finished');
        
        activateChallenge()
    }
});

module.exports = router;