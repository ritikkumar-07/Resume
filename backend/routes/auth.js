const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    res.redirect('http://localhost:5173');
  }
);

// Microsoft Auth
router.get('/microsoft', passport.authenticate('azuread-openidconnect'));

router.get('/microsoft/callback',
  passport.authenticate('azuread-openidconnect', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    res.redirect('http://localhost:5173');
  }
);

// Get Current Logged In User
router.get('/current_user', (req, res) => {
  res.send(req.user || null);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173');
  });
});

module.exports = router;