require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');

const app = express();

// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:5173',
//   credentials: true
// }));

const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173'
  // 'http://10.143.83.197:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: This origin is not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
// Enable pre-flight across the board
// app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Initialize passport for OAuth callback routes
require('./config/passport');
app.use(passport.initialize());

// Routes
// Health check
app.get('/api/health', (req, res) => {
  return res.json({ success: true, message: 'Backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// const PORT = process.env.PORT || 5001;
// const server = app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Backend Express Server running on port ${PORT}`);
// });

// server.on('error', (err) => {
//   console.error('Server error:', err);
// });

// Local development only
if (require.main === module) {
  const PORT = process.env.PORT || 5001;

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Express Server running on port ${PORT}`);
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
  });
}

module.exports = app;