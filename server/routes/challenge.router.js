const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/pastChallenge', (req, res) => {
    console.log('/api/challenge/get');
    // reconsider how to handle current challenge vs past:
    const queryText = `SELECT users.first_name, users.last_name, 
                        user_challenge.commit_percentage, 
                        user_challenge.longest_streak, 
                        users.daily_email_reminders, 
                        users.weekly_email_reminders 
                        FROM users JOIN user_challenge 
                        ON users.id = user_challenge.id;`
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((err)=> {
        console.log('error fetching current ')
    })
});

// router.post('/', (req, res) => {

// });

module.exports = router;