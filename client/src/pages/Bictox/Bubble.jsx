const Bubble = ({ sender, text, products = [] }) => {
  if (!text || text.trim() === "") return null;
  const isUser = sender === "user";

  return (
    <div
      className={`flex w-full mb-6 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[75%] rounded-3xl px-6 py-4 shadow-sm transition-all duration-300 ${
          isUser
            ? "bg-cyan-600 text-white rounded-br-md"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
        }`}
      >
        {text === "__loading__" ? (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"></span>

            <span
              className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>

            <span
              className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></span>

            <span className="ml-2 text-sm text-gray-500">
              Searching products...
            </span>
          </div>
        ) : (
          <p className="leading-7 whitespace-pre-wrap break-words">{text}</p>
        )}

        {!isUser && products.length > 0 && (
          <div className="my-5 border-t border-gray-300"></div>
        )}

        {!isUser && products.length > 0 && (
          <div className="mt-6 space-y-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex gap-5 items-center border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition"
              >
                {/* Product Image */}

                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="w-[120px] h-[120px] rounded-xl object-cover border"
                />

                {/* Product Details */}

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-cyan-600 text-2xl font-bold">
                    ₹{product.price}
                  </p>

                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p>🎨 Color : {product.color}</p>
                    <p>🧵 Material : {product.material}</p>
                    <p>📦 Stock : {product.stock}</p>
                  </div>

                  <button
                    onClick={() =>
                      window.open(`/product/${product._id}`, "_blank")
                    }
                    className="mt-5 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl transition"
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bubble;
