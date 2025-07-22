/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Create a store
 *     tags: [Stores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Store created
 */





const express = require('express');
const router = express.Router();
const {
  createStore,
  getAllStores,
  getStoreById,
} = require('../controllers/storeController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

router.post('/createStore', protect, isAdmin, createStore);
router.get('/getStore', protect, getAllStores);
router.get('/:id', protect, getStoreById);

module.exports = router;
