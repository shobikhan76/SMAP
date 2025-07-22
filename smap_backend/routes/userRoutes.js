/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
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
 *         description: User created successfully
 *       400:
 *         description: User already exists
 */


const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require('../controllers/userController');
const User = require('../models/User')

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// Public login route
router.post('/login', loginUser);

// Admin registers store managers
router.post('/register', protect, isAdmin, registerUser);

// Admin fetches all users
router.get('/', protect, isAdmin, getAllUsers);

router.post('/create-initial-admin', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Admin already exists' });

    const user = await User.create({
      name,
      email,
      password,
      role: 'admin',
    });

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
