// // // routes/userRoutes.js
// // const express = require("express");
// // const router = express.Router();

// // router.get("/", (req, res) => {
// //   res.send("Get all users");
// // });

// // // Create
// // router.post("/", (req, res) => {
// //   // req.body-д байгаа өгөгдлийг ашиглана
// //   console.log("POST body:", req.body);
// //   res.send("post ajiljbna");
// // });

// // // Update by id
// // router.put("/:id", (req, res) => {
// //   console.log("PUT params:", req.params, "body:", req.body);
// //   res.send(`put route is working for id=${req.params.id}`);
// // });

// // // (Хэрвээ root PUT хэрэгтэй бол яг хэрэгцээтэй бол нэмнэ, гэхдээ REST-д ихэнх тохиолдолд :id ашиглана)
// // // router.put("/", (req, res) => { res.send("put route is working"); });

// // // Delete by id
// // router.delete("/:id", (req, res) => {
// //   console.log("DELETE params:", req.params);
// //   res.send(`delete route is working for id=${req.params.id}`);
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const User = require("../schemas/userSchema"); // та энэ path-ыг шалга

// // Get all
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Create
// router.post("/", async (req, res) => {
//   try {
//     const { firstName, email } = req.body;
//     if (!email) return res.status(400).json({ error: "Email required" });

//     // duplicate шалгах
//     const existing = await User.findOne({ email });
//     if (existing)
//       return res
//         .status(200)
//         .json({ message: "Already exists", data: existing });

//     const user = await User.create({ firstName, email });
//     console.log("Created user:", user);
//     res.status(201).json({ message: "Created", data: user });
//   } catch (err) {
//     console.error("POST /users error:", err);
//     // хэрвээ duplicate key эсвэл бусад алдаа байвал дэлгэрэнгүйгээр илгээнэ
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// });

// // Update, Delete (хоёр нь хэвээр)
// router.put("/:id", (req, res) => {
//   console.log("PUT params:", req.params, "body:", req.body);
//   res.send(`put route is working for id=${req.params.id}`);
// });
// router.delete("/:id", (req, res) => {
//   console.log("DELETE params:", req.params);
//   res.send(`delete route is working for id=${req.params.id}`);
// });

// module.exports = router;
// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userCtrl = require("./../controller/userController");

// CRUD
router.get("/", userCtrl.getUsers);
router.get("/:id", userCtrl.getUserById);
router.post("/", userCtrl.createUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
