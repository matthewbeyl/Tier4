const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in Feedback POST');
    console.log(req.body);

    // ADD USER ID TO QUERY BELOW
    
    pool.query(`INSERT INTO "weekly_progress_form" ("user_id", "applied", "learned", "built", "followed_up", "events_networking")
    VALUES ($1, $2, $3, $4, $5);`, [ req.body.applied, req.body.learned, req.body.built, req.body.followed_up, req.body.events_networking])
    .then((results) => {
        res.sendStatus(201);
    }).catch((errorFromPG) => {
        res.sendStatus(500);
    })  
});


module.exports = router;