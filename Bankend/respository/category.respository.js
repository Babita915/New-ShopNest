const pool = require("../config/db");


const createCategory = async (name) => {
    const query = `
        insert into categories(name)
        values($1)
        returning *;`;
    const result = await pool.query(query, [name])
    return result.rows[0]
};


const getCategory = async () => {
    const query = `
    select *
    from categories
    `;
    const result = await pool.query(query)
    return result.rows;
}

const getCategoryById = async (id) => {
    const query = `
    select * from categories 
    where id = $1;
    `;
    const result = await pool.query(query, [id])
    return result.rows[0]
}

const updateCategory = async (id, name) => {
    const query = `
    UPDATE categories
    SET name = $1
    WHERE id = $2
    RETURNING *;
  `;

    const result = await pool.query(query, [name, id]);
    return result.rows[0];
};


const deleteCategory = async (id) => {
    const query = `
   DELETE FROM categories
   WHERE id = $1
   RETURNING *;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
};

module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}