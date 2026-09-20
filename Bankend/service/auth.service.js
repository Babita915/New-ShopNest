const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authRepository = require("../respository/auth.respository");

// =========================
// REGISTER
// =========================
const register = async (name, email, password, role, phone, city) => {
    if (!name || !email || !password) {
        throw new Error("Name, email and password are required");
    }

    const existCustomer =
        await authRepository.findCustomerByEmail(email);

    if (existCustomer) {
        throw new Error("Customer already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    return await authRepository.createCustomer(
        name,
        email.toLowerCase().trim(),
        hashPassword,
        role,
        phone,
        city
    );
};


// =========================
// LOGIN
// =========================
const login = async (email, password) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const customer =
        await authRepository.findCustomerByEmail(
            email.toLowerCase().trim()
        );

    if (!customer) {
        throw new Error("Invalid Email or Password");
    }

    if (!customer.password) {
        throw new Error("Invalid Email or Password");
    }

    const matchPassword = await bcrypt.compare(
        password,
        customer.password
    );

    if (!matchPassword) {
        throw new Error("Invalid Email or Password");
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
        {
            id: customer.id,
            role: customer.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        token,
        customer: {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            role: customer.role,
            phone: customer.phone,
            city: customer.city
        }
    };
};


// =========================
// FORGOT PASSWORD
// =========================
const forgotPassword = async (email) => {
    if (!email) {
        throw new Error("Email is required");
    }

    const customer =
        await authRepository.findCustomerByEmail(
            email.toLowerCase().trim()
        );

    if (!customer) {
        throw new Error("Email not found");
    }

    // Generate secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Token valid for 30 minutes
    const expiry = new Date(
        Date.now() + 30 * 60 * 1000
    );

    await authRepository.saveResetToken(
        customer.id,
        token,
        expiry
    );

    /*
       Yaha email service lagao:

       const resetLink =
         `${process.env.FRONTEND_URL}/reset-password/${token}`;

       await sendResetEmail(
         customer.email,
         resetLink
       );
    */

    return {
        message: "Password reset link sent successfully",
        token
    };
};


// =========================
// RESET PASSWORD
// =========================
const resetPassword = async (token, password) => {
    if (!token || !password) {
        throw new Error("Token and password are required");
    }

    if (password.length < 6) {
        throw new Error(
            "Password must be at least 6 characters"
        );
    }

    const customer =
        await authRepository.findByResetToken(token);

    if (!customer) {
        throw new Error("Invalid or expired token");
    }

    // Check token expiry
    if (
        !customer.reset_token_expiry ||
        new Date(customer.reset_token_expiry) < new Date()
    ) {
        throw new Error("Token expired");
    }

    // Hash new password
    const hash = await bcrypt.hash(password, 10);

    // Update password
    await authRepository.updatePassword(
        customer.id,
        hash
    );

    // IMPORTANT:
    // Delete/clear reset token after successful reset
    if (authRepository.clearResetToken) {
        await authRepository.clearResetToken(customer.id);
    }

    return {
        message: "Password updated successfully"
    };
};


module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};
