const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authRepository = require("../respository/auth.respository");


const register = async(name,email,password,role, phone, city)=>{

    const existCustomer = await authRepository.findCustomerByEmail(email);

    if(existCustomer){
        throw new Error("Customer already exists");
    }


    const hashPassword = await bcrypt.hash(password,10);


    return await authRepository.createCustomer(
        name,
        email,
        hashPassword,
        role,
        phone,
        city
    );
}



const login = async(email,password)=>{


    const customer = await authRepository.findCustomerByEmail(email);


    if(!customer){
        throw new Error("Invalid Email");
    }


    const matchPassword = await bcrypt.compare(
        password,
        customer.password
    );


    if(!matchPassword){
        throw new Error("Invalid Password");
    }


    const token = jwt.sign(
        {
            id:customer.id,
            role:customer.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    );


    return {
        token,
        customer:{
            id:customer.id,
            name:customer.name,
            email:customer.email,
            role:customer.role,
            phone:customer.phone,
            city:customer.city
        }
    }

}

const forgotPassword = async (email) => {

    const customer = await authRepository.findCustomerByEmail(email);

    if (!customer) {
        throw new Error("Email not found");
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await authRepository.saveResetToken(
        customer.id,
        token,
        expiry
    );

    // Email send yaha hoga

    return token;
};

const resetPassword = async (token, password) => {

    console.log("Received Token:", token);

    const customer = await authRepository.findByResetToken(token);

    console.log("Customer:", customer);

    if (!customer) {
        throw new Error("Invalid Token");
    }

    console.log("Expiry:", customer.reset_token_expiry);
    console.log("Current:", new Date());

    if (new Date(customer.reset_token_expiry) < new Date()) {
        throw new Error("Token Expired");
    }

    const hash = await bcrypt.hash(password, 10);

    console.log("Hash Generated");

    const updated = await authRepository.updatePassword(
        customer.id,
        hash
    );

    console.log("Updated:", updated);

    return "Password Updated Successfully";
};


module.exports={
    register,
    login,
    forgotPassword,
    resetPassword
}
