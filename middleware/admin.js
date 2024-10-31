const admin = (req, res, next) => {
  const isAdmin = true; 

  if (!isAdmin) {
    return res.status(403).json({ message: "Admin privileges required" });
  }
  next();
};

module.exports = admin;
