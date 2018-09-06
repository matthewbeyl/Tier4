const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rp = require('request-promise')


let userList = []
var date = new Date();
date.setMonth(date.getMonth() -1);
// date = date.toString()
date = JSON.stringify(date)
actualDate = date.substring(1, 11)
console.log(date, date.substring(1, 11));


router.get('/get-gh-data', (req, res)=>{
    console.log('getting gh data');
    const requestPromises = []
    userList.forEach(user=>{
        const requestOptions = {
            uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:>${actualDate}&sort=committer-date&per_page=100`,
            headers : {"User-Agent": user.github, Accept: 'application/vnd.github.cloak-preview+json'},
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



// router.get('/get-gh-data', (req, res) => {
//     console.log('getting gh data');
//     const requestPromises = []
//     userList.forEach(user => {
//         const requestOptions = {
//             uri: 'https://api.github.com/graphql',
//             headers: {
//                 "User-Agent": 'reverended',
//                 Authorization: 'Bearer 93646e68719f4ca35e728060af4e1e34fe45cf32'
//             },
//             method: 'POST',
//             body: {
//                 query: `
//                 query {
//                     user(login: ${user.github}){
//                         repositories(first: 1, orderBy: {field:PUSHED_AT, direction: DESC}){
//                         nodes{
//                           name
//                           pushedAt
//                           description
//                         }
//                       }
//                     }
                   
//                    }
//                 `
//               },
//             json: true
//     }
//         requestPromises.push(rp(requestOptions));
// })
// Promise.all(requestPromises)
//     .then((data) => {
//         res.send(data)
//     })
//     .catch((error) => {
//         console.log(error);

//         res.sendStatus(500)
//     })
// })



router.get('/get-user-list', (req, res) => {
    console.log('getting user list');
    const queryText = 'SELECT * FROM "users" WHERE "active" = TRUE';
    pool.query(queryText)
        .then((response) => {
            userList = response.rows
            res.send(userList)
        })
        .catch((error) => {
            console.log('error on get-user-list', error);
        })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;