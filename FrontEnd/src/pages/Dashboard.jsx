import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/dashboard.css";

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
        console.error(err.response?.data || err.message);

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

  /* ===========================
     Loading
  =========================== */

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary"></div>

        <p>Loading Dashboard...</p>
      </div>
    );
  }

  /* ===========================
     Error
  =========================== */

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* ===========================
          Header
      =========================== */}

      <div className="dashboard-header">

        <div>
          <p className="dashboard-welcome">
            Welcome back, Admin 👋
          </p>

          <h1>
            E-Commerce Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Monitor your store performance and manage your business.
          </p>
        </div>

        <div className="admin-badge">
          <span>●</span>
          Admin
        </div>

      </div>


      {/* ===========================
          Statistics Cards
      =========================== */}

      <div className="dashboard-stats">

        {/* Customers */}

        <div className="stat-card customers-card">

          <div className="stat-card-top">
            <div>
              <p>Total Customers</p>

              <h2>
                {dashboard.total_customers || 0}
              </h2>
            </div>

            <div className="stat-icon">
              👥
            </div>
          </div>

          <div className="stat-footer">
            <span>●</span>
            Registered customers
          </div>

        </div>


        {/* Products */}

        <div className="stat-card products-card">

          <div className="stat-card-top">
            <div>
              <p>Total Products</p>

              <h2>
                {dashboard.total_products || 0}
              </h2>
            </div>

            <div className="stat-icon">
              📦
            </div>
          </div>

          <div className="stat-footer">
            <span>●</span>
            Products in store
          </div>

        </div>


        {/* Orders */}

        <div className="stat-card orders-card">

          <div className="stat-card-top">
            <div>
              <p>Total Orders</p>

              <h2>
                {dashboard.total_orders || 0}
              </h2>
            </div>

            <div className="stat-icon">
              🛒
            </div>
          </div>

          <div className="stat-footer">
            <span>●</span>
            Orders received
          </div>

        </div>


        {/* Revenue */}

        <div className="stat-card revenue-card">

          <div className="stat-card-top">
            <div>
              <p>Total Revenue</p>

              <h2>
                ₹{" "}
                {Number(
                  dashboard.total_revenue || 0
                ).toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="stat-icon">
              💰
            </div>
          </div>

          <div className="stat-footer">
            <span>●</span>
            Store earnings
          </div>

        </div>

      </div>


      {/* ===========================
          Store Overview
      =========================== */}

      <div className="dashboard-section">

        <div className="section-header">

          <div>
            <h3>Store Overview</h3>

            <p>
              Quick summary of your e-commerce store
            </p>
          </div>

          <span className="overview-status">
            ● Store Active
          </span>

        </div>


        <div className="overview-grid">

          <div className="overview-item">
            <span className="overview-icon">
              👥
            </span>

            <div>
              <small>Customers</small>

              <strong>
                {dashboard.total_customers || 0}
              </strong>
            </div>
          </div>


          <div className="overview-item">
            <span className="overview-icon">
              📦
            </span>

            <div>
              <small>Products</small>

              <strong>
                {dashboard.total_products || 0}
              </strong>
            </div>
          </div>


          <div className="overview-item">
            <span className="overview-icon">
              🛒
            </span>

            <div>
              <small>Orders</small>

              <strong>
                {dashboard.total_orders || 0}
              </strong>
            </div>
          </div>


          <div className="overview-item">
            <span className="overview-icon">
              💰
            </span>

            <div>
              <small>Revenue</small>

              <strong>
                ₹{" "}
                {Number(
                  dashboard.total_revenue || 0
                ).toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

        </div>

      </div>


      {/* ===========================
          Quick Actions
      =========================== */}

      <div className="dashboard-section">

        <div className="section-header">

          <div>
            <h3>Quick Actions</h3>

            <p>
              Manage your store quickly
            </p>
          </div>

        </div>


        <div className="quick-actions">

          <Link
            to="/product"
            className="quick-action"
          >
            <span>📦</span>

            <div>
              <strong>Manage Products</strong>

              <small>
                Add, edit or remove products
              </small>
            </div>

            <b>→</b>
          </Link>


          <Link
            to="/customer"
            className="quick-action"
          >
            <span>👥</span>

            <div>
              <strong>Manage Customers</strong>

              <small>
                View and manage customers
              </small>
            </div>

            <b>→</b>
          </Link>


          <Link
            to="/orders"
            className="quick-action"
          >
            <span>🛒</span>

            <div>
              <strong>View Orders</strong>

              <small>
                Check customer orders
              </small>
            </div>

            <b>→</b>
          </Link>


          <Link
            to="/analytics"
            className="quick-action"
          >
            <span>📊</span>

            <div>
              <strong>View Analytics</strong>

              <small>
                Check store performance
              </small>
            </div>

            <b>→</b>
          </Link>

        </div>

      </div>


      {/* ===========================
          Footer Note
      =========================== */}

      <div className="dashboard-note">

        <span>✨</span>

        <p>
          ShopNest Admin Panel — Manage your store
          efficiently from one place.
        </p>

      </div>

    </div>
  );
}