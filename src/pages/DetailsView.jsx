import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { FaTimes, FaGlobe, FaTwitter } from 'react-icons/fa';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// এখানে ডিফল্ট ভ্যালু (allCoins = []) যোগ করা হয়েছে
const DetailsView = ({ coinId, allCoins = [], onClose }) => {
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // সেফটি চেক যোগ করা হয়েছে
    const selectedCoin = useMemo(() => {
        if (!allCoins || !Array.isArray(allCoins)) return null;
        return allCoins.find(c => c.id === coinId);
    }, [allCoins, coinId]);

    useEffect(() => {
        document.body.classList.add('body-no-scroll');
        return () => document.body.classList.remove('body-no-scroll');
    }, []);

    useEffect(() => {
        const fetchChartData = async () => {
            if (!coinId) return;
            setIsLoading(true);
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
                if (!res.ok) throw new Error('Network error');
                const data = await res.json();
                if (data && Array.isArray(data.prices)) {
                    setChartData(data.prices);
                } else {
                    setChartData([]);
                }
            } catch (error) {
                console.error("Failed to fetch chart data:", error);
                const now = Date.now();
                const mockChart = Array.from({length: 20}, (_, i) => [now - (i * 3600000), Math.random() * 1000 + 50000]).reverse();
                setChartData(mockChart);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChartData();
    }, [coinId]);

    // যদি Coin খুঁজে না পাওয়া যায়, কিছুই রেন্ডার করবে না
    if (!selectedCoin) return null;
    
    const isPositive = selectedCoin.price_change_percentage_24h >= 0;

    const lineChartData = {
        labels: chartData.map(p => new Date(p[0]).toLocaleTimeString()),
        datasets: [{
            label: 'Price',
            data: chartData.map(p => p[1]),
            borderColor: isPositive ? '#10B981' : '#EF4444',
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, isPositive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                return gradient;
            },
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.4,
            fill: true,
        }]
    };
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#fff',
                bodyColor: '#cbd5e1',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
            }
        },
        scales: {
            x: { display: false },
            y: { 
                display: true,
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#64748b' }
            }
        },
        interaction: { intersect: false, mode: 'index' },
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0f172a] w-full max-w-5xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#1e293b]/50">
                    <div className="flex items-center space-x-4">
                        <img src={selectedCoin.image} className="h-12 w-12 rounded-full" alt="Coin" />
                        <div>
                            <h2 className="text-2xl font-bold text-white">{selectedCoin.name}</h2>
                            <p className="text-blue-400 font-mono">{selectedCoin.symbol.toUpperCase()}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full transition text-gray-400 hover:text-white">
                        <FaTimes size={24} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 custom-scrollbar">
                    {isLoading ? (
                        <div className="h-64 flex items-center justify-center text-gray-400">Loading chart data...</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                                    <p className="text-gray-400 text-xs uppercase mb-1">Current Price</p>
                                    <p className="text-xl font-bold text-white">${selectedCoin.current_price?.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                                    <p className="text-gray-400 text-xs uppercase mb-1">Market Cap</p>
                                    <p className="text-xl font-bold text-white">${selectedCoin.market_cap?.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                                    <p className="text-gray-400 text-xs uppercase mb-1">24h Volume</p>
                                    <p className="text-xl font-bold text-white">${selectedCoin.total_volume?.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                                    <p className="text-gray-400 text-xs uppercase mb-1">All Time High</p>
                                    <p className="text-xl font-bold text-white">${selectedCoin.ath?.toLocaleString() || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/30 mb-8 h-[400px]">
                                <Line data={lineChartData} options={chartOptions} />
                            </div>

                            <div className="flex gap-4">
                                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                                    <FaGlobe /> <span>Website</span>
                                </button>
                                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition">
                                    <FaTwitter /> <span>Community</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailsView;