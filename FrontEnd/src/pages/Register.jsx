import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState({});

  const validate = () => {
    let newError = {};

    if(!name.trim()) {
        newError.name = "Name is required";
    }

    if(!email.trim()) {
        newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
    newError.email = "Invalid email";
  }

  if(!password.trim()) {
    newError.password = "Password is required";
  } else if (password.length < 6) {
    newError.password = "Password must be at least 6 characters";
  }

  if(!phone.trim()) {
    newError.phone = "Phone is required";
  }

  if(!city.trim()) {
    newError.city = "City is required";
  }

  if(!role.trim()) {    
    newError.role = "Please select a role";
  }

  setError(newError);
  return Object.keys(newError).length === 0;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!validate()) return;

    try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/auth/register",
          {
            name,
            email,
            password,
            phone,
            city,
            role
          }
        ) 
        console.log(response.data)
        alert(response.data.message);
        navigate("/customer")

    } catch(error) {
        console.error(error.response?.data || error.message);
    }

    console.log({
      name,
      email,
      password,
      phone,
      city,
      role,
    });

    // Yahan Register API call karna hai
  };



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Register</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {error.name && (
  <small className="text-danger">{error.name}</small>
)}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {error.email && (
  <small className="text-danger">{error.email}</small>
)}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {error.password && (
  <small className="text-danger">{error.password}</small>
)}
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  {error.phone && (
  <small className="text-danger">{error.phone}</small>
)}
                </div>

                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  {error.city && (
  <small className="text-danger">{error.city}</small>
)}
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                      {error.role && (
  <small className="text-danger">{error.role}</small>
)}
                    <option value="">Select Role</option>
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100" 
                >
                  Register
                </button>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link to="/login">Login</Link>
                </p>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}