const User = require("../models/user.model");
const { sequelize } = require("../config/database"); // Grabs the connection from your database.js
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// FIX: Instead of re-initializing the model, we get it from sequelize.models
const Plant = sequelize.models.Plant;

// --- REGISTER ---
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, gender, birthday } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the path to the uploaded file from Multer
    const profilePicture = req.file ? req.file.path : null;

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      gender,
      birthday,
      profilePicture,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, fullName: newUser.fullName },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// --- LOGIN ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" },
    );

    res
      .status(200)
      .json({ message: "Login successful", token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- GET PROFILE (With Plants Grid) ---
exports.getProfile = async (req, res) => {
  try {
    // Ensure the relationship is defined so we can include plants
    User.hasMany(Plant, { foreignKey: "userId", as: "plants" });
    Plant.belongsTo(User, { foreignKey: "userId" });

    const user = await User.findByPk(req.userId, {
      attributes: ["fullName", "email", "profilePicture", "gender", "birthday"],
      include: [
        {
          model: Plant,
          as: "plants",
          attributes: ["id", "name", "image", "createdAt"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
};
