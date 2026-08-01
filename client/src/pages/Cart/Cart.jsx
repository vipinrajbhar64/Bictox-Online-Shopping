import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../../services/cartService";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCart();

      if (response.data.success) {
        setCartItems(response.data.cartItems || []);
      }
    } catch (err) {
      console.log("Cart Error:", err);
      setError(err.response?.data?.message || "Unable to load your cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId, action) => {
    try {
      await updateCartQuantity(productId, action);
      fetchCart();
    } catch (err) {
      console.log("Quantity Update Error:", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCart();
    } catch (err) {
      console.log("Remove Cart Error:", err);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 1;

    return total + price * quantity;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading your cart...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
            My Cart
          </h1>

          <p className="text-gray-500 mt-2">
            Review your selected products before checkout.
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 bg-red-100 text-red-600 rounded-xl px-5 py-4">
            {error}
          </div>
        )}

        {/* Empty Cart */}

        {!error && cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
            <FiShoppingBag size={55} className="mx-auto text-gray-300" />

            <h2 className="text-2xl font-bold mt-5">Your cart is empty</h2>

            <p className="text-gray-500 mt-2">
              Add some products to your cart first.
            </p>

            <Link
              to="/shop"
              className="inline-block mt-6 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}

            <div className="lg:col-span-2 space-y-5">
              {cartItems.map((item) => {
                const product = item.product;

                if (!product) return null;

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex gap-5"
                  >
                    {/* Image */}

                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-xl"
                    />

                    {/* Details */}

                    <div className="flex-1">
                      <div className="flex justify-between gap-3">
                        <div>
                          <h2 className="font-bold text-lg sm:text-xl">
                            {product.name}
                          </h2>

                          <p className="text-gray-500 text-sm mt-1">
                            {product.brand}
                          </p>
                        </div>

                        <button
                          onClick={() => handleRemove(product._id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                        >
                          <FiTrash2 size={19} />
                        </button>
                      </div>

                      {/* Price */}

                      <p className="text-cyan-600 font-bold text-xl mt-4">
                        ₹{product.price}
                      </p>

                      {/* Quantity */}

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(product._id, "decrease")
                          }
                          disabled={item.quantity <= 1}
                          className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
                        >
                          <FiMinus size={16} />
                        </button>

                        <span className="font-semibold min-w-[25px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            handleUpdateQuantity(product._id, "increase")
                          }
                          className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-gray-100"
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}

            <div className="bg-white rounded-3xl shadow-sm p-6 h-fit lg:sticky lg:top-28">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="flex justify-between mt-6 text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between mt-3 text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>

              <div className="border-t mt-5 pt-5 flex justify-between text-xl font-extrabold">
                <span>Total</span>
                <span className="text-cyan-600">₹{totalPrice}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block text-center mt-4 text-cyan-600 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
