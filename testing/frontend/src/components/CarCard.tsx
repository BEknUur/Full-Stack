import React from "react";

// Интерфейс данных
interface Car {
  id: number;
  brand?: string;
  name?: string;
  location: string;
  price_per_day: number;
  car_type: string;
  description?: string;
  image_url?: string;
}

// Получаем базовый URL из конфига (или можешь просто прописать строкой)
const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";  // <-- Так лучше

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
  
  // Добавляем логику для абсолютного URL
  const imageUrl = car.image_url?.startsWith("/")
    ? `${BASE_API_URL}${car.image_url}`
    : car.image_url;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow p-4 flex flex-col">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={car.brand || "Car"}
          className="w-full h-48 object-cover rounded"
        />
      ) : (
        <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-500">
          No image
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-xl font-bold text-white">
          {car.brand || "Unknown brand"} {car.name || ""}
        </h3>
        <p className="text-gray-400 mt-1">
          Location: {car.location}
        </p>
        <p className="text-green-500 mt-2">
          Price: {car.price_per_day} ₸/day
        </p>
        {car.car_type && (
          <p className="text-gray-400 text-sm mt-1">
            Type: {car.car_type}
          </p>
        )}
        {car.description && (
          <p className="text-gray-300 text-sm mt-2">
            {car.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CarCard;
