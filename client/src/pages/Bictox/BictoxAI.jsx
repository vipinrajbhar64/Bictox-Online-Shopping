import { useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import Welcome from "./Welcome";
import SuggestionCards from "./SuggestionCards";
import ChatArea from "./ChatArea";
import { askBictoxAI } from "../../services/aiService";

const suggestions = [
  "Budget Shopping",
  "Compare Products",
  "Trending Deals",
  "Outfit Suggestion",
];

const BictoxAI = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("bictox_ai_messages");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bictox_ai_messages", JSON.stringify(messages));
  }, [messages]);

  const handleSuggestion = (text) => {
    setMessage(text);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    if (messages.length === 0) {
      setChatHistory((prev) => {
        if (prev.includes(userMessage)) return prev;
        return [userMessage, ...prev].slice(0, 15);
      });
    }

    // User Bubble
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
      {
        sender: "ai",
        text: "__loading__",
        products: [],
      },
    ]);

    setMessage("");

    // Backend Call
    const response = await askBictoxAI(userMessage);

    setMessages((prev) => {
      const updated = [...prev];

      // Thinking Bubble remove
      updated.pop();

      if (!response.success) {
        updated.push({
          sender: "ai",
          text: "Sorry! Something went wrong.",
        });
        return updated;
      }

      let aiText = `${response.recommendation}\n\n`;

      if (
        response.products.length > 0 &&
        response.parsedResult?.price !== undefined &&
        response.parsedResult?.price !== null
      ) {
        aiText += ``;
        aiText += `💵 Total : ₹${response.budget.total}\n`;
        aiText += `💰 Remaining : ₹${response.budget.remaining}`;
      }

      updated.push({
        sender: "ai",
        text: aiText,
        products: response.products,
      });

      return updated;
    });
  };

  const handleNewChat = () => {
    setMessages([]);
    setMessage("");
    localStorage.removeItem("bictox_ai_messages");
  };

  const handleHistoryClick = (text) => {
    setMessage(text);
  };

  return (
    <div className="flex w-full h-full overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar */}

      <Sidebar
        chatHistory={chatHistory}
        handleHistoryClick={handleHistoryClick}
        handleNewChat={handleNewChat}
      />
      {/* Main */}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-10">
            <div className="w-full max-w-6xl flex flex-col items-center">
              <Welcome
                message={message}
                setMessage={setMessage}
                handleSend={handleSend}
              />

              <div className="mt-6">
                <SuggestionCards
                  suggestions={suggestions}
                  handleSuggestion={handleSuggestion}
                />
              </div>
            </div>
          </div>
        ) : (
          <ChatArea
            messages={messages}
            message={message}
            setMessage={setMessage}
            handleSend={handleSend}
          />
        )}
      </div>
    </div>
  );
};

export default BictoxAI;
