const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rp = require('request-promise')

const cron = require('node-cron');




let listOfUsers = []
let challengeDate = '01-01-2018'
let challengeID = 0;
let challengeDateString = '01-01-2018'
//define global variables that will be used within multiple functions.
let theData;
//test variable so that you can retrieve api data when you click the button in testComponent.js

let didChallengeFinishRecently = false;
// let currentDate = new Date();
// currentDate = JSON.stringify(currentDate)
// currentDate = currentDate.substring(1, 11)




let date = new Date();
date = JSON.stringify(date)
todaysDate = date.substring(1, 11)
//calculate todays date so that we only get todays commits in getData()

cron.schedule('0 0 0 * * *', function () {
    console.log('running once every 10 min');
    getData();
});
//run getData() once every 20 seconds, will be changed to once a day at midnight.
//getData();



function getData() {
    console.log('getting user list');
    pool.query(`SELECT "date", "id" FROM "challenges" WHERE "active" = 'true';`)
        .then((response) => { //retrieve the start date and id of the current active challenge, there should only be one.
            if (response.rows.length !== 0) { //only run the api calls if there is a current active challenge.
                challengeDate = response.rows[0].date //grab the start date of the current active challenge
                challengeID = response.rows[0].id //grabs the id of the current active challenge
                challengeDateString = JSON.stringify(challengeDate)
                challengeDateString = challengeDateString.substring(1, 11)

                let date1 = new Date(challengeDateString); //fix
                let date2 = new Date(todaysDate);
                let timeDiff = Math.abs(date2.getTime() - date1.getTime());
                let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if (diffDays >= 30) {
                    pool.query(`UPDATE "challenges" SET "active" = false WHERE "id" =  ${challengeID};`)
                        .then((response) => {

                            didChallengeFinishRecently = true; //set this flag to true so that we know a challenge just finished.
                            console.log('challenge finished!', didChallengeFinishRecently);
                        })
                        .catch((error) => {
                            console.log('could not deactivate challenge', error);
                        })
                }
                pool.query(`SELECT "github", "user_id", "calendar" FROM "users"
                JOIN "user_challenge" ON "users"."id" = "user_challenge"."user_id"
                WHERE "user_challenge"."challenge_id" = $1;`, [challengeID]) //retrieves the github, user_id, and calendar for users enrolled in the current challenge, using the challenge id just retrieved.
                    .then((response) => {
                        listOfUsers = response.rows
                        callApi(listOfUsers.shift())
                    })
                    .catch((error) => {
                        console.log('error on get-user-list', error);
                    })
            }
            else if (response.rows.length === 0) {
                activateChallenge()
            }
        })
}

