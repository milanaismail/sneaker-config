// routes/api/v1/orders.js
var express = require("express");
var router = express.Router();
const ordersController = require("../../../controllers/api/v1/orders.js");
const admin = require("../../../middleware/auth.js");

// GET /api/v1/orders - Get all orders
router.get("/", ordersController.getAll);

// GET /api/v1/orders/:id - Get a specific order by ID
router.get("/:id", ordersController.get);

// POST /api/v1/orders - Add a new order
router.post("/", ordersController.create);

// PUT /api/v1/orders/:id - Update the status of an order (admin-only)
router.put("/:id", admin, ordersController.update);
router.patch("/:id", admin, ordersController.update);

// DELETE /api/v1/orders/:id - Delete an order (admin-only)
router.delete("/:id", admin, ordersController.remove);

module.exports = router;
