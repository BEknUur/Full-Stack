import React, { useState, useEffect, useRef, KeyboardEvent } from "react";

interface Message {
  text: string;
  timestamp: string;
  isMine: boolean;
}

const DashboardChat: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Загружаем сохранённые сообщения из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) {
      setChatMessages(JSON.parse(saved));
    }
  }, []);

  // Сохраняем сообщения в localStorage и прокручиваем вниз при изменении сообщений
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const message: Message = {
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMine: true // Здесь предполагаем, что все отправленные сообщения — ваши
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Chat</h2>
      <div className="bg-gray-800 p-4 rounded-lg space-y-4 max-h-80 overflow-y-auto shadow-lg">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-4 ${
              message.isMine ? "justify-end" : "justify-start"
            }`}
          >
            {!message.isMine && (
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                U
              </div>
            )}
            <div
              className={`p-4 rounded-lg max-w-sm ${
                message.isMine
                  ? "bg-green-600 text-white rounded-tr-none"
                  : "bg-gray-700 text-gray-300 rounded-tl-none"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs text-gray-400 mt-1">{message.timestamp}</p>
            </div>
            {message.isMine && (
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                Y
              </div>
            )}
          </div>
        ))}
        {/* Пустой div для автопрокрутки вниз */}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-4 bg-gray-700 rounded-full text-white focus:ring-2 focus:ring-green-500 transition-all"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DashboardChat;
