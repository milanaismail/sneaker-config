// controllers/api/v1/orders.js
const Order = require("../../../models/Order");

// GET /api/v1/orders - Get all orders
const getAll = async (req, res) => {
  try {
    const sortby = req.query.sortby === "votes" ? "votes" : "createdAt";
    const orders = await Order.find().sort({ [sortby]: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};

// GET /api/v1/orders/:id - Get a specific order by ID
const get = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order", error });
  }
};

// POST /api/v1/orders - Add a new order
const create = async (req, res) => {
  try {
    const { shoeSize, laceColor, customerContact } = req.body;
    const order = new Order({ shoeSize, laceColor, customerContact });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// PUT/PATCH /api/v1/orders/:id - Update the status of an order (admin-only)
const update = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// DELETE /api/v1/orders/:id - Delete an order (admin-only)
const remove = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
