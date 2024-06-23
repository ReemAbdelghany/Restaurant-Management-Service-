const Order = require('../models/Order');

// Create a new order
async function createOrder(req, res) {
    try {
        const { customer_id, user_id, menu_id, order_date, total_amount, orderType } = req.body;
        const newOrder = new Order({ customer_id, user_id, menu_id, order_date, total_amount, orderType });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all orders
async function getAllOrders(req, res) {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get order by ID
async function getOrderById(req, res) {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update order by ID
async function updateOrder(req, res) {
    try {
        const { customer_id, user_id, menu_id, order_date, total_amount, orderType } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { customer_id, user_id, menu_id, order_date, total_amount, orderType },
            { new: true }
        );
        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete order by ID
async function deleteOrder(req, res) {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (deletedOrder) {
            res.json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};