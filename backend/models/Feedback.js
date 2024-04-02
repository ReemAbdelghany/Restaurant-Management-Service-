const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    feedback: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
