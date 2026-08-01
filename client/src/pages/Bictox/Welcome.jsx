import { HiOutlineSparkles } from "react-icons/hi2";

const Welcome = ({ message, setMessage, handleSend }) => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Logo */}
      <div className="w-20 h-20 rounded-2xl bg-cyan-50 flex items-center justify-center shadow-sm">
        <HiOutlineSparkles className="text-cyan-600" size={45} />
      </div>
      {/* Title */}
      <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-800">
        Bictox AI
      </h1>
      <p className="mt-2 text-base text-gray-500">
        Smarter Shopping Starts Here
      </p>
      {/* Search */}
      <div className="w-full max-w-4xl mt-8">
        <div className="flex items-center bg-white rounded-2xl border border-gray-200 shadow-lg px-6">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Ask Bictox AI anything..."
            className="flex-1 bg-transparent outline-none py-5 text-lg"
          />

          <button
            onClick={handleSend}
            className="ml-4 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition text-white font-medium"
          >
            Search
          </button>
        </div>
      </div>
      {/* Suggestion Cards */}
    </div>
  );
};

export default Welcome;
