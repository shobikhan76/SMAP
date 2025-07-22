const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register new store manager
// @route   POST /api/users/register
// @access  Admin only
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, store } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({
      name,
      email,
      password,
      role,
      store: role === 'storeManager' ? store : null,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Login user and get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('store');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      store: user.store,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Admin only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('store');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
