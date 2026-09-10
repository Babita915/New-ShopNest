const paymentRepository = require("../respository/payment.respository");

const createPayment = async (
    order_id,
    payment_date,
    payment_method,
    amount,
    status
) => {
    return await paymentRepository.createPayment(
        order_id,
        payment_date,
        payment_method,
        amount,
        status
    );
};

const getPayment = async () => {
    return await paymentRepository.getPayment();
};

const getPaymentById = async (id) => {
    return await paymentRepository.getPaymentById(id);
};

const updatePayment = async (
    id,
    order_id,
    payment_date,
    payment_method,
    amount,
    status
) => {
    return await paymentRepository.updatePayment(
        id,
        order_id,
        payment_date,
        payment_method,
        amount,
        status
    );
};

const deletePayment = async (id) => {
    return await paymentRepository.deletePayment(id);
};

module.exports = {
    createPayment,
    getPayment,
    getPaymentById,
    updatePayment,
    deletePayment
};