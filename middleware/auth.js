const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Access denied. User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticate;
