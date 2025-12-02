import React from 'react';
import { FaGlobe, FaCoins, FaChartLine, FaUserFriends } from 'react-icons/fa';

const MarketStats = () => {
    const stats = [
        { 
            icon: <FaGlobe />, 
            label: "Global Market Cap", 
            value: "$2.4T", 
            color: "text-blue-400", 
            bg: "bg-blue-500/10",
            shadow: "group-hover:shadow-blue-500/50"
        },
        { 
            icon: <FaCoins />, 
            label: "Active Coins", 
            value: "12,000+", 
            color: "text-purple-400", 
            bg: "bg-purple-500/10",
            shadow: "group-hover:shadow-purple-500/50"
        },
        { 
            icon: <FaUserFriends />, 
            label: "Active Users", 
            value: "5M+", 
            color: "text-green-400", 
            bg: "bg-green-500/10",
            shadow: "group-hover:shadow-green-500/50"
        },
        { 
            icon: <FaChartLine />, 
            label: "24h Volume", 
            value: "$84B", 
            color: "text-yellow-400", 
            bg: "bg-yellow-500/10",
            shadow: "group-hover:shadow-yellow-500/50"
        },
    ];

    return (
        <section className="py-20 bg-[#0b1120] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Global Crypto <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Statistics</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                        Real-time data insights from the world's leading decentralized exchange networks and market analysis.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="group p-6 bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl text-center hover:-translate-y-2 hover:border-gray-600 transition-all duration-300 relative overflow-hidden">
                            
                            {/* Decorative gradient blob inside card */}
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 ${stat.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`}></div>

                            {/* Icon Container - The Main Change */}
                            <div className={`relative w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl ${stat.color} ${stat.bg} border border-white/5 shadow-lg transition-all duration-300 group-hover:scale-110 ${stat.shadow}`}>
                                {stat.icon}
                            </div>

                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight">{stat.value}</h3>
                            <p className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-widest group-hover:text-gray-300 transition-colors">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketStats;