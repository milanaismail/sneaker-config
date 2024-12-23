const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
require("dotenv").config(); // Load environment variables

const SECRET_KEY = process.env.SECRET_KEY;

// POST /api/admin/add - Add a new admin
router.post("/add", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({ email, password: hashedPassword, role: "admin" });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
});

// POST /api/admin/login - Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt for:", email); // Debugging log
    const admin = await User.findOne({ email, role: "admin" });
    console.log("Admin found:", admin);

    if (!admin) {
        console.log("Admin not found or unauthorized");
      return res.status(403).json({ message: "Unauthorized" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log("Password valid:", isPasswordValid); // Log password comparison result

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.SECRET_KEY || "your_secret_key",
      { expiresIn: "1h" }
    );
    console.log("Token generated successfully");

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/test", (req, res) => {
  res.send("Admin route is working");
});

module.exports = router;