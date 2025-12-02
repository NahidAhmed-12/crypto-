import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const reviews = [
        {
            name: "Alex Morgan",
            role: "Crypto Trader",
            comment: "The real-time data updates on this platform have helped my trading immensely. The interface is clean and very user-friendly.",
            avatar: "/Testimonial img/img-1.jpg"
        },
        {
            name: "Sarah Jenkins",
            role: "Investor",
            comment: "I just started investing, and the guidelines along with the portfolio tracking system here are simply amazing.",
            avatar: "/Testimonial img/img-2.jpg"
        },
        {
            name: "Michael Chen",
            role: "Day Trader",
            comment: "With the CoinGecko API integration, the prices are always spot on. Definitely the best crypto dashboard I've used.",
            avatar: "/Testimonial img/img-3.jpg"
        }
    ];

    return (
        <section className="py-20 bg-gray-900/50 relative">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
                    What Our Users <span className="text-blue-500">Say</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 border border-gray-700/30 p-8 rounded-2xl relative transition-all hover:border-blue-500/30">
                            <FaQuoteLeft className="text-4xl text-gray-700/50 absolute top-6 right-6" />
                            
                            <div className="flex gap-1 text-yellow-500 mb-6">
                                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                            </div>

                            <p className="text-gray-300 mb-8 italic">"{review.comment}"</p>

                            <div className="flex items-center gap-4">
                                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-blue-500/30" />
                                <div>
                                    <h4 className="text-white font-bold">{review.name}</h4>
                                    <p className="text-sm text-gray-500">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;