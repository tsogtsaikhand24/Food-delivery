// routes/userRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get all users");
});

// Create
router.post("/", (req, res) => {
  // req.body-д байгаа өгөгдлийг ашиглана
  console.log("POST body:", req.body);
  res.send("post ajiljbna");
});

// Update by id
router.put("/:id", (req, res) => {
  console.log("PUT params:", req.params, "body:", req.body);
  res.send(`put route is working for id=${req.params.id}`);
});

// (Хэрвээ root PUT хэрэгтэй бол яг хэрэгцээтэй бол нэмнэ, гэхдээ REST-д ихэнх тохиолдолд :id ашиглана)
// router.put("/", (req, res) => { res.send("put route is working"); });

// Delete by id
router.delete("/:id", (req, res) => {
  console.log("DELETE params:", req.params);
  res.send(`delete route is working for id=${req.params.id}`);
});

module.exports = router;
