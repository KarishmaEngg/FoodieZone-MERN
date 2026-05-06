import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error during registration", error: error.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Find user by email
    const user = await User.findOne({ email });
    
    // 2. Compare password with hashed password in DB
    if (user && (await bcrypt.compare(password, user.password))) {
      // ✅ Generate Token using JWT_SECRET from .env
      const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET || 'secret', 
        { expiresIn: '1d' }
      );

      // ✅ Send token and user info (excluding password)
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } else {
      // ❌ Generic error for security
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error during login", error: error.message });
  }
};

// Get All Users (Optional)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Password hide karke bhejega
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};