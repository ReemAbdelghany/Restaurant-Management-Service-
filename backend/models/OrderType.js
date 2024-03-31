const mongoose = require("mongoose");


const OrderTypeSchema = new mongoose.Schema({
    type_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("OrderType", OrderTypeSchema);
