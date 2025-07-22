const Recommendation = require('../models/Recommendation');

// Create new recommendation
const createRecommendation = async (req, res) => {
  try {
    const { store, products, generatedBy } = req.body;
    const newRecommendation = await Recommendation.create({
      store,
      products,
      generatedBy,
    });

    res.status(201).json(newRecommendation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all recommendations for a store
const getRecommendationsByStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const recommendations = await Recommendation.find({ store: storeId });
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecommendation,
  getRecommendationsByStore,
};
