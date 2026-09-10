import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        loginData
      );

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      localStorage.setItem(
        "customer",
        JSON.stringify(response.data.data.customer)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Invalid Email or Password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex align-items-center justify-content-center">

      <div className="row w-100 justify-content-center">

        <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

          <div className="card border-0 shadow-lg rounded-4">

            <div className="card-body p-4 p-md-5">

              {/* Logo / Heading */}
              <div className="text-center mb-4">

                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "65px",
                    height: "65px",
                    fontSize: "28px",
                  }}
                >
                  🔐
                </div>

                <h2 className="fw-bold mb-1">
                  Welcome Back
                </h2>

                <p className="text-muted mb-0">
                  Login to your account
                </p>

              </div>

              <form onSubmit={handleLogin}>

                {/* Email */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        email: e.target.value,
                      })
                    }
                    required
                  />

                </div>

                {/* Password */}
                <div className="mb-2">

                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value,
                      })
                    }
                    required
                  />

                </div>

                {/* Forgot Password */}
                <div className="text-end mb-4">

                  <Link
                    to="/forgotpassword"
                    className="text-primary text-decoration-none"
                  >
                    Forgot Password?
                  </Link>

                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>

                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

              </form>

              {/* Register */}
              <div className="text-center mt-4">

                <span className="text-muted">
                  Don't have an account?{" "}
                </span>

                <Link
                  to="/register"
                  className="fw-semibold text-decoration-none"
                >
                  Create Account
                </Link>

              </div>

            </div>

          </div>

          {/* Footer */}
          <p className="text-center text-muted small mt-3">
            © 2026 ShopNest. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  );
}