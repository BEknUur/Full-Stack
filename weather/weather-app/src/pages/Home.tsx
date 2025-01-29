// Home.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import { FaSpinner } from "react-icons/fa";

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

  const getBackgroundImage = (condition: string) => {
    switch (condition) {
      case "clear sky":
        return "url('https://source.unsplash.com/1600x900/?sunny')";
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return "url('https://source.unsplash.com/1600x900/?cloudy')";
      case "shower rain":
      case "rain":
        return "url('https://source.unsplash.com/1600x900/?rain')";
      case "thunderstorm":
        return "url('https://source.unsplash.com/1600x900/?thunderstorm')";
      case "snow":
        return "url('https://source.unsplash.com/1600x900/?snow')";
      default:
        return "url('https://source.unsplash.com/1600x900/?weather')";
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: weather ? getBackgroundImage(weather.condition) : "url('https://source.unsplash.com/1600x900/?weather')",
      }}
    >
      <h1 className="text-3xl font-bold text-white mb-6">Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => fetchWeather(city)}
        className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-300"
      >
        Get Weather
      </button>
      {loading && <FaSpinner className="mt-4 text-white animate-spin" size={24} />}
      {error && <p className="mt-4 text-red-200">{error}</p>}
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