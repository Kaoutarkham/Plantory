const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plant.controller");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");

router.post("/add", auth, upload.single("image"), plantController.addPlant);
router.get("/my-plants", auth, plantController.getUserPlants);

router.post("/like", auth, plantController.addLike);


router.post("/comment", auth, plantController.addComment);

module.exports = router;
