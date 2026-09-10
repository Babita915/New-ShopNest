const orderService = require("../service/order.service");

const createOrder = async (req, res) => {
    try {
       const {customer_id, order_date, total_amount, status} =  req.body;
       const orders = await orderService.createOrder(
        customer_id, 
        order_date,
        total_amount, 
        status
       )

       res.status(200).json({
        success: true,
        message: "Create Order Successfully"
       })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,

        })
    }
}

const getOrder = async (req, res) => {
   try {
    const orders = await orderService.getOrder();
    res.json(orders)
   } catch(error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
}

const getOrderById = async (req, res) => {
    try {
        const {id} = req.params
        const orders = await orderService.getOrderById(id);

        if(!orders) {
           return res.status(404).json({
                success: false,
                message: "Order not Found"
            })
        } 
        res.status(200).json({
            success: true,
             message: "Order fetched successfully",
            data: orders
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const {customer_id, order_date, total_amount, status} = req.body;
        const orders = await orderService.updateOrder(
            id,
            customer_id,
            order_date,
            total_amount,
            status
        )
        if(!orders) {
           return  res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        } 
        res.status(200).json({
            success: true,
            message: "Order Update Successfully",
            data: orders
        })
    }  catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const deleteOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const orders = await orderService.deleteOrder(id);

        if(!orders) {
          return  res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        } 
        res.status(200).json({
            success: true,
            message: "Order delete successfully",
            data: orders
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
   createOrder,
   getOrder,
   getOrderById,
   updateOrder,
   deleteOrder
}