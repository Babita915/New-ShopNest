import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
} from "../Redux/Slice";
import { useNavigate } from "react-router-dom";
import "../style/card.css";

export default function Card() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;

    return total + price * qty;
  }, 0);

  // Total quantity of products
  const totalItems = cartItems.reduce(
    (total, item) => total + (Number(item.qty) || 0),
    0
  );

  return (
    <div className="container cart-container">
      <div className="cart-wrapper">

        {/* Header */}
        <div className="cart-header">
          <div>
            <h2>My Basket</h2>
            <p>
              {totalItems} {totalItems === 1 ? "item" : "items"} in your basket
            </p>
          </div>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/product")}
          >
            ← Continue Shopping
          </button>
        </div>

        {/* Empty Basket */}
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h3>Your Basket is Empty</h3>

            <p>
              You haven't added any products yet.
            </p>

            <button
              className="shop-now-btn"
              onClick={() => navigate("/products")}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">

            {/* Cart Items */}
            <div className="cart-items">

              {cartItems.map((item) => {
                const price = Number(item.price) || 0;
                const qty = Number(item.qty) || 0;
                const itemTotal = price * qty;

                return (
                  <div className="cart-item" key={item.id}>

                    {/* Product Image */}
                    <div className="cart-product-image">
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="cart-product-details">

                      <h5>{item.name}</h5>

                      <p className="product-price">
                        ₹{price.toFixed(2)}
                      </p>

                      {/* Quantity */}
                      <div className="quantity-wrapper">
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            dispatch(decrementQty(item.id))
                          }
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>

                        <span className="quantity">
                          {qty}
                        </span>

                        <button
                          className="quantity-btn"
                          onClick={() =>
                            dispatch(incrementQty(item.id))
                          }
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        className="remove-btn"
                        onClick={() =>
                          dispatch(removeFromCart(item.id))
                        }
                      >
                        Remove
                      </button>

                    </div>

                    {/* Item Total */}
                    <div className="item-total">
                      ₹{itemTotal.toFixed(2)}
                    </div>

                  </div>
                );
              })}

            </div>

            {/* Order Summary */}
            <div className="order-summary">

              <h4>Order Summary</h4>

              <div className="summary-row">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-delivery">FREE</span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}