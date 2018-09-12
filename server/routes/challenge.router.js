const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/admin-authentication');
const router = express.Router();

router.get('/pastChallenge', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
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
    pool.query(queryText,queryValues)
    .then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error creating new challenge: ', error);
        res.sendStatus(500);
    })
});

router.get('/date', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "date" FROM "challenges"
        ORDER BY "date" DESC
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