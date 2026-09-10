const express = require("express");
const router = express.Router();

const order_itemController = require("../controller/order_item.controller");

/**
 * @swagger
 * /api/v1/order_items:
 *   post:
 *     summary: Create Order Item
 *     tags: [Order Items]
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
 *               product_id:
 *                 type: integer
 *                 example: 2
 *               quantity:
 *                 type: integer
 *                 example: 3
 *               price:
 *                 type: number
 *                 example: 1500
 *     responses:
 *       201:
 *         description: Order Item created successfully
 */
router.post("/", order_itemController.createOrderItem);

/**
 * @swagger
 * /api/v1/order_items:
 *   get:
 *     summary: Get All Order Items
 *     tags: [Order Items]
 *     responses:
 *       200:
 *         description: Order Items retrieved successfully
 */
router.get("/", order_itemController.getOrderItems);

/**
 * @swagger
 * /api/v1/order_items/{id}:
 *   get:
 *     summary: Get Order Item By ID
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order Item found
 *       404:
 *         description: Order Item not found
 */
router.get("/:id", order_itemController.getOrderItemById);

/**
 * @swagger
 * /api/v1/order_items/{id}:
 *   put:
 *     summary: Update Order Item
 *     tags: [Order Items]
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
 *               product_id:
 *                 type: integer
 *                 example: 2
 *               quantity:
 *                 type: integer
 *                 example: 5
 *               price:
 *                 type: number
 *                 example: 2000
 *     responses:
 *       200:
 *         description: Order Item updated successfully
 */
router.put("/:id", order_itemController.updateOrderItem);

/**
 * @swagger
 * /api/v1/order_items/{id}:
 *   delete:
 *     summary: Delete Order Item
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order Item deleted successfully
 */
router.delete("/:id", order_itemController.deleteOrderItem);

module.exports = router;