// middleware/admin.js

module.exports = (req, res, next) => {
  try {
    // Assuming you have a `user` object in the request, e.g., from a JWT middleware
    const user = req.user; 

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // If the user is an admin, continue to the next middleware or route
    next();
  } catch (error) {
    console.error("Error in admin middleware:", error);
    res.status(500).json({ message: "Internal server error in admin middleware." });
  }
};
