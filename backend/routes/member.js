const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
