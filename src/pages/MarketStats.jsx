import React from 'react';
import { FaGlobe, FaCoins, FaChartLine, FaUserFriends } from 'react-icons/fa';

const MarketStats = () => {
    const stats = [
        { icon: <FaGlobe />, label: "Global Market Cap", value: "$2.4T", color: "text-blue-400" },
        { icon: <FaCoins />, label: "Active Coins", value: "12,000+", color: "text-purple-400" },
        { icon: <FaUserFriends />, label: "Active Users", value: "5M+", color: "text-green-400" },
        { icon: <FaChartLine />, label: "24h Volume", value: "$84B", color: "text-yellow-400" },
    ];

    return (
        <section className="py-20 bg-[#0b1120] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                <div className="absolute top-10 left-10 w-64 h-64 bg-blue-600 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-600 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Global Crypto Statistics</h2>
                    <p className="text-gray-400">Real-time data from the leading exchange networks.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-6 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300">
                            <div className={`text-4xl mb-4 flex justify-center ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-extrabold text-white mb-1">{stat.value}</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketStats;