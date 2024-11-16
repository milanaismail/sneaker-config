const Order = require("../../../models/Order");

//post
const createOrder = async (req, res) => {
  try {
    const { customer, products, totalPrice, status } = req.body;

    // Validate required fields
    if (!customer || !products || !totalPrice) {
      return res.status(400).json({ message: "Customer, products, and totalPrice are required" });
    }

    // Create a new order
    const order = new Order({
      customer,
      products,
      totalPrice,
      status: status || "Pending",
    });

    // Save order to database
    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// GET /api/v1/orders - Overview
const getOrdersOverview = async (req, res) => {
  try {
    const orders = await Order.find({}, "id createdAt customer.fullName totalPrice status");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};

// GET /api/v1/orders/:id - Detailed View
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order details", error });
  }
};

module.exports = {
  createOrder,
  getOrdersOverview,
  getOrderDetails,
};
