const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth"); // 1. Added your security guard

// --- PUBLIC ROUTES ---

// Register with profile picture upload
router.post(
  "/register",
  upload.single("profilePicture"),
  userController.register,
);

// Login to get the JWT Token
router.post("/login", userController.login);

// --- PRIVATE ROUTES ---

// Get User Profile + Plant Grid (Requires Token)
router.get("/profile", auth, userController.getProfile); // 2. Added the profile route

module.exports = router;
