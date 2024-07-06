const mongoose = require('mongoose');

// Define the schema for the CustomerOrder model
const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  orderData: [
    {
      name: String,
      quantity: Number,
      price: Number,
      size: String,
    }
  ],
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Delivered', 'Canceled'],
    default: 'Pending'
  }
  // Add other fields as needed for your application
});

// Create the CustomerOrder model
module.exports = mongoose.model('Ordersss', OrderSchema);
