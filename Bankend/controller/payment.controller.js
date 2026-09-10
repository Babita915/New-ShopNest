const paymentService = require("../service/payment.service");

// Create Payment
const createPayment = async (req, res) => {
    try {
        const {
            order_id,
            payment_date,
            payment_method,
            amount,
            status
        } = req.body;

        const payment = await paymentService.createPayment(
            order_id,
            payment_date,
            payment_method,
            amount,
            status
        );

        res.status(201).json({
            success: true,
            message: "Payment Created Successfully",
            data: payment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Payments
const getPayment = async (req, res) => {
    try {
        const payments = await paymentService.getPayment();

        res.status(200).json({
            success: true,
            data: payments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Payment By Id
const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await paymentService.getPaymentById(id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: payment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Payment
const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            order_id,
            payment_date,
            payment_method,
            amount,
            status
        } = req.body;

        const payment = await paymentService.updatePayment(
            id,
            order_id,
            payment_date,
            payment_method,
            amount,
            status
        );

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment Updated Successfully",
            data: payment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Payment
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await paymentService.deletePayment(id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createPayment,
    getPayment,
    getPaymentById,
    updatePayment,
    deletePayment
};