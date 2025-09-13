import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* URL এ coinId থাকলেও Home কম্পোনেন্ট রেন্ডার হবে */}
        <Route path="/:coinId" element={<Home />} />
        {/* মূল পাথের জন্যও Home কম্পোনেন্ট রেন্ডার হবে */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
