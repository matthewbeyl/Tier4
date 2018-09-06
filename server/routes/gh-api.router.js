const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rp = require('request-promise')


let userList = []
let challengeDate = ''
let challengeDateString = ''
let calendar = []


var date = new Date();
tempDate = date.toString()
date.setDate(date.getDay() - 30);
date = JSON.stringify(date)
actualDate = date.substring(1, 11)
console.log(tempDate, date);

function findTotalWeekendDays(){
    if (tempDate === 'Sun') {
        
    }
}


router.get('/get-gh-data', (req, res) => {
    console.log('getting user list');
        pool.query(`SELECT "date" FROM "challenges" ORDER BY "date" DESC;`)
        .then((response)=>{
            challengeDate = response.rows[0].date
            challengeDateString = JSON.stringify(challengeDate)
            challengeDateString = challengeDateString.substring(1, 11)
            const queryText = 'SELECT * FROM "users" WHERE "active" = TRUE';
            pool.query(queryText)
            .then((response) => {
                userList = response.rows
                console.log('getting gh data');
                const requestPromises = []
                userList.forEach(user => {
                    const requestOptions = {
                        uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:>${challengeDateString}&sort=committer-date&per_page=100`,
                        headers: { "User-Agent": 'reverended', Accept: 'application/vnd.github.cloak-preview+json' },
                        method: 'GET',
                        json: true
                    }
                    requestPromises.push(rp(requestOptions));
                })
                Promise.all(requestPromises)
                .then((data) => {
                    console.log(data);

                    sortData(data);

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

function sortData(tempData){
    console.log(tempData);
    for (let i = 0; i < tempData.length; i++) {
        let tempUserData = tempData[i].items;
        let tempUserName = userList[i];
        let tempDate = challengeDate;
        let processedData = processData(tempUserData, tempDate)
        console.log(processedData);
        
        //packageData(tempUserName, processedData);
        
    }
}

function processData(userData, datestring){
    let userCommitArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    for (let i = 0; i < 30; i++) {
        let date = new Date(datestring)
        date.setDate(date.getDay() + i);
        userData.forEach(commit=>{
            let tempDate = JSON.stringify(date)
            let commitDate = JSON.stringify(commit.commit.author.date)
            if (commitDate.substring(1, 11) == tempDate.substring(1, 11)) {
                console.log(commitDate.substring(1, 11), tempDate.substring(1, 11));
                userCommitArray[i]={
                    date: commitDate,
                    commit: true
                }
            }
            else{
                userCommitArray[i]={
                    date: commitDate,
                    commit: false
                }
            }
        })
    }
    return userCommitArray;
}

function packageData(){

}


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





module.exports = router;