const orderRespository = require("../respository/order.respository");

const createOrder = async (customer_id, order_date, total_amount, status) => {
    return await orderRespository.createOrder(
        customer_id,
        order_date,
        total_amount,
        status
    )
}

const getOrder = async() => {
    return await orderRespository.getOrder();
}

const getOrderById = async (id) => {
    return await orderRespository.getOrderById(id);
}

const updateOrder = async (id, customer_id, order_date, total_amount, status) => {
    return await orderRespository.updateOrder(
        id,
        customer_id,
        order_date, 
        total_amount,
        status
    )
}

const deleteOrder = async (id) => {
    return await orderRespository.deleteOrder(id)
}

module.exports = {
    createOrder,
    getOrder,
    getOrderById,
    updateOrder,
    deleteOrder
}