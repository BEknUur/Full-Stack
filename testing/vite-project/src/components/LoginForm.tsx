import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Хук для перенаправления

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      email: "",
      password: "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Login Successful!");
      console.log(formData); // Для отладки

      // Перенаправление на страницу профиля
      navigate("/profile-page");
    }
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-900 to-black"
    >
      <Card className="w-full max-w-md p-8 shadow-2xl border border-gray-700 bg-gray-800 rounded-2xl transition-transform hover:scale-105 duration-300">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-white mb-6 tracking-wider">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold rounded-lg hover:from-green-500 hover:to-blue-500 hover:scale-105 focus:ring-4 focus:ring-blue-500 transition-transform"
            >
              Login
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>

          <p className="text-center text-sm text-gray-400 mt-4">
            Forgot your password?{" "}
            <Link to="/reset-password" className="text-blue-500 hover:underline">
              Reset it
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
