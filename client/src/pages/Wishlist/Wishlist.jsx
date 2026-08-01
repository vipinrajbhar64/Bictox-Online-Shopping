import { useEffect, useState } from "react";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { getWishlist, removeWishlist } from "../../services/wishlistService";
import { addToCart } from "../../services/cartService";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();

      if (res.data.success) {
        setWishlist(res.data.wishlistItems);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const res = await removeWishlist(productId);

      toast.success(res.data.message);

      fetchWishlist();
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message || "Failed to remove wishlist product",
      );
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);

      toast.success("🛒 Added to Cart");
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message || "Failed to add product to cart",
      );
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <FiHeart className="text-red-500" size={30} />
          <h1 className="text-4xl font-bold">My Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24">
            <FiHeart className="mx-auto text-gray-300" size={80} />
            <h2 className="text-2xl font-bold mt-5">Wishlist is Empty</h2>

            <p className="text-gray-500 mt-2">Add your favourite products ❤️</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((item) => {
              const product = item.product;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl shadow-md overflow-hidden"
                >
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-[300px] object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-bold">{product.name}</h3>

                    <p className="text-gray-500 mt-1">{product.brand}</p>

                    <p className="text-cyan-600 font-bold text-2xl mt-3">
                      ₹{product.price}
                    </p>

                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="flex-1 bg-cyan-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        <FiShoppingCart />
                        Cart
                      </button>

                      <button
                        onClick={() => handleRemove(product._id)}
                        className="w-12 border rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-600"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
