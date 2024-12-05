const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Email is unique
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  // Remove the username field if it's not needed
});

module.exports = mongoose.model("User", userSchema);
