const OrderType = require('../models/OrderType');

// Create a new order type
async function createOrderType(req, res) {
    try {
        const { type_name } = req.body;
        const newOrderType = new OrderType({ type_name });
        const savedOrderType = await newOrderType.save();
        res.status(201).json(savedOrderType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all order types
async function getAllOrderTypes(req, res) {
    try {
        const orderTypes = await OrderType.find();
        res.json(orderTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get order type by ID
async function getOrderTypeById(req, res) {
    try {
        const orderType = await OrderType.findById(req.params.id);
        if (orderType) {
            res.json(orderType);
        } else {
            res.status(404).json({ message: "Order type not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update order type by ID
async function updateOrderType(req, res) {
    try {
        const { type_name } = req.body;
        const updatedOrderType = await OrderType.findByIdAndUpdate(
            req.params.id,
            { type_name },
            { new: true }
        );
        if (updatedOrderType) {
            res.json(updatedOrderType);
        } else {
            res.status(404).json({ message: "Order type not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete order type by ID
async function deleteOrderType(req, res) {
    try {
        const deletedOrderType = await OrderType.findByIdAndDelete(req.params.id);
        if (deletedOrderType) {
            res.json({ message: "Order type deleted successfully" });
        } else {
            res.status(404).json({ message: "Order type not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createOrderType,
    getAllOrderTypes,
    getOrderTypeById,
    updateOrderType,
    deleteOrderType
};
