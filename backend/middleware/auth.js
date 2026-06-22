const jwt = require("jsonwebtoken");

// Use this to protect routes that require login (creating posts, comments, voting).
// Day 2 task: wire this into routes/auth.js after building signup/login.
function verifyToken(req, res, next) {
  const header = req.headers.authorization; // expects "Bearer <token>"

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, ... } — whatever you sign in routes/auth.js
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { verifyToken };
