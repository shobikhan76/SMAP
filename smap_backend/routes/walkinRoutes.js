const express = require('express');
const router = express.Router();
const {
  addOrUpdateWalkIn,
  getWalkInsByStore,
  getAllWalkIns
  , deleteWalkIn
} = require('../controllers/walkinController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

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
 *     summary: Create or update a walk-in record for a specific date and store
 *     tags: [Walk-ins]
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
 *               - date
 *               - count
 *             properties:
 *               store:
 *                 type: string
 *                 example: "64b9fc3c5b8c7b001ef2a937"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-22T18:50:00.000Z"
 *               count:
 *                 type: integer
 *                 example: 42
 *     responses:
 *       200:
 *         description: Walk-in created or updated
 *       400:
 *         description: Missing or invalid fields
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/walkins/{storeId}:
 *   get:
 *     summary: Get all walk-in records for a specific store
 *     tags: [Walk-ins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Store ID
 *     responses:
 *       200:
 *         description: List of walk-ins
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/walkins:
 *   get:
 *     summary: Get all walk-in records (Admin only)
 *     tags: [Walk-ins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All walk-in records
 *       401:
 *         description: Unauthorized
 */
// DELETE /api/walkins/:id
router.delete('/:id', protect, isAdmin, deleteWalkIn);

router.post('/', protect, addOrUpdateWalkIn); // create or update
router.get('/:storeId', protect, getWalkInsByStore); // get by store
router.get('/', protect, isAdmin, getAllWalkIns); // get all (admin only)

module.exports = router;
