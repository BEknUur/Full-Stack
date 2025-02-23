import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, ShieldCheck, MapPin, Clock,Instagram, Send, MessageCircle} from "lucide-react";
import FAQSection from "./FAQSection";



const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const HomePage: React.FC = () => {
  return (
    <div className="text-white bg-gray-900">
    
      <nav className="bg-gray-900">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="text-2xl font-bold text-green-400">
            QazaqRental
          </Link>
          <div className="hidden md:block space-x-4">
            <Link to="/login" className="hover:text-green-400 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-green-400 transition">
              Register
            </Link>
          </div>
        </div>
      </nav>

      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      
        <video
          src="/videos/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

     
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            Discover <span className="text-green-400">QazaqRental</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-200"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.2 }}
          >
            Your trusted car rental service in Kazakhstan. Fast, secure, and
            affordable rentals tailored for every journey.
          </motion.p>
          <motion.div
            className="space-x-4"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Link
              to="/cars"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium shadow-md transition-transform transform hover:scale-105"
            >
              Book a Car
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium shadow-md transition-transform transform hover:scale-105"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
      </header>
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto text-center px-6">
          <motion.h2
            className="text-3xl font-bold mb-12"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Car,
                title: "Wide Selection of Cars",
                description:
                  "From economy to luxury SUVs, find a car for every need.",
              },
              {
                icon: ShieldCheck,
                title: "Fully Insured",
                description:
                  "All vehicles come with insurance and round-the-clock support.",
              },
              {
                icon: MapPin,
                title: "Nationwide Coverage",
                description:
                  "Convenient pick-up points across all major cities in Kazakhstan.",
              },
              {
                icon: Clock,
                title: "Fast & Easy Booking",
                description: "Quick, hassle-free reservation at your fingertips.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transition-transform"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <item.icon className="w-12 h-12 text-green-400" />
                <h3 className="mt-4 font-semibold text-xl">{item.title}</h3>
                <p className="mt-2 text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl font-bold mb-12"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            Popular Cars
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Toyota Camry",
                description: "Reliable and comfortable",
                image: "/images/camry.jpg",
              },
              {
                name: "BMW X5",
                description: "Luxury SUV with top features",
                image: "/images/bmw.jpg",
              },
              {
                name: "Hyundai Sonata",
                description: "Affordable and fuel-efficient",
                image: "/images/sonata.jpg",
              },
            ].map((car, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-900 p-6 rounded-lg shadow-md transition-transform hover:scale-105"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-white mb-2">{car.name}</h3>
                <p className="text-gray-400">{car.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/cars"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105"
            >
              View All Cars
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-8">Car Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              title: "Economy",
              image: "/images/economy-category.jpg",
              desc: "City cars with great fuel efficiency.",
            },
            {
              title: "SUV",
              image: "/images/suv-category.jpg",
              desc: "Perfect for family trips & off-road adventures.",
            },
            {
              title: "Business",
              image: "/images/business-category.jpg",
              desc: "Luxury sedans for comfort and style.",
            },
            {
              title: "Minivan",
              image: "/images/minivan-category.jpg",
              desc: "Spacious vehicles for group travel.",
            },
          ].map((cat, i) => (
            <div
              key={i}
              className="bg-gray-800 p-4 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{cat.title}</h3>
              <p className="text-gray-400 mt-2 text-sm">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-8">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
          {[
            {
              title: "Weekend Sale",
              image: "/images/offer1.jpg",
              desc: "Get 20% off on weekend bookings!",
            },
            {
              title: "Long-Term Rental",
              image: "/images/offer2.jpg",
              desc: "Rent for 7+ days and save 15%.",
            },
            {
              title: "Early Bird Discount",
              image: "/images/offer3.jpg",
              desc: "Book 2 weeks in advance & get 10% off.",
            },
          ].map((offer, i) => (
            <div
              key={i}
              className="bg-gray-900 p-6 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
              <p className="text-gray-400">{offer.desc}</p>
            </div>
          ))}
        </div>
      </section>

    
      <section className="py-16 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { step: 1, title: "Choose a Car", desc: "Browse our wide selection..." },
            { step: 2, title: "Reserve Online", desc: "Quick & secure payment..." },
            { step: 3, title: "Pick Up", desc: "Show your confirmation..." },
            { step: 4, title: "Drive Away", desc: "Enjoy your ride..." },
          ].map((item) => (
            <div key={item.step} className="bg-gray-800 p-6 rounded-lg">
              <span className="text-4xl font-bold text-green-400">{item.step}</span>
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/cars"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Book Now
          </Link>
        </div>
      </section>

     
      <section className="py-16 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-8">Trusted by Our Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-10xl mx-auto">
            {[
            "/images/partner1.png",
            "/images/partner2.png",
            "/images/partner3.png",
            "/images/partner4.png",
            ].map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Partner ${idx + 1}`}
              className="h-24 w-auto rounded-lg transition"
            />
            ))}
        </div>
      </section>

      
      <section className="py-16 bg-gray-900 text-center">
        <motion.h2
          className="text-3xl font-bold mb-8"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {[
            {
              name: "Aidos T.",
              review:
                "Great service! Booking was seamless, and the car was in perfect condition.",
              avatar: "/images/user1.jpg",
            },
            {
              name: "Dana K.",
              review: "Affordable prices and a wide selection of cars. Highly recommend!",
              avatar: "/images/user2.png",
            },
            {
              name: "Ruslan Z.",
              review: "Customer support was excellent. I'll definitely use this service again!",
              avatar: "/images/user2.jpg",
            },
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:scale-105"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="font-bold">{testimonial.name}</p>
              <p className="text-gray-400 mt-2">{testimonial.review}</p>
            </motion.div>
          ))}
        </div>
      </section>


      <div>
      <FAQSection />
    </div>

     
      <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
      
        <span className="text-gray-400 text-sm">
          © {new Date().getFullYear()} QazaqRental. All rights reserved.
        </span>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="#" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://instagram.com/ualikhaanuly" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors flex items-center"
          >
            <Instagram className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Instagram</span>
          </a>

         
          <a
            href="https://t.me/bergty"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
          >
            <Send className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Telegram</span>
          </a>

          
          <a
            href="https://wa.me/87716252863"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-400 transition-colors flex items-center"
          >
            <MessageCircle className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default HomePage;
