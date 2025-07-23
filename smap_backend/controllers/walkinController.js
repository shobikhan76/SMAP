const WalkInLog = require('../models/WalkInLog');

// Create or update walk-in log
const addOrUpdateWalkIn = async (req, res) => {
  try {
    const { store, date, count } = req.body;

    if (!store || !date || count === undefined) {
      return res.status(400).json({ message: 'store, date, and count are required' });
    }

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

// Admin: Get all logs
const getAllWalkIns = async (req, res) => {
  try {
    const logs = await WalkInLog.find().sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteWalkIn = async (req, res) => {
  try {
    await WalkInLog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  addOrUpdateWalkIn,
  getWalkInsByStore,
  getAllWalkIns,
  deleteWalkIn
};
