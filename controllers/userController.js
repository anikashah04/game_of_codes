import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Create new user
    const user = new User({ name, email, password, age, role });
    
    // Save user and generate token using schema method
    const token = await user.generateAuthToken();

    // Return user without password and tokens
    res.status(201).json({ user: user.toJSON(), token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({
      error: err.code === 11000 ? "Email already exists" : "Registration failed",
      details: err.message
    });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Authenticate using schema static method
    const user = await User.authenticate(email.toLowerCase(), password);

    // Generate a new token
    const token = await user.generateAuthToken();

    res.json({ user: user.toJSON(), token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(401).json({ error: "Invalid credentials", details: err.message });
  }
};

// Read all users
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

// Read user by ID
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json(user);
};

// Update user
export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(user);
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete user", error: error.message });
  }
};

// Logout current session
export const logoutUser = async (req, res) => {
  try {
    const user = req.user; // set by auth middleware
    const token = req.token;

    // Remove the current token from the user's tokens array
    user.tokens = user.tokens.filter(t => t.token !== token);
    await user.save();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Logout failed", details: err.message });
  }
};
