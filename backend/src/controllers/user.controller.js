const User = require("../models/user.model"); // Adjust path to your model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, gender, birthday } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Get the file path if an image was uploaded via Multer
    const profilePicture = req.file ? req.file.path : null;

    // 4. Create the user in the database
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      gender, // Received as a single string from the frontend
      birthday, // Received as a single string
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
