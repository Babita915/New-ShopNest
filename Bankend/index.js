const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

// =========================
// CORS CONFIGURATION
// =========================

const allowedOrigins = [
  "https://new-shopnest.onrender.com",
  "http://localhost:5000",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin
      // (Swagger, Postman, server-to-server, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =========================
// BODY PARSER
// =========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// IMPORT ROUTES
// =========================

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

// =========================
// FRONTEND STATIC FILES
// =========================

app.use(
  express.static(
    path.join(__dirname, "../FrontEnd/build")
  )
);

// =========================
// SWAGGER
// =========================

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// =========================
// API ROUTES
// =========================

app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/order_items", orderItemRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

// =========================
// REACT ROUTER FALLBACK
// =========================

app.use((req, res, next) => {
  if (
    !req.path.startsWith("/api") &&
    req.path !== "/api-docs"
  ) {
    res.sendFile(
      path.join(
        __dirname,
        "../FrontEnd/build/index.html"
      )
    );
  } else {
    next();
  }
});

// =========================
// ERROR HANDLER
// =========================

app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "CORS policy blocked this request",
    });
  }

  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});