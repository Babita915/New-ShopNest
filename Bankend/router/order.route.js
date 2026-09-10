const express = require("express");
const router = express.Router();

const orderController = require("../controller/order.controller");
const authMiddlerware = require("../middleware/auth.middleware")

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new Order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               order_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-28"
 *               total_amount:
 *                 type: number
 *                 example: 2500
 *               status:
 *                 type: string
 *                 example: Pending
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/", authMiddlerware, orderController.createOrder);

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all Orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 */
router.get("/", authMiddlerware, orderController.getOrder);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get Order By ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get("/:id", authMiddlerware, orderController.getOrderById);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   put:
 *     summary: Update Order
 *     tags: [Orders]
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
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               order_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-28"
 *               total_amount:
 *                 type: number
 *                 example: 3000
 *               status:
 *                 type: string
 *                 example: Completed
 *     responses:
 *       200:
 *         description: Order updated successfully
 */
router.put("/:id", authMiddlerware, orderController.updateOrder);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     summary: Delete Order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */
router.delete("/:id", authMiddlerware, orderController.deleteOrder);

module.exports = router;