// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../schemas/userSchema");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// helper to sign token
function signToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// POST /auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(user._id);

    // Option A: send token in HTTP-only cookie (recommended)
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // https only in production
      sameSite: "lax", // or 'none' if cross-site with secure
      maxAge: 1000 * 60 * 60, // 1 hour in ms (match JWT_EXPIRES_IN)
    });

    // also send limited user info
    res.json({
      message: "Logged in",
      data: { id: user._id, email: user.email },
    });

    // Option B (alternative): res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST /auth/logout
exports.logout = (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "lax" });
  res.json({ message: "Logged out" });
};
