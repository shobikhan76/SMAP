const mongoose = require('mongoose');

const telcoTrendSchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  trendScore: {
    type: Number,
    required: true,
    default: 0,
  },
  recordedAt: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const TelcoTrend = mongoose.model('TelcoTrend', telcoTrendSchema);
module.exports = TelcoTrend;
