const plantService = require("../services/plant.service");

class PlantController {
  async createPlant(req, res) {
    try {
      const plant = await plantService.createPlant({
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).json({
        success: true,
        data: plant,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserPlants(req, res) {
    try {
      const plants = await plantService.findPlantsByUserId(req.user.id);
      res.json({
        success: true,
        data: plants,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getPlantById(req, res) {
    try {
      const { id } = req.params;
      const plant = await plantService.findPlantById(id);

      if (!plant) {
        return res.status(404).json({
          success: false,
          message: "Plant not found",
        });
      }

      res.json({
        success: true,
        data: plant,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updatePlant(req, res) {
    try {
      const { id } = req.params;
      const plant = await plantService.updatePlant(id, req.body);

      if (!plant) {
        return res.status(404).json({
          success: false,
          message: "Plant not found",
        });
      }

      res.json({
        success: true,
        message: "Plant updated successfully",
        data: plant,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deletePlant(req, res) {
    try {
      const { id } = req.params;
      const deleted = await plantService.deletePlant(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Plant not found",
        });
      }

      res.json({
        success: true,
        message: "Plant deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async likePlant(req, res) {
    try {
      const { Like } = require("../models/index");
      const { id } = req.params;
      const userId = req.user.id;

      const existingLike = await Like.findOne({
        where: { userId, plantId: id },
      });

      if (existingLike) {
        await existingLike.destroy();
        res.json({
          success: true,
          message: "Plant unliked",
          data: { is_liked: false },
        });
      } else {
        await Like.create({ userId, plantId: id });
        res.json({
          success: true,
          message: "Plant liked",
          data: { is_liked: true },
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

// ✅ CRITICAL: Export with 'new'
module.exports = new PlantController();
