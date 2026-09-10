const express = require("express");
const router = express.Router();

const paymentController = require("../controller/payment.controller");
const authMiddleware = require("../middleware/auth.middleware");

/**
 * @swagger
 * /api/v1/payment:
 *   post:
 *     summary: Create a new Payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *                 example: 1
 *               payment_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-28"
 *               payment_method:
 *                 type: string
 *                 example: UPI
 *               amount:
 *                 type: number
 *                 example: 2500
 *               status:
 *                 type: string
 *                 example: Success
 *     responses:
 *       201:
 *         description: Payment created successfully
 */
router.post("/", authMiddleware, paymentController.createPayment);


/**
 * @swagger
 * /api/v1/payment:
 *   get:
 *     summary: Get all Payments
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payments retrieved successfully
 */
router.get("/", authMiddleware, paymentController.getPayment);


/**
 * @swagger
 * /api/v1/payment/{id}:
 *   get:
 *     summary: Get Payment By ID
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 */
router.get("/:id", authMiddleware, paymentController.getPaymentById);


/**
 * @swagger
 * /api/v1/payment/{id}:
 *   put:
 *     summary: Update Payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *                 example: 1
 *               payment_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-28"
 *               payment_method:
 *                 type: string
 *                 example: Card
 *               amount:
 *                 type: number
 *                 example: 3000
 *               status:
 *                 type: string
 *                 example: Completed
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 */
router.put("/:id", authMiddleware, paymentController.updatePayment);


/**
 * @swagger
 * /api/v1/payment/{id}:
 *   delete:
 *     summary: Delete Payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 */
router.delete("/:id", authMiddleware, paymentController.deletePayment);

module.exports = router;