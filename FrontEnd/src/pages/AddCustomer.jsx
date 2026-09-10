import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
    const navigator = useNavigate();

    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
        phone: "",
        city: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(customer);

        // Yaha axios.post() lagega
    };

    return (
        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="text-center mb-4">
                    Add Customer
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={customer.name}
                                onChange={(e) =>  setCustomer({ ...customer, name: e.target.value })}
                                placeholder="Enter Name"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={customer.email}
                                onChange={(e) =>  setCustomer({ ...customer, email: e.target.value })}
                                placeholder="Enter Email"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={customer.password}
                                onChange={(e) =>  setCustomer({ ...customer, password: e.target.value })}
                                placeholder="Enter Password"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Phone
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={customer.phone}
                                onChange={(e) =>  setCustomer({ ...customer, phone: e.target.value })}
                                placeholder="Enter Phone"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                City
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={customer.city}
                                onChange={(e) =>  setCustomer({ ...customer, city: e.target.value })}
                                placeholder="Enter City"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Role
                            </label>

                            <select
                                className="form-select"
                                name="role"
                                value={customer.role}
                                onChange={(e) =>  setCustomer({ ...customer, role: e.target.value })}
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                    </div>

                    <div className="text-center">

                        <button
                            type="submit"
                            className="btn btn-primary px-5" onClick={() => navigator("/customer")}
                        >
                            Add Customer
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}