const orderitemService = require("../service/order_item.service");

// Create Order Item
const createOrderItem = async (req, res) => {
    try {
        const { order_id, product_id, quantity, price } = req.body;

        const order_items = await orderitemService.createOrderItem(
            order_id,
            product_id,
            quantity,
            price
        );

        res.status(201).json({
            success: true,
            message: "Order item created successfully",
            data: order_items
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Order Items
const getOrderItems = async (req, res) => {
    try {
        const order_items = await orderitemService.getOrderItems();

        res.status(200).json({
            success: true,
            data: order_items
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Order Item By Id
const getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;

        const order_items = await orderitemService.getOrderItemById(id);

        if (!order_items) {
            return res.status(404).json({
                success: false,
                message: "Order Item not found"
            });
        }

        res.status(200).json({
            success: true,
            data: order_items
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Order Item
const updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { order_id, product_id, quantity, price } = req.body;

        const order_items = await orderitemService.updateOrderItem(
            id,
            order_id,
            product_id,
            quantity,
            price
        );

        res.status(200).json({
            success: true,
            message: "Order Item updated successfully",
            data: order_items
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Order Item
const deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;

        await orderitemService.deleteOrderItem(id);

        res.status(200).json({
            success: true,
            message: "Order Item deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createOrderItem,
    getOrderItems,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem
};