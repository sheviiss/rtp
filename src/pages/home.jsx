import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';

function Home() {
  // --- STATE FOR NATURAL PARALLAX TRACKING ---
  const [scrollY, setScrollY] = useState(0);
  const parallaxSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxSectionRef.current) return;
      const rect = parallaxSectionRef.current.getBoundingClientRect();
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setScrollY(window.scrollY - parallaxSectionRef.current.offsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-[#fdfaf8] antialiased text-stone-800">
      
      {/* ========================================================
          1. EDITORIAL HERO SECTION
          ======================================================== */}
      <section className="container mx-auto max-w-4xl px-6 py-20 md:py-32 grid md:grid-cols-2 items-center gap-10 md:gap-16">
        
        {/* LEFT COLUMN: TYPOGRAPHY & BUTTONS */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full max-w-md md:justify-self-end">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#e6007e]">
            <span>NUTRITIOUS</span>
            <span className="opacity-30">•</span>
            <span>DELICIOUS</span>
            <span className="opacity-30">•</span>
            <span>EST 2001</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extralight tracking-tight text-stone-800 leading-[1.1] mt-8">
            Baking <span className="italic font-serif font-normal text-stone-700">the taste</span> <br />
            of <span className="font-extrabold text-[#e6007e]">happiness</span>
          </h1>

          <p className="text-sm md:text-base text-stone-400 font-light mt-8 leading-relaxed tracking-wide">
            Premium ingredients, authentic recipes, and sincere dedication to the craft. 23 years of culinary excellence across 17 Klang Valley locations.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <a href="#order" className="px-12 py-4 bg-[#e6007e] text-white font-semibold rounded-full text-xs uppercase tracking-[0.2em] text-center shadow-lg hover:bg-[#c4006b] hover:-translate-y-0.5 transition-all duration-300">
              Order Here
            </a>
            <a href="#locations" className="px-12 py-4 border border-stone-200 text-stone-500 font-semibold rounded-full text-xs uppercase tracking-[0.2em] text-center hover:bg-white hover:border-stone-400 transition-all duration-300">
              Find Outlet
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: THE LOGO CARD */}
        <div className="relative w-full max-w-sm md:justify-self-start">
          <div className="overflow-hidden rounded-[50px] shadow-2xl bg-white p-12 aspect-square flex items-center justify-center border border-stone-100/50">
            <img src={logo} alt="RT Pastry Premium Concept" className="w-4/5 h-auto object-contain max-h-[300px]" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-[#e6007e] rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-8 border-[#fdfaf8]">
            <span className="text-4xl font-black tracking-tighter">23</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] mt-0.5">YEARS</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. THE BRAND STORY SECTION (Updated Typography Style)
          ======================================================== */}
      <section className="w-full bg-white py-24 md:py-36 border-t border-stone-100/80 overflow-hidden">
        <div className="container mx-auto max-w-5xl px-6 grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* ── LEFT SIDE: PURE CSS GOLDEN ACCENT EMBLEM FRAME (5 cols) ── */}
          <div className="md:col-span-5 relative flex flex-col items-center justify-center h-[400px] bg-gradient-to-br from-[#1c0b12] to-[#3a1324] rounded-[40px] shadow-2xl overflow-hidden border border-stone-900 group">
            <div className="absolute w-72 h-72 rounded-full bg-[#e6007e]/10 blur-[60px] pointer-events-none" />

            {/* Glowing Spinning Outer Border Rings */}
            <div className="absolute w-56 h-56 rounded-full border border-dashed border-[#e6007e]/30 animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-48 h-48 rounded-full border border-double border-orange-200/20 animate-[spin_20s_linear_infinite_reverse]" />

            {/* Core Floating Brand Seal */}
            <div className="w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center shadow-[0_0_50px_rgba(230,0,126,0.2)] z-10 p-5 transform transition-transform duration-700 group-hover:scale-105">
              <img src={logo} alt="RT Core Seal" className="w-full h-auto object-contain" />
            </div>

            <p className="absolute bottom-10 font-sans text-[9px] tracking-[0.4em] uppercase text-orange-200/50 font-medium">
              Rumah Tangga • Family First
            </p>
          </div>

          {/* ── RIGHT SIDE: HIGH-END EDITORIAL STORY LAYOUT (7 cols) ── */}
          <div className="md:col-span-7 relative flex flex-col justify-center text-center md:text-left">
            
            {/* Giant Elegant Watermark Background Text */}
            <div className="absolute -top-16 -left-8 font-serif italic text-[160px] font-black text-stone-100/70 pointer-events-none select-none z-0">
              RT
            </div>

            <div className="relative z-10">
              {/* 🌟 FIXED STYLE: Matches your exact banner text hierarchy */}
              <h3 className="text-3xl md:text-4xl font-extralight tracking-tight text-stone-800 leading-tight">
                Taste of <span className="italic font-serif font-normal text-[#e6007e]">happiness</span>
              </h3>

              <h2 className="font-sans font-extrabold text-4xl md:text-5xl text-[#1e3a5f] tracking-tight mt-2 uppercase">
                About RT Pastry
              </h2>

              <div className="w-12 h-[3px] bg-[#e6007e] my-6 mx-auto md:mx-0 rounded-full" />

              {/* Sophisticated typography line tracking */}
              <div className="space-y-6 text-sm md:text-base text-stone-500 font-light leading-relaxed tracking-wide">
                <p>
                  The brand name <strong className="font-semibold text-stone-800">"RT"</strong> is inspired by the Malay phrase <em className="italic font-serif text-stone-700">Rumah Tangga</em>, meaning “family”. To us, it’s more than a name — it’s a philosophy. At RT PASTRY, we see every customer as family. And for family, only the best will do: premium ingredients, authentic recipes, and sincere dedication to the craft.
                </p>
                
                <p>
                  We focus on what truly matters — creating food that is fresh, wholesome, and filled with comfort. Each loaf of bread, each slice of cake, is prepared with the same care and integrity we would offer our own loved ones.
                </p>

                <p>
                  With 17 outlets across Malaysia, RT PASTRY has become a staple in many homes, known for our commitment to craftsmanship, innovation, and everyday happiness. From daily breads to festive treats, we aim to deliver more than flavour — we deliver moments of joy, made to be shared.
                </p>
              </div>

              {/* Bottom tag block */}
              <div className="mt-8 pt-6 border-t border-stone-100 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e6007e]">
                Baking the taste of happiness, with heart.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          3. THE HIGH-END PARALLAX STORY GRID
          ======================================================== */}
      <section 
        ref={parallaxSectionRef}
        className="w-full bg-[#faf4f2] py-32 md:py-48 relative border-t border-b border-stone-100 overflow-hidden"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="text-center md:text-left mb-20">
            <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#e6007e] font-bold mb-3">
              By The Numbers
            </p>
            <h3 className="font-serif font-light text-4xl md:text-5xl tracking-tight text-stone-800">
              Crafting a legacy of culinary devotion.
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-start">
            
            {/* CARD 1: 500+ PRODUCTS */}
            <div 
              className="bg-white p-10 rounded-[40px] shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-stone-100/60 transition-transform duration-100 ease-out"
              style={{ transform: `translateY(${scrollY * 0.05}px)` }}
            >
              <span className="font-serif italic text-6xl lg:text-7xl font-light text-[#e6007e]">500+</span>
              <h4 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-stone-700 mt-6">Signature Choices</h4>
              <p className="text-sm text-stone-400 font-light mt-3 leading-relaxed">
                From artisan breads to delicate fresh cream rolls, every item is curated using premium, authentic ingredients.
              </p>
            </div>

            {/* CARD 2: THE REVEAL CENTERPIECE EMBLEM */}
            <div 
              className="flex flex-col items-center justify-center text-center p-6 transition-transform duration-100 ease-out md:mt-12"
              style={{ transform: `translateY(${scrollY * -0.08}px)` }}
            >
              <div className="w-40 h-40 rounded-full bg-white shadow-[0_20px_50px_rgba(230,0,126,0.06)] border border-stone-100 flex flex-col items-center justify-center p-6 mb-6">
                <div className="w-12 h-12 bg-[#e6007e] rounded-full flex items-center justify-center text-white font-extrabold text-xs tracking-widest shadow-md">
                  RT
                </div>
                <h5 className="text-[10px] font-bold text-stone-700 tracking-widest mt-3 uppercase">RT Pastry</h5>
                <p className="text-[9px] font-serif italic text-stone-400">Est. 2003</p>
              </div>
              <span className="font-serif italic text-5xl font-light text-stone-800">17 <span className="text-xs font-sans not-italic font-bold tracking-widest text-stone-400 uppercase block mt-2">Bustling Outlets</span></span>
              <p className="text-xs text-stone-400 font-light mt-2 max-w-[200px] leading-relaxed">
                Bringing baked warmth and sweet smiles right across the Klang Valley map.
              </p>
            </div>

            {/* CARD 3: 360 DAYS FRESH */}
            <div 
              className="bg-white p-10 rounded-[40px] shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-stone-100/60 transition-transform duration-100 ease-out md:mt-24"
              style={{ transform: `translateY(${scrollY * 0.12}px)` }}
            >
              <span className="font-serif italic text-6xl lg:text-7xl font-light text-stone-800">360<span className="text-xs font-sans not-italic font-bold text-stone-400 tracking-wide ml-1">DAYS</span></span>
              <h4 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#e6007e] mt-6">Baked Fresh Daily</h4>
              <p className="text-sm text-stone-400 font-light mt-3 leading-relaxed">
                Sincere dedication to artisan craft means our ovens turn on before sunrise, delivering quality freshness every morning.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          4. SIGNATURE SPECIALTIES TRANSITION SECTION
          ======================================================== */}
      <section className="bg-white py-32 px-6 relative z-10">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-serif font-light text-stone-800 tracking-tight">
            Explore Our <span className="font-bold">Signature Specialties</span>
          </h2>
          <p className="text-stone-400 font-light mt-4 text-sm max-w-md mx-auto leading-relaxed tracking-wide">
            From our legendary fresh cream Swiss rolls to traditional handmade breads, everything is baked fresh daily.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;