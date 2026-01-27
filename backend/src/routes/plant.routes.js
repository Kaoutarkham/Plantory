const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plant.controller");
const { authenticateToken } = require("../middlewares/authMiddleware");

// All routes require authentication
router.use(authenticateToken);

// Plant CRUD
router.post("/", plantController.createPlant);
router.get("/", plantController.getUserPlants);

module.exports = router;
