const order_itemRespository = require('../respository/order_item.respository');

const createOrderItem = async(order_id, product_id, quantity, price) => {
    return await order_itemRespository.createOrderItem(
        order_id,
        product_id,
        quantity,
        price
    )
}

const getOrderItems = async() => {
    return await order_itemRespository.getOrderItems();
}

const getOrderItemById = async(id) => {
    return await order_itemRespository.getOrderItemById();
}

const updateOrderItem = async(id, order_id, product_id, quantity, price) => {
    return await order_itemRespository.updateOrderItem(
        id, 
        order_id,
        product_id,
        quantity,
        price
    )
}

const deleteOrderItem = async(id) => {
    return await order_itemRespository.deleteOrderItem(id)
}


module.exports = {
    createOrderItem,
    getOrderItems,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem
}