import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Crypto Card Component (কোনো পরিবর্তন প্রয়োজন নেই)
const CryptoCard = ({ coin, index }) => {
    // ... আগের কোড এখানে থাকবে ...
    const cardRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);
    
    const priceChange = coin.price_change_percentage_24h;
    const isPositive = priceChange >= 0;

    const handleCardClick = () => {
        navigate(`/${coin.id}`);
    };

    return (
        <div
        ref={cardRef}
        className="crypto-card p-6"
        style={{ animationDelay: `${Math.random() * 5}s` }}
        onClick={handleCardClick}
        >
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
            <img className="h-10 w-10 rounded-full" src={coin.image} alt={coin.name} />
            <div>
                <p className="text-lg font-bold text-white">{coin.name}</p>
                <p className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</p>
            </div>
            </div>
            <p className="text-xs text-gray-500 font-mono">#{coin.market_cap_rank}</p>
        </div>
        <div className="mt-4 flex justify-between items-end">
            <p className="text-3xl font-semibold text-white">${coin.current_price.toLocaleString()}</p>
            <p className={`text-lg font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}%
            </p>
        </div>
        </div>
    );
};

// Details View Component (আপডেটেড)
const DetailsView = ({ coinId, allCoins, onClose }) => {
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const selectedCoin = useMemo(() => allCoins.find(c => c.id === coinId), [allCoins, coinId]);

    useEffect(() => {
        document.body.classList.add('body-no-scroll');
        return () => {
            document.body.classList.remove('body-no-scroll');
        };
    }, []);

    useEffect(() => {
        const fetchChartData = async () => {
            if (!coinId) return;
            setIsLoading(true);
            try {
                // *** পরিবর্তন এখানে: এখন আমাদের নিজস্ব API কে কল করা হচ্ছে ***
                const res = await fetch(`/api/crypto?coinId=${coinId}`);
                if (!res.ok) throw new Error('Network error');
                const data = await res.json();
                setChartData(data); // সরাসরি data সেট করা হচ্ছে কারণ API থেকে এখন শুধু prices অ্যারে আসছে
            } catch (error) {
                console.error("Failed to fetch chart data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChartData();
    }, [coinId]);

    // ... বাকি DetailsView কম্পোনেন্টের কোড অপরিবর্তিত থাকবে ...
    if (!selectedCoin) {
        return (
            <div id="details-view" className="is-active">
                <div className="container mx-auto px-4 max-w-4xl py-12 text-center">
                    Loading coin data...
                </div>
            </div>
        );
    }
    
    const isPositive = selectedCoin.price_change_percentage_24h >= 0;

    const lineChartData = {
        labels: chartData.map(p => new Date(p[0]).toLocaleTimeString()),
        datasets: [{
            label: 'Price (USD)',
            data: chartData.map(p => p[1]),
            borderColor: isPositive ? '#10B981' : '#EF4444',
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, isPositive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)');
                gradient.addColorStop(1, isPositive ? 'rgba(16, 185, 129, 0)' : 'rgba(239, 68, 68, 0)');
                return gradient;
            },
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
            fill: true,
        }]
    };
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { display: false }, y: { display: false } },
        plugins: { legend: { display: false } },
        interaction: { intersect: false, mode: 'index' },
    };
    
    const priceChange24h = selectedCoin.price_change_24h;

    return (
        <div id="details-view" className={coinId ? 'is-active' : ''}>
            <div className="container mx-auto px-4 max-w-4xl py-12">
                <button onClick={onClose} className="mb-6 flex items-center space-x-2 text-gray-400 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                    <span>Back to Grid</span>
                </button>
                {isLoading ? (
                    <div className="text-center py-12">Loading details...</div>
                ) : (
                    <div>
                        <div className="flex items-center space-x-4 mb-8">
                            <img src={selectedCoin.image} className="h-16 w-16 rounded-full" alt="Coin" />
                            <div>
                                <h2 className="text-4xl font-bold text-white">{selectedCoin.name}</h2>
                                <p className="text-xl text-gray-400">{selectedCoin.symbol.toUpperCase()}</p>
                            </div>
                        </div>
                        <div className="mb-8 p-4 rounded-lg h-64" style={{ background: 'rgba(13, 17, 23, 0.5)' }}>
                            <Line data={lineChartData} options={chartOptions} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                             <div className="crypto-card is-visible p-4"><span className="text-gray-400 text-sm">Price</span><p className="text-2xl font-semibold text-white">${selectedCoin.current_price.toLocaleString()}</p></div>
                             <div className="crypto-card is-visible p-4"><span className="text-gray-400 text-sm">24h Change (%)</span><p className={`text-2xl font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{isPositive ? '▲' : '▼'} {Math.abs(selectedCoin.price_change_percentage_24h).toFixed(2)}%</p></div>
                             <div className="crypto-card is-visible p-4"><span className="text-gray-400 text-sm">Market Cap</span><p className="text-2xl font-semibold text-white">${selectedCoin.market_cap.toLocaleString()}</p></div>
                             <div className="crypto-card is-visible p-4"><span className="text-gray-400 text-sm">All-Time High</span><p className="text-2xl font-semibold text-white">${selectedCoin.ath.toLocaleString()}</p></div>
                        </div>
                         <div className="mt-10">
                            <h3 className="text-xl font-bold text-white mb-4">Market Statistics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                                <div className="crypto-card is-visible p-4 flex justify-between items-center">
                                    <span className="text-gray-400">24h Price Change</span>
                                    <span className={`font-semibold ${priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        ${priceChange24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className="crypto-card is-visible p-4 flex justify-between items-center"><span className="text-gray-400">Total Volume</span><span className="font-semibold text-white">${selectedCoin.total_volume.toLocaleString()}</span></div>
                                <div className="crypto-card is-visible p-4 flex justify-between items-center"><span className="text-gray-400">Circulating Supply</span><span className="font-semibold text-white">{`${selectedCoin.circulating_supply.toLocaleString()} ${selectedCoin.symbol.toUpperCase()}`}</span></div>
                                <div className="crypto-card is-visible p-4 flex justify-between items-center"><span className="text-gray-400">Total Supply</span><span className="font-semibold text-white">{selectedCoin.total_supply ? `${selectedCoin.total_supply.toLocaleString()} ${selectedCoin.symbol.toUpperCase()}` : 'N/A'}</span></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Home Component (Main Page) (আপডেটেড)
const Home = () => {
    const [allCoins, setAllCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { coinId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCryptoData = async () => {
            if (allCoins.length === 0) {
                setIsLoading(true);
            }
            try {
                // *** পরিবর্তন এখানে: এখন আমাদের নিজস্ব API কে কল করা হচ্ছে ***
                const res = await fetch('/api/crypto');
                if (!res.ok) throw new Error('Network error');
                const data = await res.json();
                setAllCoins(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                if (allCoins.length === 0) {
                    setIsLoading(false);
                }
            }
        };

        fetchCryptoData();
        const interval = setInterval(fetchCryptoData, 60000);
        return () => clearInterval(interval);
    }, []);
    
    // ... বাকি Home কম্পোনেন্টের কোড অপরিবর্তিত থাকবে ...
    const filteredCoins = useMemo(() => {
        return allCoins.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allCoins, searchTerm]);
    
    return (
        <div className="antialiased">
            <div className="animated-bg">
                <div className="blob blob1"></div>
                <div className="blob blob2"></div>
                <div className="blob blob3"></div>
            </div>

            <header className="text-center py-8 md:py-12 px-4 relative z-10">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">Crypto <span className="text-[#71c2ff]">Vision</span></h1>
                <p className="text-lg text-gray-400">The Definitive Interactive Experience.</p>
            </header>

            <main className="container mx-auto px-4 relative z-10">
                <div>
                    <div className="mb-10 max-w-2xl mx-auto">
                        <input
                            type="text"
                            id="search"
                            placeholder="Search for a coin..."
                            className="w-full px-5 py-3 bg-transparent border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {isLoading ? (
                        <div className="text-center py-12">
                            <svg className="animate-spin h-10 w-10 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="mt-4 text-gray-400">Entering the vision...</p>
                        </div>
                    ) : (
                        <>
                            {filteredCoins.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                                    {filteredCoins.map((coin, index) => (
                                        <CryptoCard key={coin.id} coin={coin} index={index} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-400 mt-8">No coins found in this dimension.</p>
                            )}
                        </>
                    )}
                </div>
            </main>
            
            {coinId && <DetailsView coinId={coinId} allCoins={allCoins} onClose={() => navigate(-1)} />}
        </div>
    );
};

export default Home;