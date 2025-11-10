import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.carts.find((p) => p.id === product.id);

      if (exist) {
        exist.qty += 1;
      } else {
        state.carts.push({ ...product, qty: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },

    increaseQty: (state, action) => {
      const item = state.carts.find((p) => p.id === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.carts.find((p) => p.id === action.payload);
      if (item.qty === 1) {
        state.carts = state.carts.filter((p) => p.id !== action.payload);
      } else {
        item.qty -= 1;
      }
    },

    clearCart: (state) => {
      state.carts = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
