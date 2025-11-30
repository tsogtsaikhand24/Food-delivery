// routes/userRoutes.js
const express = require("express");
const router = express.Router();

// controllers-д байгаа бүх функцийг авч байна
const userCtrl = require("../controllers/userController"); // таны хавтасны бүтэц дагах хэрэгтэй

// (OPTIONAL) хэрэв middleware ашиглах бол энд require хийгээд доор ашиглана:
// const auth = require('../middleware/auth');

// GET /users      - Get all users
router.get("/", /* auth, */ userCtrl.getUsers);

// GET /users/:id  - Get single user by id
router.get("/:id", /* auth, */ userCtrl.getUserById);

// POST /users     - Create new user (public or protected by admin)
router.post("/", /* auth, */ userCtrl.createUser);

// PUT /users/:id  - Update user by id
router.put("/:id", /* auth, */ userCtrl.updateUser);

// DELETE /users/:id - Delete user by id
router.delete("/:id", /* auth, */ userCtrl.deleteUser);

module.exports = router;
