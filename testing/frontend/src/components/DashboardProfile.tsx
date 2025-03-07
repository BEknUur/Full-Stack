import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config";

interface UserProfile {
  username: string;
  email: string;
  bio?: string | null;
  profile_image?: string | null;
}

const DashboardProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState("");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      setMessage("Пользователь не залогинен или отсутствует email в localStorage.");
    } else {
      handleLoadProfile(userEmail);
    }
  }, [userEmail]);

 
  const handleLoadProfile = async (email: string) => {
    try {
      setMessage("Загрузка профиля...");
      const res = await axios.get(`${API_URL}/profile?email=${email}`);
      setProfile(res.data);
      setMessage("Профиль загружен!");
    } catch (error: any) {
      console.error("Failed to fetch profile:", error);
      setProfile(null);
      if (error.response?.status === 404) {
        setMessage("Пользователь не найден (404).");
      } else {
        setMessage("Ошибка при загрузке профиля.");
      }
    }
  };

  // Сохранение (обновление) профиля
  const handleSaveProfile = async () => {
    if (!profile) {
      setMessage("Нет данных профиля для сохранения!");
      return;
    }
    try {
      await axios.put(`${API_URL}/profile?email=${profile.email}`, {
        username: profile.username,
        bio: profile.bio,
        profile_image: profile.profile_image,
      });
      setMessage("Профиль успешно обновлен!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      setMessage("Ошибка при обновлении профиля.");
    }
  };

  // Загрузка нового изображения
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && profile) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      try {
        const res = await axios.post(
          `${API_URL}/profile/upload-image?email=${profile.email}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setProfile((prev) =>
          prev ? { ...prev, profile_image: res.data.profile_image } : null
        );
        setMessage("Фотография успешно загружена!");
      } catch (error) {
        console.error("Error when updating photo:", error);
        setMessage("Не удалось загрузить фото.");
      }
    }
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
        {/* Шапка в стиле DashboardUpload */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-3">
            <h1 className="text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              МОЙ ПРОФИЛЬ
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-20"></div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl text-center">
            Управляйте своими персональными данными и фотографией
          </p>
        </div>

        <div className="relative backdrop-blur-sm bg-black/40 border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden max-w-3xl mx-auto">
        
          {message && (
            <div className="mb-4 px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-gray-200">
              {message}
            </div>
          )}

          {!userEmail ? (
            <div className="text-center py-8 text-gray-400">
              Пожалуйста, авторизуйтесь, чтобы посмотреть профиль.
            </div>
          ) : !profile ? (
            <div className="text-center py-8 text-gray-400 animate-pulse">
              Загрузка профиля или пользователь не найден...
            </div>
          ) : (
            // Форма редактирования профиля
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
              {/* Фото профиля */}
              <div className="flex flex-col items-center md:w-1/3">
                {profile.profile_image ? (
                  <img
                    src={`${API_URL}${profile.profile_image}`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover shadow-md"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center text-lg text-white shadow-md">
                    Нет фото
                  </div>
                )}

                <label className="mt-3">
                  <span className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded cursor-pointer text-sm">
                    Загрузить фото
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>

                {profile.profile_image && (
                  <button
                    onClick={() =>
                      setProfile((prev) =>
                        prev ? { ...prev, profile_image: null } : null
                      )
                    }
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                  >
                    Удалить фото
                  </button>
                )}
              </div>

              {/* Данные профиля */}
              <div className="md:w-2/3">
                {/* Имя */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-1">
                    Имя
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 px-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-800/50 transition-all"
                    value={profile.username}
                    onChange={(e) =>
                      setProfile({ ...profile, username: e.target.value })
                    }
                  />
                </div>

                {/* Email (только для чтения) */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full py-2 px-3 bg-black/50 border border-gray-700 rounded-lg text-white cursor-not-allowed"
                    value={profile.email}
                    disabled
                  />
                </div>

                {/* Bio */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-1">
                    О себе
                  </label>
                  <textarea
                    rows={3}
                    className="w-full py-2 px-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-800/50 transition-all"
                    value={profile.bio || ""}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </div>

                {/* Сохранить профиль */}
                <button
                  onClick={handleSaveProfile}
                  className="
                    px-6 py-3
                    bg-gradient-to-r from-purple-500 to-pink-600 
                    hover:from-purple-600 hover:to-pink-700
                    rounded-lg font-medium text-white 
                    transition-all shadow-lg shadow-pink-500/20
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-700
                  "
                >
                  Сохранить
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
