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
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold text-green-400 mb-4">Search for Cars</h2>

      
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Enter location"
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        
        <div className="flex space-x-2 w-full">
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

    
      <div className="mt-8">
        {isLoading && <p className="text-gray-200">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && cars.length === 0 && (
          <p className="text-gray-200">No results found.</p>
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
  );
};

export default DashboardSearch;
