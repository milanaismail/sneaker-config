const express = require("express");
const router = express.Router();
const ordersController = require("../../../controllers/api/v1/orders");

router.post("/", ordersController.createOrder);
router.get("/", ordersController.getOrdersOverview); 
router.get("/:id", ordersController.getOrderDetails); // Details
router.put("/:id", ordersController.updateOrderStatus); // Update Status
router.put("/:id", ordersController.updateOrderWithCustomerInfo); // Update Customer Info

module.exports = router;
