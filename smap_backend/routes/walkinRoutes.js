/**
 * @swagger
 * tags:
 *   name: Walk-ins
 *   description: API for managing walk-in entries
 */

/**
 * @swagger
 * /api/walkins:
 *   post:
 *     summary: Create a new walk-in record
 *     tags: [Walk-ins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               purpose:
 *                 type: string
 *             required:
 *               - name
 *               - phone
 *               - purpose
 *     responses:
 *       201:
 *         description: Walk-in created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/walkins:
 *   get:
 *     summary: Get all walk-in records
 *     tags: [Walk-ins]
 *     responses:
 *       200:
 *         description: List of walk-ins
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
  addOrUpdateWalkIn,
  getWalkInsByStore,
} = require('../controllers/walkinController');

const { protect } = require('../middleware/authMiddleware');

router.post('/addWalkIn', protect, addOrUpdateWalkIn);
router.get('/:storeId', protect, getWalkInsByStore);

module.exports = router;
