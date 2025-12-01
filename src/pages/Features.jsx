import React from 'react';
import { FaChartPie, FaBolt, FaLock, FaMobileAlt, FaGlobeAmericas, FaHeadset } from 'react-icons/fa';

const Features = () => {
    const features = [
        {
            icon: <FaChartPie />,
            title: "Advanced Analytics",
            desc: "Detailed charts and portfolio tracking tools to help you make informed decisions.",
            color: "text-blue-400 bg-blue-400/10"
        },
        {
            icon: <FaBolt />,
            title: "Real-Time Data",
            desc: "Live price updates from the world's largest exchanges with zero latency.",
            color: "text-yellow-400 bg-yellow-400/10"
        },
        {
            icon: <FaLock />,
            title: "Secure & Private",
            desc: "Your data is encrypted locally. We prioritize your privacy and security above all.",
            color: "text-green-400 bg-green-400/10"
        },
        {
            icon: <FaMobileAlt />,
            title: "Mobile Optimized",
            desc: "Responsive design that looks perfect on desktops, tablets, and mobile phones.",
            color: "text-purple-400 bg-purple-400/10"
        },
        {
            icon: <FaGlobeAmericas />,
            title: "Global Coverage",
            desc: "Track over 10,000+ cryptocurrencies from markets all around the world.",
            color: "text-cyan-400 bg-cyan-400/10"
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Support",
            desc: "Our dedicated support team is here to help you navigate the crypto space.",
            color: "text-pink-400 bg-pink-400/10"
        }
    ];

    return (
        <section className="py-24 bg-[#0b1120]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Choose <span className="text-blue-500">Us?</span></h2>
                    <p className="text-gray-400 text-lg">
                        We provide the most comprehensive tools for crypto enthusiasts. Here is what sets us apart from the competition.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 bg-gray-800/40 border border-gray-700/50 rounded-2xl hover:bg-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 ${feature.color} group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;