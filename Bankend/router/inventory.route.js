const express = require("express");
const router = express.Router();

const inventoryController = require("../controller/inventory.controller");

/**
 * @swagger
 * /api/v1/inventory:
 *   post:
 *     summary: Create Inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               stock:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Inventory created successfully
 */
router.post("/", inventoryController.createInventory);

/**
 * @swagger
 * /api/v1/inventory:
 *   get:
 *     summary: Get All Inventory
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Inventory retrieved successfully
 */
router.get("/", inventoryController.getInventory);

/**
 * @swagger
 * /api/v1/inventory/{id}:
 *   get:
 *     summary: Get Inventory By ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory found
 *       404:
 *         description: Inventory not found
 */
router.get("/:id", inventoryController.getInventoryById);

/**
 * @swagger
 * /api/v1/inventory/{id}:
 *   put:
 *     summary: Update Inventory
 *     tags: [Inventory]
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
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               stock:
 *                 type: integer
 *                 example: 150
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 */
router.put("/:id", inventoryController.updateInventory);

/**
 * @swagger
 * /api/v1/inventory/{id}:
 *   delete:
 *     summary: Delete Inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory deleted successfully
 */
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;