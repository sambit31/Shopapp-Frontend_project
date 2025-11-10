import { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } from "../reducers/cartSlice";

export const addProductToCart = (product) => (dispatch) => {
  dispatch(addToCart(product));
};

export const removeItem = (id) => (dispatch) => {
  dispatch(removeFromCart(id));
};

export const incQty = (id) => (dispatch) => {
  dispatch(increaseQty(id));
};

export const decQty = (id) => (dispatch) => {
  dispatch(decreaseQty(id));
};

export const emptyCart = () => (dispatch) => {
  dispatch(clearCart());
};
