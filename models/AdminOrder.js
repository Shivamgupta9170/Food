// const mongoose = require('mongoose');

// // Define the schema for the AdminOrder model
// const AdminOrderSchema = new mongoose.Schema({
//   status: {
//     type: String,
//     enum: ['Pending', 'Delivered', 'Canceled'],
//     default: 'Pending'
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   products: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   }]
//   // Add other fields as needed for your application
// });

// // Create the AdminOrder model
// const AdminOrder = mongoose.model('AdminOrder', AdminOrderSchema);

// module.exports = AdminOrder;


const mongoose = require('mongoose');

const adminOrderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    order_data: { type: Array, required: true },
    order_date: { type: String, required: true },
    status: {
          type: String,
          enum: ['Pending', 'Delivered', 'Canceled'],
          default: 'Pending'
        },
}, { timestamps: true });

module.exports = mongoose.model('AdminOrder', adminOrderSchema);


