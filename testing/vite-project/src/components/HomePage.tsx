import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import { Car, ShieldCheck, MapPin, Clock } from "lucide-react"; 

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 to-black text-white text-center px-6">
    
      <motion.div
        className="py-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold">
          Welcome to <span className="text-blue-500">QazaqRental</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Find the perfect car for your trip in Kazakhstan. Easy, fast, and secure rentals!
        </p>
        <div className="mt-6 flex justify-center space-x-6">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300 shadow-lg"
          >
            Register
          </Link>
        </div>
      </motion.div>


      <motion.div
        className="py-16 bg-gray-800 rounded-lg shadow-lg mx-6 md:mx-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <Car className="w-12 h-12 text-blue-500" />
            <p className="mt-3 font-medium">Wide Selection of Cars</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 text-green-500" />
            <p className="mt-3 font-medium">100% Secure Rentals</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-12 h-12 text-yellow-500" />
            <p className="mt-3 font-medium">Available in Every City</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-12 h-12 text-red-500" />
            <p className="mt-3 font-medium">Fast & Easy Booking</p>
          </div>
        </div>
      </motion.div>

     
      <div className="py-16">
        <h2 className="text-3xl font-bold text-white mb-6">Popular Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-6 md:mx-20">
         
          <motion.div
            className="bg-gray-800 rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/images/camry.jpg"  className="rounded-lg mb-4" />
            <h3 className="text-lg font-bold">Toyota Camry</h3>
            <p className="text-gray-400">Reliable and comfortable</p>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
          >
            <img src="images/bmw.jpg"  className="rounded-lg mb-4" />
            <h3 className="text-lg font-bold">BMW X5</h3>
            <p className="text-gray-400">Luxury SUV with top features</p>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/images/sonata.jpg" className="rounded-lg mb-4" />
            <h3 className="text-lg font-bold">Hyundai Sonata</h3>
            <p className="text-gray-400">Affordable and fuel-efficient</p>
          </motion.div>
        </div>
      </div>

     
    </div>
  );
};

export default HomePage;
