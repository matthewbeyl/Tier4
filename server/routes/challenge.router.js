const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/date', (req, res) => {
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;