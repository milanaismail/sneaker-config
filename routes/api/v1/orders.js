const express = require("express");
const router = express.Router();
const ordersController = require("../../../controllers/api/v1/orders.js");

router.get("/", ordersController.getAll); // Overview
router.get("/:id", ordersController.getOrderDetails); // Details

module.exports = router;
