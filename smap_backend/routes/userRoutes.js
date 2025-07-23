const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getStoreByManager,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin, isStoreManager } = require("../middleware/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management (registration, login, listing, deletion, and store assignment)
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user (Admin only)
 *     tags: [Users]
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
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, storeManager]
 *               store:
 *                 type: string
 *                 description: Required if role is storeManager
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 */
router.post("/register", protect, isAdmin, registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, isAdmin, getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", protect, isAdmin, deleteUser);

/**
 * @swagger
 * /api/users/me/store:
 *   get:
 *     summary: Get the store assigned to the current store manager
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Store assigned to this manager
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 floor:
 *                   type: string
 *                 manager:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *       404:
 *         description: No store found
 *       500:
 *         description: Server error
 */
router.get("/me/store", protect, isStoreManager, getStoreByManager);

/**
 * @swagger
 * /api/users/create-initial-admin:
 *   post:
 *     summary: Create the initial admin (no token required)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin created
 *       400:
 *         description: Admin already exists
 *       500:
 *         description: Server error
 */
router.post("/create-initial-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await require("../models/User").findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    await require("../models/User").create({
      name,
      email,
      password,
      role: "admin",
    });

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
