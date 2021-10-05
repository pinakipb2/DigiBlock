import React from 'react';
import Hero from './components/Hero/Hero';
import Info from './components/Info';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="bg-white h-screen">
      <Navbar />
      <Hero />
      <Info />
      {/* 4 cards */}
    </div>
  );
}

export default App;
