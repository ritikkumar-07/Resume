const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, userId, password } = req.body;

  try {
    let existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ message: 'User ID already exists. Please choose another.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      userId,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ user: { name: newUser.name, userId: newUser.userId } });
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(400).json({ message: 'Invalid User ID or Password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid User ID or Password' });
    }

    res.json({ user: { name: user.name, userId: user.userId } });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

// OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/microsoft', passport.authenticate('azuread-openidconnect'));

module.exports = router;