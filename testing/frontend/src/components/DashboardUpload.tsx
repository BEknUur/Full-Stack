import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import API_URL from "../config";

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

    if (!carName || !pricePerDay || !location || !carType) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setError("You are not logged in. Please log in first.");
      setIsLoading(false);
      return;
    }

    try {
      const carData = {
        name: carName,
        price_per_day: parseFloat(pricePerDay),
        location: location,
        car_type: carType,
        description: description || "",
      };

      const carResponse = await axios.post(`${API_URL}/cars?email=${userEmail}`, carData);
      const carId = carResponse.data.id;

      if (carImage) {
        const formData = new FormData();
        formData.append("file", carImage);

        await axios.post(`${API_URL}/cars/${carId}/upload-image`, formData);
      }

      setMessage("Car uploaded successfully!");
      handleClear();
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Failed to upload car:", error);
      setError("Failed to upload car. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 text-white space-y-8">
      <h2 className="text-3xl font-bold text-green-400">Upload Your Car</h2>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <form onSubmit={handleUpload} className="space-y-8">

        {/* Main Information */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-2xl font-semibold text-blue-400 border-b border-gray-600 pb-2">
            Main Information
          </h3>
          <input
            type="text"
            placeholder="Car Name *"
            className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-green-500"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price per Day *"
            className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-green-500"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location *"
            className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-green-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Additional Information */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-2xl font-semibold text-blue-400 border-b border-gray-600 pb-2">
            Additional Information
          </h3>
          <select
            className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-green-500"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
          >
            <option value="">-- Select Car Type * --</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Minivan">Minivan</option>
            <option value="Convertible">Convertible</option>
          </select>
          <textarea
            placeholder="Description (optional)"
            rows={4}
            className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-green-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Car Image Upload */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-2xl font-semibold text-blue-400 border-b border-gray-600 pb-2">
            Car Image
          </h3>
          <div className="border border-dashed border-gray-500 rounded-lg p-6 bg-gray-700 flex flex-col items-center justify-center space-y-3">
            <p className="text-gray-400">Drag & drop your car image here, or click below</p>
            <input
              type="file"
              className="hidden"
              id="carImageUpload"
              onChange={handleImageChange}
            />
            <label
              htmlFor="carImageUpload"
              className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Select Image
            </label>
          </div>
          {previewImage && (
            <div className="flex justify-center">
              <img
                src={previewImage}
                alt="Preview"
                className="w-64 h-48 object-cover rounded-lg border-2 border-green-500"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition"
          >
            Clear
          </button>
        </div>

      </form>
    </div>
  );
};

export default DashboardUpload;
