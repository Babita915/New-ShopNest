import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css";
import AddToCard from "../AddToCart";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-3" to="/dashboard">
         ShopNest.
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/customer">
                Customers
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/inventory">
                Inventory
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/payment">
                Payments
              </Link>
            </li>

               <li className="nav-item">
              <Link className="nav-link" to="/analytics">
                Aanlytics
              </Link>
            </li>

            <li className="nav-item">
               <AddToCard/>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-warning"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}