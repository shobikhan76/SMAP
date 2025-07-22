const TelcoTrend = require('../models/TelcoTrendLog');

// Add or update trend (based on store + recordedAt + category)
const addOrUpdateTelcoTrend = async (req, res) => {
  try {
    const { store, category, trendScore, recordedAt } = req.body;

    let trend = await TelcoTrend.findOne({ store, recordedAt, category });

    if (trend) {
      trend.trendScore = trendScore;
      await trend.save();
    } else {
      trend = await TelcoTrend.create({ store, category, trendScore, recordedAt });
    }

    res.status(200).json(trend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all trends for a store
const getTelcoTrendsByStore = async (req, res) => {
  try {
    const trends = await TelcoTrend.find({ store: req.params.storeId }).sort({ recordedAt: 1 });
    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrUpdateTelcoTrend,
  getTelcoTrendsByStore,
};
