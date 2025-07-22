const WalkInLog = require('../models/WalkInLog');

// Create or update walk-in log
const addOrUpdateWalkIn = async (req, res) => {
  try {
    const { store, date, count } = req.body;

    let log = await WalkInLog.findOne({ store, date });

    if (log) {
      log.count = count;
      await log.save();
    } else {
      log = await WalkInLog.create({ store, date, count });
    }

    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logs for a specific store
const getWalkInsByStore = async (req, res) => {
  try {
    const logs = await WalkInLog.find({ store: req.params.storeId }).sort({ date: 1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrUpdateWalkIn,
  getWalkInsByStore,
};
