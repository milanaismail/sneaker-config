const Order = require("../../../models/Order");
const createOrder = async (req, res) => {
  try {
    const { customer, products, totalPrice, status } = req.body;
    // Check if required fields are provided
    if (!customer || !products || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure each product has the necessary details
    products.forEach((product, index) => {
      if (!product.colors || !product.fabrics || !product.size) {
        return res.status(400).json({ message: `Missing product details at index ${index}` });
      }
    });

    const SHIPPING_COST = 20;

    // Create the order object and save it
    const newOrder = new Order({
      customer,
      products,
      totalPrice: totalPrice + SHIPPING_COST, // Add shipping cost to total price
      status: status || "Pending", // Default to "Pending" if no status is provided
      shippingCost: SHIPPING_COST, // Default to "Pending" if no status is provided
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
    const orders = await Order.find({}, "id createdAt customer.firstName customer.lastName totalPrice status shippingCost");
    
    // Adjusting the totalPrice by subtracting shipping cost for display
    const ordersOverview = orders.map(order => ({
      ...order.toObject(),
      totalPrice: order.totalPrice - order.shippingCost // Remove the shipping cost from the total price
    }));
    
    res.json(ordersOverview);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};

// GET /api/v1/orders/:id - Detailed View
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.products.forEach((product, index) => {
      product.productId = product._id || `Product-${index + 1}`;
    });
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

// DELETE /api/v1/orders/:id - Delete Order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params; // Get the order ID from the route parameter

    // Find and delete the order by ID
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully", order });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


module.exports = {
  createOrder,
  getOrdersOverview,
  getOrderDetails,
  updateOrderStatus, 
  deleteOrder,
};
