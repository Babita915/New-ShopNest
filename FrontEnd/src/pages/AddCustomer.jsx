
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
        phone: "",
        city: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCustomer((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            // Yaha baad me axios.post() add karna hai
            console.log("Customer Data:", customer);

            // Temporary success
            setMessage("Customer added successfully!");

            setTimeout(() => {
                navigate("/customer");
            }, 1000);

        } catch (error) {
            console.error(error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">

            <div
                className="card border-0 shadow-lg mx-auto"
                style={{ maxWidth: "900px", borderRadius: "15px" }}
            >

                {/* Header */}
                <div
                    className="card-header bg-primary text-white p-4"
                    style={{
                        borderRadius: "15px 15px 0 0"
                    }}
                >
                    <div className="d-flex align-items-center">
                        <i className="bi bi-person-plus-fill fs-3 me-3"></i>

                        <div>
                            <h3 className="mb-1">
                                Add Customer
                            </h3>

                            <p className="mb-0 opacity-75">
                                Create a new customer account
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="card-body p-4 p-md-5">

                    {message && (
                        <div
                            className={`alert ${
                                message.includes("successfully")
                                    ? "alert-success"
                                    : "alert-danger"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            {/* Name */}
                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Full Name
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">
                                        <i className="bi bi-person"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={customer.name}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        required
                                    />

                                </div>
                            </div>

                            {/* Email */}
                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Email Address
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">
                                        <i className="bi bi-envelope"></i>
                                    </span>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={customer.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        required
                                    />

                                </div>
                            </div>

                            {/* Password */}
                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Password
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">
                                        <i className="bi bi-lock"></i>
                                    </span>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        name="password"
                                        value={customer.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        minLength="6"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <i
                                            className={
                                                showPassword
                                                    ? "bi bi-eye-slash"
                                                    : "bi bi-eye"
                                            }
                                        ></i>
                                    </button>

                                </div>

                                <small className="text-muted">
                                    Password must be at least 6 characters.
                                </small>

                            </div>

                            {/* Phone */}
                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Phone Number
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">
                                        <i className="bi bi-telephone"></i>
                                    </span>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="phone"
                                        value={customer.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        required
                                    />

                                </div>

                            </div>

                            {/* City */}
                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    City
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">
                                        <i className="bi bi-geo-alt"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={customer.city}
                                        onChange={handleChange}
                                        placeholder="Enter city"
                                        required
                                    />

                                </div>

                            </div>

                            {/* Role */}
                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Account Role
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">
                                        <i className="bi bi-shield-check"></i>
                                    </span>

                                    <select
                                        className="form-select"
                                        name="role"
                                        value={customer.role}
                                        onChange={handleChange}
                                    >
                                        <option value="customer">
                                            Customer
                                        </option>

                                        <option value="admin">
                                            Admin
                                        </option>
                                    </select>

                                </div>

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-end gap-2 mt-5">

                            <button
                                type="button"
                                className="btn btn-light border px-4"
                                onClick={() => navigate("/customer")}
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        ></span>

                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-person-plus me-2"></i>
                                        Add Customer
                                    </>
                                )}
                            </button>

                        </div>

                    </form>

                </div>
            </div>

        </div>
    );
}

