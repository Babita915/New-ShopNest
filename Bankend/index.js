const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const customerRoutes = require("./router/customer.route");
const categoryRoutes = require("./router/category.route");
const inventoryRoutes = require("./router/inventory.route");
const productRoutes = require("./router/product.route");
const orderRoutes = require("./router/order.route");
const orderItemRoutes = require("./router/order_items.route");
const paymentRoutes = require("./router/payment.route");
const analyticsRoutes = require("./router/analytics.router");
const authRoutes = require("./router/auth.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/order_items", orderItemRoutes);
app.use("/api/v1/payment", paymentRoutes); // ya /payments
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Backend is live"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});