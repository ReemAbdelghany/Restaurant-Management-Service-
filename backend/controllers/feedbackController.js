const Feedback = require('../models/Feedback');

// Create a new feedback
async function createFeedback(req, res) {
    try {
        const { experience_id, customer_id, rating, feedback } = req.body;
        const newFeedback = new Feedback({ experience_id, customer_id, rating, feedback });
        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all feedback
async function getAllFeedback(req, res) {
    try {
        const feedback = await Feedback.find();
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get feedback by ID
async function getFeedbackById(req, res) {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (feedback) {
            res.json(feedback);
        } else {
            res.status(404).json({ message: "Feedback not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update feedback by ID
async function updateFeedback(req, res) {
    try {
        const { experience_id, customer_id, rating, feedback } = req.body;
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { experience_id, customer_id, rating, feedback },
            { new: true }
        );
        if (updatedFeedback) {
            res.json(updatedFeedback);
        } else {
            res.status(404).json({ message: "Feedback not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete feedback by ID
async function deleteFeedback(req, res) {
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
        if (deletedFeedback) {
            res.json({ message: "Feedback deleted successfully" });
        } else {
            res.status(404).json({ message: "Feedback not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
};
