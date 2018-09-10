// const express = require('express');
// const pool = require('../modules/pool');
// const router = express.Router();
// const rp = require('request-promise')


// let userList = []
// let challengeDate = ''
// let challengeDateID = 0;
// let challengeDateString = ''
// let calendar = []


// var date = new Date();
// tempDate = date.toString()
// date.setDate(date.getDay() - 30);
// date = JSON.stringify(date)
// actualDate = date.substring(1, 11)

// function findTotalWeekendDays(){
//     if (tempDate === 'Sun') {
        
//     }
// }


// router.get('/get-gh-data', (req, res) => {
//     console.log('getting user list');
//         pool.query(`SELECT "date", "id" FROM "challenges" ORDER BY "date" DESC;`)
//         .then((response)=>{
//             challengeDate = response.rows[0].date
//             challengeDateID = response.rows[0].id
//             challengeDateString = JSON.stringify(challengeDate)
//             challengeDateString = challengeDateString.substring(1, 11)
//             const queryText = 'SELECT * FROM "users" WHERE "active" = TRUE';
//             pool.query(queryText)
//             .then((response) => {
//                 userList = response.rows
//                 console.log('getting gh data');
//                 const requestPromises = []
//                 userList.forEach(user => {
//                     const requestOptions = {
//                         uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:>${challengeDateString}&sort=committer-date&per_page=100`,
//                         headers: { "User-Agent": 'reverended', Accept: 'application/vnd.github.cloak-preview+json' },
//                         method: 'GET',
//                         json: true
//                     }
//                     requestPromises.push(rp(requestOptions));
//                 })
//                 Promise.all(requestPromises)
//                 .then((data) => {

//                     sortData(data);

//                     res.send(data)
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 })
//             })
//         .catch((error) => {
//             console.log('error on get-user-list', error);
//         })
//     })
// })

// function sortData(tempData){
//     let date = JSON.stringify(challengeDate)
//     let currentDate = JSON.stringify(new Date())
//     let date1 = new Date(date.substring(1, 11));
//     let date2 = new Date(currentDate.substring(1, 11));
//     let timeDiff = Math.abs(date2.getTime() - date1.getTime());
//     let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

//     for (let i = 0; i < tempData.length; i++) {
//         let tempUserData = tempData[i].items;
//         let tempUserName = userList[i];
//         let tempDate = challengeDate;
//         let processedData = getStreakAndPercent(processData(tempUserData, tempDate), diffDays)

//         let data = packageData(tempUserName, processedData);
//         console.log(data);

//         //this is where everything has finished ok
//     }
// }

// function processData(userData, datestring){
//     let userCommitArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
//     for (let i = 0; i < userCommitArray.length; i++) {
//         let date = new Date(datestring)
//         date.setDate(date.getDay() + i);       
//         userData.forEach(commit=>{
//             let tempDate = JSON.stringify(date)
//             let commitDate = JSON.stringify(commit.commit.author.date)
//             if (commitDate.substring(1, 11) == tempDate.substring(1, 11)) {
//                 userCommitArray[i]= true;
//             }
//         })
//     }
//     return userCommitArray;
// }

// function packageData(username, data){
//     data.userID = username.id;
//     data.challengeID = challengeDateID;
//     return data
// }

// function getStreakAndPercent(data, diffDays){
//     let longestStreak = getStreak(data)
//     let commitPercent = getPercent(data, diffDays)
//     //console.log(longestStreak, commitPercent);
//     return {
//         longestStreak,
//         commitPercent
//     }
// }

// function getStreak(data){
//     let currentStreak = 0;
//     let maxStreak = 0;
//     let previousVal = false;
//     data.forEach(index=>{
//         if (index === true) {
//             previousVal = true;
//         }
//         if (index && previousVal) {
//             currentStreak++;
//         }
//         if (currentStreak > maxStreak) {
//             maxStreak = currentStreak;
//         }
//         if (index === false) {
//             previousVal = false;
//             currentStreak = 0;
//         }
//     })
//     return maxStreak
// }

// function getPercent(data, diffDays){
//     let newData = data.slice(0, diffDays)
//     //console.log('dataArray',newData );
//     let commitCount = 0;
//     for (let i = 0; i < newData.length; i++) {
//         if (newData[i]) {
//             commitCount++
//         }
//     }
//     commitCount = commitCount/diffDays * 100;

//     return commitCount
// }


// // router.get('/get-gh-data', (req, res) => {
// //     console.log('getting gh data');
// //     const requestPromises = []
// //     userList.forEach(user => {
// //         const requestOptions = {
// //             uri: 'https://api.github.com/graphql',
// //             headers: {
// //                 "User-Agent": 'reverended',
// //                 Authorization: 'Bearer 93646e68719f4ca35e728060af4e1e34fe45cf32'
// //             },
// //             method: 'POST',
// //             body: {
// //                 query: `
// //                 query {
// //                     user(login: ${user.github}){
// //                         repositories(first: 1, orderBy: {field:PUSHED_AT, direction: DESC}){
// //                         nodes{
// //                           name
// //                           pushedAt
// //                           description
// //                         }
// //                       }
// //                     }

// //                    }
// //                 `
// //               },
// //             json: true
// //     }
// //         requestPromises.push(rp(requestOptions));
// // })
// // Promise.all(requestPromises)
// //     .then((data) => {
// //         res.send(data)
// //     })
// //     .catch((error) => {
// //         console.log(error);

// //         res.sendStatus(500)
// //     })
// // })





// module.exports = router;