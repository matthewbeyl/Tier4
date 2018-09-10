const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const cron = require('node-cron')
const pool = require('../modules/pool');
const rp = require('request-promise')

let didChallengeFinishRecently = false;
let challengeDate = '01-01-2018' 
let currentDate = new Date();
currentDate = JSON.stringify(currentDate)
currentDate = currentDate.substring(1, 11)
//gets the info for the latest challenges status. if the challenge was finished, we will be checking to see when the new challenge begins.

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

            let tempMailList = [];
            response.rows.forEach(user => {
                tempMailList.push(user.email)
            }) //generate a temporary mailing list which we will trim in just a second.

            let userList = response.rows //create a userList which will be used to search the github api to see if the user has committed today.

            // let currentDate = new Date();
            // currentDate = JSON.stringify(currentDate)
            // currentDate = currentDate.substring(1, 11) //grabs a string of todays date to be used when searching the api.

            const requestPromises = [] //creates an array of requests we are going to send to the api.
            userList.forEach(user => {
                const requestOptions = {
                    uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:${currentDate}&sort=committer-date&per_page=1`,
                    headers: { "User-Agent": 'reverended', Accept: 'application/vnd.github.cloak-preview+json', Authorization: 'token  23982af669baa75e29e52bbd5a45594c65b7f7b2' },
                    method: 'GET',
                    json: true
                } 
                requestPromises.push(rp(requestOptions)); //push each request to the array
            })
            Promise.all(requestPromises) //promise and wait for each request to complete
                .then((data) => {

                    console.log(data);
                    console.log(tempMailList);
                    let mailList = []; //create our finalized mailList

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].total_count === 0) {
                            mailList.push(tempMailList[i])
                        } //if the user in the tempMailList has no commit for the day, push them to the mailList, 

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
        })
}

function weeklyEmail() { //send weekly feedback email
    console.log('getting email stuff');
    pool.query(`SELECT "github", "email" FROM "users" WHERE "weekly_email_reminders" = true;`) //grab all users who are subscribed to the weekly feedback email.
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

function expireChallenge() {
    //checks if 30 days have passed from the last challenge. if they have, then the last challenge expires.

    pool.query(`SELECT "date", "id" FROM "challenges" WHERE "active" = true`)
        .then((response) => {
            if (response.rows.length !== 0) {
                let date = JSON.stringify(response.rows[0].date);
                let date1 = new Date(date.substring(1, 11));
                let date2 = new Date(currentDate);
                let timeDiff = Math.abs(date2.getTime() - date1.getTime());
                let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                challengeDate = date.substring(1, 11) //finds how many days have passed since the challenge began
                
                if (diffDays >= 30) {  //if 30 days or more have passed, finish the challenge and set it to inactive.
                    pool.query(`UPDATE "challenges" SET "active" = false WHERE "id" =  ${response.rows[0].id};`)
                        .then((response) => {
                            
                            didChallengeFinishRecently = true; //set this flag to true so that we know a challenge just finished.
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
    
    pool.query(`SELECT "date", "id" FROM "challenges" WHERE "active" = false AND "date" > '${currentDate}' GROUP BY "date", "id";`)
        .then((response) => { //grab all inactive challenges that are to start after the currentDate
            let date = JSON.stringify(response.rows[0].date); 
            let date1 = date.substring(1, 11)
            console.log('just before date comparison');
            console.log(date1, currentDate);
            if (date1 === date2) { //this runs once a day. if the date of the currentDay is the same as the start date of the next challenge, set it to active
                console.log('date1 = date2');

                pool.query(`UPDATE "challenges" SET "active" = true WHERE "id" = ${response.rows[0].id};`)
                    .then((response) => {
                        didChallengeFinishRecently = false; //change this to false so we stop checking for the next challenge.
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
    //dailyEmail();
}); //run the daily email function once a day

cron.schedule('* * 18 * * 1 ', function () {
    //weeklyEmail();
}); //run the weekly email function once a week

cron.schedule('*/20 * * * * *', function () {
    console.log('checking the challenge') //run the expirechallenge function once a day to check if the challenge should end 
    //expireChallenge(); 
    console.log(didChallengeFinishRecently, challengeDate);
    
    if (didChallengeFinishRecently) { //if a challenge just finished, check to see if we need to activate the next challenge.
        console.log('challenge was recently finished');
        
        //activateChallenge()
    }
});

module.exports = router;