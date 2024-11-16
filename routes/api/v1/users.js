var express = require("express");
var router = express.Router();
const usersController = require("../../../controllers/api/v1/users");
const auth = require("../../../middleware/auth");

// POST /api/v1/users/register - Register a new user
router.post("/register", usersController.register);

// POST /api/v1/users/login - Log in a user
router.post("/login", usersController.login);

// POST /api/v1/users/logout - Log out the user (authenticated)
router.post("/logout", auth, usersController.logout);

// PUT /api/v1/users/password - Update password (authenticated)
router.put("/password", auth, usersController.updatePassword);

module.exports = router;
