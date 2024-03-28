const mongoose = require("mongoose");

const UserTypeSchema = new mongoose.Schema({
  user_type_id: mongoose.Schema.Types.ObjectId,
  type_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("UserType", UserTypeSchema);
