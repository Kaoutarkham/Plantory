const { Plant } = require("../models/index");

class PlantService {
  async createPlant(plantData) {
    return await Plant.create(plantData);
  }

  async findPlantsByUserId(userId) {
    return await Plant.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  }
}

module.exports = new PlantService();
