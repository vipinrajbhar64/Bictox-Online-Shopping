import Bubble from "./Bubble";
import ChatInput from "./ChatInput";
import { useEffect, useRef } from "react";

const ChatArea = ({ messages, message, setMessage, handleSend }) => {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Messages */}

      <div
        className="flex-1 overflow-y-auto px-10 py-8 scroll-smooth"
        style={{ overscrollBehavior: "contain" }}
      >
        <div className="max-w-5xl mx-auto">
          {messages.map((msg, index) => (
            <Bubble
              key={index}
              sender={msg.sender}
              text={msg.text}
              products={msg.products}
            />
          ))}
          <div ref={bottomRef}></div>
        </div>
      </div>

      {/* Bottom Input */}

      <div className="shrink-0">
        <ChatInput
          message={message}
          setMessage={setMessage}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
};
export default ChatArea;
