const categoryService = require("../respository/category.respository");

const createCategory = async (name) => {
    return await categoryService.createCategory(name)
};

const getCategory = async () => {
   return await categoryService.getCategory();
};

const getCategoryById = async (id) => {
    return await categoryService.getCategoryById(id)
};

const updateCategory = async (id, name) => {
    return await categoryService.updateCategory(id, name)
};

const deleteCategory = async (id) => {
    return await categoryService.deleteCategory(id)
};

module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}