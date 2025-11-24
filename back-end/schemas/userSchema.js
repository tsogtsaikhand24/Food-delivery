// const { model, Schema } = require("mongoose");

// const userSchema = new Schema({
//   firstName: { type: String, required: [true, "First name is required"] },
//   email: { type: String, required: [true, "Email is required"] },
// });

// const userModel = model("User", userSchema);
// module.exports = userModel;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
