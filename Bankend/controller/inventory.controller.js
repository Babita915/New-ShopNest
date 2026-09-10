const inventoryService = require('../service/inventory.service');


const createInventory = async (req, res) => {
    try {
        const {product_id, stock} = req.body;
        const inventory = await inventoryService.createInventory(
            product_id,
            stock
        )
        return res.status(200).json({
            success: true,
            message: "Create Inventory"
        })
    } catch (error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getInventory = async (req, res) => {
    try {
        const inventory = await inventoryService.getInventory();
        res.json(inventory)
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getInventoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const inventory = await inventoryService.getInventoryById(id);
        if(!inventory){
            res.status(404).json({
                success: false,
                message: "Inventory Not Found"
            })
        }

        res.status(200).json({
            success: true,
            data: inventory
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_id, stock } = req.body;

        const inventory = await inventoryService.updateInventory(
            id,
            product_id,
            stock
        );

        res.status(200).json({
            success: true,
            message: "Inventory updated successfully",
            data: inventory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteInventory = async (req, res) => {
    try {
        const {id} = req.params;
        const inventory = await inventoryService.deleteInventory(id);

        if(!inventory) {
            res.status(404).json({
                success: false,
                message: "Inventory Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: inventory
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = {
    createInventory,
    getInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
}