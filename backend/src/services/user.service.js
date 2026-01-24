const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const createUser = async (userData) => {
  // Hash du mot de passe (Sécurité pour le jury)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  // Utilisation des noms exacts de ton pgAdmin
  return await User.create({
    fullName: userData.fullName,
    email: userData.email,
    password: hashedPassword,
    gender: userData.gender,
    birthday: userData.birthday, // Nouveau champ
    profileImage: userData.profileImage, // Chemin de la photo
  });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  createUser,
  findUserByEmail,
};
