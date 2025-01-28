import { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

const Home: React.FC = () => {
  const [city, setCity] = useState<string>("Almaty");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError("");
      const apiKey = "b5d25967995e722af488a1238631ee17"; 
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = response.data;
      setWeather({
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (err) {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-sm"
      />
      <button
        onClick={() => fetchWeather(city)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Get Weather
      </button>
      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {weather && (
        <WeatherCard
          city={weather.city}
          temperature={weather.temperature}
          condition={weather.condition}
          icon={weather.icon}
        />
      )}
    </div>
  );
};

export default Home;
