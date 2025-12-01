import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBitcoin, FaBars, FaTimes, FaWallet } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // 🔥 নতুন প্রিমিয়াম বাটন স্টাইল
  const walletBtnStyle = `
    relative group overflow-hidden 
    bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 
    text-white font-bold rounded-full 
    px-6 py-2.5 
    shadow-[0_0_15px_rgba(6,182,212,0.5)] 
    hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] 
    transition-all duration-300 ease-out 
    transform hover:-translate-y-0.5 active:scale-95 
    flex items-center justify-center gap-2 border border-white/10
  `;

  return (
    <nav className="fixed w-full z-50 glass top-0 start-0 border-b border-gray-800 bg-[#0f172a]/90 backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* 1. Logo Section (Left) */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse z-50 group">
          <div className="relative">
            <FaBitcoin className="text-3xl text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
            <div className="absolute inset-0 blur-lg bg-blue-500/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="self-center text-2xl font-bold whitespace-nowrap text-white tracking-tight">
            Crypto<span className="text-blue-500">Hunter</span>
          </span>
        </Link>
        
        {/* 2. Desktop Links (Centered) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-8 font-medium text-gray-300">
            {['Home', 'Market', 'Portfolio', 'News'].map((item, index) => (
              <li key={index}>
                <Link to="#" className="relative hover:text-white transition-colors duration-300 group">
                  {item}
                  {/* Hover Underline Animation */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Right Side Actions */}
        <div className="flex items-center space-x-3 md:order-2">
          
          {/* Desktop Wallet Button */}
          <div className="hidden md:block">
            <button type="button" className={walletBtnStyle}>
              {/* Shine Effect Overlay */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1s_infinite]"></span>
              <FaWallet className="text-lg" />
              <span>Connect Wallet</span>
            </button>
          </div>

          {/* Mobile Hamburger Icon */}
          <button 
            onClick={toggleMenu}
            type="button" 
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-400 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* 4. Mobile Sidebar System */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
                className="fixed inset-0 bg-black/80 z-[60] md:hidden backdrop-blur-sm"
              />
              
              {/* Sidebar Content */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-screen w-72 border-l border-gray-700 shadow-2xl flex flex-col justify-between md:hidden"
                style={{ zIndex: 100, backgroundColor: '#0f172a' }} 
              >
                <div>
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-[#0f172a]">
                    <span className="text-xl font-bold text-white tracking-wide">Menu</span>
                    <button 
                      onClick={closeMenu}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all duration-300"
                    >
                      <FaTimes size={22} />
                    </button>
                  </div>

                  {/* Sidebar Links */}
                  <div className="p-5">
                    <ul className="flex flex-col space-y-2">
                      {['Home', 'Market', 'Portfolio', 'News'].map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <Link 
                            to="#" 
                            onClick={closeMenu}
                            className="flex items-center justify-between py-3 px-4 rounded-xl text-gray-300 hover:text-white hover:bg-blue-600/10 hover:border-blue-600/30 border border-transparent transition-all duration-300 group"
                          >
                            <span className="font-medium">{item}</span>
                            <span className="text-gray-600 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all">→</span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar Footer with Connect Wallet */}
                <div className="p-6 border-t border-gray-800 bg-[#0f172a]">
                  <button type="button" className={`${walletBtnStyle} w-full py-3.5 justify-center`}>
                    <FaWallet className="text-lg" />
                    Connect Wallet
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;