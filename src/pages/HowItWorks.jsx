import React from 'react';
import { FaUserPlus, FaWallet, FaChartLine } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaUserPlus />,
            title: "Create Account",
            desc: "Sign up easily with your email and complete the verification process in seconds.",
            color: "text-blue-400 bg-blue-400/10"
        },
        {
            icon: <FaWallet />,
            title: "Connect Wallet",
            desc: "Securely connect your MetaMask or Trust Wallet to deposit funds and start your journey.",
            color: "text-purple-400 bg-purple-400/10"
        },
        {
            icon: <FaChartLine />,
            title: "Start Trading",
            desc: "Analyze real-time market data and buy/sell your favorite cryptocurrencies instantly.",
            color: "text-green-400 bg-green-400/10"
        }
    ];

    return (
        <section className="py-24 bg-[#0b1120]">
            <div className="container mx-auto px-4">
                {/* Header Section Matches Features.jsx */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How It <span className="text-blue-500">Works?</span></h2>
                    <p className="text-gray-400 text-lg">
                        Enter the crypto world in just 3 easy steps. Here represents our simple onboarding process.
                    </p>
                </div>

                {/* Grid Section Matches Features.jsx */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="group p-8 bg-gray-800/40 border border-gray-700/50 rounded-2xl hover:bg-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
                            {/* Icon Styling Matches Features.jsx */}
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 ${step.color} group-hover:scale-110 transition-transform`}>
                                {step.icon}
                            </div>
                            
                        
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;