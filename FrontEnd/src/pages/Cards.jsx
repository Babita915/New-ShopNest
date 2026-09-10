import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
} from "../Redux/Slice";
import { useNavigate } from "react-router-dom";

export default function Card() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.qty || 0),
    0
  );

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <h4 className="mb-0">
            My Basket{" "}
            <span className="text-muted">
              ({cartItems.length} items)
            </span>
          </h4>
        </div>

        {/* Empty Basket */}
        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <h5>Your Basket is Empty</h5>

            <p className="text-muted">
              Add some products to your basket.
            </p>
          </div>
        ) : (
          <>
            {/* Cart Products */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center border-bottom py-3"
              >

                {/* Product Details */}
                <div className="d-flex align-items-center gap-3">

                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                    }}
                  />

                  <div>
                    <h6 className="mb-1">
                      {item.name}
                    </h6>

                    <p className="mb-2 text-muted">
                      ₹{Number(item.price).toFixed(2)}
                    </p>

                    {/* Quantity Buttons */}
                    <div className="d-flex align-items-center gap-2">

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          dispatch(
                            decrementQty(item.id)
                          )
                        }
                      >
                        −
                      </button>

                      <span className="fw-bold px-2">
                        {item.qty}
                      </span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          dispatch(
                            incrementQty(item.id)
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    {/* Remove */}
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() =>
                        dispatch(
                          removeFromCart(item.id)
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="fw-bold">
                  ₹
                  {(
                    Number(item.price) *
                    Number(item.qty)
                  ).toFixed(2)}
                </div>

              </div>
            ))}

            {/* Subtotal */}
            <div className="d-flex justify-content-between mt-4">
              <h5>Subtotal</h5>

              <h5>
                ₹{subtotal.toFixed(2)}
              </h5>
            </div>

            {/* Checkout */}
            <button className="btn btn-primary mt-3 w-100" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}