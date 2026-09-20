import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {
    // ADD TO CART
    addToCart(state, action) {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({
          ...product,
          qty: 1,
        });
      }
    },

    // REMOVE
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // INCREMENT
    incrementQty(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.qty += 1;
      }
    },

    // DECREMENT
    decrementQty(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },

    // CLEAR CART
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;