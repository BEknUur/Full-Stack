import React from "react";
import { Routes, Route, } from "react-router-dom";
import Sidebar from "./Sidebar";


import DashboardHome from "./DashboardHome";
import DashboardSearch from "./DashboardSearch";
import DashboardAds from "./DashboardAds";
import DashboardChat from "./DashboardChat";
import DashboardProfile from "./DashboardProfile";
import DashboardUpload from "./DashboardUpload";

const MainDashboard: React.FC = () => {
  

  return (
    <div className="flex h-screen bg-gray-900">
      
      <Sidebar />

     
      <div className="flex-1 overflow-y-auto p-4">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="search" element={<DashboardSearch />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="upload" element={<DashboardUpload />} />
          <Route path="chat" element={<DashboardChat />} />
          <Route path="my-ads" element={<DashboardAds />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainDashboard;
