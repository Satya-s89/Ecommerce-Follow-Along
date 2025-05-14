import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, updateCartItemQuantity } from "../store/slices/cartSlice";
import CartCard from "./CartCard.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, status, error } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleQuantityChange = (id, quantity) => {
    // Dispatch the update action
    dispatch(updateCartItemQuantity({ productId: id, quantity }));

    // If quantity is 0, refresh the cart to remove the item
    if (quantity === 0) {
      setTimeout(() => {
        dispatch(fetchCartItems());
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Your Cart
        </h1>

        {/* Loading State */}
        {status === 'loading' && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading cart items...</p>
          </div>
        )}

        {/* Error State */}
        {status === 'failed' && (
          <div className="text-center py-8">
            <p className="text-red-500">Error: {error || "Failed to load cart items"}</p>
          </div>
        )}

        {/* Cart Content */}
        {status === 'succeeded' && (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Total Price: ${totalPrice.toFixed(2)}
            </h2>

            {items.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((product) => (
                    <CartCard
                      key={product._id}
                      product={product}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>

                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition mt-6 block mx-auto"
                  onClick={() =>
                    navigate("/checkout", {
                      state: { cartProducts: items },
                    })
                  }
                >
                  Proceed to Checkout
                </button>
              </>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Your cart is empty.</p>
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;