// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shoeSize: Number,
  laceColor: String,
  customerContact: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
