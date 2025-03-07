import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config";
import CarCard from "./CarCard";

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

const DashboardSearch: React.FC = () => {
  const [location, setLocation] = useState("");
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  // ...
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setCars([]);

    try {
      const response = await axios.get(`${API_URL}/cars`);
      let filtered = response.data as Car[];

      // Пример простой фильтрации (можете модифицировать логику)
      if (location) {
        filtered = filtered.filter((car) =>
          car.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      // ... и т.д.

      if (filtered.length === 0) {
        setError("No results found.");
      } else {
        setCars(filtered);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch cars.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setLocation("");
    setBrand("");
    setMaxPrice("");
    // ...
    setCars([]);
    setError("");
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
        {/* Крупный заголовок (как в DashboardUpload) */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-3">
            <h1 className="text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              ПОИСК АВТО
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-20"></div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl text-center">
            Найдите автомобиль, который вам нужен
          </p>
        </div>

        {/* Основной блок (backdrop, border, shadow) */}
        <div className="relative backdrop-blur-sm bg-black/40 border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Местоположение"
                className="w-full py-3 px-4 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-800/50 transition-all"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Пример ещё одного поля (по бренду, цене и т.д.) */}
            <div>
              <input
                type="text"
                placeholder="Бренд (необязательно)"
                className="w-full py-3 px-4 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-800/50 transition-all"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            {/* Пример поля для цены */}
            <div>
              <input
                type="number"
                placeholder="Макс. цена за день"
                className="w-full py-3 px-4 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-800/50 transition-all"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="
                  flex-1 py-3 
                  bg-gradient-to-r from-blue-500 to-purple-600 
                  hover:from-blue-600 hover:to-purple-700 
                  rounded-lg font-medium text-white 
                  transition-all shadow-lg shadow-purple-500/20
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700
                "
              >
                Поиск
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="
                  flex-1 py-3 
                  bg-transparent hover:bg-white/5 
                  border border-white/20 rounded-lg font-medium 
                  transition-all flex items-center
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700
                "
              >
                Сброс
              </button>
            </div>
          </form>

          {/* Результаты поиска */}
          <div className="mt-8">
            {isLoading && (
              <p className="text-gray-200 animate-pulse">Загрузка...</p>
            )}
            {error && <p className="text-red-400 mb-2">{error}</p>}

            {!isLoading && !error && cars.length === 0 && (
              <p className="text-gray-300">Нет результатов для отображения</p>
            )}

            {cars.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSearch;
