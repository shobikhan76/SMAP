const mongoose = require('mongoose');
const Store = require('../models/Store');

// Create a store
const createStore = async (req, res) => {
  try {
    const { name, category, floor, manager } = req.body;

    if (manager && !mongoose.Types.ObjectId.isValid(manager)) {
      return res.status(400).json({ message: 'Invalid manager ID' });
    }

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

// Update a store
const updateStore = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If manager is included, validate ObjectId
    if (updateData.manager && !mongoose.Types.ObjectId.isValid(updateData.manager)) {
      return res.status(400).json({ message: 'Invalid manager ID' });
    }

    const store = await Store.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!store) return res.status(404).json({ message: 'Store not found' });

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a store
const deleteStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json({ message: 'Store deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get the current store for the logged-in Store Manager
const getMyStore = async (req, res) => {
  try {
    const userId = req.user._id;

    const store = await Store.findOne({ manager: userId }).populate('manager', 'name email');
    if (!store) {
      return res.status(404).json({ message: 'Store not found for this manager.' });
    }

    res.status(200).json(store);
  } catch (err) {
    console.error('Error in getMyStore:', err);
    res.status(500).json({ message: 'Server error while fetching store.' });
  }
};

module.exports = {
  getMyStore, 
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
};
