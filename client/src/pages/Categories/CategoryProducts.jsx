import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const CategoryProducts = () => {
  const { name } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/category/${name}`,
        );

        const data = await res.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [name]);

  console.log(products);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold text-cyan-600">
          Loading Products...
        </h2>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-500">No Products Found</h2>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Heading */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 capitalize">
          {name} Collection
        </h1>

        <p className="text-gray-500 mt-2">
          {products.length} Products Available
        </p>
      </div>

      {/* Products */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            {/* Image */}

            <img
              src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${product.image}`}
              alt={product.name}
              className="w-full h-72 object-cover"
            />

            {/* Content */}

            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-900">
                {product.name}
              </h2>

              <p className="text-cyan-600 font-bold text-xl mt-2">
                ₹{product.price}
              </p>

              <p className="text-sm text-gray-500 mt-2">{product.material}</p>

              <p className="text-sm text-gray-500">{product.color}</p>

              <Link
                to={`/product/${product._id}`}
                className="block w-full mt-5 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold text-center transition"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryProducts;
