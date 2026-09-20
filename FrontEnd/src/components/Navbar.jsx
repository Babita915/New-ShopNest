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
  };

  const handleLinkClick = () => {
    // Mobile par page select hone ke baad sidebar close
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <Link to="/dashboard" className="mobile-logo">
          ShopNest<span>.</span>
        </Link>

        <button
          className="sidebar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`shopnest-sidebar ${isOpen ? "show" : ""}`}>

        {/* Logo */}
        <div className="sidebar-logo">
          <Link to="/dashboard" onClick={handleLinkClick}>
            ShopNest<span>.</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="sidebar-menu">

          <p className="menu-title">MAIN MENU</p>

          <Link
            to="/dashboard"
            className={`sidebar-link ${isActive("/dashboard")}`}
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">⌂</span>
            <span>Dashboard</span>
          </Link>

          <Link
            to="/customer"
            className={`sidebar-link ${isActive("/customer")}`}
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">♙</span>
            <span>Customers</span>
          </Link>

          <Link
            to="/categories"
            className={`sidebar-link ${isActive("/categories")}`}
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">▦</span>
            <span>Categories</span>
          </Link>

          <Link
            to="/product"
            className={`sidebar-link ${isActive("/product")}`}
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">▣</span>
            <span>Products</span>
          </Link>

          <Link
            to="/inventory"
            className={`sidebar-link ${isActive("/inventory")}`}
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">▤</span>
            <span>Inventory</span>
          </Link>

          <Link
            to="/orders"
            className={`sidebar-link ${isActive("/orders")}`}
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">🛒</span>
            <span>Orders</span>
          </Link>

          <Link
            to="/payment"
            className={`sidebar-link ${isActive("/payment")}`}
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">▣</span>
            <span>Payments</span>
          </Link>

          <Link
            to="/analytics"
            className={`sidebar-link ${isActive("/analytics")}`}
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">▥</span>
            <span>Analytics</span>
          </Link>

          <p className="menu-title bottom-title">ACCOUNT</p>

          {/* Cart */}
          <div className="sidebar-cart">
            <span className="sidebar-icon">🛒</span>
            <AddToCard />
          </div>

          {/* Logout */}
          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <span className="sidebar-icon">↪</span>
            <span>Logout</span>
          </button>

        </div>
      </aside>
    </>
  );
}