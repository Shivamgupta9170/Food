const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Delivered', 'Canceled'],
      default: 'Pending'
    }

});

module.exports = mongoose.model('order', OrderSchema);


// const mongoose = require('mongoose');

// // Define the schema for the CustomerOrder model
// const OrderSchema = new mongoose.Schema({
//   userEmail: {
//     type: String,
//     required: true
//   },
//   orderData: {
//     type: Array,
//     required: true
//   },
//   orderDate: {
//     type: Date,
//     default: Date.now
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Delivered', 'Canceled'],
//     default: 'Pending'
//   }
//   // Add other fields as needed for your application
// });

// // Create the CustomerOrder model
// module.exports = mongoose.model('order', OrderSchema);

 
