const express = require("express");
const router = express.Router();
const ordersController = require("../../../controllers/api/v1/orders");

router.get("/", ordersController.getAll);

router.post("/", ordersController.create);

router.put("/:id", ordersController.update);

router.delete("/:id", ordersController.remove);

module.exports = router;
