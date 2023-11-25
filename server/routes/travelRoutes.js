const express = require('express');
const router = express.Router();
const Travel = require('../models/Travel');

// Get all travels
router.get('/', async (req, res) => {
  try {
    const travels = await Travel.find();
    res.json(travels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new travel
router.post('/', async (req, res) => {
  const travel = new Travel(req.body);
  try {
    const savedTravel = await travel.save();
    res.json(savedTravel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
