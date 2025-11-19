const express = require("express");
const cors = require("cors");
const connectToDB = require("./db");
const userModel = require("./schemas/userSchema");

const userRouter = require("./routes/userRoutes");

const PORT = process.env.PORT || 1111;
const app = express();

app.use(cors());
app.use(express.json());

connectToDB();

app.get("/", async (req, res) => {
  console.log(req.body, "req");
  const { firstName, email } = req.body;
  const data = await userModel.create({
    firstName: firstName,
    email: email,
  });
  console.log(data);
  res.json("Server is orjiasdasdasna running");
});

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
