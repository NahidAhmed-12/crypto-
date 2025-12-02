import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
 
    <section className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b border-slate-800">
      
    
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50"></div>
      
      {/* Top Glow Spot */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-sm font-medium mb-8">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              Live Market Data
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Track Crypto with <br />
              <span className="text-blue-500">Unmatched Precision</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the most interactive cryptocurrency tracker. Monitor prices, analyze charts, and manage your portfolio with ease.
            </p>

            {/* Buttons with Icons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              
              {/* Primary Button (Rocket Icon) */}
              <button className="group w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3">
                <span>Get Started Free</span>
                <svg className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
              
              {/* Secondary Button (Play Icon) */}
              <button className="group w-full sm:w-auto px-8 py-4 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-3">
                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Watch Demo</span>
              </button>
            </div>

           
            <div className="mt-20 pt-10 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: "Active Users", value: "50K+" },
                    { label: "Transactions", value: "$2M+" },
                    { label: "Countries", value: "120+" },
                    { label: "Uptime", value: "99.9%" },
                ].map((stat, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="text-3xl font-bold text-white">{stat.value}</span>
                        <span className="text-sm text-slate-500 mt-1">{stat.label}</span>
                    </div>
                ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;