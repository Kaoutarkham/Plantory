const plantService = require("../services/plant.service");
const path = require("path"); 

exports.addPlant = async (req, res) => {
  try {
    const { name } = req.body;

    
    const imageFilename = req.file ? req.file.filename : null;

    const newPlant = await plantService.createPlant({
      name,
      image: imageFilename,
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
    const plants = await plantService.findPlantsByUserId(req.userId);

    const protocol = req.protocol;
    const host = req.get("host");
    const baseUrl = `${protocol}://${host}/uploads`; 

    const formattedPlants = plants.map((plant) => {
      const p = plant.toJSON();
      if (p.image) {
        const filename = path.basename(p.image);
        p.image = `${baseUrl}/${filename}`;
      }
      return p;
    });

    res.status(200).json(formattedPlants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching plants", error: error.message });
  }
};
