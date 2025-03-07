import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_URL from "../config";
import {
  Paperclip,
  ThumbsUp,
  Check,
  CheckCheck,
  Send,
  Image,
  File,
} from "lucide-react";

interface Message {
  id: number;
  sender_email: string;
  text: string;
  timestamp: string;
  file_url?: string;
  reaction?: string;
  status: "sent" | "delivered" | "seen";
}

const DashboardChat: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      fetchMessages();
    } else {
      alert("Вы не авторизованы.");
    }
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/chat/messages`);
      setChatMessages(response.data);
      scrollToBottom();
    } catch (error) {
      console.error("Ошибка загрузки сообщений", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() && !file) return;

    try {
      setLoading(true);

      // Оптимистичное добавление "временного" сообщения в чат
      const tempId = Date.now(); // временный ID
      const tempMessage: Message = {
        id: tempId,
        sender_email: userEmail || "",
        text: newMessage.trim(),
        timestamp: new Date().toISOString(),
        status: "sent",
      };

      setChatMessages((prev) => [...prev, tempMessage]);

      // Если есть файл — отправляем с файлом
      if (file) {
        const formData = new FormData();
        formData.append("sender_email", userEmail || "");
        formData.append("text", newMessage.trim());
        formData.append("file", file);

        const response = await axios.post(`${API_URL}/chat/send-with-file`, formData);
        // Заменяем «временное» сообщение на реальное с бэкенда
        setChatMessages((prev) =>
          prev.map((msg) => (msg.id === tempId ? response.data : msg))
        );
      } else {
        // Отправка без файла
        const messageData = {
          sender_email: userEmail,
          text: newMessage.trim(),
        };
        const response = await axios.post(`${API_URL}/chat/send`, messageData, {
          headers: { "Content-Type": "application/json" },
        });
        // Заменяем «временное» сообщение на реальное с бэкенда
        setChatMessages((prev) =>
          prev.map((msg) => (msg.id === tempId ? response.data : msg))
        );
      }

      setNewMessage("");
      setFile(null);
      scrollToBottom();
    } catch (error) {
      console.error("Ошибка отправки сообщения", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const getInitials = (email: string) => email.charAt(0).toUpperCase();

  const toggleReaction = (id: number) => {
    // «Ставим лайк» или убираем его
    setChatMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, reaction: msg.reaction ? undefined : "👍" } : msg
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <Check className="w-4 h-4 text-gray-400" />;
      case "seen":
        return <CheckCheck className="w-4 h-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const isImageFile = (fileName?: string) => {
    if (!fileName) return false;
    const extension = fileName.split(".").pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Декоративные элементы (как в DashboardUpload) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Шапка чата (аналогично DashboardUpload) */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-3">
            <h1 className="text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              ЧАТ
            </h1>
            {/* Тот же градиентный "блик" за текстом */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-20"></div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl text-center">
            Общайтесь со своими клиентами в режиме реального времени
          </p>
        </div>

        {/* Основной блок чата со схожим дизайном (backdrop-blur, border и т.п.) */}
        <div className="max-w-4xl mx-auto">
          <div className="relative backdrop-blur-sm bg-black/40 border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
            {/* Заголовок внутри блока (опционально) */}
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-400">Диалоги</h2>
            </div>

            {/* Список сообщений */}
            <div className="bg-black/30 rounded-xl border border-white/10 max-h-96 overflow-y-auto p-4">
              {loading && chatMessages.length === 0 ? (
                <div className="flex justify-center py-8">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : chatMessages.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  Начните общение, отправив сообщение
                </div>
              ) : (
                chatMessages.map((msg) => {
                  const isMine = msg.sender_email === userEmail;
                  const isImage = msg.file_url && isImageFile(msg.file_url);

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start my-3 ${
                        isMine ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className="flex max-w-xs md:max-w-md group">
                        {/* Аватарка, если чужое сообщение */}
                        {!isMine && (
                          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold mr-2 mt-1">
                            {getInitials(msg.sender_email)}
                          </div>
                        )}

                        <div
                          className={`
                            p-3 rounded-2xl shadow-md 
                            ${
                              isMine
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-gray-700 text-gray-100 rounded-bl-none"
                            }
                          `}
                        >
                          <p className="whitespace-pre-wrap break-words">
                            {msg.text}
                          </p>

                          {msg.file_url && (
                            <a
                              href={`${API_URL}${msg.file_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block mt-2 rounded-lg overflow-hidden border border-gray-600 hover:border-blue-400 transition"
                            >
                              {isImage ? (
                                <div className="relative">
                                  <img
                                    src={`${API_URL}${msg.file_url}`}
                                    alt="file"
                                    className="max-w-full max-h-48 object-cover"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Image className="w-10 h-10 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-gray-800 p-3 flex items-center">
                                  <File className="w-5 h-5 mr-2 text-blue-400" />
                                  <span className="text-sm truncate">Открыть файл</span>
                                </div>
                              )}
                            </a>
                          )}

                          <div className="flex justify-between items-center mt-1 text-xs opacity-80">
                            <span>
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            <div className="flex items-center space-x-1">
                              {msg.reaction && <span>{msg.reaction}</span>}
                              {isMine && getStatusIcon(msg.status)}
                            </div>
                          </div>
                        </div>

                        {/* Кнопка "лайк" (реакция) */}
                        <button
                          className={`
                            ml-2 mt-1 p-1.5 rounded-full
                            bg-gray-700 text-gray-400
                            hover:bg-gray-600 hover:text-blue-400
                            transition-all transform opacity-0 group-hover:opacity-100 
                            focus:outline-none focus:ring-2 focus:ring-blue-400
                          `}
                          onClick={() => toggleReaction(msg.id)}
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Поле ввода (с прикреплением файла) */}
            <div className="mt-4 p-3 border-t border-white/10 bg-black/20 rounded-xl">
              {/* Прикреплённый файл, если есть */}
              {file && (
                <div className="mb-3 p-2 bg-black/30 rounded-lg flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center mr-2">
                    {isImageFile(file.name) ? (
                      <Image className="w-5 h-5 text-white" />
                    ) : (
                      <File className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="text-sm truncate flex-1">{file.name}</span>
                  <button
                    className="p-1 rounded-full hover:bg-gray-600 text-gray-400 hover:text-white transition-colors"
                    onClick={() => setFile(null)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <button
                  className="p-2 rounded-full bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={handleFileClick}
                  title="Прикрепить файл"
                >
                  <Paperclip className="w-5 h-5" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </button>

                <input
                  type="text"
                  placeholder="Введите сообщение..."
                  className="flex-1 py-3 px-4 bg-black/30 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                />

                <button
                  onClick={handleSend}
                  disabled={loading || (!newMessage.trim() && !file)}
                  className={`
                    p-3 rounded-full 
                    ${
                      !newMessage.trim() && !file
                        ? "bg-gray-700 text-gray-500"
                        : "bg-blue-600 text-white hover:bg-blue-500"
                    } 
                    transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                  title="Отправить сообщение"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Конец «коробки» чата */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChat;
