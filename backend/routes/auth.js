const express = require('express');
const {
  register,
  login,
  logout,
  me,
  googleAuth,
  microsoftAuth
} = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const passport = require('passport');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);
router.post('/google', googleAuth);
router.post('/microsoft', microsoftAuth);

// Server-side OAuth redirect routes (passport)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect:
      `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=google`
  }),
  async (req, res) => {
    try {
      const frontUrl =
        process.env.CLIENT_URL || 'http://localhost:5173';

      await require('../controllers/authController').handleOAuthLogin({
        provider: 'google',
        providerAccountId: req.user.id,
        email: req.user.email,
        name: req.user.name,
        avatar: req.user.avatar,
        res,
        redirectUrl: `${frontUrl}/auth/callback`
      });
    } catch (err) {
      console.error('Google callback error:', err);

      res.redirect(
        `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=oauth`
      );
    }
  }
);

router.get('/microsoft', passport.authenticate('azuread-openidconnect'));

router.get('/microsoft/callback', passport.authenticate('azuread-openidconnect', { session: false }), async (req, res) => {
  try {
    const frontUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    await require('../controllers/authController').handleOAuthLogin({
      provider: 'microsoft',
      providerAccountId: req.user.id,
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar,
      res,
      redirectUrl: `${frontUrl}/auth/callback`
    });
  } catch (err) {
    console.error('Microsoft callback error:', err);
    res.redirect((process.env.CLIENT_URL || 'http://localhost:5173') + '/login?error=oauth');
  }
});

module.exports = router;
