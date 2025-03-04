import React, { useState } from "react";
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
    const [inputEmail, setInputEmail] = useState("");
    const [message, setMessage] = useState("");

    // Загрузка профиля
    const handleLoadProfile = async () => {
        if (!inputEmail) {
            alert("Введите email!");
            return;
        }
        try {
            const res = await axios.get(`${API_URL}/profile?email=${inputEmail}`);
            setProfile(res.data);
            setMessage("Profile is loading");
        } catch (error: any) {
            console.error("Failed to fetch profile:", error);
            setProfile(null);
            if (error.response?.status === 404) {
                setMessage("User is not found (404)");
            } else {
                setMessage("Error when loading user");
            }
        }
    };

    
    const handleSaveProfile = async () => {
        if (!profile) {
            setMessage("No data about user!");
            return;
        }
        try {
            await axios.put(`${API_URL}/profile?email=${profile.email}`, {
                username: profile.username,
                bio: profile.bio,
                profile_image: profile.profile_image,
            });
            setMessage("Profile is updated!");
        } catch (err) {
            console.error("Failed to update profile:", err);
            setMessage("Error when updating profile");
        }
    };

   
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);

            try {
                const res = await axios.post(
                    `${API_URL}/profile/upload-image?email=${profile?.email}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                setProfile(prev => prev ? { ...prev, profile_image: res.data.profile_image } : null);
                setMessage("Photo succesfully upload!");
            } catch (error) {
                console.error("Error when updating photo:", error);
                setMessage("Couldn't load photo");
            }
        }
    };

    return (
        <div className="p-8 text-white">
            <h2 className="text-3xl font-bold text-green-400">My Profile</h2>

            {message && <p className="mt-2 text-green-500">{message}</p>}

            <div className="mt-4">
                <label className="block text-gray-400">Введите email:</label>
                <input
                    type="email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="w-full p-2 bg-gray-800 rounded-lg text-white mt-1"
                />
                <button
                    onClick={handleLoadProfile}
                    className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                    Load Profile
                </button>
            </div>

            {profile && (
                <div className="mt-6 flex flex-col sm:flex-row space-x-4 space-y-4 sm:space-y-0">
                    <div className="flex flex-col items-center">
                        {profile.profile_image ? (
                            <img
                                src={`${API_URL}${profile.profile_image}`}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-xl text-white">
                                No Image
                            </div>
                        )}

                        <label className="mt-2">
                            <span className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded cursor-pointer">
                                Choose photo
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
                                onClick={() => setProfile(prev => prev ? { ...prev, profile_image: null } : null)}
                                className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
                            >
                                Delete photo
                            </button>
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="mb-4">
                            <label className="block text-gray-400">Имя</label>
                            <input
                                type="text"
                                className="w-full p-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-400">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 bg-gray-800 rounded-lg text-white"
                                value={profile.email}
                                disabled
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-400">Bio</label>
                            <textarea
                                className="w-full p-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
                                value={profile.bio || ""}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <button
                            onClick={handleSaveProfile}
                            className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 font-medium"
                        >
                            Save profile
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardProfile;
