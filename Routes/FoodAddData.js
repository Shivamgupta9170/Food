const express = require('express');
const router = express.Router();
const FoodItem1 = require('../models/FoodItem1');
const upload = require('./multerconfig'); // Import multer configuration

router.post('/foodItems', upload.single('img'), async (req, res) => {
  try {
    const { categoryName, name, description } = req.body;
    const optionsArray = JSON.parse(req.body.options); // Parse options as JSON
    const img = req.file.path; // Assuming multer stores the file path in `req.file.path`

    // Convert options array to Map
    const optionsMap = new Map();
    optionsArray.forEach(option => {
      optionsMap.set(option.size, { size: option.size, price: option.price });
    });

    // Create a new food item and save it to the database
    const foodItem = new FoodItem1({
      categoryName,
      name,
      img,
      options: optionsMap,
      description,
    });

    await foodItem.save();

    res.status(201).json({ message: 'Food item added successfully' });
  } catch (error) {
    console.error('Error adding food item:', error);
    res.status(500).json({ error: 'Failed to add food item. Please try again later.' });
  }
});

module.exports = router;