function callApi(user) {
    const requestPromises = [] //create an array to store all the requests we will send to the github api
     //loop through the userlist we just got from postgres and generate an api call using each users information.
        const requestOptions = {
            uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:${todaysDate}&sort=committer-date&per_page=1`,
            headers: { "User-Agent": user.github, Accept: 'application/vnd.github.cloak-preview+json', Authorization: 'token 23982af669baa75e29e52bbd5a45594c65b7f7b2' },
            method: 'GET',
            json: true
        }
        requestPromises.push(rp(requestOptions)); //create a promise for each api request
    Promise.all(requestPromises)
    .then((data) => {
        console.log(user.github, data);
        sortAndSendData(data, user)
        if (listOfUsers.length !== 0) {
            setTimeout(()=>callApi(listOfUsers.shift()), 2000)
        }
    })
}

async function sortAndSendData(tempData, user) { //tempData is an array of the data(sorted by user) that we got from the api. its indexes correspond to the userList array. this is important.
    console.log('sorting and sending this users data');
    let date = JSON.stringify(challengeDate)
    let currentDate = JSON.stringify(new Date())
    let date1 = new Date(date.substring(1, 11));
    let date2 = new Date(currentDate.substring(1, 11));
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); //format and compare todays date to the challenge start date. grabs diffDays to get commit %

    //for (let i = 0; i < tempData.length; i++) { //loop through tempdata and store a specific users data into these temporary variables.
    let tempUserData = tempData[0].total_count; //list of the commits a user made, should only have 1 item.
    let tempUserName = user; //grabs user info of the corresponding user.
    let tempDate = challengeDate; //i dont think this is ever used, will remove one day......

    let calendar = await processData(tempUserData, diffDays, tempUserName) //updates and bundles together the users calendar

    let processedData = getStreakAndPercent(calendar, diffDays) //calculate the streak and commit % using the calendar we just updated

    let data = packageData(tempUserName, processedData); //package all the data we just generated into a single object for simplicity

    setActiveUser(calendar, tempUserName, diffDays)
    //this is where everything has finished ok

    pool.query(`UPDATE "user_challenge" SET "longest_streak" = $1, "commit_percentage" = $2, "calendar" = $3 WHERE "user_id" = $4`,
        [data.longestStreak, data.commitPercent, calendar, data.userID])
        .then((response) => { //sends the data we just generated to the user_challenge table in postgres. will update existing entries for users. user entries are generated upon joining a challenge.
            //console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    //}
}

function setActiveUser(calendar, userInfo, diffDays) {
    tempCalendar = calendar.slice(0, diffDays+1)
    tempCalendar = tempCalendar.reverse();
    console.log(tempCalendar, userInfo.github);

    if (tempCalendar[0] === false && tempCalendar[1] === false && tempCalendar[2] === false && tempCalendar[3] === false && tempCalendar[4] === false) {
        console.log(`setting ${userInfo.github} to inactive.`);

        pool.query(`UPDATE "users" SET "active" = false WHERE "id" = ${userInfo.user_id};`)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            })
    }
    else if (tempCalendar[0] === true) {
        pool.query(`UPDATE "users" SET "active" = true WHERE "id" = ${userInfo.user_id};`)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

function processData(userData, diffDays, username) {
    let userCommitArray = username.calendar
    if (userData >= 1 && diffDays <= 30) { //set the corresponding array index to the value true if the user has committed that day.
        userCommitArray[diffDays] = true;         //if the user committed on the second day of the challenge, the second value in userCommitArray will be true, the rest will be false
    }
    else if (diffDays > 30) {
        console.log('the current challenge should have ended or should end soon.');
    }
    return userCommitArray; //return the processed array.
}

function packageData(username, data) {

    data.userID = username.user_id;
    data.challengeID = challengeID;
    return data
}

function getStreakAndPercent(data, diffDays) {
    let longestStreak = getStreak(data) //call the getStreak function by sending it the calendar we just created.
    let commitPercent = Math.round(getPercent(data, diffDays)) //^^ but commit %
    //console.log(longestStreak, commitPercent);
    return {
        longestStreak,
        commitPercent
    } //return an object of the two variables.
}

function getStreak(data) {
    let currentStreak = 0;
    let maxStreak = 0;
    let previousVal = false;
    data.forEach(index => {
        if (index === true) { //if a day has a commit, set previousVal to true
            previousVal = true;
        }
        if (index && previousVal) { //if a day has a commit, and previousVal is true, increment the currentStreak
            currentStreak++;
        }
        if (currentStreak > maxStreak) { //if the currentStreak is greater than the maxStreak, replace the maxStreak value
            maxStreak = currentStreak;
        }
        if (index === false) { //if a day doesnt have a commit, set previousVal to false and reset currentStreak
            previousVal = false;
            currentStreak = 0;
        }
    })
    return maxStreak //return the longest commit streak found within the data provided.
}

function getPercent(data, diffDays) {
    let newData = data.slice(0, diffDays+1) //grabs a sub-array that only includes days of the challenge which have already passed.
    //console.log('dataArray',newData );
    let commitCount = 0;
    for (let i = 0; i < newData.length; i++) {
        if (newData[i]) {
            commitCount++ //count up the commits within this sub-array
        }
    }
    commitCount = commitCount / diffDays * 100; //divides the commits by the total number of days of the challenge that have passed and get a %

    return commitCount //return the %
}


function activateChallenge() {

    pool.query(`SELECT "date", "id" FROM "challenges" WHERE "active" = false AND "date" = '${todaysDate}' GROUP BY "date", "id";`)
        .then((response) => { //grab all inactive challenges that are to start after todaysDate
            if (response.rows.length !== 0) { //this runs once a day. if the date of the currentDay is the same as the start date of the next challenge, set it to activ
                pool.query(`UPDATE "challenges" SET "active" = true WHERE "id" = ${response.rows[0].id};`)
                    .then((response) => {
                        didChallengeFinishRecently = false; //change this to false so we stop checking for the next challenge.
                    })
                    .catch((error) => {
                        console.log(error);

                    })
            }

        }) //change initial query to search for a challenge that starts on todays date, and if the array that we get in response
        //is not empty, set that challenge to active
        .catch((error) => {
            console.log(error);

        })
}






module.exports = router;
