import React, { useState } from "react";

const DashboardProfile: React.FC = () => {
  const [name, setName] = useState("Beknur");
  const [email, setEmail] = useState("ualihanulybeknur@gmail.com");
  const [phone, setPhone] = useState("+7 701 123 4567");
  const [bio, setBio] = useState("A short bio about yourself...");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSaveProfile = () => {
    // Здесь можно добавить вызов API для сохранения данных профиля
    console.log("Saving profile:", { name, email, phone, bio, profileImage });
    // Эмуляция успешного сохранения
    setMessage("Profile saved successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold text-green-400">My Profile</h2>
      
      {/* Сообщение об успешном сохранении */}
      {message && <p className="mt-2 text-green-500">{message}</p>}

      <div className="mt-6 flex flex-col sm:flex-row space-x-4 space-y-4 sm:space-y-0">
        {/* Блок изображения */}
        <div>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-xl text-white">
              No Image
            </div>
          )}
          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = () => setProfileImage(reader.result as string);
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
            {/* Кнопка удаления изображения, если оно установлено */}
            {profileImage && (
              <button
                onClick={() => setProfileImage(null)}
                className="mt-2 text-red-500 hover:underline"
              >
                Remove Image
              </button>
            )}
          </div>
        </div>

        {/* Блок данных профиля */}
        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-gray-400">Name</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              className="w-full p-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Phone</label>
            <input
              type="tel"
              className="w-full p-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Bio</label>
            <textarea
              className="w-full p-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
          </div>
          <button
            onClick={handleSaveProfile}
            className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 font-medium"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
