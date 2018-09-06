let express = require('express');
let passport = require('passport');
let Strategy = require('passport-github2').Strategy;
const pool = require('../modules/pool');
const router = express.Router();


//START put this in the strategy ----------------------------///----------------------------

// const CLIENT_ID = '1d14666b64e768538a8b';
// const CLIENT_SECRET = '9135def1c599d961cab8e9f6474796488f534b5e';

// Configure the Twitter strategy for use by Passport.
//
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.

// passport.use('github', new Strategy({
//     clientID: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     callbackURL: 'http://localhost:5000/api/auth/github/callback'
//   },
//   function(token, tokenSecret, profile, cb) {
//     // In this example, the user's Twitter profile is supplied as the user
//     // record.  In a production-quality application, the Twitter profile should
//     // be associated with a user record in the application's database, which
//     // allows for account linking and authentication with other identity
//     // providers.

// //check db for ex
//     console.log('Strategy', profile);
    
//     return cb(null, profile);
//   }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.


// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });


//END put this in the strategy ----------------------------///----------------------------


// // Create a new Express application.
// const router = express.Router();

// // Configure view engine to render EJS templates.
// // app.set('views', __dirname + '/views');
// // app.set('view engine', 'ejs');

// // Use application-level middleware for common functionality, including
// // logging, parsing, and session handling.
// router.use(require('cookie-parser')());
// router.use(require('body-parser').urlencoded({ extended: true }));
// router.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));



// Define routes.
// app.get('/',
//   function(req, res) {
//     res.render('home', { user: req.user });
//   });

// router.get('/login',
//   function(req, res){
//     res.render('login');
//   });

router.get('/login', passport.authenticate('github', { failureRedirect: '/login' }))
  

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000' }),
  function(req, res) {
    res.redirect('http://localhost:3000');
  });

router.get('/user', (req, res) => {
  console.log(req.user);
  
  res.send(req.user);
})

router.get('/profile',
  // require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    console.log('Profile', req.user);
    res.send(req.user)
  });

router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;