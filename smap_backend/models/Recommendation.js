const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  products: [
    {
      type: String,
      required: true,
    }
  ],
  generatedBy: {
    type: String,
    enum: ['system', 'admin'],
    default: 'system',
  },
}, {
  timestamps: true,
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
module.exports = Recommendation;
