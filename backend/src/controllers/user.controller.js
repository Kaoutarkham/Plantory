const User = require("../models/user.model");
const { sequelize } = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Plant = sequelize.models.Plant;

// --- INSCRIPTION ---
exports.register = async (req, res) => {
  /* ... ton code ... */
};

// --- CONNEXION ---
exports.login = async (req, res) => {
  /* ... ton code ... */
};

// --- PROFIL (Vérifie bien le nom ici) ---
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.userId;
    const user = await User.findByPk(userId, {
      attributes: ["fullName", "email", "profileImage"],
      include: [{ model: Plant, as: "plants" }],
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
