const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create user (password will be hashed automatically by the pre-save hook)
    const user = await User.create({ username, email, password });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Registration error:", error); // Debugging
    res.status(500).json({ error: "Failed to register user" });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt for email:", email); // Debugging

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found"); // Debugging
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password using the comparePassword method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Password mismatch"); // Debugging
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error); // Debugging
    res.status(500).json({ error: "Failed to login" });
  }
};

module.exports = { register, login };