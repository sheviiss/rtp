import React from 'react';
import Header from './components/header'; // 1. Import your new header!
import Footer from './components/footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. HEADER SECTION (Now active! 🎉) */}
      <Header />

      {/* 2. BODY / MAIN CONTENT SECTION */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-stone-400">
        <p className="text-sm tracking-wide uppercase">Body Content Area</p>
        <p className="text-xs mt-1 italic opacity-75">Ready for the home page sections later...</p>
      </main>

      {/* 3. FOOTER SECTION */}
      <Footer />
      
    </div>
  );
}

export default App;