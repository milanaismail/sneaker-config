const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shoeSize: Number,
  laceColor: String,
  soleColor: String,
  soleFabric: String,
  innerShoeColor: String,
  innerShoeFabric: String,
  outerShoeColor: String,
  outerShoeFabric: String,
  customerContact: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
});

module.exports = mongoose.model("Order", orderSchema);