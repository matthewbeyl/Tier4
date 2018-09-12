const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    pool.query(`SELECT "name", "commit_percentage", "image_url", "longest_streak" FROM "users"
    JOIN "user_challenge" ON "users"."id" = "user_challenge"."user_id"
    JOIN "challenges" ON "user_challenge"."challenge_id" = "challenges"."id"
    WHERE "challenges"."active" = true;`)
    .then((result) => {
        console.log(result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error - ', error);
        res.sendStatus(500)
    })  
});

router.post('/', (req, res) => {
});

module.exports = router;