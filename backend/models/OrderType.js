const mongoose = require("mongoose");

const OrderTypeSchema = new mongoose.Schema({
    order_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("OrderType", OrderTypeSchema);
