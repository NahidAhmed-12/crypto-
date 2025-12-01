import React from 'react';
import { FaTwitter, FaGithub, FaDiscord, FaLinkedin, FaBitcoin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#0b1120] border-t border-gray-800 pt-16 pb-8 text-gray-400">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-6">
                            <FaBitcoin className="text-3xl text-blue-500" />
                            <span className="text-2xl font-bold text-white tracking-tight">
                                Crypto<span className="text-blue-500">Hunter</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6">
                            The ultimate platform for tracking real-time crypto prices, analyzing market trends, and managing your digital portfolio with ease.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 hover:text-white transition-all"><FaTwitter /></a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-white transition-all"><FaGithub /></a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 hover:text-white transition-all"><FaDiscord /></a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 hover:text-white transition-all"><FaLinkedin /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Market</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-blue-400 transition">All Coins</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Top Gainers</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Top Losers</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">New Listings</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Resources</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-blue-400 transition">API Documentation</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Learn Crypto</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Blog & News</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Help Center</a></li>
                        </ul>
                    </div>

                    {/* Newsletter (Small) */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Stay Updated</h4>
                        <p className="text-sm mb-4">Subscribe to our newsletter for the latest market updates.</p>
                        <div className="flex flex-col space-y-3">
                            <input type="email" placeholder="Email address" className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500" />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Subscribe</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>© {new Date().getFullYear()} CryptoHunter. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;