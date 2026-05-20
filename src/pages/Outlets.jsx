import React, { useState } from 'react';

export default function Outlets() {
  const [activeRegion, setActiveRegion] = useState('ALL');

  const outletData = [
    { 
      name: "UPTOWN", 
      phone: "+603 7498 0155", 
      hours: "8:00am – 10:00pm Daily", 
      region: "PETALING JAYA",
      address: "No. 52, Jalan SS 21/58, Damansara Utama, 47400 Petaling Jaya, Selangor",
      waPhone: "60374980155"
    },
    { 
      name: "KOTA KEMUNING", 
      phone: "+603 5891 2204", 
      hours: "8:00am – 9:30pm Daily", 
      region: "SHAH ALAM",
      address: "No. 31, Jalan Anggerik Vanilla N31/N, Kota Kemuning, 40460 Shah Alam, Selangor",
      waPhone: "60358912204"
    },
    { 
      name: "RAWANG", 
      phone: "+603 3855 6240", 
      hours: "8:00am – 10:00pm Daily", 
      region: "SELANGOR",
      address: "No. 15, Jalan Bandar Rawang 10, Pusat Bandar Rawang, 48000 Rawang, Selangor",
      waPhone: "60338556240"
    },
    { 
      name: "TAMAN ENG ANN", 
      phone: "+603 3885 7242", 
      hours: "8:00am – 9:30pm Daily", 
      region: "KLANG",
      address: "No. 22, Jalan Kasuarina 1, Taman Eng Ann, 41150 Klang, Selangor",
      waPhone: "60338857242"
    },
    { 
      name: "PETALING JAYA SS2", 
      phone: "+603 5892 9432", 
      hours: "8:00am – 10:00pm Daily", 
      region: "PETALING JAYA",
      address: "No. 61, Jalan SS 2/75, SS 2, 47300 Petaling Jaya, Selangor",
      waPhone: "60358929432"
    },
    { 
      name: "SRI PETALING", 
      phone: "+603 9547 4910", 
      hours: "8:00am – 10:00pm Daily", 
      region: "KUALA LUMPUR",
      address: "No. 45, Jalan Radin Bagus, Sri Petaling, 57000 Kuala Lumpur",
      waPhone: "60395474910"
    },
    { 
      name: "SUBANG JAYA", 
      phone: "+603 7497 9248", 
      hours: "8:00am – 10:00pm Daily", 
      region: "SUBANG JAYA",
      address: "No. 28, Jalan SS 15/4D, SS 15, 47500 Subang Jaya, Selangor",
      waPhone: "60374979248"
    },
    { 
      name: "TAMAN DESA", 
      phone: "+603 2303 9039", 
      hours: "8:00am – 10:00pm Daily", 
      region: "KUALA LUMPUR",
      address: "No. 12, Jalan 1/109E, Taman Desa, Off Jalan Klang Lama, 58100 Kuala Lumpur",
      waPhone: "60323039039"
    },
    { 
      name: "TAMAN SEGAR", 
      phone: "+603 9133 7794", 
      hours: "8:00am – 10:00pm Daily", 
      region: "CHERAS",
      address: "No. 33, Jalan Manis 4, Taman Segar, Cheras, 56100 Kuala Lumpur",
      waPhone: "60391337794"
    },
    { 
      name: "PUCHONG", 
      phone: "+603 3855 6113", 
      hours: "8:00am – 10:00pm Daily", 
      region: "PUCHONG",
      address: "No. 21, Jalan IOI Boulevard 1, IOI Boulevard, Pusat Bandar Puchong, 47170 Puchong, Selangor",
      waPhone: "60338556113"
    },
    { 
      name: "SETAPAK CENTRAL", 
      phone: "+603 2303 5677", 
      hours: "10:00am – 10:00pm Daily", 
      region: "KUALA LUMPUR",
      address: "Lot G-22, Setapak Central, No. 67, Jalan Taman Ibu Kota, 53300 Kuala Lumpur",
      waPhone: "60323035677"
    },
    { 
      name: "SETIA INDAH", 
      phone: "+603 5891 2266", 
      hours: "8:00am – 10:00pm Daily", 
      region: "KLANG",
      address: "No. 8, Jalan Setia Indah X U13/X, Setia Alam, 40170 Shah Alam, Selangor",
      waPhone: "60358912266"
    },
    { 
      name: "SETIA PRIMA", 
      phone: "+603 5891 4600", 
      hours: "8:00am – 10:00pm Daily", 
      region: "KLANG",
      address: "No. 46, Jalan Setia Prima B U13/B, Setia Alam, 40170 Shah Alam, Selangor",
      waPhone: "60358914600"
    },
    { 
      name: "BUKIT TINGGI", 
      phone: "+603 3850 7027", 
      hours: "8:00am – 9:30pm Daily", 
      region: "KLANG",
      address: "No. 12, Lorong Batu Nilam 21A, Bandar Bukit Tinggi 2, 41200 Klang, Selangor",
      waPhone: "60338507027"
    },
    { 
      name: "CHERAS C180", 
      phone: "+603 9547 9433", 
      hours: "8:00am – 10:00pm Daily", 
      region: "CHERAS",
      address: "No. 10, Jalan C180/1, Dataran C180, 43200 Cheras, Selangor",
      waPhone: "60395479433"
    },
    { 
      name: "KEPONG", 
      phone: "+603 6241 5478", 
      hours: "8:00am – 10:00pm Daily", 
      region: "KUALA LUMPUR",
      address: "No. 73, Jalan Metro Perdana Barat 2, Taman Usahawan Kepong, 52100 Kuala Lumpur",
      waPhone: "60362415478"
    },
    { 
      name: "CHERAS BUKIT ANGGERIK", 
      phone: "+60 11-2189 9003", 
      hours: "8:00am – 10:00pm Daily", 
      region: "CHERAS",
      address: "No. 89, Jalan 34/154, Taman Dahlia, Cheras, 56000 Kuala Lumpur",
      waPhone: "60123456789"
    }
  ];

  const regions = ['ALL', 'KUALA LUMPUR', 'PETALING JAYA', 'CHERAS', 'KLANG', 'PUCHONG', 'SUBANG JAYA'];

  const filteredOutlets = activeRegion === 'ALL' 
    ? outletData 
    : outletData.filter(o => o.region === activeRegion);

  return (
    <div className="w-full bg-[#fdfaf8] antialiased text-stone-800 pt-6 pb-20 md:pt-10 md:pb-32">
      <div className="container mx-auto max-w-6xl px-6">
        
        {/* HEADER BLOCK */}
        <div className="text-center mb-16">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#e6007e] font-bold mb-3"> Our Presence </p>
          <h1 className="font-serif font-light text-4xl md:text-6xl tracking-tight text-stone-800">
            Find an <span className="italic font-normal text-[#e6007e]">RT Pastry</span> Outlet
          </h1>
        </div>

        {/* REGION FILTER TABS */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-4xl mx-auto border-b border-stone-100 pb-6">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                activeRegion === region
                  ? 'bg-[#e6007e] text-white shadow-md shadow-[#e6007e]/20 -translate-y-0.5'
                  : 'bg-white text-stone-400 hover:text-stone-700 border border-stone-100'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* OUTLET GRID ASSEMBLY */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOutlets.map((outlet, index) => {
          
            // ── STANDARD CARDS INTERACTIVE SETUP (With Address Slide-Up Reveal Engine) ──
            return (
              <div 
                key={index} 
                className="bg-white p-10 rounded-[40px] shadow-[0_15px_40px_rgba(0,0,0,0.015)] border border-stone-100/70 flex flex-col justify-between relative overflow-hidden group min-h-[260px] hover:shadow-[0_20px_50px_rgba(230,0,126,0.05)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#faf4f2]/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Top Section Layout Content Block */}
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold text-[#e6007e] tracking-widest uppercase bg-[#fdf2f7] px-3 py-1 rounded-full">
                      {outlet.region}
                    </span>
                    <h3 className="font-sans font-extrabold text-xl text-stone-800 tracking-tight mt-4 uppercase leading-tight">
                      {outlet.name}
                    </h3>
                  </div>

                  {/* Embedded External WhatsApp Anchor Action */}
                  <a 
                    href={`https://wa.me/${outlet.waPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Chat on WhatsApp"
                    className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center text-[#e6007e] bg-white shadow-sm hover:scale-110 group-hover:bg-[#e6007e] group-hover:text-white group-hover:border-[#e6007e] transition-all duration-300 shrink-0 z-20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 " >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </a>
                </div>

                {/* 🌟 REVEAL LAYER: This layout frame shifts based on hover states! */}
                <div className="relative h-14 overflow-hidden mt-6">
                  
                  {/* Default View Content: Phone and Hours (Fades & shifts down on hover) */}
                  <div className="absolute inset-0 transform transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4 border-t border-stone-50 pt-3">
                    <p className="font-mono text-xs font-semibold text-stone-700 tracking-wide"> {outlet.phone} </p>
                    <p className="font-sans text-[11px] text-stone-400 font-medium mt-0.5 tracking-wide"> {outlet.hours} </p>
                  </div>

                  {/* Hover View Content: Premium Address & Action Trigger (Slides up & fades in!) */}
                  <div className="absolute inset-0 transform opacity-0 -translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex flex-col justify-end">
                    <p className="font-sans text-[11px] text-stone-500 font-normal leading-relaxed tracking-wide mb-1">
                      {outlet.address}
                    </p>
                    <a 
                      href={`https://wa.me/${outlet.waPhone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-bold uppercase tracking-wider text-[#e6007e] hover:text-[#c4006b] flex items-center gap-1"
                    >
                      Chat on WhatsApp →
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}