// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./db"); // таны db.js
const userRouter = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes"); // байх ёстой эсэхийг шалга

const app = express();
const PORT = process.env.PORT || 1111;

// Middleware: json first
app.use(express.json());

// CORS: frontend origin-ыг зааж, cookie ашиглах бол credentials: true
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Cookie parser (must be before routes that need cookies)
app.use(cookieParser());

// Connect DB
connectToDB();

// Routes (mount before listen)
app.use("/auth", authRoutes); // auth route байгаа бол эхлээд mount хийгээд
app.use("/users", userRouter);

// simple root
app.get("/", (req, res) => res.send("Server is running"));

// Global error handler (optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Server error' });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
