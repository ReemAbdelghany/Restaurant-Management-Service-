const mongoose = require("mongoose");


const MenuTypeSchema = new mongoose.Schema({
    dish_type:{
        type: String,
        required: true,
    },
    meal_type:{
        type: String,
        required: true,
    },

    diet_type:{
        type: String,
        required: true,
    }
  

});

module.exports = mongoose.model("MenuType", MenuTypeSchema);