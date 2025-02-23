import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mail, User, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "Beknur King",
    email: "ualihanulybeknur@gmail.com",
  });
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    alert("Profile updated successfully!");
    navigate("/main");
  };

  const [avatar, setAvatar] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-900 to-black">
      <Card className="w-full max-w-md p-8 shadow-2xl border border-gray-700 bg-gray-800 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-white mb-6 tracking-wider">
            My Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Avatar */}
            <div className="flex justify-center items-center flex-col">
              <div className="relative">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-white text-xl">
                    <Camera />
                  </div>
                )}
                <label
                  htmlFor="avatar"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
                >
                  <Camera className="w-4 h-4" />
                </label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                <User className="inline-block w-5 h-5 mr-2 text-blue-400" />
                Username
              </label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 p-3 pl-10 shadow-inner focus:ring-4 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                <Mail className="inline-block w-5 h-5 mr-2 text-blue-400" />
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 p-3 pl-10 shadow-inner focus:ring-4 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <Button
              type="button"
              onClick={handleSaveChanges}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold rounded-lg hover:from-green-500 hover:to-blue-500 hover:scale-105 focus:ring-4 focus:ring-blue-500 transition-transform"
            >
              Save Changes
            </Button>
          </form>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
