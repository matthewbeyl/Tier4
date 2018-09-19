const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/admin-authentication');
const router = express.Router();
const nodemailer = require('nodemailer')

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

router.get('/fetch-past', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const queryText = `SELECT users.name, 
                                challenges.title, 
                                user_challenge.commit_percentage, 
                                user_challenge.longest_streak from challenges
                            JOIN user_challenge ON challenges.id = user_challenge.challenge_id
                            JOIN users ON user_challenge.user_id = users.id
                            WHERE challenges.active = false;`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error fetching past challenges: ', error);
    })
});

router.delete('/delete-user-from-current-challenge/:id/:challengeId', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const queryText = `DELETE FROM user_challenge
            WHERE user_challenge.user_id = ${req.params.id} 
            AND user_challenge.challenge_id = ${req.params.challengeId};`;
    pool.query(queryText).then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error deleting user from current challenge: ', error);
        res.sendStatus(500);
    })
});

router.get('/fetch-active', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const queryText = `SELECT * FROM challenges WHERE active = true;`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error fetching active challenge status: ', error)
    })
});

router.delete('/delete-active', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const queryText = `DELETE FROM challenges WHERE active = true;`;
    pool.query(queryText).then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error deleting active challenge status: ', error);
        res.sendStatus(500);
    })
});

router.get('/user-data-current-challenge', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const queryText = `SELECT 
                                users.id, 
                                users.name, 
                                user_challenge.commit_percentage, 
                                user_challenge.longest_streak as "streak", 
                                users.daily_email_reminders as "daily_reminder", 
                                users.weekly_email_reminders as "weekly_reminder",
                                challenges.id as "challenge_id"
                            FROM users 
                            JOIN user_challenge ON users.id = user_challenge.user_id
                            JOIN challenges ON user_challenge.challenge_id = challenges.id
                            WHERE challenges.active = true;`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error fetching current: ', error)
    })
});

router.post('/newChallenge', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    let newChallenge = req.body;
    const queryText = `INSERT INTO challenges ("title", "date", "exclude_weekends", "exclude_holidays") 
        VALUES ($1, $2, $3, $4);`;
    const queryValues = [
        newChallenge.title,
        newChallenge.date,
        newChallenge.exclude_weekends,
        newChallenge.exclude_holidays
    ];
    pool.query(queryText, queryValues)
        .then(() => {
            

            pool.query(`SELECT "email" FROM "users" WHERE "queued_for_next_challenge" = true;`)
                .then((response) => {

                    //send them to the mailList array

                    //adjust email content

                    let mailList = [];
                    response.rows.forEach(user => {
                        mailList.push(user.email)
                    })


                    const output = `<p>We have a new challenge available for you to join! Head over to the Tier Four app to join and compete!</p>`;

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: 'Tier Four App', // sender address
                        to: mailList, // list of receivers
                        subject: 'New Challenge!', // Subject line
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
                })
                res.sendStatus(201);
        }).catch((error) => {
            console.log('error creating new challenge: ', error);
            res.sendStatus(500);
        })
});

router.get('/date', (req, res) => {
    pool.query(`SELECT * FROM "challenges"
    WHERE challenges.active = true
    LIMIT 1;`)
        .then((result) => {
            res.send(result.rows[0]);
        }).catch((error) => {
            console.log('Error - ', error);
            res.sendStatus(500)
        })
});


//START - Join Challenge Button
router.get('/futureChallenge', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "challenges"
        WHERE challenges.date > current_date
        ORDER BY "date" DESC
        LIMIT 1;`)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error - ', error);
            res.sendStatus(500)
        })
});

router.get('/futureChallenge/joined', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "challenges"
        JOIN user_challenge on challenges.id = user_challenge.challenge_id
        JOIN users on users.id = user_challenge.user_id
        WHERE challenges.date > current_date
        ORDER BY "date" DESC
        LIMIT 1;`)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error - ', error);
            res.sendStatus(500)
        })
});

router.post('/join', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "challenges"
        WHERE challenges.date > current_date
        ORDER BY "date" DESC
        LIMIT 1;`
    ).then(response => {
        let challenge_id = response.rows[0].id
        pool.query(`INSERT INTO user_challenge 
            (user_id, challenge_id, longest_streak, commit_percentage)
            VALUES ($1, $2, 0, 0)`, [req.user.id, challenge_id]
        ).then(response => {
            res.sendStatus(201);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })

})

// END - Join Challenge Button

module.exports = router;
