import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../style/navbar.css";
import AddToCard from "../AddToCart";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="shopnest-navbar">

      {/* Navbar Container */}
      <div className="navbar-container">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="navbar-logo"
          onClick={handleLinkClick}
        >
          ShopNest<span>.</span>
        </Link>

        {/* Desktop Menu */}
        <div className={`navbar-menu ${isOpen ? "show" : ""}`}>

          <Link
            to="/dashboard"
            className={`navbar-link ${isActive("/dashboard")}`}
            onClick={handleLinkClick}
          >
            <span>⌂</span>
            Dashboard
          </Link>

          <Link
            to="/customer"
            className={`navbar-link ${isActive("/customer")}`}
            onClick={handleLinkClick}
          >
            <span>♙</span>
            Customers
          </Link>

          <Link
            to="/categories"
            className={`navbar-link ${isActive("/categories")}`}
            onClick={handleLinkClick}
          >
            <span>▦</span>
            Categories
          </Link>

          <Link
            to="/product"
            className={`navbar-link ${isActive("/product")}`}
            onClick={handleLinkClick}
          >
            <span>▣</span>
            Products
          </Link>

          <Link
            to="/inventory"
            className={`navbar-link ${isActive("/inventory")}`}
            onClick={handleLinkClick}
          >
            <span>▤</span>
            Inventory
          </Link>

          <Link
            to="/orders"
            className={`navbar-link ${isActive("/orders")}`}
            onClick={handleLinkClick}
          >
            <span>🛒</span>
            Orders
          </Link>

          <Link
            to="/payment"
            className={`navbar-link ${isActive("/payment")}`}
            onClick={handleLinkClick}
          >
            <span>▣</span>
            Payments
          </Link>

          <Link
            to="/analytics"
            className={`navbar-link ${isActive("/analytics")}`}
            onClick={handleLinkClick}
          >
            <span>▥</span>
            Analytics
          </Link>

          {/* Cart */}
          <div className="navbar-cart">
            <AddToCard />
          </div>

          {/* Logout */}
          <button
            className="navbar-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? "✕" : "☰"}
        </button>

      </div>

    </nav>
  );
}