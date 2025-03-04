import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_URL from "../config";

interface Message {
    sender_email: string;
    text: string;
    timestamp: string;
}

const DashboardChat: React.FC = () => {
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Сохраняем userEmail при загрузке компонента
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            setUserEmail(email);
            fetchMessages();
        } else {
            alert("Вы не авторизованы. Пожалуйста, выполните вход.");
        }
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${API_URL}/chat/messages`);
            setChatMessages(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке сообщений:", error);
        }
    };

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        if (!userEmail) {
            alert("Вы не авторизованы. Пожалуйста, войдите в систему.");
            return;
        }

        const messageData = {
            sender_email: userEmail,
            text: newMessage.trim(),
        };

        console.log("Отправляем сообщение:", messageData);

        try {
            const response = await axios.post(`${API_URL}/chat/send`, messageData);
            setChatMessages([...chatMessages, response.data]);
            setNewMessage("");
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        } catch (error: any) {
            console.error("Ошибка при отправке сообщения:", error.response?.data || error.message);
        }
    };

    return (
        <div className="p-8 text-white">
            <h2 className="text-3xl font-bold text-green-400 mb-6">Chat</h2>
            <div className="bg-gray-800 p-4 rounded-lg space-y-4 max-h-80 overflow-y-auto shadow-lg">
                {chatMessages.map((msg, index) => {
                    const isMine = msg.sender_email === userEmail;

                    return (
                        <div
                            key={index}
                            className={`flex items-start space-x-4 ${isMine ? "justify-end" : "justify-start"}`}
                        >
                            {!isMine && (
                                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                                    U
                                </div>
                            )}
                            <div
                                className={`p-4 rounded-lg max-w-sm ${
                                    isMine
                                        ? "bg-green-600 text-white rounded-tr-none"
                                        : "bg-gray-700 text-gray-300 rounded-tl-none"
                                }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                            {isMine && (
                                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                                    Y
                                </div>
                            )}
                        </div>
                    );
                })}
                <div ref={chatEndRef} />
            </div>

            <div className="mt-4 flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 p-4 bg-gray-700 rounded-full text-white focus:ring-2 focus:ring-green-500 transition-all"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
