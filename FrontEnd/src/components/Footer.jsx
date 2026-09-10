import React from "react";
import { Link } from "react-router-dom";
import "../style/footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-container">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h4 className="footer-title">ShopNest</h4>

            <p className="footer-description">
              Your one-stop online shopping destination.
              Shop products easily and securely from anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5 className="footer-heading">Quick Links</h5>

            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/products">Products</Link>
              </li>

              <li>
                <Link to="/categories">Categories</Link>
              </li>

              <li>
                <Link to="/cart">Cart</Link>
              </li>

              <li>
                <Link to="/orders">Orders</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="col-md-3 mb-4">
            <h5 className="footer-heading">Customer Support</h5>

            <ul className="footer-links">
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>

              <li>
                <Link to="/help">Help Center</Link>
              </li>

              <li>
                <Link to="/shipping">Shipping</Link>
              </li>

              <li>
                <Link to="/returns">Returns & Refunds</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3 mb-4">
            <h5 className="footer-heading">Follow Us</h5>

            <ul className="footer-links">
              <li>
                <a
                  href="https://github.com/Babita915"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>
          © 2026 ShopNest. All rights reserved.
        </p>
      </div>

    </footer>
  );
}