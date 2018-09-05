const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rp = require('request-promise')


let userList = []

router.get('/get-gh-data', (req, res)=>{
    console.log('getting gh data');
    const requestPromises = []
    userList.forEach(user=>{
        const requestOptions = {
            uri: `https://api.github.com/users/${user.github}/events`,
            headers : {"User-Agent": 'ReverendEd'},
            method: 'GET',
            json: true
        }
        requestPromises.push(rp(requestOptions));      
    })
    Promise.all(requestPromises)
    .then((data)=>{
        res.send(data)
    })
    .catch((error)=>{
        res.sendStatus(500)
    })
})

router.get('/get-user-list', (req, res)=>{
    console.log('getting user list');
    const queryText = 'SELECT * FROM "users" WHERE "active" = TRUE';
    pool.query(queryText)
    .then((response)=>{
        userList = response.rows
        res.send(userList)
    })
    .catch((error)=>{
        console.log('error on get-user-list',error);
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;