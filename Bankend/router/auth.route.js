const express = require("express");

const router = express.Router();

const authController = require("../controller/auth.controller");


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register Customer
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Customer registered successfully
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login Customer
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Forgot Password
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Reset token generated
 */
router.post("/forgot-password", authController.forgotPassword);
/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset Password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 example: "82291b4e23ca0ed89f8f07e75777b877f61a417001944121322d5a7a1f00cc0b"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.post("/reset-password", authController.resetPassword);


module.exports = router;