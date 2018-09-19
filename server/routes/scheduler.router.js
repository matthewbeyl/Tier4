const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const cron = require('node-cron')
const pool = require('../modules/pool');
const rp = require('request-promise')

// let didChallengeFinishRecently = false;
// let challengeDate = '01-01-2018' 
let currentDate = new Date();
currentDate = JSON.stringify(currentDate)
currentDate = currentDate.substring(1, 11)
//gets the info for the latest challenges status. if the challenge was finished, we will be checking to see when the new challenge begins.

let userList = [];

router.get('/challenge-status', (req, res) => {
    res.send(didChallengeFinishRecently)
}) //endpoint for checking if a challenge recently finished so we can congradulate those who finished the challenge.

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
}); //creates an email transporter.

//ALL THE NODECRON STUFF IS AT THE BOTTOM. THESE FUNCTIONS RUN AT SPECIFIC TIMES THROUGHOUT THE DAY. 

function dailyEmail() {
    console.log('getting email stuff');
    pool.query(`SELECT "github", "email" FROM "users" WHERE "daily_email_reminders" = true;`) //retrieve a list of users who have subscribed to the daily reminder email.
        .then((response) => {


            userList = response.rows //create a userList which will be used to search the github api to see if the user has committed today.
            console.log(userList);


            callApi(userList.shift())

        })
}

function callApi(user) {
    console.log(user);
    const requestPromises = [] //creates an array of requests we are going to send to the api.
    const requestOptions = {
        uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:${currentDate}&sort=committer-date&per_page=1`,
        headers: { "User-Agent": 'reverended', Accept: 'application/vnd.github.cloak-preview+json', Authorization: 'token  23982af669baa75e29e52bbd5a45594c65b7f7b2' },
        method: 'GET',
        json: true
    }
    requestPromises.push(rp(requestOptions)); //push each request to the array
    Promise.all(requestPromises) //promise and wait for each request to complete
        .then((data) => {

            //create our finalized mailList

            if (data[0].total_count === 0) {

                const output = `<p>daily email...... ${JSON.stringify(user)}</p>`;

                // setup email data with unicode symbols
                let mailOptions = {
                    from: 'God', // sender address
                    to: user.email, // list of receivers
                    subject: 'Hi Im God', // Subject line
                    text: 'Happy Birthday.....', // plain text body
                    html: output // html body
                }; //send email to all those on the mailList

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
            } //if the user in the tempMailList has no commit for the day, push them to the mailList, 

            if (userList.length !== 0) {
                setTimeout(() => callApi(userList.shift()), 5000)
            }
        })
}



function weeklyEmail() { //send weekly feedback email
    console.log('getting email stuff');
    pool.query(`SELECT "email" FROM "users" WHERE "weekly_email_reminders" = true;`) //grab all users who are subscribed to the weekly feedback email.
        .then((response) => {

            let mailList = [];
            response.rows.forEach(user => {
                mailList.push(user.email)
            }) //send them to the mailList array

            //adjust email content


            const output = `<p>weekly email...... ${JSON.stringify(mailList)}</p>`;

            // setup email data with unicode symbols
            let mailOptions = {
                from: 'God', // sender address
                to: mailList, // list of receivers
                subject: 'Hi Im God', // Subject line
                text: 'Happy Birthday.....', // plain text body
                html: output // html body
            }; //send email to all those on the mailList

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

function weeklyUpdates() {
    pool.query(`SELECT "users"."name", "weekly_progress_form".applied, "weekly_progress_form".learned, "weekly_progress_form".built, "weekly_progress_form".followed_up, "weekly_progress_form".events_networking  FROM "weekly_progress_form"
    JOIN "users" ON "users"."id" = "weekly_progress_form"."user_id";`)
        .then((response) => {

            //send them to the mailList array

            //adjust email content


            const output = `<p>${JSON.stringify(response.rows)}</p>`; //temporary

            // setup email data with unicode symbols
            let mailOptions = {
                from: 'Tier Four App', // sender address
                to: 'INSERT careers@primeacademy.io HERE', // list of receivers
                subject: 'Weekly Alumni Feedback', // Subject line
                text: '', // plain text body
                html: output // html body
            }; //send email to all those on the mailList

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

            pool.query(`DELETE FROM "weekly_progress_form";`)
            .then((response))
        })
}

//daily email function '0 18 * * * '
cron.schedule('0 0 18 * * * ', function () {
    dailyEmail();
}); //run the daily email function once a day

//dailyEmail();

cron.schedule('* * 18 * * Friday', function () {
    weeklyEmail();

}); //run the weekly email function once a week

cron.schedule('* * 18 * * Saturday', function () {

    weeklyUpdates();
});

module.exports = router;