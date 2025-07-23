const express = require('express');
const router = express.Router();

const {
  createRecommendation,
  getAllRecommendations,
  getRecommendationsByStore,
  updateRecommendation,
  deleteRecommendation
} = require('../controllers/recommendationController');

const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: APIs for product recommendations
 */

/**
 * @swagger
 * /api/recommendations/generate:
 *   post:
 *     summary: Create a new recommendation (automated logic)
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - store
 *               - products
 *               - generatedBy
 *             properties:
 *               store:
 *                 type: string
 *                 example: "64bfa324d174f9a7f4a0ed91"
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Shampoo", "Face Wash"]
 *               generatedBy:
 *                 type: string
 *                 enum: [admin, system]
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Recommendation created
 *       400:
 *         description: Missing required fields
 */
router.post('/generate', protect, createRecommendation);

/**
 * @swagger
 * /api/recommendations:
 *   get:
 *     summary: Get all recommendations
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of recommendations
 */
router.get('/', protect, getAllRecommendations);

/**
 * @swagger
 * /api/recommendations/{storeId}:
 *   get:
 *     summary: Get recommendations by store
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: storeId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store-specific recommendations
 */
router.get('/:storeId', protect, getRecommendationsByStore);

/**
 * @swagger
 * /api/recommendations/update/{id}:
 *   put:
 *     summary: Update a recommendation by ID
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Recommendation ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["New Product 1", "New Product 2"]
 *               generatedBy:
 *                 type: string
 *                 enum: [admin, system]
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Updated recommendation
 *       404:
 *         description: Recommendation not found
 */
router.put('/update/:id', protect, updateRecommendation);

/**
 * @swagger
 * /api/recommendations/delete/{id}:
 *   delete:
 *     summary: Delete a recommendation by ID
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Recommendation ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recommendation deleted
 *       404:
 *         description: Recommendation not found
 */
router.delete('/delete/:id', protect, deleteRecommendation);

module.exports = router;
