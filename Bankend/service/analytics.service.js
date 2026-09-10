const analyticsRepository = require("../respository/analytics.respository");

// Dashboard
const dashboard = async () => {
    return await analyticsRepository.dashboard();
};

// Top Selling Products
const topSellingProducts = async () => {
    return await analyticsRepository.topSellingProducts();
};

// Customer Order Summary
const customerOrderSummary = async () => {
    return await analyticsRepository.customerOrderSummary();
};

// Customers With No Orders
const customersWithNoOrders = async () => {
    return await analyticsRepository.customersWithNoOrders();
};

// Sales Report
const salesReport = async () => {
    return await analyticsRepository.salesReport();
};

// Order Details
const orderDetails = async (id) => {
    return await analyticsRepository.orderDetails(id);
};

const monthlyRevenue = async () => {
  return await analyticsRepository.monthlyRevenue();
};

const topCustomers = async () => {
  return await analyticsRepository.topCustomers();
};

const lowStockProducts = async () => {
  return await analyticsRepository.lowStockProducts();
};


const outOfStockProducts = async () => {
    return await analyticsRepository.outOfStockProducts();
};

const averageOrderValue = async () => {
    return await analyticsRepository.averageOrderValue();
};

const bestSellingCategory = async () => {
    return await analyticsRepository.bestSellingCategory();
};

const paymentStatusSummary = async () => {
    return await analyticsRepository.paymentStatusSummary();
};

const last30DaysRevenue = async () => {
    return await analyticsRepository.last30DaysRevenue();
};

const highestValueOrders = async () => {
    return await analyticsRepository.highestValueOrders();
};

const repeatCustomers = async () => {
    return await analyticsRepository.repeatCustomers();
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