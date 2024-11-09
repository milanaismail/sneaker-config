// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const auth = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);
router.post("/change-password", auth, authController.changePassword);

module.exports = router;
