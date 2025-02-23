import React, { useState } from "react";

interface Car {
  id: number;
  brand: string;
  location: string;
  price: number;
  image?: string;
}

const DashboardSearch: React.FC = () => {
  // Поля формы
  const [location, setLocation] = useState("");
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [carType, setCarType] = useState("");

  // Состояния для результатов, загрузки и ошибок
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Фиктивные данные для примера
  const dummyCars: Car[] = [
    { id: 1, brand: "Toyota Camry", location: "Almaty", price: 100 },
    { id: 2, brand: "BMW X5", location: "Astana", price: 150 },
    { id: 3, brand: "Hyundai Sonata", location: "Almaty", price: 80 },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Эмулируем задержку запроса к серверу
      setTimeout(() => {
        let filtered = dummyCars;

        // Фильтрация по местоположению
        if (location) {
          filtered = filtered.filter((car) =>
            car.location.toLowerCase().includes(location.toLowerCase())
          );
        }
        // Фильтрация по марке автомобиля
        if (brand) {
          filtered = filtered.filter((car) =>
            car.brand.toLowerCase().includes(brand.toLowerCase())
          );
        }
        // Фильтрация по максимальной цене
        if (maxPrice) {
          filtered = filtered.filter((car) => car.price <= Number(maxPrice));
        }
        // Фильтрация по типу автомобиля (если данные будут доступны)
        if (carType) {
          // Здесь можно добавить фильтрацию по типу, если поле type присутствует
        }

        setCars(filtered);
        setIsLoading(false);
      }, 1000);
    } catch (err: any) {
      setError("Failed to fetch cars");
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setLocation("");
    setBrand("");
    setMaxPrice("");
    setPickUpDate("");
    setReturnDate("");
    setCarType("");
    setCars([]); // Очистка результатов поиска
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold text-green-400">Search for Cars</h2>
      <form onSubmit={handleSearch} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Поле: Местоположение */}
        <input
          type="text"
          placeholder="Enter location"
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {/* Поле: Марка автомобиля */}
        <input
          type="text"
          placeholder="Car brand"
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        {/* Поле: Максимальная цена */}
        <input
          type="number"
          placeholder="Max Price"
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        {/* Поле: Pick-up Date */}
        <input
          type="date"
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={pickUpDate}
          onChange={(e) => setPickUpDate(e.target.value)}
        />
        {/* Поле: Return Date */}
        <input
          type="date"
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
        {/* Селект: Тип автомобиля */}
        <select
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
        >
          <option value="">-- Car Type --</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="minivan">Minivan</option>
        </select>

        {/* Кнопки: Search и Clear */}
        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Результаты поиска */}
      <div className="mt-8">
        {isLoading && <p className="text-gray-200">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && cars.length === 0 && (
          <p className="text-gray-200">No results found.</p>
        )}
        {cars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cars.map((car) => (
              <div key={car.id} className="bg-gray-800 p-4 rounded-lg">
                <p className="font-bold text-white">{car.brand}</p>
                <p className="text-gray-400">{car.location}</p>
                <p className="text-gray-400">Price: {car.price}$/day</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSearch;
