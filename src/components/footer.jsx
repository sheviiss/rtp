import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#e6007e] text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="font-semibold text-lg">&copy; {new Date().getFullYear()} RT Pastry. All Rights Reserved.</p>
        <p className="text-sm opacity-80 mt-1">Freshly Baked Happiness Everyday.</p>
      </div>
    </footer>
  );
}

export default Footer;