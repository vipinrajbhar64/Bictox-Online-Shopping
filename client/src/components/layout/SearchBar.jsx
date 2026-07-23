import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import API from "../../services/api";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const searchProducts = async (value) => {
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    try {
      console.log(API.defaults.baseURL);
      console.log(`/products/search?query=${encodeURIComponent(value)}`);
      const res = await API.get(
        `/products/search?query=${encodeURIComponent(value)}`,
      );

      setResults(res.data.products);
    } catch (error) {
      console.log("Axios Error:", error);
      console.log("Response:", error.response);
      console.log("Request:", error.request);
      console.log("Message:", error.message);

      setResults([]);
    }
  };

  return (
    <div className="relative hidden lg:block">
      <div className="flex items-center w-[400px] h-11 bg-gray-100 rounded-full px-4">
        <FiSearch size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => searchProducts(e.target.value)}
          className="ml-3 w-full bg-transparent outline-none text-sm"
        />
      </div>

      {results.length > 0 && (
        <div className="absolute mt-2 w-full max-h-96 overflow-y-auto bg-white rounded-xl shadow-xl border z-50">
          {results.map((product) => (
            <div
              key={product._id}
              onClick={() => {
                setQuery(product.name);
                setResults([]);
              }}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
            >
              <div>
                <h4 className="font-semibold">{product.name}</h4>

                <p className="text-sm text-gray-500">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {query.length >= 2 && results.length === 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border p-4 text-center text-gray-500 z-50">
          No products found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
