const pool = require("../config/db");

const createInventory = async (product_id, stock) => {
    const query = `
    insert into inventory(product_id, stock)
    values ($1, $2)
    returning *;
    `;
    const result = await pool.query(query, [product_id, stock])
    return result.rows[0]
}


const getInventory = async () => {
    const query =  `
    select *
    from inventory
    ORDER BY id ASC
    `;

    const result = await pool.query(query);
    return result.rows;
};



const getInventoryById = async (id) => {
    const query = `
    select * from inventory
    where id = $1
    `;

    const result = await pool.query(query, [id])
    return result.rows[0]
}

const updateInventory = async (id, product_id, stock) => {
    const query = `
        UPDATE inventory
        SET
            product_id = $1,
            stock = $2
        WHERE id = $3
        RETURNING *;
    `;

    const result = await pool.query(query, [
        product_id,
        stock,
        id
    ]);

    return result.rows[0];
};

const deleteInventory = async (id) => {
    const query = `
    delete from inventory 
    where id = $1
    returning *;
    `;

    const result = await pool.query(query, [id])
    return result.rows[0]
}
module.exports = {
    createInventory,
    getInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
}