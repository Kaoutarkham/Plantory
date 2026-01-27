class UserController {
  async register(req, res) {
    try {
      const { User } = require("../models/index");
      const bcrypt = require("bcrypt");
      const { username, email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({
        success: false,
        message: "Error creating user",
        error: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { User } = require("../models/index");
      const bcrypt = require("bcrypt");
      const jwt = require("jsonwebtoken");
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.json({
        success: true,
        message: "Login successful",
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar_url: user.avatar_url,
            bio: user.bio,
          },
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Error logging in",
        error: error.message,
      });
    }
  }

  async getProfile(req, res) {
    try {
      const { User } = require("../models/index");
      const userId = req.user.id;

      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching profile",
        error: error.message,
      });
    }
  }

  async updateProfile(req, res) {
    try {
      const { User } = require("../models/index");
      const userId = req.user.id;
      const { username, bio, avatar_url } = req.body;

      const updates = {};
      if (username) updates.username = username;
      if (bio !== undefined) updates.bio = bio;
      if (avatar_url) updates.avatar_url = avatar_url;

      await User.update(updates, {
        where: { id: userId },
      });

      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({
        success: false,
        message: "Error updating profile",
        error: error.message,
      });
    }
  }
}

// ✅ IMPORTANT: Export a new instance
module.exports = new UserController();
