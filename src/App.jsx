import React from 'react';
// 1. IMPORT REACT ROUTER UTILITIES
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. IMPORT LAYOUT COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials'; // Added your new floating socials component

// 3. IMPORT INDIVIDUAL PAGES
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Outlets from './pages/Outlets';
import Order from './pages/Order';

function App() {
  return (
    <BrowserRouter>
      {/* Master Flex layout container to ensure footer sticks to the bottom */}
      <div className="flex flex-col min-h-screen bg-white relative">

        {/* The persistent navigation header at the top of every page */}
        <Header />

        {/* The Dynamic Main Content Area */}
        <main className="flex-grow w-full">
          <Routes>
            {/* URL pathing matches: / , /about , /outlets , /contact */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/outlets" element={<Outlets />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>

        {/* The persistent footer at the bottom of every page */}
        <Footer />

        {/* Persistent Floating Social Menu on all pages */}
        <FloatingSocials />

      </div>
    </BrowserRouter>
  );
}

export default App;