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
  updateStore,
  deleteStore,
} = require('../controllers/storeController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// All routes below are protected and admin-only

// Create and Get all stores
router.post('/', protect, isAdmin, createStore);         // POST /api/stores
router.get('/', protect, isAdmin, getAllStores);         // GET  /api/stores

// Read, Update, Delete by ID
router.get('/:id', protect, isAdmin, getStoreById);      // GET    /api/stores/:id
router.put('/:id', protect, isAdmin, updateStore);       // PUT    /api/stores/:id
router.delete('/:id', protect, isAdmin, deleteStore);    // DELETE /api/stores/:id

module.exports = router;

