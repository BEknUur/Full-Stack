import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  SearchIcon,
  UserIcon,
  UploadIcon,
  MessageSquareIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";

const MainDashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState("home");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [uploadedCars, setUploadedCars] = useState([
    { name: "Toyota Camry", price: "100$/day", location: "Almaty", rating: 4.5 },
    { name: "Hyundai Sonata", price: "80$/day", location: "Astana", rating: 4.0 },
  ]);

  const navigate = useNavigate();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Сохранение сообщений в localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) setChatMessages(JSON.parse(savedMessages));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  const renderSection = () => {
    switch (selectedSection) {
      case "home":
        return (
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold text-blue-500">Welcome to QazaqRental</h1>
            <p className="mt-4 text-lg">
              Find the best car rental options for your needs in Kazakhstan.
            </p>
          </div>
        );
      case "search":
        return (
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold text-blue-400">Search for Cars</h2>
            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Enter location"
                className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Car brand"
                className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Max Price"
                className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>
        );
      case "profile":
        return (
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold text-blue-400">My Profile</h2>
            <div className="mt-6 flex items-center space-x-4">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-xl text-white">
                  No Image
                </div>
              )}
              <div>
                <p className="text-lg">Name: Beknur</p>
                <p className="text-lg">Email: ualihanulybeknur@gmail.com</p>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-4"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader();
                      reader.onload = () => setProfileImage(reader.result as string);
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        );
      case "upload":
        return (
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold text-blue-400">Upload Your Car</h2>
            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Car Name"
                className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Price per Day"
                className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="file"
                className="w-full p-4 bg-gray-800 rounded-lg text-white"
              />
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
              >
                Upload
              </button>
            </form>
          </div>
        );
        case "chat":
  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold text-blue-400 mb-6">Chat</h2>
      {/* Chat messages */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg space-y-4 max-h-80 overflow-y-auto shadow-lg">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-4 ${
              index % 2 === 0 ? "justify-end" : "justify-start"
            }`}
          >
            {index % 2 === 1 && (
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                U
              </div>
            )}
            <div
              className={`p-4 rounded-lg max-w-sm ${
                index % 2 === 0
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-gray-700 text-gray-300 rounded-tl-none"
              } animate-slideIn`}
            >
              <p className="text-sm">{message}</p>
            </div>
            {index % 2 === 0 && (
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                Y
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-4 bg-gray-700 rounded-full text-white focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          onClick={() => {
            if (newMessage.trim()) {
              setChatMessages([...chatMessages, newMessage.trim()]);
              setNewMessage("");
            }
          }}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Send
        </button>
      </div>
    </div>
  );

        
    case "myAds":
        return (
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold text-blue-400">My Ads</h2>
            <div className="mt-6 space-y-4">
              {uploadedCars.map((car, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <p className="text-gray-400">{car.price}</p>
                    <p className="text-gray-400">{car.location}</p>
                    <p className="text-gray-400">Rating: {car.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div
        className={`${
          isSidebarCollapsed ? "w-16" : "w-64"
        } bg-gradient-to-b from-blue-900 to-black text-white flex flex-col transition-all duration-300`}
      >
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 bg-blue-700 rounded hover:bg-blue-800"
          >
            {isSidebarCollapsed ? ">>" : "<<"}
          </button>
        </div>
        <nav className="flex-1 space-y-1">
          <button
            className={`w-full text-left px-6 py-3 flex items-center ${
              selectedSection === "home"
                ? "bg-blue-700 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
            onClick={() => setSelectedSection("home")}
          >
            <HomeIcon className="mr-3" />
            {!isSidebarCollapsed && "Home"}
          </button>
          <button
            className={`w-full text-left px-6 py-3 flex items-center ${
              selectedSection === "search"
                ? "bg-blue-700 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
            onClick={() => setSelectedSection("search")}
          >
            <SearchIcon className="mr-3" />
            {!isSidebarCollapsed && "Search Cars"}
          </button>
          <button
            className={`w-full text-left px-6 py-3 flex items-center ${
              selectedSection === "profile"
                ? "bg-blue-700 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
            onClick={() => setSelectedSection("profile")}
          >
            <UserIcon className="mr-3" />
            {!isSidebarCollapsed && "Profile"}
          </button>
          <button
            className={`w-full text-left px-6 py-3 flex items-center ${
              selectedSection === "upload"
                ? "bg-blue-700 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
            onClick={() => setSelectedSection("upload")}
          >
            <UploadIcon className="mr-3" />
            {!isSidebarCollapsed && "Upload Car"}
          </button>
          <button
            className={`w-full text-left px-6 py-3 flex items-center ${
              selectedSection === "chat"
                ? "bg-blue-700 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
            onClick={() => setSelectedSection("chat")}
          >
            <MessageSquareIcon className="mr-3" />
            {!isSidebarCollapsed && "Chat"}
          </button>
          <button
            className={`w-full text-left px-6 py-3 flex items-center ${
              selectedSection === "myAds"
                ? "bg-blue-700 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
            onClick={() => setSelectedSection("myAds")}
          >
            <StarIcon className="mr-3" />
            {!isSidebarCollapsed && "My Ads"}
          </button>
        </nav>
        <div className="p-4 border-t border-gray-70">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center text-blue-400 hover:underline p-4"
          >
            <LogOutIcon className="mr-2" />
            {!isSidebarCollapsed && "Logout"}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">{renderSection()}</div>
    </div>
  );
};

export default MainDashboard;
