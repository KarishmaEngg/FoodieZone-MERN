import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { CartContext } from "../context/CartContext";

import pizza from "../assets/menu/pizza.jpg";
import burger from "../assets/menu/burger.jpg";
import coffee from "../assets/menu/coffee.jpg";
import kheer from "../assets/menu/kheer.jpg";
import bg from "../assets/menu/bg.jpg";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const categories = [
    { name: 'Pizza', image: pizza },
    { name: 'Burger', image: burger },
    { name: 'Drinks', image: coffee },
    { name: 'Desserts', image: kheer },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/menu?search=${searchTerm}`);
  };

  const handleCategoryClick = (categoryName) => {
    navigate('/menu', { state: { category: categoryName } });
  };
useEffect(() => {
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('/feedback');
      console.log("Fetched feedbacks:", res.data); // 🔎 log to check
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks", err);
    }
  };
  fetchFeedbacks();
}, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})` }}>
        <div className="w-full h-full bg-black bg-opacity-50 flex flex-col justify-start items-center px-4 py-8">

          {/* ✅ Search bar */}
          <form onSubmit={handleSearchSubmit} className="mb-6 w-full max-w-md">
            <input
              type="text"
              placeholder="Search for items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-black text-lg focus:outline-none"
            />
          </form>

          {/* ✅ Hero section */}
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
            Delicious Food Delivered
          </h1>
          <p className="text-lg md:text-xl text-white text-center mb-6 max-w-xl">
            Fresh, hot, and tasty food at your doorstep in minutes.
          </p>
          <Link
            to="/menu"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg mb-8"
          >
            Order Now
          </Link>

          {/* ✅ Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded shadow-md overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <h2 className="text-center text-lg font-semibold">{category.name}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Feedback Section */}
          <h2 className="text-3xl font-bold text-white mt-10 mb-4">Customer Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            {feedbacks.length > 0 ? (
              feedbacks.slice(0, 3).map((fb, index) => ( // ✅ show only first 3
                <div key={index} className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-2">{fb.name}</h3>
                  <p className="text-white italic">"{fb.comment}"</p>
                </div>
              ))
            ) : (
              <p className="text-white">No feedback available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
