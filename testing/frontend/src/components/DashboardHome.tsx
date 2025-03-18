import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCar,
  FaComments,
  FaCalendarCheck,
  FaPlusCircle,
  FaUser,
} from "react-icons/fa";

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";


  const quickActions = [
    {
      label: "Upload Car",
      icon: <FaPlusCircle />,
      onClick: () => navigate("/main/upload"),
    },
    {
      label: "My Profile",
      icon: <FaUser />,
      onClick: () => navigate("/main/profile"),
    },
    {
      label: "Chats",
      icon: <FaComments />,
      onClick: () => navigate("/main/chat"),
    },
    {
      label: "Search",
      icon: <FaComments />,
      onClick: () => navigate("/main/search"),
    },
    {
      label: "Booking",
      icon: <FaComments />,
      onClick: () => navigate("/main/booking"),
    },
    {
      label: "Favourite",
      icon: <FaComments />,
      onClick: () => navigate("/main/favourite"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-3">
            <h1 className="text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              WELCOME, {userName}!
            </h1>
           
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-20"></div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl text-center">
          Manage your profile, upload cars, chat with
          and explore all the possibilities.
          </p>
        </div>

        
        <div className="relative backdrop-blur-sm bg-black/40 border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard icon={<FaCar />} title="Cars Uploaded" count={5} />
            <StatCard icon={<FaComments />} title="Active Chats" count={2} />
            <StatCard
              icon={<FaCalendarCheck />}
              title="Total Bookings"
              count={12}
            />
          </div>

          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="
                  flex flex-col items-center justify-center p-6
                  bg-black/50 border border-white/10 rounded-xl
                  hover:bg-white/10 transition cursor-pointer space-y-2
                "
              >
                <div className="text-blue-400 text-3xl">{action.icon}</div>
                <span className="text-white text-sm">{action.label}</span>
              </button>
            ))}
          </div>

          
          <div className="bg-black/30 border border-white/10 p-6 rounded-xl shadow-inner">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">
              Announcements
            </h2>
            <p className="text-gray-300">
              We have introduced a long-term rental option! Rent for 7+ days and
              save 15%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  count: number;
}> = ({ icon, title, count }) => (
  <div
    className="
      flex items-center space-x-4 
      bg-black/50 border border-white/10 rounded-xl 
      p-6 shadow-md hover:shadow-lg transition
    "
  >
    <div className="text-blue-400 text-4xl">{icon}</div>
    <div>
      <h2 className="text-xl font-semibold text-blue-400">{title}</h2>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  </div>
);

export default DashboardHome;
