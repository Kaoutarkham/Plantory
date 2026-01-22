const { sequelize } = require("../config/database");

const Plant = sequelize.models.Plant;

exports.addPlant = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.path : null;

    // req.userId comes from your auth middleware (protect route)
    const newPlant = await Plant.create({
      name,
      image,
      userId: req.userId,
    });

    res.status(201).json({
      message: "Plant added successfully!",
      plant: newPlant,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding plant", error: error.message });
  }
};


exports.getUserPlants = async (req, res) => {
  try {
    const plants = await Plant.findAll({
      where: { userId: req.userId },
    });
    res.status(200).json(plants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching plants", error: error.message });
  }
};
