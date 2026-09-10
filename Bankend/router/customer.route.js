const express = require("express");
const router = express.Router();

const customerController = require("../controller/customer.controller");

/**
 * @swagger
 * /api/v1/customers:
 *   post:
 *     summary: Create Customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 */

router.post("/", customerController.createCustomer);

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 */

router.get("/", customerController.getCustomer);

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   get:
 *     summary: Get Customer By ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer found
 */

router.get("/:id", customerController.getCustomerById);

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   put:
 *     summary: Update Customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer updated
 */
router.put("/:id", customerController.updateCustomer);

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   delete:
 *     summary: Delete Customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted
 */

router.delete("/:id", customerController.deleteCustomer)


module.exports = router;