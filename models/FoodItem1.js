const mongoose = require('mongoose');



const optionSchema = new mongoose.Schema({
    size: { type: String, required: true },
    price: { type: Number, required: true },
  });
  
  // Define the food item schema
  const foodItemSchemas = new mongoose.Schema({
    categoryName: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    options: {
      type: Map,
      of: optionSchema,
      required: true,
    },
  });
  

const FoodItems1 = mongoose.model('foodItemss', foodItemSchemas);

module.exports = FoodItems1;
