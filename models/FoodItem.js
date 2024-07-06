// models/FoodItem.js

const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  options: [{
    size: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  }],
  description: {
    type: String,
    required: true
  }
});



const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;


// const mongoose = require('mongoose');

// const optionSchema = new mongoose.Schema({
//   type: { type: String, required: true },
//   price: { type: Number, required: true },
//   size: { type: String, required: true },
// });

// const foodItemSchema = new mongoose.Schema({
//   categoryName: { type: String, required: true },
//   name: { type: String, required: true },
//   img: { type: String, required: true },
//   options: { type: [optionSchema], required: true },
//   description: { type: String, required: true },
// });

// const FoodItem = mongoose.model('fooditem', foodItemSchema);

// module.exports = FoodItem;
