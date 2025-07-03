const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET: Fetch reviews for a specific user (reviewee)
router.get('/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ 'reviewee.userId': req.params.userId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// POST: Create a new review (optional, for testing)
router.post('/', async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: 'Error creating review' });
  }
});

module.exports = router;
