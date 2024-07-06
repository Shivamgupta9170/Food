const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const AdminOrder = require("../models/AdminOrder");
const stripe = require('stripe')("sk_test_51PJ716SGbvgP0eTKIYDupNB9czj7wCjcvO8h79O1lPfsS1VEF7dlHUVd9QQNXyDwfB0ekDCdrQ28Y5DOsg8d62Ie00cdtSvj8a");

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    // Check if email exists in db
    let eId = await Order.findOne({ 'email': req.body.email });
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data],
                status: 'Pending'
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error", error.message);
        }
    } else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error", error.message);
        }
    }

    // Create admin order
    try {
        await AdminOrder.create({
            email: req.body.email,
            order_data: data,
            order_date: req.body.order_date,
            status: 'Pending'
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error", error.message);
    }
});

router.post('/create-payment-intent', async (req, res) => {
    const { email, order_data } = req.body;

    let totalAmount = order_data.reduce((total, item) => total + item.price * item.quantity, 0);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, // Convert to cents
            currency: 'inr',
            receipt_email: email,
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send('Server error');
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const orders = await Order.find({ 'email': userEmail });

        if (orders.length === 0) {
            res.json({ orderData: [] }); // Return an empty array if no orders found
        } else {
            res.json({ orderData: orders }); // Return orders array
        }
    } catch (error) {
        console.error("Error fetching order data:", error.message);
        res.status(500).send("Error fetching order data");
    }
});

router.post('/adminOrders', async (req, res) => {
    try {
        const orders = await AdminOrder.find({});
        res.json({orders: orders });
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).send("Error fetching orders");
    }
});

// Update order status
router.post('/updateStatus', async (req, res) => {
    try {
        const { email, orderId, status } = req.body;
        const order = await AdminOrder.findOneAndUpdate(
            { email: email, 'order_data._id': orderId },
            { $set: { 'order_data.$.status': status } },
            { new: true }
        );
        if (order) {
            res.json({ success: true, order });
        } else {
            res.status(404).send("Order not found");
        }
    } catch (error) {
        console.error("Error updating order status:", error.message);
        res.status(500).send("Error updating order status");
    }
});

module.exports = router;


