const express = require('express');
const router = express.Router();
const {
  addOrUpdateTelcoTrend,
  getTelcoTrendsByStore,
  getAllTelcoTrends,
  deleteTelcoTrend,
  updateTelcoTrendById
} = require('../controllers/telcoTrendController');

const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Telco Trends
 *   description: API for managing telco trend scores
 */

/**
 * @swagger
 * /api/telco-trends:
 *   post:
 *     summary: Add or update a telco trend record
 *     tags: [Telco Trends]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *               - trendScore
 *               - recordedAt
 *               - store
 *             properties:
 *               category:
 *                 type: string
 *                 example: Fashion
 *               trendScore:
 *                 type: number
 *                 example: 85
 *               recordedAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-07-22T18:39:25.606Z
 *               store:
 *                 type: string
 *                 example: 64b9fc3c5b8c7b001ef2a937
 *     responses:
 *       200:
 *         description: Telco trend added or updated
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all telco trends across all stores
 *     tags: [Telco Trends]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All telco trends
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   store:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       category:
 *                         type: string
 *                   category:
 *                     type: string
 *                   trendScore:
 *                     type: number
 *                   recordedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/telco-trends/{storeId}:
 *   get:
 *     summary: Get all telco trends for a specific store
 *     tags: [Telco Trends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the store
 *     responses:
 *       200:
 *         description: List of telco trends for that store
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   store:
 *                     type: string
 *                   category:
 *                     type: string
 *                   trendScore:
 *                     type: number
 *                   recordedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/telco-trends/{trendId}:
 *   put:
 *     summary: Update a specific telco trend by ID
 *     tags: [Telco Trends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trendId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the telco trend to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               trendScore:
 *                 type: number
 *               recordedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Telco trend updated
 *       404:
 *         description: Trend not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a specific telco trend by ID
 *     tags: [Telco Trends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trendId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the telco trend to delete
 *     responses:
 *       200:
 *         description: Telco trend deleted
 *       404:
 *         description: Trend not found
 *       500:
 *         description: Server error
 */

router.post('/', protect, addOrUpdateTelcoTrend);
router.get('/', protect, getAllTelcoTrends);
router.get('/:storeId', protect, getTelcoTrendsByStore);
router.put('/:trendId', protect, updateTelcoTrendById);
router.delete('/:trendId', protect, deleteTelcoTrend);

module.exports = router;
