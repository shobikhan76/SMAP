const mongoose = require('mongoose');

const walkInLogSchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

const WalkInLog = mongoose.model('WalkInLog', walkInLogSchema);
module.exports = WalkInLog;
