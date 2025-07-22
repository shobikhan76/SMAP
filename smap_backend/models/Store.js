const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  floor: String,
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // can be assigned later
  },
}, {
  timestamps: true,
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
