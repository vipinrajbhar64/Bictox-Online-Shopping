import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiHeart,
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiArrowLeft,
} from "react-icons/fi";
import { getSingleProduct } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { addToWishlist } from "../../services/wishlistService";
import { addReview, getProductReviews } from "../../services/reviewService";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await getSingleProduct(id);

      if (res.data.success) {
        setProduct(res.data.product);
      }
    } catch (error) {
      console.log("Product Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const res = await addToCart(product._id, quantity);

      if (res.data.success) {
        toast.success("Product added to cart successfully 🛒");
      }
    } catch (error) {
      console.log("Add To Cart Error:", error);

      if (error.response?.status === 401) {
        toast.error("Please login first");
      } else {
        toast.error("Failed to add product to cart");
      }
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await getProductReviews(id);

      if (res.data.success) {
        setReviews(res.data.reviews);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitReview = async () => {
    try {
      const res = await addReview({
        productId: id,
        rating,
        comment,
      });

      if (res.data.success) {
        toast.success("Review Added ⭐");

        setComment("");
        setRating(5);

        fetchReviews();
      }
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Failed to add review");
    }
  };

  const handleWishlist = async () => {
    try {
      const res = await addToWishlist(product._id);

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Wishlist Error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500 font-semibold">Product Not Found</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-6 lg:py-8">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-600 mb-5"
        >
          <FiArrowLeft size={18} />
          Back
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 p-5 lg:p-7">
            {/* IMAGE */}
            <div className="flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full max-w-[430px] h-[360px] lg:h-[430px] object-cover"
              />
            </div>

            {/* DETAILS */}
            <div className="flex flex-col justify-center">
              {/* Brand */}
              <p className="text-cyan-600 text-sm font-semibold uppercase tracking-wide">
                {product.brand}
              </p>

              {/* Name */}
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mt-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <span className="bg-green-600 text-white px-2.5 py-1 rounded-md text-sm font-semibold">
                  ★ {product.rating || "4.5"}
                </span>

                <span className="text-sm text-gray-500">Customer Rating</span>
              </div>

              {/* Price */}
              <div className="mt-5">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 text-sm leading-6 mt-4">
                  {product.description}
                </p>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mt-6">
                <span className="text-sm font-semibold text-gray-700">
                  Quantity
                </span>

                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
                  >
                    <FiMinus size={15} />
                  </button>

                  <span className="w-9 text-center text-sm font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
                  >
                    <FiPlus size={15} />
                  </button>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-cyan-500 text-cyan-600 font-semibold hover:bg-cyan-50 transition"
                >
                  <FiShoppingCart size={19} />
                  Add to Cart
                </button>

                <button className="flex-1 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold hover:scale-[1.01] transition">
                  Buy Now
                </button>

                <button
                  onClick={handleWishlist}
                  className="sm:w-12 flex items-center justify-center py-3 rounded-lg border border-gray-300 hover:bg-red-50 hover:text-red-500 transition"
                >
                  <FiHeart size={20} />
                </button>
              </div>

              {/* STOCK */}
              <div className="border-t border-gray-200 mt-6 pt-4">
                <p className="text-green-600 text-sm font-semibold">
                  ✓ In Stock
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  Fast delivery available
                </p>
              </div>

              <div className="mt-12 bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold mb-5">Customer Reviews</h2>

                {/* Rating */}

                <div className="mb-4">
                  <label className="font-medium">Rating</label>

                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border rounded-lg px-3 py-2 ml-3"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐</option>
                    <option value={4}>⭐⭐⭐⭐</option>
                    <option value={3}>⭐⭐⭐</option>
                    <option value={2}>⭐⭐</option>
                    <option value={1}>⭐</option>
                  </select>
                </div>

                {/* Comment */}

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full border rounded-lg p-3"
                  rows="4"
                />

                <button
                  onClick={handleSubmitReview}
                  className="mt-4 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                >
                  Submit Review
                </button>

                <div className="mt-8">
                  {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review._id} className="border-b py-4">
                        <h3 className="font-semibold">
                          {review.user?.name || "User"}
                        </h3>

                        <p className="text-yellow-500">
                          {"⭐".repeat(review.rating)}
                        </p>

                        <p className="text-gray-600 mt-2">{review.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Product;
