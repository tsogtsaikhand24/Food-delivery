// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../schemas/userSchema");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  try {
    // 1) Try cookie first (recommended)
    let token = req.cookies && req.cookies.jwt;

    // 2) Fallback: Authorization header Bearer <token>
    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user; // downstream-д ашиглана
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
