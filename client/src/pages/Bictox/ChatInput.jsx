import { IoSend } from "react-icons/io5";

const ChatInput = ({ message, setMessage, handleSend }) => {
  return (
    <div className="w-full bg-[#F8FAFC] border-t border-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="
          flex
          items-center
          bg-white
          rounded-2xl
          border
          border-gray-200
          shadow-lg
          px-6
          py-2
        "
        >
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
            className="
              flex-1
              bg-transparent
              outline-none
              py-4
              text-[16px]
              text-gray-700
              placeholder:text-gray-400
            "
          />

          <button
            onClick={handleSend}
            className="
              ml-4
              w-12
              h-12
              rounded-xl
              bg-cyan-600
              hover:bg-cyan-700
              text-white
              flex
              items-center
              justify-center
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <IoSend size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
