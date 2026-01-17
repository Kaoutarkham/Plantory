const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Matches your folder name: 'middlewares'
const upload = require("../middlewares/multer");

// The 'profilePicture' key must match your Postman 'Key' column
router.post(
  "/register",
  upload.single("profilePicture"),
  userController.register
);

module.exports = router;
