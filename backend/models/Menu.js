const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
    dish_name: {
        type: String,
        required: true,
    },
    dish_description: {
        type: String,
    },
    dish_price: {
        type: Number,
        required: true,
    },
    diet_type: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Menu", MenuSchema);
