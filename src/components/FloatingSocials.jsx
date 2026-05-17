import React, { useState, useRef } from 'react';

function FloatingSocials() {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  // Starts the timer to close the menu after a short delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200); // 200ms gives your mouse plenty of time to cross the gap
  };

  // Instantly cancels the close timer if the mouse enters a button area
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  return (
    /* The outer container is completely transparent and layout-only */
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-center gap-4">
      
      {/* Expanded Social Buttons Wrapper */}
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex flex-col items-center gap-3 transition-all duration-300 transform ${
          isHovered 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        
        {/* Facebook */}
        <a 
          href="https://www.facebook.com/rtpastryprideineverybite/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-white text-stone-800 border border-stone-100 rounded-full flex items-center justify-center shadow-lg hover:bg-[#1877F2] hover:text-white hover:scale-120 active:scale-95 transition-all duration-200"
          title="Facebook"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
          </svg>
        </a>

        {/* Instagram */}
        <a 
          href="https://www.instagram.com/rtpastry/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-white text-stone-800 border border-stone-100 rounded-full flex items-center justify-center shadow-lg hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:scale-120 active:scale-95 transition-all duration-200"
          title="Instagram"
        >
          <svg className="w-7 h-7 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* WhatsApp */}
        <a 
          href="https://wa.me/60178100662" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-white text-stone-800 border border-stone-100 rounded-full flex items-center justify-center shadow-lg hover:bg-[#25D366] hover:text-white hover:scale-120 active:scale-95 transition-all duration-200"
          title="WhatsApp"
        >
          <svg className="w-7 h-7 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>

      </div>

      {/* Main Trigger Floating Button - Set to hover:scale-120 */}
      <button 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-16 h-16 bg-[#e6007e] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-120 active:scale-95 transition-all duration-300 pointer-events-auto ease-out"
        aria-label="Social Menu Toggle"
      >
        <svg 
          className="w-8 h-8 fill-none stroke-current stroke-2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

    </div>
  );
}

export default FloatingSocials;