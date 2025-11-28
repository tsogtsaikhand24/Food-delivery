// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./db"); // таны db.js
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 1111;

app.use(cors());
app.use(express.json());

connectToDB();

app.use("/users", userRouter);

app.get("/", (req, res) => res.send("Server is running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
