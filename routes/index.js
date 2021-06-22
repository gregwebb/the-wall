var router = require('express').Router();
const passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/posts');
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback',
(req, res, next) => {

  // Save the url of the user's current page so the app can redirect back to it after authorization
  if (req.query.return) {req.session.oauth2return = req.query.return;}
  next();
},

// Start OAuth 2 flow using Passport.js

passport.authenticate('google'), (req, res) => {
  // Redirect back to the original page, if any
  const redirect = req.session.oauth2return || '/';
  delete req.session.oauth2return;
  res.redirect(redirect);
}
);

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/posts');
});

module.exports = router;
