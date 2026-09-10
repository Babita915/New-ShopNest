const pool = require("../config/db");

// Create
const createPayment = async (
    order_id,
    payment_date,
    payment_method,
    amount,
    status
) => {

    const query = `
        INSERT INTO payments
        (order_id, payment_date, payment_method, amount, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const result = await pool.query(query, [
        order_id,
        payment_date,
        payment_method,
        amount,
        status
    ]);

    return result.rows[0];
};

// Get All
const getPayment = async () => {

    const query = `
        SELECT *
        FROM payments;
    `;

    const result = await pool.query(query);

    return result.rows;
};

// Get By Id
const getPaymentById = async (id) => {

    const query = `
        SELECT *
        FROM payments
        WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};

// Update
const updatePayment = async (
    id,
    order_id,
    payment_date,
    payment_method,
    amount,
    status
) => {

    const query = `
        UPDATE payments
        SET
            order_id = $1,
            payment_date = $2,
            payment_method = $3,
            amount = $4,
            status = $5
        WHERE id = $6
        RETURNING *;
    `;

    const result = await pool.query(query, [
        order_id,
        payment_date,
        payment_method,
        amount,
        status,
        id
    ]);

    return result.rows[0];
};

// Delete
const deletePayment = async (id) => {

    const query = `
        DELETE FROM payments
        WHERE id = $1
        RETURNING *;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};

module.exports = {
    createPayment,
    getPayment,
    getPaymentById,
    updatePayment,
    deletePayment
};