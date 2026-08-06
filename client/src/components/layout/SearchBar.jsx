import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import API from "../../services/api";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close search when clicking anywhere outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const searchProducts = async (value) => {
    setQuery(value);
    setIsSearchOpen(true);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await API.get(
        `/products/search?query=${encodeURIComponent(value)}`,
      );

      if (res.data.success) {
        setResults(res.data.products || []);
      } else {
        setResults([]);
      }
    } catch (error) {
      setResults([]);
    }
  };

  const handleProductClick = (productId) => {
    setResults([]);
    setIsSearchOpen(false);
    setQuery("");

    navigate(`/product/${productId}`);
  };

  return (
    <div
      ref={searchRef}
      className="relative hidden md:block w-[220px] lg:w-[280px] xl:w-[360px]"
    >
      {/* Search Input */}
      <div className="flex items-center w-full h-11 bg-gray-100 rounded-full px-4">
        <FiSearch size={18} className="text-gray-500 flex-shrink-0" />

        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onFocus={() => {
            if (query.trim().length >= 2) {
              setIsSearchOpen(true);
            }
          }}
          onChange={(e) => searchProducts(e.target.value)}
          className="ml-3 w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* Search Results */}
      {isSearchOpen && query.trim().length >= 2 && (
        <div className="absolute top-13 left-0 w-full max-h-96 overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-100 z-[100]">
          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
              >
                {/* Product Image */}
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                />

                {/* Product Info */}
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">
                    {product.name}
                  </h4>

                  <p className="text-sm text-gray-500">{product.brand}</p>

                  <p className="text-sm font-semibold text-cyan-600">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
