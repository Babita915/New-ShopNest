const express = require("express");
const router = express.Router();

const analyticsController = require("../controller/analytics.controller");

/**
 * @swagger
 * /api/v1/analytics/dashboard:
 *   get:
 *     summary: Get Dashboard Statistics
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get("/dashboard", analyticsController.dashboard);

/**
 * @swagger
 * /api/v1/analytics/top-products:
 *   get:
 *     summary: Get Top Selling Products
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Top selling products retrieved successfully
 */
router.get("/top-products", analyticsController.topSellingProducts);

/**
 * @swagger
 * /api/v1/analytics/customer-summary:
 *   get:
 *     summary: Get Customer Order Summary
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Customer summary retrieved successfully
 */
router.get("/customer-summary", analyticsController.customerOrderSummary);

/**
 * @swagger
 * /api/v1/analytics/no-orders:
 *   get:
 *     summary: Get Customers With No Orders
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Customers with no orders retrieved successfully
 */
router.get("/no-orders", analyticsController.customersWithNoOrders);

/**
 * @swagger
 * /api/v1/analytics/sales-report:
 *   get:
 *     summary: Get Sales Report
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Sales report retrieved successfully
 */
router.get("/sales-report", analyticsController.salesReport);

/**
 * @swagger
 * /api/v1/analytics/order-details/{id}:
 *   get:
 *     summary: Get Order Details
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 */
router.get("/order-details/:id", analyticsController.orderDetails);


/**
 * @swagger
 * /api/v1/analytics/monthly-revenue:
 *   get:
 *     summary: Get Monthly Revenue Report
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Monthly revenue retrieved successfully
 */
router.get("/monthly-revenue", analyticsController.monthlyRevenue);

/**
 * @swagger
 * /api/v1/analytics/top-customers:
 *   get:
 *     summary: Get Top Customers
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Top customers retrieved successfully
 */
router.get("/top-customers", analyticsController.topCustomers);

/**
 * @swagger
 * /api/v1/analytics/low-stock:
 *   get:
 *     summary: Get Low Stock Products
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Low stock products retrieved successfully
 */
router.get("/low-stock", analyticsController.lowStockProducts);

/**
 * @swagger
 * /api/v1/analytics/out-of-stock:
 *   get:
 *     summary: Get Out of Stock Products
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Out of stock products retrieved successfully
 */
router.get("/out-of-stock", analyticsController.outOfStockProducts);

/**
 * @swagger
 * /api/v1/analytics/average-order-value:
 *   get:
 *     summary: Get Average Order Value
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Average order value retrieved successfully
 */
router.get("/average-order-value", analyticsController.averageOrderValue);

/**
 * @swagger
 * /api/v1/analytics/best-category:
 *   get:
 *     summary: Get Best Selling Category
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Best selling category retrieved successfully
 */
router.get("/best-category", analyticsController.bestSellingCategory);

/**
 * @swagger
 * /api/v1/analytics/payment-summary:
 *   get:
 *     summary: Get Payment Status Summary
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Payment status summary retrieved successfully
 */
router.get("/payment-summary", analyticsController.paymentStatusSummary);

/**
 * @swagger
 * /api/v1/analytics/last-30-days-revenue:
 *   get:
 *     summary: Get Last 30 Days Revenue
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Last 30 days revenue retrieved successfully
 */
router.get("/last-30-days-revenue", analyticsController.last30DaysRevenue);

/**
 * @swagger
 * /api/v1/analytics/highest-orders:
 *   get:
 *     summary: Get Highest Value Orders
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Highest value orders retrieved successfully
 */
router.get("/highest-orders", analyticsController.highestValueOrders);

/**
 * @swagger
 * /api/v1/analytics/repeat-customers:
 *   get:
 *     summary: Get Repeat Customers
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Repeat customers retrieved successfully
 */
router.get("/repeat-customers", analyticsController.repeatCustomers);

module.exports = router;