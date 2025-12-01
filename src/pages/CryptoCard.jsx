import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CryptoCard = ({ coin, index }) => {
    const navigate = useNavigate();
    const priceChange = coin.price_change_percentage_24h;
    const isPositive = priceChange >= 0;

    const handleCardClick = () => {
        navigate(`/${coin.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={handleCardClick}
            className="glass-card rounded-2xl p-6 cursor-pointer hover:border-blue-500/50 transition-all duration-300 group"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <img className="h-12 w-12 rounded-full group-hover:scale-110 transition-transform" src={coin.image} alt={coin.name} />
                    <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{coin.name}</h3>
                        <span className="text-sm text-gray-400 bg-gray-800 px-2 py-0.5 rounded uppercase">{coin.symbol}</span>
                    </div>
                </div>
                <span className="text-xs text-gray-500 font-mono">Rank #{coin.market_cap_rank}</span>
            </div>
            
            <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                    <span className="text-gray-400 text-sm">Price</span>
                    <span className="text-2xl font-bold text-white">${coin.current_price.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">24h Change</span>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {isPositive ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                        <span className="font-semibold">{Math.abs(priceChange).toFixed(2)}%</span>
                    </div>
                </div>
                
                <div className="w-full bg-gray-700 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} 
                        style={{ width: `${Math.min(Math.abs(priceChange) * 5, 100)}%` }} // Just a visual mock for volatility
                    ></div>
                </div>
            </div>
        </motion.div>
    );
};

export default CryptoCard;