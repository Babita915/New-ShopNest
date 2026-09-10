const productRespository = require("../respository/product.respository");

// Create Product
const createProduct = async (
  category_id,
  name,
  description,
  price,
  image
) => {
  return await productRespository.createProduct(
    category_id,
    name,
    description,
    price,
    image
  );
};


// Get All Products
const getProduct = async () => {
  return await productRespository.getProduct();
};


// Get Product By ID
const getProductById = async (id) => {
  return await productRespository.getProductById(id);
};


// Update Product
const updateProductById = async (
  id,
  category_id,
  name,
  description,
  price,
  image
) => {
  return await productRespository.updateProduct(
    id,
    category_id,
    name,
    description,
    price,
    image
  );
};


// Delete Product
const deleteProduct = async (id) => {
  return await productRespository.deleteProduct(id);
};


module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProductById,
  deleteProduct,
};