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



const getCustomer = async () => {
    const query = `
        SELECT * FROM customers;
    `;

    const result = await pool.query(query);

    return result.rows;
};

const getCustomerById = async (id) => {

    const query = `
        SELECT * FROM customers
        WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];

}

const updateCustomer = async(id, name, email, password, role, phone, city) => {
    const query = `
    update customers
    set 
    name= $1,
    email = $2,
    password = $3,
    role = $4,
    phone = $5,
    city = $6

    where id = $7
    returning *;`;

    const result = await pool.query(query, [
        name,
        email,
        password,
        role,
        phone,
        city,
        id
    ])
    return result.rows[0]
}


const deleteCustomer = async (id) => {
    const query = `
    DELETE FROM customers
        WHERE id = $1
        RETURNING *;
    `;

    const result = await pool.query(query, [id])
    return result.rows[0];
}


module.exports = {
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};