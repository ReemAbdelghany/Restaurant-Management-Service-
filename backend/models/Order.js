const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    menu_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    total_amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Order", OrderSchema);
