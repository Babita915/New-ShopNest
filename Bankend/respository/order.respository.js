const pool = require("../config/db");

const createOrder = async(customer_id, order_date, total_amount, status) => {
    const query = `
    insert into orders(customer_id, order_date, total_amount, status)
    values($1, $2, $3, $4)
    returning *;
    `;

    const result = await pool.query(query, [customer_id, order_date, total_amount, status]);
    return result.rows[0]
};

const getOrder = async () => {
    const query = `
    select *
    from orders
    `;
    const result = await pool.query(query);
    return result.rows;
}

const getOrderById = async (id) => {
    const query = `
    select *
    from orders
    where id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0]
};

const updateOrder = async (id, customer_id, order_date, total_amount, status) => {
    const query = `
    UPDATE orders
    SET
        customer_id = $1,
        order_date = $2,
        total_amount = $3,
        status = $4
    WHERE id = $5
    RETURNING *;
    `;

    const result = await pool.query(query, [
        customer_id,
        order_date,
        total_amount,
        status,
        id
    ]);

    return result.rows[0];
};

const deleteOrder = async (id) => {
    const query = `
    delete from orders
    where id = $1
    returning *;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
}


module.exports = {
    createOrder,
    getOrder,
    getOrderById,
    updateOrder,
    deleteOrder
}