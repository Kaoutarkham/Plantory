const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth");

// Vérifie que userController.register existe bien !
router.post(
  "/register",
  upload.single("profileImage"),
  userController.register,
);

router.post("/login", userController.login);

// Vérifie que le nom 'getProfile' est identique dans le contrôleur
router.get("/profile/:id", userController.getProfile);
router.get("/profile", auth, userController.getProfile);

module.exports = router;
