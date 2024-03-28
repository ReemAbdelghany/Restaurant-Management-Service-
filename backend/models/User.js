const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserType",
    required: true
  },
  national_id: {
    type: String,
    required: true
  },
  phone_no: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
