import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBitcoin, FaBars, FaTimes, FaWallet, FaHome, FaChartLine, FaNewspaper, FaChartPie } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);


  const menuItems = [
    { name: 'Home', icon: <FaHome />, link: '#' },
    { name: 'Market', icon: <FaChartLine />, link: '#' },
    { name: 'Portfolio', icon: <FaChartPie />, link: '#' },
    { name: 'News', icon: <FaNewspaper />, link: '#' },
  ];

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
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-800 bg-[#0f172a]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0f172a]/60">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* 1. Logo Section */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse z-50 group">
          <div className="relative">
            <FaBitcoin className="text-3xl text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
            <div className="absolute inset-0 blur-lg bg-blue-500/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="self-center text-2xl font-bold whitespace-nowrap text-white tracking-tight">
            Crypto<span className="text-blue-500">Hunter</span>
          </span>
        </Link>
        
        {/* 2. Desktop Links */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-8 font-medium text-gray-300">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.link} className="relative hover:text-white transition-colors duration-300 group flex items-center gap-2">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

       
        <div className="flex items-center space-x-3 md:order-2">
          {/* Desktop Wallet Button */}
          <div className="hidden md:block">
            <button type="button" className={walletBtnStyle}>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1s_infinite]"></span>
              <FaWallet className="text-lg" />
              <span>Connect Wallet</span>
            </button>
          </div>

          {/* Mobile Hamburger Icon */}
          <button 
            onClick={toggleMenu}
            type="button" 
            className="relative z-50 inline-flex items-center justify-center p-2 w-10 h-10 text-gray-400 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors"
          >
            {isOpen ? null : <FaBars size={24} />}
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
                className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-[2px]"
              />
              
              {/* Sidebar Content */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                // Fix: h-[100dvh] ensures it fits mobile viewports perfectly including address bars
                className="fixed top-0 right-0 h-[100dvh] w-80 bg-[#0b1120] border-l border-gray-700/50 shadow-2xl flex flex-col justify-between md:hidden z-[100]"
              >
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-50%] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-[-10%] left-[-50%] w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]"></div>
                </div>

                {/* Header Section */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800/50 bg-[#0b1120]/50 backdrop-blur-md relative z-10">
                  <span className="text-xl font-bold text-white tracking-wide">Menu</span>
                  <button 
                    onClick={closeMenu}
                    className="p-2 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-red-500/20 hover:border-red-500/50 border border-transparent rounded-full transition-all duration-300"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

           
                <div className="flex-1 overflow-y-auto p-5 space-y-2 relative z-10">
                  {menuItems.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link 
                        to={item.link} 
                        onClick={closeMenu}
                        className="flex items-center gap-4 py-3.5 px-4 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-transparent border border-transparent hover:border-blue-500/20 transition-all duration-300 group"
                      >
                        <span className="text-xl text-gray-500 group-hover:text-blue-400 transition-colors">{item.icon}</span>
                        <span className="font-medium text-lg">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

               
                <div className="p-6 pb-8 border-t border-gray-800/50 bg-[#0b1120]/80 backdrop-blur-md relative z-10">
                  <button type="button" className={`${walletBtnStyle} w-full py-3.5 justify-center text-lg shadow-lg`}>
                    <FaWallet className="text-xl" />
                    Connect Wallet
                  </button>
                  <p className="text-center text-gray-600 text-xs mt-4">© 2024 CryptoHunter Inc.</p>
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