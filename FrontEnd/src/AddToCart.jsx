import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './style/addtocard.css';

export default function AddToCard(){

  const cartItems = useSelector((state) => state.cart.items); 
  const cartCount = cartItems.length; 
  const navigate = useNavigate();

console.log(cartItems)
  return (
    <div className="add-cart">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
        width="40"
        alt="cart" onClick={() => navigate("/cartpage")}
  style={{ cursor: "pointer" }}
      />
      <span className="cart-count">{cartCount}</span>
    </div>
  );
}
