import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../services/productService";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();

      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log("Shop Products Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <span className="inline-flex px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold">
            🛍️ Bictox Collection
          </span>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-4">
            Shop All Products
          </h1>

          <p className="text-gray-500 mt-2">
            Explore our latest fashion collection.
          </p>
        </div>

        {/* Product Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            {products.length} Products Available
          </p>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="bg-gray-100 overflow-hidden">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-[280px] object-cover hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Details */}
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-cyan-600 font-semibold">
                    {product.brand}
                  </p>

                  <h2 className="text-lg font-bold text-gray-900 mt-1 line-clamp-1">
                    {product.name}
                  </h2>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-bold text-cyan-600">
                      ₹{product.price}
                    </p>

                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
                      ★ {product.rating || "4.5"}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product._id}`);
                    }}
                    className="w-full mt-4 py-2.5 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition"
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">No Products Found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
