import React, { useState } from "react";
import { Edit2, Trash2, Star } from "lucide-react";

interface CarAd {
  id: number;
  name: string;
  price: string;
  location: string;
  rating: number;
  imageUrl?: string; // опциональное поле для изображения авто
}

const DashboardAds: React.FC = () => {
  // Начальные данные с уникальными id
  const [uploadedCars, setUploadedCars] = useState<CarAd[]>([
    { id: 1, name: "Toyota Camry", price: "100$/day", location: "Almaty", rating: 4.5 },
    { id: 2, name: "Hyundai Sonata", price: "80$/day", location: "Astana", rating: 4.0 },
  ]);

  // Функция редактирования (пример: можно открыть модальное окно или перенаправить на страницу редактирования)
  const handleEdit = (id: number) => {
    console.log("Edit ad with id:", id);
    // Реализуйте навигацию или модальное окно для редактирования объявления
  };

  // Функция удаления с подтверждением
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      setUploadedCars((prevCars) => prevCars.filter((car) => car.id !== id));
      console.log("Deleted ad with id:", id);
    }
  };

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-400">My Ads</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
          Add New Ad
        </button>
      </div>
      {uploadedCars.length === 0 ? (
        <p>No ads available. Please add a new ad.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {uploadedCars.map((car) => (
            <div
              key={car.id}
              className="p-4 bg-gray-800 rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                {/* Если есть изображение авто, показываем его */}
                {car.imageUrl && (
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold">{car.name}</h3>
                  <p className="text-gray-400">{car.price}</p>
                  <p className="text-gray-400">{car.location}</p>
                  <div className="flex items-center text-gray-400">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>Rating: {car.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(car.id)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-md"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardAds;
