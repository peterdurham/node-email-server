const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  confirmDate: {
    type: Date,
  },
  unsubscribed: {
    type: Boolean,
  },
  unsubscribeDate: {
    type: Date,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
