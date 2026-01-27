class PlantService {
  get Plant() {
    return require("../models/index").Plant;
  }

  get User() {
    return require("../models/index").User;
  }

  async createPlant(plantData) {
    return await this.Plant.create(plantData);
  }

  async findPlantsByUserId(userId) {
    return await this.Plant.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: this.User,
          as: "owner",
          attributes: ["id", "username", "avatar_url"],
        },
      ],
    });
  }

  async findPlantById(id) {
    return await this.Plant.findByPk(id, {
      include: [
        {
          model: this.User,
          as: "owner",
          attributes: ["id", "username", "avatar_url"],
        },
      ],
    });
  }

  async updatePlant(id, updates) {
    await this.Plant.update(updates, { where: { id } });
    return await this.findPlantById(id);
  }

  async deletePlant(id) {
    const plant = await this.Plant.findByPk(id);
    if (!plant) return null;
    await plant.destroy();
    return true;
  }
}

module.exports = new PlantService();
