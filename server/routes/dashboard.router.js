const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//posts users email and preferences to database
router.post('/email', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    pool.query(`UPDATE "users"
        SET "email" = $1,
            "queued_for_next_challenge" = $2,
            "weekly_email_reminders" = $3,
            "daily_email_reminders" = $4
            WHERE "id" = $5;`, [req.body.email, req.body.queued_for_next_challenge , req.body.weekly_email_reminders , req.body.daily_email_reminders, req.user.id])
    .then((results) => {
        res.sendStatus(201);
    }).catch((errorFromPG) => {
        console.log(errorFromPG);        
        res.sendStatus(500);
    })
});

//posts weekly summary form to database
router.post('/feedback', rejectUnauthenticated, (req, res) => {
    pool.query(`INSERT INTO "weekly_progress_form" ("user_id", "applied", "learned", "built", "followed_up", "events_networking")
    VALUES ($1, $2, $3, $4, $5, $6);`, [req.user.id, req.body.applied, req.body.learned, req.body.built, req.body.followed_up, req.body.events_networking])
    .then((results) => {
        res.sendStatus(201);
    }).catch((errorFromPG) => {
        res.sendStatus(500);
    })  
});

//gets user image, longest streak, and commit rate for logged in user
router.get('/stats', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "longest_streak", "commit_percentage" FROM "user_challenge"
    JOIN "challenges" ON "user_challenge"."challenge_id" = "challenges"."id"
    WHERE "user_id"=${[req.user.id]} AND "active" = true;`)
    .then((result) => {
        res.send(result.rows[0]);
    }).catch((error) => {
        res.sendStatus(500)
    })
})

module.exports = router;