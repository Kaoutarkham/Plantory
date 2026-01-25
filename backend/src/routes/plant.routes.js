const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plant.controller");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");

router.post("/add", auth, upload.single("image"), plantController.addPlant);

router.get("/my-plants", auth, plantController.getUserPlants);

module.exports = router;
