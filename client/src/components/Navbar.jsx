import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Flame, UtensilsCrossed, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu", icon: <UtensilsCrossed size={16} /> },
    { name: "Popular", path: "/popular", icon: <Flame size={16} /> },
    { name: "Cart", path: "/cart", icon: <ShoppingCart size={16} /> },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    <>
      {/* 1. Actual Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 h-16 flex items-center ${
          scrolled 
            ? "bg-white/90 backdrop-blur-md shadow-md" 
            : "bg-gradient-to-r from-blue-600 to-purple-700"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className={`font-bold text-xl flex items-center gap-2 ${scrolled ? "text-blue-600" : "text-white"}`}>
              <span className="text-2xl">🍔</span>
              <span className="tracking-tight font-black">FoodieZone</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? scrolled ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                        : scrolled ? "text-gray-600 hover:bg-gray-100" : "text-gray-100 hover:bg-white/20"
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}

              <div className="flex items-center gap-2 ml-4">
                <Link to="/signin" className={`text-sm font-bold px-4 py-1.5 rounded-full transition-all ${scrolled ? "text-blue-600 border border-blue-600 hover:bg-blue-50" : "text-white border border-white/50 hover:bg-white/10"}`}>
                  Sign In
                </Link>
                <Link to="/signup" className="bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full hover:bg-orange-600 shadow-sm transition-all">
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`p-1 rounded-lg focus:outline-none ${scrolled ? "text-blue-600" : "text-white"}`}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-16 left-0 w-full bg-white shadow-2xl border-t border-gray-100 md:hidden flex flex-col overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    onClick={() => setIsOpen(false)} 
                    className="px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl flex items-center gap-3 font-medium transition-colors"
                  >
                    <span className="text-blue-500">{link.icon}</span> 
                    {link.name}
                  </Link>
                ))}
                
                {/* Divider Line */}
                <div className="my-2 border-t border-gray-100"></div>

                {/* Mobile Auth Buttons */}
                <div className="grid grid-cols-2 gap-3 p-2">
                  <Link 
                    to="/signin" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-800 rounded-xl font-bold text-sm hover:bg-gray-200"
                  >
                    <LogIn size={16} /> Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 shadow-md"
                  >
                    <UserPlus size={16} /> Sign Up
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Spacer */}
      <div className="h-16"></div> 
    </>
  );
};

export default Navbar;