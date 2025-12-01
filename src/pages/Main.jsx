import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSearch, FaSpinner, FaExclamationTriangle, FaChevronDown } from 'react-icons/fa'; // FaChevronDown icon added
import CryptoCard from './CryptoCard';
import DetailsView from './DetailsView';

// MOCK DATA (Safety fallback if API rate limit hits)
const MOCK_COINS = [
    { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', current_price: 65430, price_change_percentage_24h: 2.5, market_cap_rank: 1, total_volume: 35000000000, market_cap: 1200000000000, ath: 73700 },
    { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', current_price: 3500, price_change_percentage_24h: -1.2, market_cap_rank: 2, total_volume: 15000000000, market_cap: 400000000000, ath: 4800 },
    { id: 'solana', symbol: 'sol', name: 'Solana', image: 'https://cryptologos.cc/logos/solana-sol-logo.png', current_price: 145, price_change_percentage_24h: 5.8, market_cap_rank: 5, total_volume: 2000000000, market_cap: 65000000000, ath: 260 },
    { id: 'binancecoin', symbol: 'bnb', name: 'BNB', image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png', current_price: 605, price_change_percentage_24h: 0.5, market_cap_rank: 4, total_volume: 1000000000, market_cap: 90000000000, ath: 690 },
    { id: 'ripple', symbol: 'xrp', name: 'XRP', image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png', current_price: 0.62, price_change_percentage_24h: -0.8, market_cap_rank: 6, total_volume: 1200000000, market_cap: 34000000000, ath: 3.40 },
    { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png', current_price: 0.16, price_change_percentage_24h: 8.4, market_cap_rank: 8, total_volume: 1000000000, market_cap: 23000000000, ath: 0.73 },
    { id: 'cardano', symbol: 'ada', name: 'Cardano', image: 'https://cryptologos.cc/logos/cardano-ada-logo.png', current_price: 0.45, price_change_percentage_24h: 1.2, market_cap_rank: 10, total_volume: 800000000, market_cap: 16000000000, ath: 3.10 },
    { id: 'avalanche', symbol: 'avax', name: 'Avalanche', image: 'https://cryptologos.cc/logos/avalanche-avax-logo.png', current_price: 35, price_change_percentage_24h: 4.1, market_cap_rank: 12, total_volume: 600000000, market_cap: 13000000000, ath: 146 },
    { id: 'polkadot', symbol: 'dot', name: 'Polkadot', image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png', current_price: 7.2, price_change_percentage_24h: -2.5, market_cap_rank: 15, total_volume: 300000000, market_cap: 10000000000, ath: 55 },
    { id: 'shibainu', symbol: 'shib', name: 'Shiba Inu', image: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png', current_price: 0.000025, price_change_percentage_24h: 10.5, market_cap_rank: 11, total_volume: 900000000, market_cap: 14000000000, ath: 0.000088 },
];

const Main = () => {
    const [allCoins, setAllCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [usingMockData, setUsingMockData] = useState(false);
    
    // NEW: State for pagination (Load More)
    const [visibleCount, setVisibleCount] = useState(10);

    const { coinId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCryptoData = async () => {
            setIsLoading(true);
            try {
                // COINGECKO API URL
                // Updated per_page to 100 to support "Load More" functionality effectively
                const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
                
                if (!res.ok) throw new Error('CoinGecko API Limit or Error');
                
                const json = await res.json();
                
                // Mapping CoinGecko Data Structure
                const formattedData = json.map((coin) => ({
                    id: coin.id,
                    symbol: coin.symbol,
                    name: coin.name,
                    image: coin.image, 
                    current_price: coin.current_price,
                    price_change_percentage_24h: coin.price_change_percentage_24h,
                    market_cap_rank: coin.market_cap_rank,
                    total_volume: coin.total_volume,
                    market_cap: coin.market_cap,
                    ath: coin.ath 
                }));

                setAllCoins(formattedData);
                setUsingMockData(false);
            } catch (error) {
                console.warn("API Error, switching to Demo Data:", error);
                setAllCoins(MOCK_COINS);
                setUsingMockData(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCryptoData();
    }, []);

    // Reset visible count when search term changes
    useEffect(() => {
        setVisibleCount(10);
    }, [searchTerm]);

    const filteredCoins = useMemo(() => {
        if (!Array.isArray(allCoins)) return [];
        return allCoins.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allCoins, searchTerm]);

    // NEW: Slice the data based on visibleCount
    const displayedCoins = filteredCoins.slice(0, visibleCount);

    // NEW: Handle Load More Click
    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 10);
    };

    return (
        <div className="container mx-auto px-4 relative z-10 min-h-[500px]">
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-10 -mt-8 relative z-20">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400 text-lg" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search coins (e.g., Bitcoin)..."
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md shadow-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Status */}
            <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-white">Market Trends</h2>
                    {usingMockData && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded border border-yellow-500/30 flex items-center gap-1">
                            <FaExclamationTriangle /> Rate Limit / Demo Mode
                        </span>
                    )}
                </div>
                <span className="text-gray-400 text-sm animate-pulse">Live Updates</span>
            </div>

            {/* Grid Content */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
                    <p className="text-gray-400">Loading Coins...</p>
                </div>
            ) : (
                <>
                    {displayedCoins.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                                {displayedCoins.map((coin, index) => (
                                    <CryptoCard key={coin.id} coin={coin} index={index} />
                                ))}
                            </div>

                            {/* NEW: Load More Button */}
                            {visibleCount < filteredCoins.length && (
                                <div className="flex justify-center pb-20">
                                    <button
                                        onClick={handleLoadMore}
                                        className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Load More Coins <FaChevronDown className="group-hover:translate-y-1 transition-transform duration-300" />
                                        </span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-gray-800/30 rounded-2xl border border-gray-800 border-dashed">
                            <p className="text-xl text-gray-400">No coins found.</p>
                        </div>
                    )}
                </>
            )}

            {/* Modal Logic */}
            {coinId && allCoins.length > 0 && (
                <DetailsView 
                    coinId={coinId} 
                    allCoins={allCoins} 
                    onClose={() => navigate(-1)} 
                />
            )}
        </div>
    );
};

export default Main;