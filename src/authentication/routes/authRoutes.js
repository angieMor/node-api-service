const express = require('express');
const AuthController = require('../controller/authController');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Creates a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
