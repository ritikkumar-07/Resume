require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// MongoDB Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resumebuilder')
  .then(() => console.log('MongoDB Database Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Failed:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend Express Server running on port ${PORT}`);
});