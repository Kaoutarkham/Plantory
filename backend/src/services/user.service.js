const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const createUser = async (userData) => {
  // Hash the password before saving to the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  return await User.create({
    ...userData,
    password: hashedPassword,
  });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  createUser,
  findUserByEmail,
};
