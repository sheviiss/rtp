import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AboutUs() {
  const componentRef = useRef(null);
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.milestone-panel');
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sliderRef.current,
          pin: true, 
          scrub: 1,  
          snap: 1 / (panels.length - 1), 
          end: () => `+=${sliderRef.current.offsetWidth}`,
        }
      });
    }, componentRef);

    return () => ctx.revert(); 
  }, []);

  const milestones = [
    { year: "2003", text: "The Japanese inspired bakery first outlet opened in Taman Desa" },
    { year: "2004", text: "Launched Signature Square Green Tea Cake in Malaysia" },
    { year: "2011", text: "Launched Signature Hokkaido Cake in Malaysia" },
    { year: "2012", text: "Cake factory new premises in Bukit Serdang" },
    { year: "2020", text: "Launched first Signature Carrot Dough Bread in Malaysia" },
    { year: "2021", text: "Cake factory granted MeSTI certification" },
    { year: "2022", text: "Bread factory new premises in Glenmarie & launched the 1st IP: Doudoh" },
    { year: "2023", text: "Bread Factory granted: 1. GMP certification 2. HACCP certification 3. HALAL certification" },
    { year: "2024", text: "Bread Factory granted MeSTI certification" },
    { year: "2025", text: "Launched the Wabi-sabi ID concept outlet: SS2, Petaling Jaya" },
  ];

  return (
    <div ref={componentRef} className="bg-[#fffaf8] w-full overflow-x-hidden">
      
      {/* --- SECTION 1: INTRO LANDING --- */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 text-center max-w-4xl mx-auto">
        <p className="text-[#e6007e] uppercase tracking-[0.35em] text-xs font-bold mb-3">
          Our Heritage
        </p>
        <div className="flex items-center justify-center gap-4 mb-6 w-full">
          <div className="w-14 h-[0.5px] bg-pink-200/70"></div>
          <span className="text-[#e6007e] text-sm">♥</span>
          <div className="w-14 h-[0.5px] bg-pink-200/70"></div>
        </div>
        <h1 className="text-5xl sm:text-6xl font-serif font-light text-stone-900 mb-6 tracking-tight">
          Our History
        </h1>
        <p className="text-[#e6007e] font-serif italic text-xl mb-6">
          Taste of Happiness
        </p>
        <p className="text-stone-500 text-lg font-light leading-relaxed max-w-2xl mb-12">
          Established in 2003 by Taiwanese pastry master Mr. Lu Chun Neng, RT PASTRY is Malaysia’s Japanese-inspired bakery chain — a brand born from the meeting of craft, culture, and care. 
        </p>
        <div className="text-stone-400 text-xs tracking-widest animate-bounce uppercase font-bold">
          Scroll Down to Explore Our Journey ↓
        </div>
      </section>

      {/* --- SECTION 2: GSAP ALTERNATING TIMELINE --- */}
      <section ref={sliderRef} className="h-screen w-full flex overflow-hidden bg-[#fffaf8] relative border-t border-stone-100">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#e6007e_0.5px,transparent_0.5px)] [background-size:24px_24px]" />
        
        <div className="flex h-full whitespace-nowrap will-change-transform">
          
          {/* Main timeline baseline running directly through the center */}
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100 top-1/2 transform -translate-y-1/2 z-0" />

          {milestones.map((item, idx) => {
            const isUp = idx % 2 === 0;

            return (
              <div 
                key={idx} 
                className="milestone-panel w-screen h-full flex-shrink-0 flex items-center justify-center px-6 md:px-24 relative select-none"
              >
                <div className={`relative z-10 flex flex-col max-w-xl w-full items-center text-center ${
                  isUp ? 'justify-end pb-32 h-1/2 top-0 absolute' : 'justify-start pt-32 h-1/2 bottom-0 absolute'
                }`}>
                  
                  {/* Alternating Connecting Line Vertical Anchor */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-[1px] bg-pink-200 ${
                    isUp ? 'bottom-0 h-32' : 'top-0 h-32'
                  }`} />

                  {/* Node Dot where card timeline meets center rail */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#e6007e] rounded-full border-4 border-[#fffaf8] shadow-sm ${
                    isUp ? 'bottom-[-8px]' : 'top-[-8px]'
                  }`} />

                  {/* Premium Layered Card Structure */}
                  <div className="bg-white border border-stone-100/80 p-6 md:p-8 rounded-3xl shadow-xl max-w-md relative hover:shadow-2xl hover:border-pink-100 transition-all duration-300 transform hover:-translate-y-1">
                    
                    {/* Giant Elegant Year Header tucked inside card */}
                    <div className="text-4xl md:text-5xl font-serif font-bold text-stone-200 tracking-tight mb-2">
                      {item.year}
                    </div>

                    <span className="text-[#e6007e] text-[10px] uppercase tracking-widest font-bold block mb-3">
                      Chapter 0{idx + 1}
                    </span>
                    
                    <p className="text-stone-600 font-light text-sm md:text-base leading-relaxed whitespace-normal">
                      {item.text}
                    </p>
                  </div>

                </div>

                {/* Progress Flag Indicator */}
                <div className="absolute bottom-12 right-12 text-stone-300 text-xs font-mono tracking-widest">
                  {idx + 1} / {milestones.length}
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* --- SECTION 3: OUTRO WRAP --- */}
      <section className="min-h-[50vh] w-full flex flex-col items-center justify-center bg-[#fffaf8] px-6 py-20 text-center border-t border-stone-100">
        <h2 className="text-3xl font-serif font-light text-stone-900 mb-4">
          And The Story Continues...
        </h2>
        <p className="text-stone-500 font-light max-w-md leading-relaxed text-sm">
          We process premium ingredients day after day with undivided love, setting the signature benchmark for Malaysian baking excellence.
        </p>
      </section>

    </div>
  );
}

export default AboutUs;