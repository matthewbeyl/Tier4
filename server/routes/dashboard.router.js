const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

/**
 * POST route template
 */

router.post('/email', (req, res) => {
    console.log('in email POST');
    console.log(req.body);
    pool.query(`INSERT INTO "users" ("email", "queued_for_next_challenge", "weekly_email_reminders", "daily_email_reminders") VALUES ($1, $2, $3, $4);`,
    [req.body.email, req.body.queued_for_next_challenge , req.body.weekly_email_reminders , req.body.daily_email_reminders ])
    .then((results) => {
        res.sendStatus(201);
    }).catch((errorFromPG) => {
        res.sendStatus(500);
    })
});

router.post('/feedback', (req, res) => {
    console.log('in Feedback POST');
    console.log(req.body);
    console.log(req.user);
    
    pool.query(`INSERT INTO "weekly_progress_form" ("user_id", "applied", "learned", "built", "followed_up", "events_networking")
    VALUES ($1, $2, $3, $4, $5, $6);`, [req.user.id, req.body.applied, req.body.learned, req.body.built, req.body.followed_up, req.body.events_networking])
    .then((results) => {
        res.sendStatus(201);
    }).catch((errorFromPG) => {
        res.sendStatus(500);
    })  
});


module.exports = router;