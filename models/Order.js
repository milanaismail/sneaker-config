const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered"],
    default: "Pending",
  },
  totalPrice: { type: Number, required: true },
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: Number, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
  },
  products: [
    {
      productId: { type: String, required: true },
      colors: { type: Object, required: true },
      fabrics: { type: Object, required: true },
      size: { type: Number, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      initials: { type: String, default: null }, // Optional initials
    },
  ],
  shippingCost: { type: Number, default: 20 },
});

module.exports = mongoose.model("Order", orderSchema);
