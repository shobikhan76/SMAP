/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: API for managing store records
 */

const express = require('express');
const router = express.Router();

const {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
  getMyStore
} = require('../controllers/storeController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin , isStoreManager} = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /api/stores:
 *   post:
 *     summary: Create a new store
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - floor
 *             properties:
 *               name:
 *                 type: string
 *                 example: ABC Fashion
 *               category:
 *                 type: string
 *                 example: Fashion
 *               floor:
 *                 type: number
 *                 example: 2
 *               manager:
 *                 type: string
 *                 example: 64c123abcde456f789000123
 *     responses:
 *       201:
 *         description: Store created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Get all stores
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of stores
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/stores/{id}:
 *   get:
 *     summary: Get a store by ID
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The store ID
 *     responses:
 *       200:
 *         description: Store details
 *       404:
 *         description: Store not found
 */

/**
 * @swagger
 * /api/stores/{id}:
 *   put:
 *     summary: Update a store
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Store ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               floor:
 *                 type: number
 *               manager:
 *                 type: string
 *     responses:
 *       200:
 *         description: Store updated
 *       404:
 *         description: Store not found
 */

/**
 * @swagger
 * /api/stores/{id}:
 *   delete:
 *     summary: Delete a store
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Store ID
 *     responses:
 *       200:
 *         description: Store deleted
 *       404:
 *         description: Store not found
 */
/**
 * @swagger
 * /api/stores/my-store:
 *   get:
 *     summary: Get store data for the currently logged-in Store Manager
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Store data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Store not found
 */

// Routes (all admin-only)
router.post('/', protect, isAdmin, createStore);
router.get('/my-store', protect, getMyStore);          // ✅ Place before `/:id`
router.get('/', protect, isAdmin, getAllStores);
router.get('/:id', protect, isAdmin, getStoreById);    // ❗ comes after `/my-store`
router.put('/:id', protect, isAdmin, updateStore);
router.delete('/:id', protect, isAdmin, deleteStore);


module.exports = router;
