import { useNavigate } from "react-router-dom";

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate();

  return (
    <section className="pt-10 pb-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold">
            Handpicked By Bictox AI
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-extrabold text-gray-900">
            Explore Fashion
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Discover premium styles handpicked by Bictox AI for every occasion.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <span className="px-5 py-2 rounded-full bg-gray-100 hover:bg-cyan-600 hover:text-white transition cursor-pointer">
            Pants
          </span>

          <span className="px-5 py-2 rounded-full bg-gray-100 hover:bg-cyan-600 hover:text-white transition cursor-pointer">
            T-Shirts
          </span>

          <span className="px-5 py-2 rounded-full bg-gray-100 hover:bg-cyan-600 hover:text-white transition cursor-pointer">
            Shoes
          </span>

          <span className="px-5 py-2 rounded-full bg-gray-100 hover:bg-cyan-600 hover:text-white transition cursor-pointer">
            Jackets
          </span>
        </div>

        {/* Products */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white rounded-3xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="w-full h-[320px] object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-bold">{product.name}</h3>

                  <p className="text-gray-500 mt-2">{product.brand}</p>

                  <p className="text-cyan-600 font-bold text-2xl mt-4">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product._id}`);
                    }}
                    className="mt-4 w-full py-2.5 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition"
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">
              No Products Found
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
export default FeaturedProducts;
