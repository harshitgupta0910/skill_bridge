// routes/exchanges.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Exchange Schema
const exchangeSchema = new mongoose.Schema({
  partner: {
    name: String,
    avatar: String,
    rating: Number,
    location: String,
  },
  teachingSkill: String,
  learningSkill: String,
  status: String,
  sessionsCompleted: Number,
  totalSessions: Number,
  nextSession: String,
  progress: Number,
  startDate: String,
  completedDate: String,
});

const Exchange = mongoose.model('Exchange', exchangeSchema);

// GET: All exchanges
router.get('/', async (req, res) => {
  try {
    const exchanges = await Exchange.find();
    res.json(exchanges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
