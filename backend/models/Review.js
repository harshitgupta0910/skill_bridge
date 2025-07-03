const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: {
    name: String,
    avatar: String,
  },
  reviewee: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    avatar: String,
  },
  rating: Number,
  skill: String,
  comment: String,
  date: { type: Date, default: Date.now },
  helpful: { type: Number, default: 0 }
});

module.exports = mongoose.model('Review', reviewSchema);
