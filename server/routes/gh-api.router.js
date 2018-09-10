const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rp = require('request-promise')
const cron = require('node-cron');
// const moment = require('moment')


let userList = []
let challengeDate = ''
let challengeID = 0;
let challengeDateString = ''



let date = new Date();
date = JSON.stringify(date)
todaysDate = date.substring(1, 11)

cron.schedule('*/20 * * * * *', function () {
    console.log('running once every 20 seconds');
    getData();
});


let theData;



router.get('/get-data', (req, res) => {
    res.send(theData)
})


function getData() {
    console.log('getting user list');
    pool.query(`SELECT "date", "id" FROM "challenges" WHERE "active" = 'true';`)
        .then((response) => {
            challengeDate = response.rows[0].date
            challengeID = response.rows[0].id
            challengeDateString = JSON.stringify(challengeDate)
            challengeDateString = challengeDateString.substring(1, 11)
            pool.query(`SELECT "github", "user_id", "calendar" FROM "users"
                JOIN "user_challenge" ON "users"."id" = "user_challenge"."user_id"
                WHERE "user_challenge"."challenge_id" = $1;`, [challengeID])
                .then((response) => {
                    userList = response.rows
                    console.log('getting gh data');
                    const requestPromises = []
                    userList.forEach(user => {
                        const requestOptions = {
                            uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:${todaysDate}&sort=committer-date&per_page=100`,
                            headers: { "User-Agent": 'reverended', Accept: 'application/vnd.github.cloak-preview+json', Authorization: 'token 23982af669baa75e29e52bbd5a45594c65b7f7b2' },
                            method: 'GET',
                            json: true
                        }
                        requestPromises.push(rp(requestOptions));
                    })
                    Promise.all(requestPromises)
                        .then((data) => {
                            theData = data;
                            sortAndSendData(data);

                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
                .catch((error) => {
                    console.log('error on get-user-list', error);
                })
        })
}


async function sortAndSendData(tempData) {
    let date = JSON.stringify(challengeDate)
    let currentDate = JSON.stringify(new Date())
    let date1 = new Date(date.substring(1, 11));
    let date2 = new Date(currentDate.substring(1, 11));
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));




    for (let i = 0; i < tempData.length; i++) {
        // console.log('this is tempData', tempData);

        let tempUserData = tempData[i].items;
        let tempUserName = userList[i];
        let tempDate = challengeDate;

        let partiallyProcessedData = await processData(tempUserData, diffDays, tempUserName)
        console.log(partiallyProcessedData);
        let processedData = getStreakAndPercent(partiallyProcessedData, diffDays)

        let data = packageData(tempUserName, processedData);
        //console.log(data);

        //this is where everything has finished ok

        pool.query(`UPDATE "user_challenge" SET "longest_streak" = $1, "commit_percentage" = $2, "calendar" = $3 WHERE "user_id" = $4`,
            [data.longestStreak, data.commitPercent, partiallyProcessedData, data.userID])
            .then((response) => {
                //console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }



}

function processData(userData, diffDays, username) {
    //create function to create userCommitArray with different values for weekends and stuff.
            let userCommitArray = username.calendar
            //let userCommitArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
            console.log(diffDays, userCommitArray);
            if (userData.length !== 0) {
                userCommitArray[diffDays] = true;
            }
            return userCommitArray;
            // for (let i = 0; i < userCommitArray.length; i++) {
            //     let date = new Date(datestring)
            //     //console.log(date);

            //     date.setDate(date.getDate() + i);
            //     //console.log(date);
            //     userData.forEach(commit => {
            //         let tempDate = JSON.stringify(date)
            //         let commitDate = JSON.stringify(commit.commit.author.date)
            //         if (commitDate.substring(1, 11) === tempDate.substring(1, 11)) {
            //             userCommitArray[i] = true;
            //         }
            //     })
            // }
            //console.log(userCommitArray);
}

function packageData(username, data) {

    data.userID = username.user_id;
    data.challengeID = challengeID;
    return data
}

function getStreakAndPercent(data, diffDays) {
    let longestStreak = getStreak(data)
    let commitPercent = Math.round(getPercent(data, diffDays))
    //console.log(longestStreak, commitPercent);
    return {
        longestStreak,
        commitPercent
    }
}

function getStreak(data) {
    let currentStreak = 0;
    let maxStreak = 0;
    let previousVal = false;
    data.forEach(index => {
        if (index === true) {
            previousVal = true;
        }
        if (index && previousVal) {
            currentStreak++;
        }
        if (currentStreak > maxStreak) {
            maxStreak = currentStreak;
        }
        if (index === false) {
            previousVal = false;
            currentStreak = 0;
        }
    })
    return maxStreak
}

function getPercent(data, diffDays) {
    let newData = data.slice(0, diffDays)
    //console.log('dataArray',newData );
    let commitCount = 0;
    for (let i = 0; i < newData.length; i++) {
        if (newData[i]) {
            commitCount++
        }
    }
    commitCount = commitCount / diffDays * 100;

    return commitCount
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