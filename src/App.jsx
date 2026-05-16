import React from 'react';
// 1. IMPORT REACT ROUTER UTILITIES
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. IMPORT LAYOUT COMPONENTS (Matching your friend's Capital Letters!)
import Header from './components/Header';
import Footer from './components/Footer';

// 3. IMPORT INDIVIDUAL PAGES
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Outlets from './pages/Outlets';

function App() {
  return (
    <BrowserRouter>
      {/* Master Flex layout container to ensure footer sticks to the bottom */}
      <div className="flex flex-col min-h-screen bg-white">

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
          </Routes>
        </main>

        {/* The persistent footer at the bottom of every page */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;