import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/analytics";

// Dashboard
export const getDashboard = async () => {
  return await axios.get(`${API_URL}/dashboard`);
};

// Top Selling Products
export const getTopProducts = async () => {
  return await axios.get(`${API_URL}/top-products`);
};

// Customer Order Summary
export const getCustomerSummary = async () => {
  return await axios.get(`${API_URL}/customer-summary`);
};

// Customers With No Orders
export const getNoOrdersCustomers = async () => {
  return await axios.get(`${API_URL}/no-orders`);
};

// Sales Report
export const getSalesReport = async () => {
  return await axios.get(`${API_URL}/sales-report`);
};

// Order Details
export const getOrderDetails = async (id) => {
  return await axios.get(`${API_URL}/order-details/${id}`);
};

// Monthly Revenue
export const getMonthlyRevenue = async () => {
  return await axios.get(`${API_URL}/monthly-revenue`);
};

// Top Customers
export const getTopCustomers = async () => {
  return await axios.get(`${API_URL}/top-customers`);
};

// Low Stock Products
export const getLowStockProducts = async () => {
  return await axios.get(`${API_URL}/low-stock`);
};

// Out Of Stock Products
export const getOutOfStockProducts = async () => {
  return await axios.get(`${API_URL}/out-of-stock`);
};

// Average Order Value
export const getAverageOrderValue = async () => {
  return await axios.get(`${API_URL}/average-order-value`);
};

// Best Selling Category
export const getBestSellingCategory = async () => {
  return await axios.get(`${API_URL}/best-category`);
};

// Payment Status Summary
export const getPaymentSummary = async () => {
  return await axios.get(`${API_URL}/payment-summary`);
};

// Last 30 Days Revenue
export const getLast30DaysRevenue = async () => {
  return await axios.get(`${API_URL}/last-30-days-revenue`);
};

// Highest Value Orders
export const getHighestOrders = async () => {
  return await axios.get(`${API_URL}/highest-orders`);
};

// Repeat Customers
export const getRepeatCustomers = async () => {
  return await axios.get(`${API_URL}/repeat-customers`);
};