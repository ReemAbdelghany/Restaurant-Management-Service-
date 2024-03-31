const Customer = require('../models/Customer.js'); // Assuming your model file is named Customer.js

// Create a new customer
async function createCustomer(req, res) {
    try {
        const { customer_name, phone_number, email } = req.body;
        const customer = new Customer({ customer_name, phone_number, email });
        const savedCustomer = await customer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all customers
async function getAllCustomers(req, res) {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a single customer by ID
async function getCustomerById(req, res) {
    try {
        const customer = await Customer.findById(req.params.id);
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a customer by ID
async function updateCustomer(req, res) {
    try {
        const { customer_name, phone_number, email } = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            { customer_name, phone_number, email },
            { new: true }
        );
        if (updatedCustomer) {
            res.json(updatedCustomer);
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a customer by ID
async function deleteCustomer(req, res) {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (deletedCustomer) {
            res.json({ message: "Customer deleted successfully" });
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
