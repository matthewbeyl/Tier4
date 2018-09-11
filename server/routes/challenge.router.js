const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/admin-authentication');
const router = express.Router();

router.get('/fetch-active', rejectUnauthenticated, (req,res) => {
    console.log('/api/challenge/fetch-active');
    if(req.user.admin) {
        const queryText = `SELECT * FROM challenges WHERE active = true;`;
        pool.query(queryText).then((result) => {
            console.log(result.rows[0]);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error fetching active challenge status: ', error)
        })
    } else {
        res.sendStatus(403);
    }
});

router.delete('/delete-active', rejectUnauthenticated, (req,res) => {
    console.log('/api/challenge/delete-active');
    if(req.user.admin) {
        const queryText = `DELETE FROM challenges WHERE active = true;`;
        pool.query(queryText).then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error deleting active challenge status: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/user-data-current-challenge', rejectUnauthenticated, (req, res) => {
    if (req.user.admin) {
        const queryText = `SELECT 
                                users.id, 
                                users.name, 
                                user_challenge.commit_percentage, 
                                user_challenge.longest_streak as "streak", 
                                users.daily_email_reminders as "daily_reminder", 
                                users.weekly_email_reminders as "weekly_reminder" 
                            FROM users 
                            JOIN user_challenge ON users.id = user_challenge.user_id
                            JOIN challenges ON user_challenge.challenge_id = challenges.id
                            WHERE challenges.active = true;`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error fetching current: ', error)
        })
    } else {
        res.sendStatus(403);
    }
});

router.post('/newChallenge', rejectUnauthenticated, (req, res) => {
    if (req.user.admin) {
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
                res.sendStatus(201);
            }).catch((error) => {
                console.log('error creating new challenge: ', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/date', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    pool.query(`SELECT "date" FROM "challenges"
        ORDER BY "date" DESC
        LIMIT 1;`)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error - ', error);
        res.sendStatus(500)
    })
});


module.exports = router;