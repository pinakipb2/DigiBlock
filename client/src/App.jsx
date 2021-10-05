import React from 'react';
import Documents from './components/Documents/Documents';
import Footer from './components/Footer';
import Hero from './components/Hero/Hero';
import Info from './components/Info';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="bg-white h-screen">
      <Navbar />
      <Hero />
      <Info />
      <Documents />
      <Footer />
    </div>
  );
}

export default App;
