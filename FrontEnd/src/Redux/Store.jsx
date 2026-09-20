import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slice";

// console.log("cartReducer:", cartReducer);


const savedCart = localStorage.getItem("cart");

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },


  preloadedState: {
    cart: {
      items: savedCart ? JSON.parse(savedCart) : [],
    },
  },
});

store.subscribe(() => {
  const state = store.getState();


  localStorage.setItem(
    "cart",
    JSON.stringify(state.cart.items)
  )
})

export default store;