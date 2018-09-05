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
    // pool.query(`INSERT INTO "weekly_progress_form" ("applied", "learned", "built", "followed_up", "events_networking")`, [])
    
});
router.post('/', (req, res) => {
    console.log('in post for add itme');
    if(req.isAuthenticated()){
        pool.query(`INSERT INTO "item" ("description", "image_url", "person_id") VALUES ($1, $2, $3)`, [req.body.description, req.body.img_url, req.user.id])
            .then(()=> res.sendStatus(201))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            })
    }else {

    }
});
module.exports = router;