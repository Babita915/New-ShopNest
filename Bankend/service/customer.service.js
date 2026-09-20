const customerRepository = require("../respository/customer.respository");
const bcrypt = require("bcryptjs");

const createCustomer = async (name, email, password, role, phone, city) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    return await customerRepository.createCustomer(
        name,
        email,
        hashedPassword,
        role,
        phone,
        city
    );
};

const getCustomer = async () => {
    return await customerRepository.getCustomer();
};

const getCustomerById = async (id) => {
    return await customerRepository.getCustomerById(id);
};

const updateCustomer = async (
    id,
    name,
    email,
    password,
    role,
    city,
    phone
) => {

    let hashedPassword = password;

    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    return await customerRepository.updateCustomer(
        id,
        name,
        email,
        hashedPassword,
        role,
        city,
        phone
    );
};

const deleteCustomer = async (id) => {
    return await customerRepository.deleteCustomer(id);
};

module.exports = {
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
