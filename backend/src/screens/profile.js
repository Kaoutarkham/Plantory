const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Plant = require("../models/plant.model");
const auth = require("../middlewares/auth");

// Route pour récupérer le profil complet (Sara Green)
router.get("/", auth, async (req, res) => {
  try {
    // 1. Chercher l'utilisateur avec ses plantes associées
    const userProfile = await User.findByPk(req.userId, {
      attributes: ["fullName", "email", "profileImage", "gender", "birthday"],
      include: [
        {
          model: Plant,
          as: "plants", // Doit correspondre à l'alias dans ton modèle
          attributes: ["id", "name", "image", "createdAt"],
        },
      ],
    });

    if (!userProfile) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // 2. Envoyer les données au format JSON pour la grille mobile
    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
