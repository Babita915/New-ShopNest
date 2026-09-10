import React from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
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
      <h3 className="mb-4">Checkout</h3>

      <div className="row">

        {/* Customer Details */}
        <div className="col-md-7">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Delivery Address</h5>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Mobile Number"
            />

            <textarea
              className="form-control mb-3"
              placeholder="Full Address"
              rows="4"
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Pincode"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Order Summary</h5>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-3"
              >
                <span>
                  {item.name} × {item.qty}
                </span>

                <span>
                  ₹
                  {(
                    Number(item.price) *
                    Number(item.qty)
                  ).toFixed(2)}
                </span>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between">
              <strong>Subtotal</strong>
              <strong>₹{subtotal.toFixed(2)}</strong>
            </div>

            <button className="btn btn-primary w-100 mt-4">
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}