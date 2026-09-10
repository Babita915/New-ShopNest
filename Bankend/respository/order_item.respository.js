const pool = require('../config/db');

const createOrderItem = async (order_id, product_id, quantity, price) => {
    const query = `
    INSERT INTO order_items (
        order_id,
        product_id,
        quantity,
        price
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;

    const result = await pool.query(query, [
        order_id,
        product_id,
        quantity,
        price
    ]);

    return result.rows[0];
};

const getOrderItems = async() => {
    const query = `
    select *
    from order_items
    `;

    const result = await pool.query(query)
    return result.rows;
};

const getOrderItemById = async (id) => {
    const query = `
    select *
    from order_items
    where id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0]
}

const updateOrderItem = async (id, order_id, product_id, quantity, price) => {
    const query = `
    update order_items
    set 
    order_id = $1,
    product_id = $2,
    quantity = $3, 
    price = $4
    where id = $5
    returning *;
    `;

    const result = await pool.query(query, [order_id, product_id, quantity, price, id])
    return result.rows[0]
}


const deleteOrderItem = async (id) => {
    const query = `
    delete from order_items
    where id = $1
    returning *;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0]
}

module.exports = {
    createOrderItem,
    getOrderItems,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem
}