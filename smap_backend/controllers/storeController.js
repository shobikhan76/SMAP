const Store = require('../models/Store');

// Create a store (admin only)
const createStore = async (req, res) => {
  try {
    const { name, category, floor, manager } = req.body;

    const store = await Store.create({ name, category, floor, manager });
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all stores
const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().populate('manager', 'name email');
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get store by ID
const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).populate('manager', 'name email');
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
};
