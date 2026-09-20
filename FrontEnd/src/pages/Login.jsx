import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // =========================
  // HANDLE LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const email = loginData.email.trim();
    const password = loginData.password;

    // Basic validation
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email: email.toLowerCase(),
          password: password,
        }
      );

      console.log("Login Response:", response.data);

      const loginResponse = response.data?.data;

      const token = loginResponse?.token;
      const customer = loginResponse?.customer;

      if (!token) {
        throw new Error("Token was not received from server.");
      }

      // =========================
      // SAVE TOKEN
      // =========================

      localStorage.setItem("token", token);

      // =========================
      // SAVE CUSTOMER
      // =========================

      if (customer) {
        localStorage.setItem(
          "customer",
          JSON.stringify(customer)
        );

        // Used by dashboard/admin components
        localStorage.setItem(
          "user",
          JSON.stringify(customer)
        );
      }

      // =========================
      // REDIRECT
      // =========================

      navigate("/dashboard");

    } catch (error) {
      console.log(
        "Login Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Invalid email or password. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        background:
          "linear-gradient(135deg, #eef4ff 0%, #f8f9fa 50%, #eef2f7 100%)",
      }}
    >

      <div className="row w-100 justify-content-center">

        <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

          {/* =========================
              LOGIN CARD
          ========================= */}

          <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
            style={{
              backgroundColor: "#ffffff",
            }}
          >

            <div className="card-body p-4 p-md-5">

              {/* =========================
                  LOGO + HEADER
              ========================= */}

              <div className="text-center mb-4">

                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-4 shadow-sm mb-3"
                  style={{
                    width: "68px",
                    height: "68px",
                    background:
                      "linear-gradient(135deg, #0d6efd, #4f8dfd)",
                    fontSize: "28px",
                  }}
                >
                  🔐
                </div>

                <h2 className="fw-bold mb-1">
                  Welcome Back!
                </h2>

                <p className="text-muted mb-0">
                  Sign in to continue to ShopNest
                </p>

              </div>

              {/* =========================
                  ERROR MESSAGE
              ========================= */}

              {error && (
                <div
                  className="alert alert-danger border-0 rounded-3 py-2 px-3 mb-4"
                  role="alert"
                >
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">⚠</span>

                    <small>{error}</small>
                  </div>
                </div>
              )}

              {/* =========================
                  LOGIN FORM
              ========================= */}

              <form onSubmit={handleLogin}>

                {/* =========================
                    EMAIL
                ========================= */}

                <div className="mb-3">

                  <label
                    htmlFor="email"
                    className="form-label fw-semibold"
                  >
                    Email Address
                  </label>

                  <div className="position-relative">

                    <span
                      className="position-absolute top-50 translate-middle-y"
                      style={{
                        left: "14px",
                        fontSize: "17px",
                        zIndex: 2,
                      }}
                    >
                      ✉️
                    </span>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-control form-control-lg rounded-3 ps-5"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      disabled={loading}
                      required
                    />

                  </div>

                </div>

                {/* =========================
                    PASSWORD
                ========================= */}

                <div className="mb-2">

                  <label
                    htmlFor="password"
                    className="form-label fw-semibold"
                  >
                    Password
                  </label>

                  <div className="position-relative">

                    <span
                      className="position-absolute top-50 translate-middle-y"
                      style={{
                        left: "14px",
                        fontSize: "17px",
                        zIndex: 2,
                      }}
                    >
                      🔑
                    </span>

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      className="form-control form-control-lg rounded-3 ps-5 pe-5"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      disabled={loading}
                      required
                    />

                    {/* Eye Button */}

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      disabled={loading}
                      className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                      style={{
                        right: "4px",
                        color: "#6c757d",
                        fontSize: "17px",
                        background: "transparent",
                      }}
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>

                  </div>

                </div>

                {/* =========================
                    FORGOT PASSWORD
                ========================= */}

                <div className="text-end mb-4">

                  <Link
                    to="/forgotpassword"
                    className="text-primary text-decoration-none small fw-semibold"
                  >
                    Forgot Password?
                  </Link>

                </div>

                {/* =========================
                    LOGIN BUTTON
                ========================= */}

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-3 fw-semibold shadow-sm"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>

                      Signing in...
                    </>
                  ) : (
                    <>
                      Login
                      <span className="ms-2">
                        →
                      </span>
                    </>
                  )}

                </button>

              </form>

              {/* =========================
                  REGISTER
              ========================= */}

              <div className="text-center mt-4">

                <span className="text-muted small">
                  Don't have an account?{" "}
                </span>

                <Link
                  to="/register"
                  className="fw-semibold text-primary text-decoration-none"
                >
                  Create Account
                </Link>

              </div>

              {/* =========================
                  SECURITY
              ========================= */}

              <div
                className="text-center mt-4 pt-3 border-top"
              >

                <small className="text-muted">
                  🔒 Secure login • Your information is protected
                </small>

              </div>

            </div>

          </div>

          {/* =========================
              FOOTER
          ========================= */}

          <p className="text-center text-muted small mt-3 mb-0">
            © 2026 ShopNest. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  );
}