const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth"); // Your shared security guard
const upload = require("../middlewares/multer"); // Your existing Multer setup
const plantController = require("../controllers/plant.controller");

// Route to add a plant (Protected by Auth)
router.post("/add", auth, upload.single("image"), plantController.addPlant);

// Route to get the grid (Protected by Auth)
router.get("/my-plants", auth, plantController.getUserPlants);

module.exports = router;
