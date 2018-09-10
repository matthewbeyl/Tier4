const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rp = require('request-promise')
const cron = require('node-cron');



let userList = []
let challengeDate = ''
let challengeID = 0;
let challengeDateString = ''
//define global variables that will be used within multiple functions.
let theData;
//test variable so that you can retrieve api data when you click the button in testComponent.js


let date = new Date();
date = JSON.stringify(date)
todaysDate = date.substring(1, 11)
//calculate todays date so that we only get todays commits in getData()

cron.schedule('*/1 * * * * *', function () {
    console.log('running once every 20 seconds');
    getData();
});
//run getData() once every 20 seconds, will be changed to once a day at midnight.





router.get('/get-data', (req, res) => {
    res.send(theData)
})
//test endpoint to send github api data

function getData() {
    console.log('getting user list');
    pool.query(`SELECT "date", "id" FROM "challenges" WHERE "active" = 'true';`) 
        .then((response) => { //retrieve the start date and id of the current active challenge, there should only be one.
            if (response.rows.length !== 0) { //only run the api calls if there is a current active challenge.
                challengeDate = response.rows[0].date //grab the start date of the current active challenge
                challengeID = response.rows[0].id //grabs the id of the current active challenge
                challengeDateString = JSON.stringify(challengeDate)
                challengeDateString = challengeDateString.substring(1, 11) //I don't think this variable is needed, will remove eventually
                pool.query(`SELECT "github", "user_id", "calendar" FROM "users"
                JOIN "user_challenge" ON "users"."id" = "user_challenge"."user_id"
                WHERE "user_challenge"."challenge_id" = $1;`, [challengeID]) //retrieves the github, user_id, and calendar for users enrolled in the current challenge, using the challenge id just retrieved.
                    .then((response) => {
                        userList = response.rows //sets the userlist to the data we just got back.
                        console.log('getting gh data');
                        const requestPromises = [] //create an array to store all the requests we will send to the github api
                        userList.forEach(user => { //loop through the userlist we just got from postgres and generate an api call using each users information.
                            const requestOptions = {
                                uri: `https://api.github.com/search/commits?q=committer:${user.github}+committer-date:${todaysDate}&sort=committer-date&per_page=1`,
                                headers: { "User-Agent": user.github, Accept: 'application/vnd.github.cloak-preview+json', Authorization: 'token 23982af669baa75e29e52bbd5a45594c65b7f7b2' },
                                method: 'GET',
                                json: true
                            }
                            requestPromises.push(rp(requestOptions)); //create a promise for each api request
                        })
                        Promise.all(requestPromises) //run and wait for all promises to be fullfilled.
                            .then((data) => {
                                theData = data; //set the response data to theData variable so that testcomponent can access it through the endpoint '/get-data'
                                sortAndSendData(data); //parses through the data before posting the processed data to postgres
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    })
                    .catch((error) => {
                        console.log('error on get-user-list', error);
                    })
            }
        })
}


async function sortAndSendData(tempData) { //tempData is an array of the data(sorted by user) that we got from the api. its indexes correspond to the userList array. this is important.
    let date = JSON.stringify(challengeDate) 
    let currentDate = JSON.stringify(new Date())
    let date1 = new Date(date.substring(1, 11));
    let date2 = new Date(currentDate.substring(1, 11));
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); //format and compare todays date to the challenge start date. grabs diffDays to get commit %

    for (let i = 0; i < tempData.length; i++) { //loop through tempdata and store a specific users data into these temporary variables.
        let tempUserData = tempData[i].items; //list of the commits a user made, should only have 1 item.
        let tempUserName = userList[i]; //grabs user info of the corresponding user.
        let tempDate = challengeDate; //i dont think this is ever used, will remove one day......

        let calendar = await processData(tempUserData, diffDays, tempUserName) //updates and bundles together the users calendar

        let processedData = getStreakAndPercent(calendar, diffDays) //calculate the streak and commit % using the calendar we just updated

        let data = packageData(tempUserName, processedData); //package all the data we just generated into a single object for simplicity

        //this is where everything has finished ok

        pool.query(`UPDATE "user_challenge" SET "longest_streak" = $1, "commit_percentage" = $2, "calendar" = $3 WHERE "user_id" = $4`,
            [data.longestStreak, data.commitPercent, calendar, data.userID])
            .then((response) => { //sends the data we just generated to the user_challenge table in postgres. will update existing entries for users. user entries are generated upon joining a challenge.
                //console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

function processData(userData, diffDays, username) {
    let userCommitArray = username.calendar 
    if (userData.length !== 0 && diffDays<= 30) { //set the corresponding array index to the value true if the user has committed that day.
        userCommitArray[diffDays] = true;         //if the user committed on the second day of the challenge, the second value in userCommitArray will be true, the rest will be false
    }
    else if (diffDays>30){
        console.log('the current challenge should have ended or should end soon. ');
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
    let newData = data.slice(0, diffDays) //grabs a sub-array that only includes days of the challenge which have already passed.
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


module.exports = router;