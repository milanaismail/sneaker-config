const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/auth');
const ordersController = require('../../controllers/orders');

// Beveiligde route, vereist dat de gebruiker ingelogd is
router.get('/', authenticate, ordersController.getAll);

module.exports = router;
