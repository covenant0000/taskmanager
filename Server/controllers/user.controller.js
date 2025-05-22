// Temporary in-memory user store (replace with DB later)
const users = [];

exports.signup = (req, res) => {
  const { username, password } = req.body;

  // Simple check
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // Check if user exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Add new user
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);

  res.status(201).json({ message: "User registered", user: newUser });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Login successful", user });
};

const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // fetch all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};