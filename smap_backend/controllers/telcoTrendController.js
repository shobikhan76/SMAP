const mongoose = require('mongoose');
const TelcoTrend = require('../models/TelcoTrendLog');
const Store = require('../models/Store');

// Add or update a telco trend
const addOrUpdateTelcoTrend = async (req, res) => {
  try {
    const { store, category, trendScore, recordedAt } = req.body;

    if (!mongoose.Types.ObjectId.isValid(store)) {
      return res.status(400).json({ message: 'Invalid store ID' });
    }

    const existingStore = await Store.findById(store);
    if (!existingStore) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const trend = await TelcoTrend.findOneAndUpdate(
      { store, category, recordedAt },
      { trendScore },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(trend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all trends for a specific store
const getTelcoTrendsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return res.status(400).json({ message: 'Invalid store ID' });
    }

    const trends = await TelcoTrend.find({ store: storeId }).sort({ recordedAt: 1 });
    res.status(200).json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all telco trends across all stores
const getAllTelcoTrends = async (req, res) => {
  try {
    const trends = await TelcoTrend.find().sort({ recordedAt: -1 }).populate('store', 'name category');
    res.status(200).json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// DELETE a telco trend by ID
const deleteTelcoTrend = async (req, res) => {
  try {
    const { trendId } = req.params;

    const deleted = await TelcoTrend.findByIdAndDelete(trendId);
    if (!deleted) return res.status(404).json({ message: 'Trend not found' });

    res.status(200).json({ message: 'Trend deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update a telco trend by ID
const updateTelcoTrendById = async (req, res) => {
  try {
    const { trendId } = req.params;
    const { category, trendScore, recordedAt } = req.body;

    const updated = await TelcoTrend.findByIdAndUpdate(
      trendId,
      { category, trendScore, recordedAt },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Trend not found' });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrUpdateTelcoTrend,
  getTelcoTrendsByStore,
  getAllTelcoTrends,
  deleteTelcoTrend,
  updateTelcoTrendById,
};

