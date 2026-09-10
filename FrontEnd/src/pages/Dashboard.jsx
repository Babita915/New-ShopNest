import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/v1/analytics/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Dashboard Data:", res.data);

        setDashboard(res.data.data?.[0] || {});
      } catch (err) {
        console.error(
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="mt-2 text-muted">
            Loading Dashboard...
          </p>

        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">

      {/* Header */}
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="fw-bold mb-1">
              E-Commerce Dashboard
            </h2>

            <p className="text-muted mb-0">
              Overview of your store
            </p>
          </div>

          <span className="badge bg-primary fs-6">
            Admin
          </span>

        </div>

        {/* Dashboard Cards */}
        <div className="row g-4">

          {/* Customers */}
          <div className="col-xl-3 col-md-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      Total Customers
                    </p>

                    <h2 className="fw-bold mb-0">
                      {dashboard.total_customers || 0}
                    </h2>

                  </div>

                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "55px",
                      height: "55px",
                      fontSize: "24px",
                    }}
                  >
                    👥
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Products */}
          <div className="col-xl-3 col-md-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      Total Products
                    </p>

                    <h2 className="fw-bold mb-0">
                      {dashboard.total_products || 0}
                    </h2>

                  </div>

                  <div
                    className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "55px",
                      height: "55px",
                      fontSize: "24px",
                    }}
                  >
                    📦
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Orders */}
          <div className="col-xl-3 col-md-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      Total Orders
                    </p>

                    <h2 className="fw-bold mb-0">
                      {dashboard.total_orders || 0}
                    </h2>

                  </div>

                  <div
                    className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "55px",
                      height: "55px",
                      fontSize: "24px",
                    }}
                  >
                    🛒
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Revenue */}
          <div className="col-xl-3 col-md-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      Total Revenue
                    </p>

                    <h2 className="fw-bold mb-0">
                      ₹ {Number(
                        dashboard.total_revenue || 0
                      ).toLocaleString("en-IN")}
                    </h2>

                  </div>

                  <div
                    className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "55px",
                      height: "55px",
                      fontSize: "24px",
                    }}
                  >
                    💰
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Summary Section */}
        <div className="row mt-4">

          <div className="col-12">

            <div className="card border-0 shadow-sm">

              <div className="card-body">

                <h5 className="fw-bold mb-3">
                  Store Summary
                </h5>

                <div className="row text-center">

                  <div className="col-md-3 mb-3 mb-md-0">
                    <h6 className="text-muted">
                      Customers
                    </h6>
                    <h4 className="fw-bold">
                      {dashboard.total_customers || 0}
                    </h4>
                  </div>

                  <div className="col-md-3 mb-3 mb-md-0">
                    <h6 className="text-muted">
                      Products
                    </h6>
                    <h4 className="fw-bold">
                      {dashboard.total_products || 0}
                    </h4>
                  </div>

                  <div className="col-md-3 mb-3 mb-md-0">
                    <h6 className="text-muted">
                      Orders
                    </h6>
                    <h4 className="fw-bold">
                      {dashboard.total_orders || 0}
                    </h4>
                  </div>

                  <div className="col-md-3">
                    <h6 className="text-muted">
                      Revenue
                    </h6>
                    <h4 className="fw-bold text-success">
                      ₹ {Number(
                        dashboard.total_revenue || 0
                      ).toLocaleString("en-IN")}
                    </h4>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}