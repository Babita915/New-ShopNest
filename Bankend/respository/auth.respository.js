const pool = require("../config/db");

const createCustomer = async (
    name,
    email,
    password,
    role,
    phone,
    city
) => {

    const query = `
        INSERT INTO customers(name, email, password, role, phone, city)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    const result = await pool.query(query, [
        name,
        email,
        password,
        role,
        phone,
        city
    ]);

    return result.rows[0];
};

const findCustomerByEmail = async (email) => {

    const query = `
        SELECT *
        FROM customers
        WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);

    return result.rows[0];
};

const saveResetToken = async (id, token, expiry) => {
      console.log("Saving Token:", token);
  console.log("Customer ID:", id);

    const query = `
        UPDATE customers
        SET
            reset_token = $1,
            reset_token_expiry = $2
        WHERE id = $3
        RETURNING *;
    `;

    const result = await pool.query(query, [
        token,
        expiry,
        id
    ]);

    return result.rows[0];
};

const findByResetToken = async (token) => {
    console.log("Searching Token:", token);
    const query = `
        SELECT *
        FROM customers
        WHERE reset_token = $1;
    `;

    const result = await pool.query(query, [token]);

    return result.rows[0];
};

const updatePassword = async (id, password) => {

    const query = `
        UPDATE customers
        SET
            password = $1,
            reset_token = NULL,
            reset_token_expiry = NULL
        WHERE id = $2
        RETURNING *;
    `;

    const result = await pool.query(query, [
        password,
        id
    ]);

    return result.rows[0];
};

module.exports = {
    createCustomer,
    findCustomerByEmail,
    saveResetToken,
    findByResetToken,
    updatePassword
};