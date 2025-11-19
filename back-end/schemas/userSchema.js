const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: { type: String, required: [true, "First name is required"] },
  email: { type: String, required: [true, "Email is required"] },
});

const userModel = model("User", userSchema);
module.exports = userModel;
