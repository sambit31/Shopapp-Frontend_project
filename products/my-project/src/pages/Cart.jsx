import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decQty, emptyCart, incQty, removeItem } from "../store/actions/cartActions";


const Cart = () => {
  const { carts } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const totalPrice = carts.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {carts.length === 0 ? (
        <h2 className="text-center text-xl mt-10">Cart is Empty 😐</h2>
      ) : (
        <>
          <div className="space-y-4">
            {carts.map((item) => (
              <div key={item.id} className="bg-white/10 p-4 rounded-lg border border-white/20 flex items-center gap-4">
                <img src={item.image} className="w-20 h-20 object-contain rounded" />

                <div className="flex-1">
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <p>₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => dispatch(decQty(item.id))} className="bg-red-500 px-3 rounded">
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => dispatch(incQty(item.id))} className="bg-green-500 px-3 rounded">
                      +
                    </button>

                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="bg-gray-600 px-3 py-1 rounded ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between text-lg font-bold">
            <span>Total Price:</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <div className="mt-6 flex justify-between">
            <button onClick={() => dispatch(emptyCart())} className="bg-red-600 px-6 py-2 rounded-lg">
              Clear Cart
            </button>
            <button className="bg-green-600 px-6 py-2 rounded-lg">Checkout ✅</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
