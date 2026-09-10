const customerService = require('../service/customer.service')
const bcrypt = require("bcrypt");
const createCustomer = async (req, res) => {
    try {

        const { name, email, password, role, phone, city} = req.body;
        const customers = await customerService.createCustomer(
            name,
            email,
            password,
            role,
            phone,
            city,
        );

        res.status(201).json({
            success: true,
            data: customers,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};

const getCustomer = async (req, res)  => {
    try {
      const customers = await customerService.getCustomer();
      res.json(customers)
    } catch(error) {
      res.status(500).json({
        message: error.message
      })
    }
}

const getCustomerById = async (req, res) =>{
    try {
       const {id} = req.params;

       const customers = await customerService.getCustomerById(id);

       if(!customers){
        return res.status(404).json({
            success: false,
            message: "Customer not found"
        })
       }

       return res.status(200).json({
        success: true,
        data: customers
       })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateCustomer = async (req, res) => {
   try{
    const {id} = req.params;
    const {name, email, password, role, city, phone} = req.body;

    const customers = await customerService.updateCustomer(
        id,
        name,
        email,
        password,
        role,
        city, 
        phone
    )

    return res.status(200).json({
        success: true,
        message: "Customer Update successfully",
        data: customers
    })
   } catch(error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
}

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const customers = await customerService.deleteCustomer(id);

        if (!customers) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
            data: customers
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




module.exports = {
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};