import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// কম্পোনেন্ট ইম্পোর্ট
import Navbar from './pages/Navbar';
import Hero from './pages/Hero';
import Main from './pages/Main';         // কয়েন গ্রিড
import MarketStats from './pages/MarketStats'; // স্ট্যাটাস
import Features from './pages/Features'; // ফিচারস
import HowItWorks from './pages/HowItWorks'; 
import Testimonials from './pages/Testimonials';
import Footer from './pages/Footer';     // ফুটার



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] font-sans selection:bg-blue-500 selection:text-white flex flex-col">
        
        {/* উপরের ফিক্সড অংশ */}
        <Navbar />
        <Hero />
        
        {/* ডাইনামিক অংশ (কয়েন সার্চ ও গ্রিড) */}
        {/* রুট সেটআপ: হোম এবং কয়েন ডিটেইলস দুটোই Main কম্পোনেন্ট দেখাবে */}
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:coinId" element={<Main />} />
        </Routes>

        {/* নিচের স্ট্যাটিক অংশ (সব পেজে থাকবে) */}
        <MarketStats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;