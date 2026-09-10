const inventoryRepository = require("../respository/inventory.respository");

const createInventory = async (product_id, stock) => {
    return await inventoryRepository.createInventory(
       product_id,
       stock
    );
};

const getInventory = async () => {
    return await inventoryRepository.getInventory();
};

const getInventoryById = async (id) => {
    return await inventoryRepository.getInventoryById(id);
};

const updateInventory = async (id, product_id, stock) => {
    return await inventoryRepository.updateInventory(
        id,
        product_id,
        stock
    );
};

const deleteInventory = async (id) => {
    return await inventoryRepository.deleteInventory(id);
};

module.exports = {
    createInventory,
    getInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
};