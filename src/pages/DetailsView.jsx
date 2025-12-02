import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom'; // ১. এটা ইম্পোর্ট করা হয়েছে
import { Line } from 'react-chartjs-2';
import { FaTimes, FaGlobe, FaTwitter } from 'react-icons/fa';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DetailsView = ({ coinId, allCoins = [], onClose }) => {
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    const selectedCoin = useMemo(() => {
        if (!allCoins || !Array.isArray(allCoins)) return null;
        return allCoins.find(c => c.id === coinId);
    }, [allCoins, coinId]);

    useEffect(() => {
        setMounted(true);
        // বডি স্ক্রল লক
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
            setMounted(false);
        };
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

    if (!selectedCoin || !mounted) return null;
    
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
        plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
        scales: {
            x: { display: false },
            y: { display: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 10 } } }
        },
        interaction: { intersect: false, mode: 'index' },
    };

    // ২. মেইন কন্টেন্ট আলাদা ভেরিয়েবল-এ রাখা হলো
    const modalContent = (
        <div className="fixed inset-0 z-[99999] flex items-end md:items-center justify-center sm:px-4 sm:py-6 animate-in fade-in duration-200">
            
            {/* Backdrop: ক্লিক করলে বন্ধ হবে */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            {/* FIX: 'mb-0' এবং 'rounded-b-none' দিয়ে নিচে আটকানো হয়েছে মোবাইলে, যাতে উপরে না উঠে যায় */}
            {/* FIX: 'mt-20' বা 'max-h-[80vh]' ব্যবহার করা হয়েছে সেফটির জন্য */}
            <div className="relative w-full max-w-5xl bg-[#0f172a] border-t border-x md:border border-gray-800 shadow-2xl flex flex-col 
                            rounded-t-2xl md:rounded-2xl overflow-hidden
                            h-[85vh] md:h-auto md:max-h-[90vh] 
                            z-[100000]"> 
                
                {/* Header Section */}
                <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#1e293b] shrink-0">
                    <div className="flex items-center space-x-3">
                        <img src={selectedCoin.image} className="h-10 w-10 rounded-full" alt="Coin" />
                        <div>
                            <h2 className="text-xl font-bold text-white">{selectedCoin.name}</h2>
                            <p className="text-blue-400 font-mono text-xs">{selectedCoin.symbol.toUpperCase()}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-full text-gray-300">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Content Section */}
                <div className="overflow-y-auto p-4 custom-scrollbar flex-1 pb-10 md:pb-4">
                    {isLoading ? (
                        <div className="h-64 flex flex-col items-center justify-center text-gray-400">Loading...</div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <StatCard label="Price" value={`$${selectedCoin.current_price?.toLocaleString()}`} />
                                <StatCard label="Market Cap" value={`$${selectedCoin.market_cap?.toLocaleString()}`} />
                                <StatCard label="Volume" value={`$${selectedCoin.total_volume?.toLocaleString()}`} />
                                <StatCard label="ATH" value={`$${selectedCoin.ath?.toLocaleString() || 'N/A'}`} />
                            </div>

                            <div className="bg-gray-800/30 p-2 rounded-xl border border-gray-700/30 h-[250px] md:h-[400px] w-full">
                                <Line data={lineChartData} options={chartOptions} />
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                    <FaGlobe /> <span>Website</span>
                                </button>
                                <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">
                                    <FaTwitter /> <span>Community</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // ৩. React Portal ব্যবহার করে সরাসরি body ট্যাগে পাঠানো হচ্ছে
    return ReactDOM.createPortal(modalContent, document.body);
};

const StatCard = ({ label, value }) => (
    <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <p className="text-gray-400 text-[10px] uppercase mb-1">{label}</p>
        <p className="text-sm md:text-lg font-bold text-white truncate">{value}</p>
    </div>
);

export default DetailsView;