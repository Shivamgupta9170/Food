const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Route to create a new order
router.post('/adminOrderDisplay', async (req, res) => {
  try {
    const order = new Order(req.body); // Create a new order document with the request body
    await order.save(); // Save the order to the database
    res.status(201).send(order); // Send a response with the created order
  } catch (error) {
    res.status(400).send({ error: error.message }); // Handle any errors and send an error response
  }
});

// Route to retrieve all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find(); // Find all orders in the database
    res.send(orders); // Send a response with the retrieved orders
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' }); // Handle any errors and send an error response
  }
});

// Route to update the status of an order by its ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the order ID from the request parameters
    const { status } = req.body; // Extract the updated status from the request body
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true }); // Find and update the order by ID
    if (!order) {
      return res.status(404).send({ error: 'Order not found' }); // If the order is not found, send a 404 error response
    }
    res.send(order); // Send a response with the updated order
  } catch (error) {
    res.status(400).send({ error: error.message }); // Handle any errors and send an error response
  }
});

// Route to delete an order by its ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the order ID from the request parameters
    const order = await Order.findByIdAndDelete(id); // Find and delete the order by ID
    if (!order) {
      return res.status(404).send({ error: 'Order not found' }); // If the order is not found, send a 404 error response
    }
    res.send({ message: 'Order deleted successfully' }); // Send a response indicating successful deletion
  } catch (error) {
    res.status(400).send({ error: error.message }); // Handle any errors and send an error response
  }
});

module.exports = router;
