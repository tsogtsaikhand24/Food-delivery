// // const { model, Schema } = require("mongoose");

// // const userSchema = new Schema({
// //   firstName: { type: String, required: [true, "First name is required"] },
// //   email: { type: String, required: [true, "Email is required"] },
// // });

// // const userModel = model("User", userSchema);
// // module.exports = userModel;

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String },
//     email: { type: String, required: true, unique: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);

// schemas/userSchema.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => /^\S+@\S+\.\S+$/.test(v),
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    phoneNumber: { type: String, trim: true },
    address: { type: String, trim: true },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    orderedFoods: [{ type: Schema.Types.ObjectId, ref: "Food" }],
    ttl: { type: Date, default: null }, // optional expire date
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// TTL index: document will expire when 'ttl' date is reached (expireAfterSeconds: 0)
userSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

// Don't return password by default when converting to JSON
userSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  },
});
userSchema.set("toObject", {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
