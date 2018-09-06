const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rp = require('request-promise')


let userList = []
let challengeDate = ''

var date = new Date();
tempDate = date.toString()
date.setDate(date.getDay() - 30);
date = JSON.stringify(date)
actualDate = date.substring(1, 11)
console.log(tempDate, date.substring(1, 11));

function findTotalWeekendDays(){
    if (tempDate === 'Sun') {
        
    }
}


router.get('/get-gh-data', (req, res) => {
    console.log('getting user list');
        pool.query(`SELECT "date" FROM "challenges" ORDER BY "date" DESC;`)
        .then((response)=>{
            challengeDate = response.rows[0].date
            challengeDate = JSON.stringify(challengeDate)
            challengeDate = challengeDate.substring(1, 11)
            const queryText = 'SELECT * FROM "users" WHERE "active" = TRUE';
            pool.query(queryText)
            .then((response) => {
                userList = response.rows
                console.log('getting gh data');
                const requestPromises = []
                userList.forEach(user => {
                    const requestOptions = {
                        uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:>${challengeDate}&sort=committer-date&per_page=100`,
                        headers: { "User-Agent": 'reverended', Accept: 'application/vnd.github.cloak-preview+json' },
                        method: 'GET',
                        json: true
                    }
                    requestPromises.push(rp(requestOptions));
                })
                Promise.all(requestPromises)
                .then((data) => {
                    console.log(data);
                    res.send(data)
                })
                .catch((error) => {
                    console.log(error);
                })
            })
        .catch((error) => {
            console.log('error on get-user-list', error);
        })
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



    async function getData(){
        console.log('getting user list');
        const queryText = 'SELECT * FROM "users" WHERE "active" = TRUE';
        pool.query(queryText)
        .then((response) => {
            userList = response.rows
            console.log('getting gh data');
            const requestPromises = []
            userList.forEach(user => {
                const requestOptions = {
                    uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:>${actualDate}&sort=committer-date&per_page=100`,
                    headers: { "User-Agent": 'reverended', Accept: 'application/vnd.github.cloak-preview+json' },
                    method: 'GET',
                    json: true
                }
                requestPromises.push(rp(requestOptions));
            })
            Promise.all(requestPromises)
            .then((data) => {
                console.log(data);
                return data
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log('error on get-user-list', error);
        })
    }

module.exports = router;