// controllers/userController.js
const bcrypt = require("bcryptjs");
const User = require("../schemas/userSchema"); // таны схем энэ path-д байгааг шалга

// helper: password-г hash хийх
async function hashPasswordIfPresent(data) {
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
  }
  return data;
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("GET /users error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("GET /users/:id error:", err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ error: "Invalid id" });
    res.status(500).json({ error: "Server error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, firstName, phoneNumber, address, role, ttl } =
      req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing)
      return res.status(409).json({ error: "Email already exists" });

    const toCreate = {
      email: email.toLowerCase().trim(),
      password,
      firstName,
      phoneNumber,
      address,
      role,
      ttl,
    };
    await hashPasswordIfPresent(toCreate);

    const user = await User.create(toCreate);
    res.status(201).json({ message: "User created", data: user });
  } catch (err) {
    console.error("POST /users error:", err);
    if (err.name === "ValidationError")
      return res
        .status(400)
        .json({ error: "Validation error", details: err.message });
    if (err.code === 11000)
      return res
        .status(409)
        .json({ error: "Duplicate key", details: err.keyValue });
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update = { ...req.body };
    if (update.email) update.email = update.email.toLowerCase().trim();
    await hashPasswordIfPresent(update);

    const updated = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated", data: updated });
  } catch (err) {
    console.error("PUT /users/:id error:", err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ error: "Invalid id" });
    if (err.name === "ValidationError")
      return res
        .status(400)
        .json({ error: "Validation error", details: err.message });
    if (err.code === 11000)
      return res
        .status(409)
        .json({ error: "Duplicate key", details: err.keyValue });
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted", data: deleted });
  } catch (err) {
    console.error("DELETE /users/:id error:", err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ error: "Invalid id" });
    res.status(500).json({ error: "Server error" });
  }
};
