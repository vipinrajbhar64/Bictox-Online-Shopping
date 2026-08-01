const SuggestionCards = ({ suggestions, handleSuggestion }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-4 w-full max-w-5xl">
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => handleSuggestion(item)}
          className="
            group
            bg-white
            rounded-2xl
            border
            border-gray-200
            p-5
            text-left
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <h3 className="font-semibold text-gray-800 group-hover:text-cyan-600 transition">
            {item}
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Click to instantly start shopping with AI.
          </p>
        </button>
      ))}
    </div>
  );
};

export default SuggestionCards;
