import React from "react";
import { Link } from "react-router-dom";
import "../style/footer.css";

export default function Footer() {
  return (
    <footer className="shopnest-footer">

      {/* Footer Main */}
      <div className="footer-container">

        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <h2>
              ShopNest<span>.</span>
            </h2>

            <p>
              Your trusted online shopping destination.
              Discover quality products with a simple,
              secure and smooth shopping experience.
            </p>

            <div className="footer-badge">
              🛍️ <span>Smart Shopping. Better Living.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>

            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4>Stay Connected</h4>

            <p>
              Get updates about new products and offers.
            </p>

            <div className="newsletter-box">
              <input
                type="email"
                placeholder="Enter your email"
              />

              <button>→</button>
            </div>

            <div className="footer-socials">

              <a
                href="https://github.com/Babita915"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">

        <p>
          © 2026 <strong>ShopNest</strong>. All rights reserved.
        </p>

        

      </div>

    </footer>
  );
}