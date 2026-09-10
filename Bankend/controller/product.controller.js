const productService = require("../service/product.service");

// Create Product
const createProduct = async (req, res) => {
    try {

        const { category_id, name, description, price, image } = req.body;

        const product = await productService.createProduct(
            category_id,
            name,
            description,
            price,
            image
        );

        return res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            data: product
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Products
const getProduct = async (req, res) => {
    try {

        const products = await productService.getProduct();

        return res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Product By ID
const getProductById = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const { category_id, name, description, price, image } = req.body;

        const product = await productService.updateProduct(
            id,
            category_id,
            name,
            description,
            price,
            image
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            data: product
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
            data: product
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
};