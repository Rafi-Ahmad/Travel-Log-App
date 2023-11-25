const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  rating: { type: Number, min: 1, max: 5 },
  latitude: Number,
  longitude: Number,
});

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;
