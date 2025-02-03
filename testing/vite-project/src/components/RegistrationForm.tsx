import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "", // Очистка ошибок при изменении значения
    }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.username) {
      newErrors.username = "Username is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Registration Successful!");
      console.log(formData); // Для отладки
    }
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-900 to-black"
    >
      <Card className="w-full max-w-md p-8 shadow-2xl border border-gray-700 bg-gray-800 rounded-2xl transition-transform hover:scale-105 duration-300">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-white mb-6 tracking-wider">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="relative">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-400" />
                <span className="ml-7">Username</span>
              </label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className={`w-full rounded-lg bg-gray-700 border ${
                  errors.username ? "border-red-500" : "border-gray-600"
                } text-white placeholder-gray-500 p-3 pl-10 shadow-inner focus:ring-4 focus:ring-blue-500 focus:outline-none transition-all`}
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-400" />
                <span className="ml-7">Email</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full rounded-lg bg-gray-700 border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } text-white placeholder-gray-500 p-3 pl-10 shadow-inner focus:ring-4 focus:ring-blue-500 focus:outline-none transition-all`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-400" />
                <span className="ml-7">Password</span>
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full rounded-lg bg-gray-700 border ${
                  errors.password ? "border-red-500" : "border-gray-600"
                } text-white placeholder-gray-500 p-3 pl-10 shadow-inner focus:ring-4 focus:ring-blue-500 focus:outline-none transition-all`}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-400" />
                <span className="ml-7">Confirm Password</span>
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full rounded-lg bg-gray-700 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-600"
                } text-white placeholder-gray-500 p-3 pl-10 shadow-inner focus:ring-4 focus:ring-blue-500 focus:outline-none transition-all`}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold rounded-lg hover:from-green-500 hover:to-blue-500 hover:scale-105 focus:ring-4 focus:ring-blue-500 transition-transform"
            >
              Register
            </Button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
