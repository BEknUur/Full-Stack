import React, { useState } from "react";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>("Almaty");
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 22,
    condition: "Cloudy",
    icon: "04d",
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <button
        onClick={() => console.log("Fetch Weather for", city)}
        className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105 shadow-md"
      >
        Get Weather
      </button>
      <div className="mt-6 w-full max-w-sm mx-auto bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold text-center">{city}</h2>
        <p className="text-5xl font-bold text-center my-4">{weather.temperature}°C</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.condition}
          className="mx-auto"
        />
        <p className="text-center text-lg capitalize">{weather.condition}</p>
      </div>
    </div>
  );
};

export default WeatherApp;
