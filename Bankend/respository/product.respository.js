const pool = require("../config/db");

// Create Product
const createProduct = async (
  category_id,
  name,
  description,
  price,
  image
) => {
  const query = `
    INSERT INTO products
    (category_id, name, description, price, image)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const result = await pool.query(query, [
    category_id,
    name,
    description,
    price,
    image,
  ]);

  return result.rows[0];
};


// Get All Products
const getProduct = async () => {
  const query = `
    SELECT
      p.id,
      p.category_id,
      p.name,
      p.description,
      p.price,
      p.image,
      p.created_at,
      c.name AS category_name
    FROM products p
    JOIN categories c
      ON p.category_id = c.id
    ORDER BY p.id;
  `;

  const result = await pool.query(query);

  return result.rows;
};


// Get Product By ID
const getProductById = async (id) => {
  const query = `
    SELECT
      p.id,
      p.category_id,
      p.name,
      p.description,
      p.price,
      p.image,
      p.created_at,
      c.name AS category_name
    FROM products p
    JOIN categories c
      ON p.category_id = c.id
    WHERE p.id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};


// Update Product
const updateProduct = async (
  id,
  category_id,
  name,
  description,
  price,
  image
) => {
  const query = `
    UPDATE products
    SET
      category_id = $1,
      name = $2,
      description = $3,
      price = $4,
      image = $5
    WHERE id = $6
    RETURNING *;
  `;

  const result = await pool.query(query, [
    category_id,
    name,
    description,
    price,
    image,
    id,
  ]);

  return result.rows[0];
};


// Delete Product
const deleteProduct = async (id) => {
  const query = `
    DELETE FROM products
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};


module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};