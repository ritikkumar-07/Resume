require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

require('./config/passport');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend server running on http://localhost:${process.env.PORT || 5000}`);
});