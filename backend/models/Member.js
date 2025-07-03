const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  rating: Number,
  location: String,
  skills: [String],
  wantToLearn: [String],
  tags: [String],
  exchanges: Number,
  joined: String,
  online: Boolean,
  matchScore: Number,
  experience: String,
  availability: String
});

module.exports = mongoose.model('Member', memberSchema);
