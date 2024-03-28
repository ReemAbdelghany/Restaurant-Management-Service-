const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    experience_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
