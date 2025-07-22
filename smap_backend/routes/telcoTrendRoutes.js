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
 *     summary: Add a new telco trend record
 *     tags: [Telco Trends]
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
 *             required:
 *               - category
 *               - trendScore
 *               - recordedAt
 *     responses:
 *       201:
 *         description: Telco trend added
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/telco-trends:
 *   get:
 *     summary: Get all telco trends
 *     tags: [Telco Trends]
 *     responses:
 *       200:
 *         description: List of telco trends
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */


const express = require('express');
const router = express.Router();
const {
  addOrUpdateTelcoTrend,
  getTelcoTrendsByStore,
} = require('../controllers/telcoTrendController');

const { protect } = require('../middleware/authMiddleware');

router.post('/addTelco', protect, addOrUpdateTelcoTrend);
router.get('/:storeId', protect, getTelcoTrendsByStore);

module.exports = router;
