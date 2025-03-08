import React, { useState } from "react";
import {
  Edit2,
  Trash2,
  Star,
  PlusCircle,
  MapPin,
  DollarSign
} from "lucide-react";

interface CarAd {
  id: number;
  name: string;
  price: string;
  location: string;
  rating: number;
  imageUrl?: string;
  description?: string;
}

const DashboardAds: React.FC = () => {
  const [uploadedCars, setUploadedCars] = useState<CarAd[]>([
    {
      id: 1,
      name: "Toyota Camry",
      price: "100$/day",
      location: "Almaty",
      rating: 4.8,
      imageUrl: "https://source.unsplash.com/featured/?car",
      description: "Business class comfort for city and long trips.",
    },
    {
      id: 2,
      name: "Hyundai Sonata",
      price: "85$/day",
      location: "Astana",
      rating: 4.5,
      imageUrl: "https://source.unsplash.com/featured/?luxurycar",
      description: "Spacious, elegant, and fuel-efficient.",
    },
  ]);

  const handleEdit = (id: number) => {
    console.log("Edit ad with id:", id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      setUploadedCars((prev) => prev.filter((car) => car.id !== id));
    }
  };

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
                 MY CARS
            </h1>
            {/* Градиентная "тень" за заголовком */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-20"></div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl text-center">
          Manage your listings and add new vehicles
          </p>
        </div>

       
        <div className="relative backdrop-blur-sm bg-black/40 border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
         
          <div className="flex items-center mb-8">
           
            <h2 className="text-2xl font-bold text-blue-400">
            Total Announcements: {uploadedCars.length}
            </h2>
            <button
              className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium text-white transition-all shadow-lg shadow-purple-500/20 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700"
              onClick={() => alert("Добавление нового автомобиля!")}
            >
              <PlusCircle className="w-5 h-5 mr-2" />
                       Add a car
            </button>
          </div>

        
          {uploadedCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedCars.map((car) => (
                <div
                  key={car.id}
                  className="group relative overflow-hidden rounded-xl bg-gray-800 shadow-xl border border-gray-700 hover:border-gray-600 transition-all"
                >
                 
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={car.imageUrl}
                      alt={car.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>

                    
                    <div className="absolute top-3 left-3 flex items-center px-2 py-1 rounded-full bg-gray-900 bg-opacity-70">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-yellow-300 text-sm font-medium">
                        {car.rating}
                      </span>
                    </div>
                  </div>

                  
                  <div className="p-4">
                    <h3 className="text-xl font-semibold truncate">
                      {car.name}
                    </h3>

                    <div className="mt-2 flex items-center text-gray-300">
                      <DollarSign className="w-4 h-4 mr-1 text-blue-400" />
                      <span className="text-blue-400 font-medium">
                        {car.price}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center text-gray-400">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{car.location}</span>
                    </div>

                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                      {car.description}
                    </p>
                  </div>

                 
                  <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(car.id)}
                      className="p-1.5 rounded-full bg-gray-800 bg-opacity-70 hover:bg-blue-600 text-gray-300 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="p-1.5 rounded-full bg-gray-800 bg-opacity-70 hover:bg-red-600 text-gray-300 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            
            <div className="mt-10 text-center p-10 rounded-xl border border-gray-700 bg-gray-800">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-300">
              You don't have any announcements yet
              </h3>
              <p className="mt-2 text-gray-400">
              Add your first car by clicking the button above
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAds;
