import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Hero from './pages/Hero';
import Main from './pages/Main';       
import MarketStats from './pages/MarketStats'; 
import Features from './pages/Features'; 
import HowItWorks from './pages/HowItWorks'; 
import Testimonials from './pages/Testimonials';
import Footer from './pages/Footer'; 



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] font-sans selection:bg-blue-500 selection:text-white flex flex-col">
     
        <Navbar />
        <Hero />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:coinId" element={<Main />} />
        </Routes>
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