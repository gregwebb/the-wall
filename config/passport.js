const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
function(accessToken, refreshToken, profile, cb) {
  User.findOne({ 'googleId': profile.id }, function(err, userDoc) {
    if (err) return cb(err);
    if (userDoc) {
      return cb(null, userDoc);
    } else {
      // we have a new student via OAuth!
      var newUser = new User({
        username: profile.displayName,
        googleId: profile.id
      });
      newUser.save(function(err) {
        if (err) return cb(err);
        return cb(null, newUser);
      });
    }
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {

  User.findById(_id, function(err, user){
    done(err, user);
    // setsup
    // req.user = studentDoc
    // req.user is avialible in all of our controller functions
    // throughout the entire app
  })
})


