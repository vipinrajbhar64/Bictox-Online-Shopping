import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ chatHistory, handleHistoryClick, handleNewChat }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <div className="w-[320px] h-full overflow-hidden bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}

      <div className="border-b px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src="/bictox-ai-logo.png"
            alt="logo"
            className="h-11 w-auto object-contain"
          />

          <div>
            <h1 className="text-xl font-bold text-gray-800">Bictox AI</h1>

            <p className="text-xs text-cyan-600 font-medium">
              Online Shopping Assistant
            </p>
          </div>
        </div>
      </div>

      {/* New Chat */}

      <div className="p-5">
        <button
          onClick={handleNewChat}
          className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-700 transition text-white py-3 font-medium"
        >
          + New Chat
        </button>
      </div>

      {/* History */}

      <div className="flex-1 min-h-0 overflow-y-auto px-5">
        <h3 className="uppercase text-xs font-semibold text-gray-500 mb-4">
          Chat History
        </h3>

        {chatHistory.length === 0 ? (
          <p className="text-sm text-gray-400">No recent chats</p>
        ) : (
          chatHistory.map((item, index) => (
            <button
              key={index}
              onClick={() => handleHistoryClick(item)}
              className="w-full flex items-center gap-3 rounded-xl hover:bg-gray-100 transition p-3 text-left"
            >
              <HiOutlineChatBubbleLeftRight />
              <span className="truncate">{item}</span>
            </button>
          ))
        )}
      </div>

      {/* Profile */}

      <div className="border-t bg-white p-5">
        <button
          onClick={() => navigate(token ? "/profile" : "/login")}
          className="w-full rounded-xl border border-gray-300 py-3 font-medium hover:bg-cyan-50 transition"
        >
          {token ? "My Profile" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
