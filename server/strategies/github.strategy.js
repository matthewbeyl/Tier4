let passport = require('passport');
let Strategy = require('passport-github2').Strategy;
const pool = require('../modules/pool');

const debug = true;

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });


const CLIENT_ID = '1d14666b64e768538a8b';
const CLIENT_SECRET = '9135def1c599d961cab8e9f6474796488f534b5e';

// Configure the Twitter strategy for use by Passport.
//
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.

passport.use( new Strategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/github/callback'
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    pool.query('SELECT * FROM users WHERE github = $1;', [profile.username]).then((result) => {
        if(result.rows.length === 0) {
          //values from Facebook are inserted into database.
          // NOTE user is instantiated with a status int 1 in the database. int 2 is admin access.
          pool.query('INSERT INTO users (name, github, image_url) VALUES ($1, $2, $3);',
                      [profile.displayName, profile.username, profile.photos[0].value])
            .then((result) => {
              if(debug){console.log('registered new user');};
  
              pool.query('SELECT * FROM users WHERE github = $1;', [profile.username]).then((result) => {
                if(result.rows.length === 0) {
                  cb(null, false);
                } else {
                  let foundUser = result.rows[0];
                  if(debug){console.log('found user', foundUser);};
                  cb(null, foundUser);
                }
              }).catch((err) => {
                cb(null, false);
              })
            })
            .catch((err) => {
              if(debug){console.log('error in new user post', err);};
              cb(null, false);
            })
        } else {
  
          let foundUser = result.rows[0];
          if(debug){console.log('found user', foundUser);};
          cb(null, foundUser);
        }
      }).catch((err) => {
        if(debug){console.log('error in new user post', err);};
        response.sendStatus(500);
        cb(null, false);
      })

//check db for ex
    console.log('Strategy', profile);
    
    return cb(null, profile);
  }));

module.exports = passport;