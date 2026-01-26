const plantService = require("../services/plant.service");
const path = require("path");
const { Like, Comment, User } = require("../models/index");

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

    const formattedPlants = await Promise.all(
      plants.map(async (plant) => {
        const p = plant.toJSON();

        const likesCount = await Like.count({ where: { plantId: p.id } });
        const commentsCount = await Comment.count({ where: { plantId: p.id } });

        if (p.image) {
          const filename = path.basename(p.image);
          p.image = `${baseUrl}/${filename}`;
        }

        return {
          ...p,
          likesCount,
          commentsCount,
        };
      }),
    );

    res.status(200).json(formattedPlants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching plants", error: error.message });
  }
};

exports.addLike = async (req, res) => {
  try {
    const { plantId } = req.body;
    const userId = req.userId;

    const existingLike = await Like.findOne({ where: { userId, plantId } });
    if (existingLike) {
      return res.status(200).json({ message: "Already liked" });
    }

    await Like.create({ userId, plantId });
    res.status(201).json({ message: "Like added!" });
  } catch (error) {
    res.status(500).json({ message: "Error liking", error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { plantId, content } = req.body;
    const userId = req.userId;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const newComment = await Comment.create({
      content,
      userId,
      plantId,
    });

    res.status(201).json({ message: "Comment added!", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Error commenting", error: error.message });
  }
};
