const Order = require("../../../models/Order");
const createOrder = async (req, res) => {
  try {
    const { customer, products, totalPrice, status } = req.body;

    // Log the full request body for debugging
    console.log("Received order request:", JSON.stringify(req.body, null, 2));  // Pretty print for clarity

    // Check if required fields are provided
    if (!customer || !products || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure each product has the necessary details
    products.forEach((product, index) => {
      console.log(`Product ${index}: colors`, product.colors); // Log colors for debugging
      console.log(`Product ${index}: fabrics`, product.fabrics); // Log fabrics for debugging
      if (!product.colors || !product.fabrics || !product.size) {
        return res.status(400).json({ message: `Missing product details at index ${index}` });
      }
    });

    // Create the order object and save it
    const newOrder = new Order({
      customer,
      products,
      totalPrice,
      status: status || "Pending",  // Default to "Pending" if no status is provided
    });

    await newOrder.save();

    return res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
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

// PUT /api/v1/orders/:id - Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // Get the order ID from the route parameter
    const { status } = req.body; // Get the new status from the request body

    // Validate the status
    const validStatuses = ["Pending", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find the order by ID and update its status
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrdersOverview,
  getOrderDetails,
  updateOrderStatus, 
};
