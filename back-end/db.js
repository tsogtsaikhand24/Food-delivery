const mongoose = require("mongoose");

const connecToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Tsogtsaikhan:mongolia78A$@food-delivery.4hf0bnf.mongodb.net/?appName=Food-Delivery"
    );
    console.log("DATABASE connection successful");
  } catch (err) {
    console.log("DATABASE connection failed", err);
  }
};
module.exports = connecToDB;
