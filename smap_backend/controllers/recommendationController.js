const Recommendation = require('../models/Recommendation');

const createRecommendation = async (req, res) => {
  try {
    const { store, products, generatedBy } = req.body;

    if (!store || !products || !generatedBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const recommendation = await Recommendation.create({
      store,
      products,
      generatedBy,
    });

    res.status(201).json(recommendation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find({}).populate('store', 'name');
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecommendationsByStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const recommendations = await Recommendation.find({ store: storeId }).populate('store', 'name');
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRecommendation = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, generatedBy } = req.body;

    const updated = await Recommendation.findByIdAndUpdate(
      id,
      { products, generatedBy },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Recommendation not found' });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRecommendation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Recommendation.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Recommendation not found' });
    res.status(200).json({ message: 'Recommendation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecommendation,
  getRecommendationsByStore,
  getAllRecommendations,
  updateRecommendation,
  deleteRecommendation,
};