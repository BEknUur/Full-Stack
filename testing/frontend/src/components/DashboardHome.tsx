import React from "react";

const DashboardHome: React.FC = () => {
  return (
    <div className="text-white p-4">
      {/* Заголовок и краткое описание */}
      <h1 className="text-4xl font-bold text-blue-500">
        Welcome to QazaqRental Dashboard!
      </h1>
      <p className="mt-4 text-lg">
        Here you can manage your profile, upload new cars, chat with other users,
        and explore all functionalities of QazaqRental.
      </p>

      {/* Блок статистики */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-green-400">Cars Uploaded</h2>
          <p className="text-2xl mt-2">5</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-green-400">Active Chats</h2>
          <p className="text-2xl mt-2">2</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-green-400">Total Bookings</h2>
          <p className="text-2xl mt-2">12</p>
        </div>
      </div>

      

   
      <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-green-400 mb-4">Announcements</h2>
        <p className="text-gray-300">
          We have introduced a long-term rental option! Rent for 7+ days and save 15%.
        </p>
      </div>

      
    </div>
  );
};

export default DashboardHome;
