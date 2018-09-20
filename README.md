# Tier 4

The purpose of Tier 4 is to encourage and create structure for Prime graduates (Users) during their career search. Administrative users (Admin) are able to create 30-day Github Challenge Sprints and view a table of participating graduates’ commit percentage and GitHub streak. Commit percentage is a measurement of user progress in the challenge. (For example, if a user has committed to GitHub everyday since the beginning of the competition, their commit percentage would be at 100%). GitHub streak is consecutive days of commit to GitHub not including weekends and holidays (depending on the challenge configuration). After registration, users can join challenges and see their streak and percentage of days with commits.

[Tier 4](http://tier4.herokuapp.com/#/home)

## Built With

- Node                  
- Express               
- PostgreSQL
- NodeMailer            
- React                 
- React-redux
- Redux-saga            
- Passport              
- GitHub API
- Material-UI           
- Heroku

## Prerequisites

   Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

   Refer to database.sql to create database/table structure

### Completed Features

- [x] Oauth using GitHub Strategy.
- [x] User data from GitHub API gathered, stored, and displayed daily.
- [x] Use of NodeMailer to send user summaries to Prime Digital Academy Staff
- [x] GitHub information stored and recalled from app Database

### Next Steps

- [ ] Ability for users to share what they are working on
- [ ] Added incentives for users
- [ ] Make application mobile friendly

## Deployment

1. Clone/download Repository
2. NPM install
3. Create .env file with SERVER_SESSION_SECRET
    
   SERVER_SESSION_SECRET can be generated [Here](https://passwordsgenerator.net/)
4. Make changes to the following files:
#### challenge.router.js
* NODEMAILER_EMAIL NODEMAILER_PASSWORD should be changed to Gmail username and password of account you would like to use for application.
#### gh-api.router.js
* GITHUB_API_AUTHORIZATION_TOKEN must be changed. Generate GitHub API Authorization token [Here](https://github.com/settings/tokens)
#### scheduler.router.js
* PRIME_STAFF_EMAIL should be updated with the e-mail of the account that user email will generated and sent to.
5. NPM Run Server
6. NPM Run Client

## Authors

- [Matt Beyl](https://github.com/matthewbeyl)
- [Mai Yer Lee](https://github.com/Roboronnie)
- [Jeff Richardson](https://github.com/jjrich13)
- [Tyler Sehr](https://github.com/ReverendEd)
