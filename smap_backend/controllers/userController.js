const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const Store = require('../models/Store');


// @desc    Register new store manager or admin
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

// @desc    Login user and return token
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

// @desc    Get all users
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

// ✅ NEW: Delete a user by ID
// @route   DELETE /api/users/:id
// @access  Admin only
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET /api/stores (only for store managers)
const getStoreByManager = async (req, res) => {
  try {
    const store = await Store.findOne({ manager: req.user._id }).populate('manager', 'name');
    if (!store) return res.status(404).json({ message: 'No store assigned to this user' });

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getStoreByManager // exported here
};
