const analyticsService = require("../service/analytics.service");

// Dashboard
const dashboard = async (req, res) => {
    try {
        const result = await analyticsService.dashboard();

        return res.status(200).json({
            success: true,
            message: "Dashboard fetched successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Top Selling Products
const topSellingProducts = async (req, res) => {
    try {
        const result = await analyticsService.topSellingProducts();

        return res.status(200).json({
            success: true,
            message: "Top selling products fetched successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Customer Order Summary
const customerOrderSummary = async (req, res) => {
    try {
        const result = await analyticsService.customerOrderSummary();

        return res.status(200).json({
            success: true,
            message: "Customer summary fetched successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Customers With No Orders
const customersWithNoOrders = async (req, res) => {
    try {
        const result = await analyticsService.customersWithNoOrders();

        return res.status(200).json({
            success: true,
            message: "Customers with no orders fetched successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Sales Report
const salesReport = async (req, res) => {
    try {
        const result = await analyticsService.salesReport();

        return res.status(200).json({
            success: true,
            message: "Sales report fetched successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Order Details
const orderDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await analyticsService.orderDetails(id);

        return res.status(200).json({
            success: true,
            message: "Order details fetched successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




const monthlyRevenue = async (req, res) => {
  try {
    const result = await analyticsService.monthlyRevenue();

    res.status(200).json({
      success: true,
      message: "Monthly Revenue Report fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const topCustomers = async (req, res) => {
  try {
    const result = await analyticsService.topCustomers();

    return res.status(200).json({
      success: true,
      message: "Top Customers fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const lowStockProducts = async (req, res) => {
  try {
    const result = await analyticsService.lowStockProducts();

    return res.status(200).json({
      success: true,
      message: "Low Stock Products fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const outOfStockProducts = async (req, res) => {
    try {
        const result = await analyticsService.outOfStockProducts();

        return res.status(200).json({
            success: true,
            message: "Out Of Stock Products fetched successfully",
            data: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const averageOrderValue = async (req, res) => {
    try {
        const result = await analyticsService.averageOrderValue();

        return res.status(200).json({
            success: true,
            message: "Average Order Value fetched successfully",
            data: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const bestSellingCategory = async (req, res) => {
    try {
        const result = await analyticsService.bestSellingCategory();

        return res.status(200).json({
            success: true,
            message: "Best Selling Category fetched successfully",
            data: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const paymentStatusSummary = async (req, res) => {
    try {
        const result = await analyticsService.paymentStatusSummary();

        return res.status(200).json({
            success: true,
            message: "Payment Status Summary fetched successfully",
            data: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const last30DaysRevenue = async (req, res) => {
    try {
        const result = await analyticsService.last30DaysRevenue();

        return res.status(200).json({
            success: true,
            message: "Last 30 Days Revenue fetched successfully",
            data: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const highestValueOrders = async (req, res) => {
    try {
        const result = await analyticsService.highestValueOrders();

        return res.status(200).json({
            success: true,
            message: "Highest Value Orders fetched successfully",
            data: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const repeatCustomers = async (req, res) => {
    try {
        const result = await analyticsService.repeatCustomers();

        return res.status(200).json({
            success: true,
            message: "Repeat Customers fetched successfully",
            data: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
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
