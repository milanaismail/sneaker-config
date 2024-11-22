const express = require("express");
const router = express.Router();
const ordersController = require("../../../controllers/api/v1/orders");
console.log("Orders Controller:", ordersController);

router.post("/", ordersController.createOrder);
router.get("/", ordersController.getOrdersOverview); 
router.get("/:id", ordersController.getOrderDetails); // Details
router.put("/:id", ordersController.updateOrderStatus); // Update Status

module.exports = router;
