import React, { useState, ChangeEvent } from "react";

const DashboardUpload: React.FC = () => {
  const [carName, setCarName] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [location, setLocation] = useState("");
  const [carType, setCarType] = useState("");
  const [description, setDescription] = useState("");
  const [carImage, setCarImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    // Простая валидация
    if (!carName || !pricePerDay || !location || !carType) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    // Здесь можно отправить данные на сервер (например, через fetch или axios)
    // В данном примере эмулируем задержку и успешный ответ
    setTimeout(() => {
      console.log({ carName, pricePerDay, location, carType, description, carImage });
      setIsLoading(false);
      setMessage("Car uploaded successfully!");
      // Очистить форму после успешной загрузки
      handleClear();
      setTimeout(() => setMessage(""), 3000);
    }, 1500);
  };

  const handleClear = () => {
    setCarName("");
    setPricePerDay("");
    setLocation("");
    setCarType("");
    setDescription("");
    setCarImage(null);
    setPreviewImage(null);
    setError("");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCarImage(file);

      // Создаем превью изображения
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold text-green-400">Upload Your Car</h2>
      
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {message && <p className="mt-2 text-green-500">{message}</p>}

      <form onSubmit={handleUpload} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Car Name *"
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price per Day *"
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location *"
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
        >
          <option value="">-- Select Car Type * --</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="minivan">Minivan</option>
          <option value="convertible">Convertible</option>
        </select>
        <textarea
          placeholder="Description"
          rows={3}
          className="w-full p-4 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div>
          <input
            type="file"
            className="w-full p-4 bg-gray-800 rounded-lg text-white"
            onChange={handleImageChange}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border border-green-500"
            />
          )}
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
          >
            {isLoading ? "Uploading..." : "Upload"}
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
    </div>
  );
};

export default DashboardUpload;
