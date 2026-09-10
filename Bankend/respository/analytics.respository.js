const pool = require("../config/db");

// Dashboard
const dashboard = async () => {
    const query = `
        SELECT
            (SELECT COUNT(*) FROM customers) AS total_customers,
            (SELECT COUNT(*) FROM products) AS total_products,
            (SELECT COUNT(*) FROM orders) AS total_orders,
            (SELECT COALESCE(SUM(total_amount),0) FROM orders) AS total_revenue;
    `;

    const result = await pool.query(query);
    return result.rows;
};

// Top Selling Products
const topSellingProducts = async () => {
    const query = `
        SELECT
            p.id,
            p.name,
            SUM(oi.quantity) AS total_sold
        FROM products p
        JOIN order_items oi
        ON p.id = oi.product_id
        GROUP BY p.id, p.name
        ORDER BY total_sold DESC;
    `;

    const result = await pool.query(query);
    return result.rows;
};

// Customer Order Summary
const customerOrderSummary = async () => {
    const query = `
        SELECT
            c.id,
            c.name,
            COUNT(o.id) AS total_orders,
            COALESCE(SUM(o.total_amount),0) AS total_spent
        FROM customers c
        LEFT JOIN orders o
        ON c.id = o.customer_id
        GROUP BY c.id, c.name
        ORDER BY total_spent DESC;
    `;

    const result = await pool.query(query);
    return result.rows;
};

// Customers With No Orders
const customersWithNoOrders = async () => {
    const query = `
        SELECT
            c.id,
            c.name,
            c.email
        FROM customers c
        LEFT JOIN orders o
        ON c.id = o.customer_id
        WHERE o.id IS NULL;
    `;

    const result = await pool.query(query);
    return result.rows;
};

// Sales Report
const salesReport = async () => {
    const query = `
        SELECT
            DATE(order_date) AS order_day,
            COUNT(*) AS total_orders,
            SUM(total_amount) AS total_revenue
        FROM orders
        GROUP BY DATE(order_date)
        ORDER BY order_day;
    `;

    const result = await pool.query(query);
    return result.rows;
};

// Order Details
const orderDetails = async (id) => {
    const query = `
        SELECT
            o.id,
            o.order_date,
            c.name AS customer_name,
            p.name AS product_name,
            oi.quantity,
            oi.price,
            pay.status
        FROM orders o
        JOIN customers c
            ON o.customer_id = c.id
        JOIN order_items oi
            ON o.id = oi.order_id
        JOIN products p
            ON oi.product_id = p.id
        LEFT JOIN payments pay
            ON pay.order_id = o.id
        WHERE o.id = $1;
    `;

    const result = await pool.query(query, [id]);
    return result.rows;
};

const monthlyRevenue = async () => {
  const query = `
    SELECT
      TO_CHAR(order_date, 'YYYY-MM') AS month,
      COUNT(id) AS total_orders,
      SUM(total_amount) AS total_revenue
    FROM orders
    GROUP BY TO_CHAR(order_date, 'YYYY-MM')
    ORDER BY month;
  `;

  const result = await pool.query(query);

  return result.rows;
};


const topCustomers = async () => {
  const query = `
    SELECT
      c.id,
      c.name,
      COUNT(o.id) AS total_orders,
      SUM(o.total_amount) AS total_spent
    FROM customers c
    JOIN orders o
      ON c.id = o.customer_id
    GROUP BY c.id, c.name
    ORDER BY total_spent DESC
    LIMIT 10;
  `;

  const result = await pool.query(query);

  return result.rows;
};


const lowStockProducts = async () => {
  const query = `
    SELECT
      p.id,
      p.name,
      i.stock
    FROM products p
    JOIN inventory i
      ON p.id = i.product_id
    WHERE i.stock < 20
    ORDER BY i.stock ASC;
  `;

  const result = await pool.query(query);

  return result.rows;
};

const outOfStockProducts = async () => {
    const query = `
        SELECT
            p.id,
            p.name,
            c.name AS category,
            i.stock
        FROM products p
        INNER JOIN inventory i
            ON p.id = i.product_id
        INNER JOIN categories c
            ON p.category_id = c.id
        WHERE i.stock = 0
        ORDER BY p.name;
    `;

    const result = await pool.query(query);

    return result.rows;
};

const averageOrderValue = async () => {

    const query = `
        SELECT
            ROUND(AVG(total_amount), 2) AS average_order_value
        FROM orders;
    `;

    const result = await pool.query(query);

    return result.rows;
};


const bestSellingCategory = async () => {

    const query = `
        SELECT
            c.id,
            c.name AS category_name,
            SUM(oi.quantity) AS total_products_sold
        FROM categories c
        INNER JOIN products p
            ON c.id = p.category_id
        INNER JOIN order_items oi
            ON p.id = oi.product_id
        GROUP BY c.id, c.name
        ORDER BY total_products_sold DESC
        LIMIT 1;
    `;

    const result = await pool.query(query);

    return result.rows;
};

const paymentStatusSummary = async () => {

    const query = `
        SELECT
            status,
            COUNT(*) AS total_payments,
            SUM(amount) AS total_amount
        FROM payments
        GROUP BY status
        ORDER BY total_payments DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
};


const last30DaysRevenue = async () => {

    const query = `
        SELECT
            COUNT(id) AS total_orders,
            SUM(total_amount) AS total_revenue
        FROM orders
        WHERE order_date >= CURRENT_DATE - INTERVAL '30 days';
    `;

    const result = await pool.query(query);

    return result.rows;
};

const highestValueOrders = async () => {

    const query = `
        SELECT
            o.id AS order_id,
            c.name AS customer_name,
            o.order_date,
            o.total_amount,
            o.status
        FROM orders o
        INNER JOIN customers c
            ON o.customer_id = c.id
        ORDER BY o.total_amount DESC
        LIMIT 10;
    `;

    const result = await pool.query(query);

    return result.rows;
};

const repeatCustomers = async () => {

    const query = `
        SELECT
            c.id,
            c.name,
            c.email,
            COUNT(o.id) AS total_orders,
            SUM(o.total_amount) AS total_spent
        FROM customers c
        INNER JOIN orders o
            ON c.id = o.customer_id
        GROUP BY c.id, c.name, c.email
        HAVING COUNT(o.id) > 1
        ORDER BY total_orders DESC, total_spent DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
};

module.exports = {
    dashboard,
    topSellingProducts,
    customerOrderSummary,
    customersWithNoOrders,
    salesReport,
    orderDetails,
    monthlyRevenue,
    topCustomers,
    lowStockProducts,
    outOfStockProducts,
    averageOrderValue,
    bestSellingCategory,
    paymentStatusSummary,
    last30DaysRevenue,
    highestValueOrders,
    repeatCustomers
};