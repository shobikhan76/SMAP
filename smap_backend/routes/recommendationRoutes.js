/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: Get all recommendations
 *     tags: [Recommendations]
 *     responses:
 *       200:
 *         description: Success
 */





const express = require('express');


const router = express.Router();

const {
  createRecommendation,
  getRecommendationsByStore,
} = require('../controllers/recommendationController');

const { protect } = require('../middleware/authMiddleware');

router.post('/createRecommendation', protect, createRecommendation);
router.get('/:storeId', protect, getRecommendationsByStore);

module.exports = router;
