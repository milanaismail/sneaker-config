var express = require("express");
var router = express.Router();

// Importeer controllers
const ordersController = require("../../../controllers/api/v1/orders.js");
const admin = require("../../../middleware/admin.js");

// Haalt alle bestellingen op, met optionele sortering
router.get("/", ordersController.getAll);

// Haalt details op voor één specifieke bestelling
router.get("/:id", ordersController.get);

// Voegt een bestelling toe aan het systeem
router.post("/", ordersController.create);

// Update de status van een bestelling (admin-only)
router.put("/:id", admin, ordersController.update);
router.patch("/:id", admin, ordersController.update);

// Verwijdert een bestelling (admin-only)
router.delete("/:id", admin, ordersController.remove);

module.exports = router;