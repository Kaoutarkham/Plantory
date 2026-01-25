const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth");

router.post(
  "/register",
  upload.single("profilePicture"),
  userController.register,
);
router.post("/login", userController.login);
router.get("/profile/:id", auth, userController.getProfile);

module.exports = router;
