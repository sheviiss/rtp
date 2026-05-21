import React, { useEffect, useRef } from 'react';

// Import your saved mascot image asset from your assets directory
import mascotImg from '../assets/mascot.png';

// Clamp helper function to ensure boundaries are locked between 0 and 1
const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

function AboutUs() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const spineFillRef = useRef(null);
  const progBarRef = useRef(null);

  // Total wheel delta accumulation value required to fully finish scrolling the track
  const TOTAL_SCROLL_TICKS = 1600;

  const milestones = [
    { year: "2003", tag: "The Beginning", text: "Japanese-inspired bakery first outlet opened in Taman Desa, KL." },
    { year: "2004", tag: "Signature Creation", text: "Launched Signature Square Green Tea Cake — a nationwide favourite.", badge: "🇲🇾 Malaysia First" },
    { year: "2011", tag: "Signature Creation", text: "Launched Signature Hokkaido Cake, celebrating Japan's dairy heritage.", badge: "🇲🇾 Malaysia First" },
    { year: "2012", tag: "Infrastructure", text: "Cake factory moved to new premises in Bukit Serdang." },
    { year: "2020", tag: "Innovation", text: "Launched Malaysia's first Signature Carrot Dough Bread.", badge: "🇲🇾 Malaysia First" },
    { year: "2021", tag: "Quality & Trust", text: "Cake factory granted MeSTI Certification." },
    { year: "2022", tag: "Double Milestone", text: "Bread factory new premises in Glenmarie and launched 1st IP brand: Doudoh." },
    { year: "2023", tag: "Triple Certification", text: "Bread Factory granted GMP, HACCP, and HALAL Certifications." },
    { year: "2024", tag: "Quality & Trust", text: "Bread Factory granted MeSTI Certification." },
    { year: "2025", tag: "Latest Chapter", text: "Launched Wabi-sabi ID concept outlet at SS2, Petaling Jaya." },
  ];

  useEffect(() => {
    let scrollAccumulator = 0;
    let currentX = 0;
    let targetX = 0;
    let lastTouchY = 0;

    const renderAnimationFrames = (rawProgress) => {
      if (!trackRef.current || !viewportRef.current) return;

      const track = trackRef.current;
      const viewport = viewportRef.current;
      const cards = track.querySelectorAll('.milestone-node-card');

      const maxShift = Math.max(0, track.scrollWidth - viewport.clientWidth);

      // Smooth horizontal animation translation mapping
      targetX = -rawProgress * maxShift;
      currentX += (targetX - currentX) * 0.12;
      track.style.transform = `translateX(${currentX}px)`;

      // Animate cards step-by-step based on exact scroll percentages
      const revealStep = rawProgress * milestones.length;
      cards.forEach((cardElement, idx) => {
        const dot = cardElement.querySelector('.milestone-dot-center');
        const bubble = cardElement.querySelector('.milestone-card-bubble');
        const label = cardElement.querySelector('.milestone-year-label');

        if (revealStep > idx) {
          if (bubble) { bubble.style.opacity = '1'; bubble.style.transform = 'translateY(0)'; }
          if (label) { 
            label.style.opacity = '1'; 
            label.style.transform = 'translateY(0)'; 
            label.style.color = '#e6007e'; 
            label.style.webkitTextStroke = '1.5px transparent';
          }
          if (dot) { dot.style.backgroundColor = '#e6007e'; dot.style.transform = 'scale(1.3)'; }
        } else {
          const isOdd = idx % 2 === 0;
          if (bubble) { bubble.style.opacity = '0'; bubble.style.transform = isOdd ? 'translateY(12px)' : 'translateY(-12px)'; }
          if (label) { 
            label.style.opacity = '0'; 
            label.style.transform = isOdd ? 'translateY(-8px)' : 'translateY(8px)'; 
            label.style.color = 'transparent';
            label.style.webkitTextStroke = '1.5px #e6007e';
          }
          if (dot) { dot.style.backgroundColor = '#fdfaf8'; dot.style.transform = 'scale(1)'; }
        }
      });

      // Sync loading bars
      const travelFraction = maxShift > 0 ? Math.abs(currentX) / maxShift : 0;
      if (spineFillRef.current) spineFillRef.current.style.width = `${travelFraction * 100}%`;
      if (progBarRef.current) progBarRef.current.style.width = `${rawProgress * 100}%`;
    };

    const isElementInView = () => {
      if (!sectionRef.current) return false;
      const boundingBox = sectionRef.current.getBoundingClientRect();
      return boundingBox.top <= 1 && boundingBox.bottom > window.innerHeight * 0.3;
    };

    // Hijack Mouse Wheel Inputs
    const handleMouseWheel = (e) => {
      if (!isElementInView()) return;

      if (scrollAccumulator <= 0 && e.deltaY < 0) return;
      if (scrollAccumulator >= TOTAL_SCROLL_TICKS && e.deltaY > 0) return;

      e.preventDefault();

      scrollAccumulator = clamp(scrollAccumulator + e.deltaY, 0, TOTAL_SCROLL_TICKS);
      renderAnimationFrames(scrollAccumulator / TOTAL_SCROLL_TICKS);
    };

    // Track Mobile Touch Start position metrics
    const handleTouchStart = (e) => {
      lastTouchY = e.touches[0].clientY;
    };

    // Hijack Mobile Swipes
    const handleTouchMove = (e) => {
      if (!isElementInView()) return;

      const deltaY = lastTouchY - e.touches[0].clientY;
      lastTouchY = e.touches[0].clientY;

      if (scrollAccumulator <= 0 && deltaY < 0) return;
      if (scrollAccumulator >= TOTAL_SCROLL_TICKS && deltaY > 0) return;

      e.preventDefault();
      scrollAccumulator = clamp(scrollAccumulator + deltaY * 2.5, 0, TOTAL_SCROLL_TICKS);
      renderAnimationFrames(scrollAccumulator / TOTAL_SCROLL_TICKS);
    };

    // Reset loop if window is scrolled back upwards naturally
    const handleGlobalScroll = () => {
      if (!sectionRef.current) return;
      if (sectionRef.current.getBoundingClientRect().top > 1) {
        scrollAccumulator = 0;
        renderAnimationFrames(0);
      }
    };

    window.addEventListener('wheel', handleMouseWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleGlobalScroll, { passive: true });

    renderAnimationFrames(0);

    return () => {
      window.removeEventListener('wheel', handleMouseWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleGlobalScroll);
    };
  }, [milestones.length]);

  return (
    <div className="bg-[#fdfaf8] text-stone-800 font-sans overflow-x-hidden antialiased">
      
      {/* --- HERO SPLIT SECTION --- */}
      <section className="bg-white w-full px-6 pt-24 pb-16 border-b border-stone-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column Mascot Area */}
          <div className="md:col-span-5 flex flex-col items-center justify-center select-none relative">
            <img 
              src={mascotImg} 
              alt="RT Pastry Mascot" 
              className="w-64 sm:w-72 md:w-80 h-auto object-contain pointer-events-none relative z-10" 
            />
            <div className="w-40 h-4 bg-stone-900/5 rounded-full blur-md mt-1 transform scale-x-110" />
          </div>

          {/* Right Column Content Area */}
          <div className="md:col-span-7 text-center md:text-left flex flex-col items-center md:items-start pl-0 md:pl-4">
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#e6007e] mb-2 font-bold">
              Est. 2003 · Kuala Lumpur
            </p>

            <div className="flex items-center gap-3 my-2 opacity-60 w-36 justify-center md:justify-start">
              <span className="w-6 h-[1px] bg-stone-200" />
              <span className="text-[#e6007e] text-[10px]">♥</span>
              <span className="w-full h-[1px] bg-stone-200" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light leading-[1.1] tracking-tight text-stone-800 mt-2 mb-6">
              Baked with <br />
              <span className="italic font-normal text-[#e6007e]">Japanese Soul</span>
            </h1>
            
            <p className="text-stone-400 max-w-xl font-light text-base sm:text-lg leading-relaxed">
              Two decades of crafting the finest Japanese-inspired breads and cakes for Malaysia — one loaf at a time.
            </p>
          </div>

        </div>
      </section>

      {/* --- TIMELINE TRACK SECTION (Fixed Height Pinned Wrapper Frame) --- */}
      <section ref={sectionRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-[#fdfaf8] z-20 px-6">
        
        {/* Absolute Sizing Internal Node Stack to Completely Eliminate Extra Padding Gaps */}
        <div className="w-full max-w-6xl min-h-[480px] flex flex-col justify-between items-center relative">
          
          {/* Section Headers Block */}
          <div className="text-center w-full block">
            <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#e6007e] font-bold mb-1">Our Presence</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-800">Our <span className="italic font-normal text-[#e6007e]">Milestones</span></h2>
            
            <div className="w-28 h-[2px] bg-stone-100 mx-auto mt-3 rounded-full overflow-hidden">
              <div ref={progBarRef} className="h-full w-0 bg-[#e6007e]" />
            </div>
          </div>

          {/* Timeline Viewport Wrapper Track */}
          <div ref={viewportRef} className="w-full relative overflow-hidden py-4 flex items-center mt-auto mb-auto">
            <div ref={trackRef} className="flex items-center relative px-[5vw] will-change-transform">
              
              {/* Baseline wire track centered exactly on node markers */}
              <div className="absolute left-[5vw] right-0 top-1/2 h-[1px] bg-stone-200/60 -translate-y-1/2 pointer-events-none">
                <div ref={spineFillRef} className="h-full w-0 bg-[#e6007e]/40" />
              </div>

              {milestones.map((item, idx) => {
                const isOdd = idx % 2 === 0;
                return (
                  <div 
                    key={idx} 
                    className="milestone-node-card flex-shrink-0 w-[240px] flex flex-col items-center relative"
                  >
                    
                    {/* --- TOP CONTAINER LAYOUT (Height increased for content) --- */}
                    <div className="h-[140px] w-full flex flex-col justify-end items-center px-3 pb-3">
                      {isOdd ? (
                        <div className="milestone-card-bubble bg-white border border-stone-100 rounded-3xl p-5 w-full shadow-[0_15px_40px_rgba(0,0,0,0.015)] transition-all duration-500 ease-out">
                          <span className="text-[8px] tracking-widest font-bold text-[#e6007e] uppercase block mb-1">{item.tag}</span>
                          <p className="font-serif text-[13px] leading-relaxed text-stone-700 whitespace-normal">
                            {item.text.includes("Taman Desa") ? (
                              <>Japanese-inspired bakery first outlet opened in <strong className="font-semibold text-stone-900">Taman Desa</strong>, KL.</>
                            ) : item.text}
                          </p>
                        </div>
                      ) : (
                        <div className="milestone-year-label font-serif text-4xl font-light tracking-tight text-center transition-all duration-500">
                          {item.year}
                        </div>
                      )}
                    </div>

                    {/* --- NODE BAR CENTER POINT --- */}
                    <div className="h-0 flex flex-col items-center justify-center relative flex-shrink-0">
                      <div className="milestone-dot-center w-3 h-3 rounded-full border-2 border-[#e6007e]/40 bg-[#fdfaf8] z-30 transition-all duration-300" />
                    </div>

                    {/* --- BOTTOM CONTAINER LAYOUT (Height increased for content) --- */}
                    <div className="h-[140px] w-full flex flex-col justify-start items-center px-3 pt-3">
                      {!isOdd ? (
                        <div className="milestone-card-bubble bg-white border border-stone-100 rounded-3xl p-5 w-full shadow-[0_15px_40px_rgba(0,0,0,0.015)] transition-all duration-500 ease-out">
                          <span className="text-[8px] tracking-widest font-bold text-[#e6007e] uppercase block mb-1">{item.tag}</span>
                          <p className="font-serif text-[13px] leading-relaxed text-stone-700 whitespace-normal">
                            {item.text}
                          </p>
                          {item.badge && (
                            <span className="inline-block mt-2 text-[9px] bg-[#fdf2f7] border border-pink-100 text-[#e6007e] rounded-full px-2.5 py-0.5 font-bold tracking-wide">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="milestone-year-label font-serif text-4xl font-light tracking-tight text-center transition-all duration-500">
                          {item.year}
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}

            </div>
          </div>
        </div>

      </section>

      {/* --- CLOSING SECTION --- */}
      <section className="bg-white text-stone-800 py-32 px-6 text-center relative border-t border-stone-100 z-30">
        <h2 className="font-serif text-4xl sm:text-5xl font-light relative z-10">More chapters to come.</h2>
        <p className="mt-4 text-stone-400 tracking-wide text-sm relative z-10 font-light">RT Pastry Holdings Berhad — Crafting Japan's spirit, Malaysia's way.</p>
        <a href="#" className="inline-block mt-10 bg-[#e6007e] text-white text-xs uppercase tracking-widest px-8 py-3.5 rounded-full font-bold shadow-lg shadow-[#e6007e]/10 hover:bg-[#c4006b] transition-all duration-300 z-10 relative">
          Discover Our Products
        </a>
      </section>

    </div>
  );
}

export default AboutUs;