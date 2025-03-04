import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCar, FaComments, FaCalendarCheck, FaPlusCircle, FaUser } from "react-icons/fa";

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";

  const quickActions = [
    { label: "Upload Car", icon: <FaPlusCircle />, onClick: () => navigate("/main/upload") },
    { label: "My Profile", icon: <FaUser />, onClick: () => navigate("/main/profile") },
    { label: "Chats", icon: <FaComments />, onClick: () => navigate("/main/chat") },
    { label: "Search", icon: <FaComments />, onClick: () => navigate("/main/search") },
  
  ];



  return (
    <div className="text-white p-6 space-y-8">
      <h1 className="text-4xl font-bold text-blue-400">
        Welcome, {userName}!
      </h1>
      <p className="text-lg text-gray-300">
        Manage your profile, upload cars, chat with users, and explore all functionalities.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<FaCar />} title="Cars Uploaded" count={5} />
        <StatCard icon={<FaComments />} title="Active Chats" count={2} />
        <StatCard icon={<FaCalendarCheck />} title="Total Bookings" count={12} />
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition cursor-pointer space-y-2"
          >
            <div className="text-green-400 text-3xl">{action.icon}</div>
            <span className="text-white text-sm">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Announcements */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-green-400 mb-4">Announcements</h2>
        <p className="text-gray-300">
          We have introduced a long-term rental option! Rent for 7+ days and save 15%.
        </p>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; count: number }> = ({ icon, title, count }) => (
  <div className="flex items-center space-x-4 bg-gray-800 p-6 rounded-lg shadow-md">
    <div className="text-green-400 text-4xl">{icon}</div>
    <div>
      <h2 className="text-xl font-semibold text-green-400">{title}</h2>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  </div>
);

export default DashboardHome;
