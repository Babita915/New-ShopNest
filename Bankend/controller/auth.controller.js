const authService = require("../service/auth.service");

const register = async (req, res) => {
    try {

        const { name, email, password, role, phone, city } = req.body;

        const customer = await authService.register(
            name,
            email,
            password,
            role,
            phone,
            city
        );

        return res.status(201).json({
            success: true,
            message: "Customer Created Successfully",
            customer
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const result = await authService.login(
            email,
            password
        );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const token = await authService.forgotPassword(email);

        return res.status(200).json({
            success: true,
            message: token
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const resetPassword = async (req, res) => {
    try {

        const { token, password } = req.body || {};

        if (!token || !password) {
            return res.status(400).json({
                success: false,
                message: "Token and password are required"
            });
        }

        const result = await authService.resetPassword(token, password);

        return res.status(200).json({
            success: true,
            message: result
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};