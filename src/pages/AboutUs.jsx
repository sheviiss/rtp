import React, { useEffect, useRef } from 'react';

// Hero Background
import aboutUsBG from '../assets/AboutUsBG.png';

// Journey Images
import founderImg from '../assets/founder.png';
import firstRTImg from '../assets/FirstRTP.png';
import restaurantImg from '../assets/restaurant.png';
import choiceImg from '../assets/choice.png';
import callingImg from '../assets/calling.png';

const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

function AboutUs() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const spineFillRef = useRef(null);
  const progBarRef = useRef(null);

  const TOTAL_SCROLL_TICKS = 2000;

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
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const cards = track.querySelectorAll('.milestone-node-card');

    const renderAnimationFrames = (rawProgress) => {
      const maxShift = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const targetX = -rawProgress * maxShift;
      
      track.style.transform = `translateX(${targetX}px)`;

      const revealStep = rawProgress * milestones.length;
      cards.forEach((cardElement, idx) => {
        const dot = cardElement.querySelector('.milestone-dot-center');
        const bubble = cardElement.querySelector('.milestone-card-bubble');
        const label = cardElement.querySelector('.milestone-year-label');
        const distance = revealStep - idx;
        const progress = clamp(distance, 0, 1);

        if (bubble) {
          bubble.style.opacity = progress;
          bubble.style.transform = `translateY(${12 - progress * 12}px)`;
        }

        if (label) {
          label.style.opacity = progress;
          label.style.transform = `translateY(${8 - progress * 8}px)`;
          label.style.color = progress > 0.5 ? '#e6007e' : 'transparent';
          label.style.webkitTextStroke = '1px #e6007e';
        }

        if (dot) {
          dot.style.backgroundColor = progress > 0.5 ? '#e6007e' : '#fdfaf8';
          dot.style.transform = `scale(${1 + progress * 0.3})`;
        }
      });

      if (spineFillRef.current) {
        spineFillRef.current.style.width = `${rawProgress * 100}%`;
      }
      if (progBarRef.current) {
        progBarRef.current.style.width = `${rawProgress * 100}%`;
      }
    };

    const handleMouseWheel = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Lock onto the view if the timeline container section hits the top of screen
      const isLocked = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (!isLocked) {
        if (rect.top > 0) scrollAccumulator = 0;
        return;
      }

      // Intercept natural scrolling and slide horizontally instead
      if (e.deltaY > 0 && scrollAccumulator < TOTAL_SCROLL_TICKS) {
        e.preventDefault();
        scrollAccumulator = clamp(scrollAccumulator + e.deltaY, 0, TOTAL_SCROLL_TICKS);
        renderAnimationFrames(scrollAccumulator / TOTAL_SCROLL_TICKS);
      } else if (e.deltaY < 0 && scrollAccumulator > 0) {
        e.preventDefault();
        scrollAccumulator = clamp(scrollAccumulator + e.deltaY, 0, TOTAL_SCROLL_TICKS);
        renderAnimationFrames(scrollAccumulator / TOTAL_SCROLL_TICKS);
      }
    };

    // Responsive Mobile Touch Support
    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isLocked = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!isLocked) return;

      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;

      if ((deltaY > 0 && scrollAccumulator < TOTAL_SCROLL_TICKS) || (deltaY < 0 && scrollAccumulator > 0)) {
        e.preventDefault();
        scrollAccumulator = clamp(scrollAccumulator + deltaY * 1.5, 0, TOTAL_SCROLL_TICKS);
        renderAnimationFrames(scrollAccumulator / TOTAL_SCROLL_TICKS);
      }
    };

    window.addEventListener('wheel', handleMouseWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    renderAnimationFrames(0);

    return () => {
      window.removeEventListener('wheel', handleMouseWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="bg-[#fdfaf8] text-stone-800 font-sans overflow-x-hidden antialiased">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[92vh] overflow-hidden">
        <img
          src={aboutUsBG}
          alt="RT Pastry Bread"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#f7f3ef] via-[#f7f3ef]/95 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto w-full px-6">
            <div className="max-w-[720px]">
              <p className="text-[11px] uppercase tracking-[0.45em] text-[#e6007e] mb-5 font-bold">
                Est. 2003 · Kuala Lumpur
              </p>
              <div className="flex items-center gap-3 mb-8 opacity-70">
                <span className="w-28 h-[1px] bg-stone-300" />
                <span className="text-[#e6007e] text-[10px]">♥</span>
                <span className="w-28 h-[1px] bg-stone-300" />
              </div>
              <h1 className="font-serif leading-[0.9] tracking-[-0.045em]">
                <span className="block text-[#e6007e] text-[4rem] sm:text-[5rem] lg:text-[5.8rem] font-light">
                  Our History
                </span>
                <span className="block italic text-stone-900 text-[3.4rem] sm:text-[4.4rem] lg:text-[5.2rem] font-normal leading-[0.95] tracking-[-0.04em]">
                  Baked With <br />
                  Heart Since 2003
                </span>
              </h1>
              <p className="mt-8 text-stone-500 font-light text-lg sm:text-[22px] leading-[1.9] max-w-[620px]">
                From a small dream and a love for authentic baking,
                RT PASTRY has grown into a beloved Malaysian bakery
                chain — bringing warmth, comfort and happiness to
                every home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMBINED SCROLL TRACK CONTROLLER */}
      {/* This combined wrapper locks down the screen and feeds directly into the layout sections */}
      <div ref={containerRef} className="relative w-full bg-[#fdfaf8]">
        
        {/* STICKY HORIZONTAL MILESTONE TRACK */}
        <section className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-6 z-20">
          <div className="w-full max-w-6xl min-h-[480px] flex flex-col justify-between items-center relative">
            
            <div className="text-center w-full block">
              <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#e6007e] font-bold mb-1">
                Our Presence
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-800">
                Our <span className="italic font-normal text-[#e6007e]">Milestones</span>
              </h2>
              <div className="w-28 h-[2px] bg-stone-100 mx-auto mt-3 rounded-full overflow-hidden">
                <div ref={progBarRef} className="h-full w-0 bg-[#e6007e]" />
              </div>
            </div>

            <div ref={viewportRef} className="w-full relative overflow-hidden py-4 flex items-center mt-auto mb-auto">
              <div ref={trackRef} className="flex items-center relative px-[5vw] will-change-transform">
                
                <div className="absolute left-[5vw] right-0 top-1/2 h-[2px] bg-stone-200/60 -translate-y-1/2 pointer-events-none">
                  <div ref={spineFillRef} className="h-full w-0 bg-[#e6007e]/40" />
                </div>

                {milestones.map((item, idx) => {
                  const isOdd = idx % 2 === 0;
                  return (
                    <div key={idx} className="milestone-node-card flex-shrink-0 w-[280px] flex flex-col items-center relative">
                      
                      <div className="h-[150px] w-full flex flex-col justify-end items-center px-3 pb-3">
                        {isOdd ? (
                          <div className="milestone-card-bubble bg-white border border-stone-100 rounded-[2rem] p-5 w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all duration-500 ease-out">
                            <span className="text-[8px] tracking-widest font-bold text-[#e6007e] uppercase block mb-1">
                              {item.tag}
                            </span>
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
                          <div className="milestone-year-label font-serif text-5xl font-light tracking-tight text-center transition-all duration-500">
                            {item.year}
                          </div>
                        )}
                      </div>

                      <div className="h-0 flex flex-col items-center justify-center relative flex-shrink-0">
                        <div className="milestone-dot-center w-3 h-3 rounded-full border-2 border-[#e6007e]/40 bg-[#fdfaf8] z-30 transition-all duration-300" />
                      </div>

                      <div className="h-[150px] w-full flex flex-col justify-start items-center px-3 pt-3">
                        {!isOdd ? (
                          <div className="milestone-card-bubble bg-white border border-stone-100 rounded-[2rem] p-5 w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all duration-500 ease-out">
                            <span className="text-[8px] tracking-widest font-bold text-[#e6007e] uppercase block mb-1">
                              {item.tag}
                            </span>
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
                          <div className="milestone-year-label font-serif text-5xl font-light tracking-tight text-center transition-all duration-500">
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

        {/* NESTED JOURNEY SECTION */}
        {/* Placed immediately inside the wrapper so it rolls up directly beneath the locked milestones view */}
        <section className="relative bg-white py-28 px-6 overflow-hidden z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20">
              <p className="text-[#e6007e] italic font-serif text-4xl mb-3">Our Journey</p>
              <p className="text-[11px] uppercase tracking-[0.4em] text-stone-500 font-bold">
                A Journey of Passion, Care & Growth
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* CARD 1 */}
              <div className="text-center">
                <p className="text-[#e6007e] font-bold text-xl mb-2">2003</p>
                <h3 className="font-serif text-3xl leading-tight text-stone-800 mb-4">A New <br />Beginning</h3>
                <p className="text-stone-500 leading-relaxed text-[15px] mb-7">
                  Taiwanese pastry master Mr. Lu Chun Neng arrived in Malaysia with his Malaysian wife, ready for a new beginning.
                </p>
                <img src={founderImg} alt="Founder" className="w-full h-[220px] object-cover rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)]" />
              </div>

              {/* CARD 2 */}
              <div className="text-center">
                <p className="text-[#e6007e] font-bold text-xl mb-2">2003</p>
                <h3 className="font-serif text-3xl leading-tight text-stone-800 mb-4">The First <br />RT Pastry</h3>
                <p className="text-stone-500 leading-relaxed text-[15px] mb-7">
                  Our first store opened with a simple mission — to offer quality baked goods made with genuine ingredients and honest craftsmanship.
                </p>
                <img src={firstRTImg} alt="First RT Pastry" className="w-full h-[220px] object-cover rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)]" />
              </div>

              {/* CARD 3 */}
              <div className="text-center">
                <p className="text-[#e6007e] font-bold text-xl mb-2">2010+</p>
                <h3 className="font-serif text-3xl leading-tight text-stone-800 mb-4">Growing <br />Together</h3>
                <p className="text-stone-500 leading-relaxed text-[15px] mb-7">
                  With the support of our customers, we expanded across Malaysia, bringing our signature breads and pastries to more families.
                </p>
                <img src={restaurantImg} alt="Growing Together" className="w-full h-[220px] object-cover rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)]" />
              </div>

              {/* CARD 4 */}
              <div className="text-center">
                <p className="text-[#e6007e] font-bold text-xl mb-2">Today</p>
                <h3 className="font-serif text-3xl leading-tight text-stone-800 mb-4">A Beloved <br />Choice</h3>
                <p className="text-stone-500 leading-relaxed text-[15px] mb-7">
                  Today, RT PASTRY remains committed to our promise — baking with heart and creating moments of happiness in every bite.
                </p>
                <img src={choiceImg} alt="Beloved Choice" className="w-full h-[220px] object-cover rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)]" />
              </div>
            </div>

            {/* CALLING SECTION */}
            <div className="bg-white px-6 pb-28 mt-32">
              <div className="max-w-7xl mx-auto overflow-hidden rounded-[2.5rem] relative">
                <img src={callingImg} alt="Protecting the taste of home" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#f8f1e8]/35"/>
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 sm:py-28">
                  <div className="text-[#e6007e] text-6xl font-serif leading-none mb-4">“</div>
                  <h2 className="font-serif text-[2.5rem] sm:text-[4rem] leading-[1.1] tracking-[-0.03em] text-[#4a2b1f] max-w-4xl">
                    Protecting the taste of “home” <br /> is our calling.
                  </h2>
                  <div className="flex items-center gap-3 mt-8 mb-8">
                    <span className="w-20 h-[1px] bg-pink-300" />
                    <span className="text-[#e6007e] text-xs">♥</span>
                    <span className="w-20 h-[1px] bg-pink-300" />
                  </div>
                  <p className="max-w-3xl text-stone-600 text-lg sm:text-[22px] leading-[1.9] font-light">
                    We blend time, skill and warmth into every dough, every pastry, every cake. Because for us, baking is more than a craft — it’s a promise of trust, comfort and love.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

    </div>
  );
}

export default AboutUs;