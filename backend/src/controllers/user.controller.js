const { User, Plant } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path"); 

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, gender, birthday } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImage = req.file ? req.file.filename : null;

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      gender,
      birthday,
      profileImage,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: "Register Error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" },
    );
    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["fullName", "email", "profileImage", "gender", "birthday"],
      include: [{ model: Plant, as: "plants" }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const protocol = req.protocol;
    const host = req.get("host");
    const baseUrl = `${protocol}://${host}/uploads`;

    const userJson = user.toJSON();

    if (userJson.profileImage) {
      const filename = path.basename(userJson.profileImage);
      userJson.profileImage = `${baseUrl}/${filename}`;
    }

    if (userJson.plants && userJson.plants.length > 0) {
      userJson.plants = userJson.plants.map((plant) => ({
        ...plant,
        image: plant.image ? `${baseUrl}/${path.basename(plant.image)}` : null,
      }));
    }

    res.json(userJson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
