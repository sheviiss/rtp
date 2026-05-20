import React, { useState } from 'react';

export default function Order() {
  const [selectedSize, setSelectedSize] = useState('6 inch tier (Est Total: RM300)');
  
  // 🌟 CART ENGINE STATES
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = {
    cakes: [
      { id: "c1", name: "American Cheesecake 6\"", price: 78.00, tag: "Signature" },
      { id: "c2", name: "Baby Bear — Black Forest 6\"", price: 78.00, tag: "Cute Classic" },
      { id: "c3", name: "Baby Bear — Mixed Fruit 8\"", price: 138.00, tag: "Best Seller" }
    ],
    cookies: [
      { id: "k1", name: "Almond Cookies Square Box", price: 32.90 },
      { id: "k2", name: "Almond Cookies 16 pcs Pack", price: 18.90 }
    ],
    breads: [
      { id: "b1", name: "Artisan Sourdough Loaf", price: 12.00 },
      { id: "b2", name: "Premium Butter Croissant", price: 7.50 }
    ],
    swissRolls: [
      { id: "s1", name: "Hokkaido Fresh Cream Swiss Roll", price: 24.00 },
      { id: "s2", name: "Matcha Red Bean Swiss Roll", price: 26.00 }
    ]
  };

  // 🛠️ FUNCTION: Add standard catalog item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
    setIsCartOpen(true); // Auto slide-open cart drawer to show action success!
  };

  // 🛠️ FUNCTION: Add dynamic custom cake to cart based on state selections
  const addCustomCakeToCart = () => {
    const isEightInch = selectedSize.includes('8 inch');
    const customItem = {
      id: isEightInch ? "custom-8" : "custom-6",
      name: `Bespoke Custom Cake (${isEightInch ? '8"' : '6"'})`,
      price: isEightInch ? 350.00 : 300.00,
      isCustom: true,
      deposit: 50.00
    };

    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === customItem.id);
      if (existing) {
        return prevCart.map(item => item.id === customItem.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prevCart, { ...customItem, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  // 🛠️ FUNCTION: Control Quantities inside Drawer Panel
  const updateQty = (id, amount) => {
    setCart((prevCart) => prevCart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + amount;
        return newQty <= 0 ? null : { ...item, qty: newQty };
      }
      return item;
    }).filter(Boolean));
  };

  // 🛠️ COMPUTED TOTALS
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    <div className="w-full bg-[#faf7f4] antialiased text-stone-800 pt-10 pb-32 relative min-h-screen">
      
      {/* 🌟 DYNAMIC CHAT WIDGET HIDER ENGINE */}
      {isCartOpen && (
        <style>{`
          /* Automatically turns the chat widget invisible ONLY when the cart slides into view */
          #hubspot-messages-iframe-container,
          .bg-pink-600,
          [id*="chat"], [class*="chat"], [id*="whatsapp"], [class*="whatsapp"] { 
            visibility: hidden !important; 
            opacity: 0 !important;
            pointer-events: none !important;
          }
        `}</style>
      )}

      {/* FLOATING CART TRIGGER BUTTON — Perfect side-by-side placement row alignment */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-[120px] z-40 bg-[#e6007e] hover:bg-[#c4006b] text-white p-5 rounded-full shadow-xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
        style={{ boxShadow: '0 10px 25px rgba(230, 0, 126, 0.25)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
        <span className="font-sans font-black text-xs bg-white text-[#e6007e] px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-xs">
          {cartCount}
        </span>
      </button>

      <div className="container mx-auto max-w-6xl px-6">
        
        {/* PAGE TITLE */}
        <div className="text-center mb-20">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#e6007e] font-bold mb-3">Freshly Prepared</p>
          <h1 className="font-serif font-light text-5xl md:text-6xl tracking-tight text-stone-900">
            Online <span className="italic font-normal text-[#e6007e]">Catalogue</span>
          </h1>
          <div className="w-12 h-[1px] bg-stone-300 mx-auto mt-6" />
        </div>

        {/* SECTION 1: SIGNATURE CAKES */}
        <div className="mb-20">
          <h2 className="font-serif italic text-2xl text-stone-800 mb-8 border-b border-stone-200 pb-3">Signature Cakes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.cakes.map((item) => (
              <div key={item.id} className="bg-white rounded-[32px] p-6 border border-stone-100 shadow-sm flex flex-col justify-between min-h-[380px] group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-full h-56 bg-stone-100 rounded-[24px] overflow-hidden relative">
                  <div className="absolute top-3 left-3 bg-[#fdf2f7] text-[#e6007e] text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full z-10">{item.tag}</div>
                  <div className="w-full h-full bg-[#ede7df] flex items-center justify-center font-mono text-stone-400 text-xs">[ Product Photo ]</div>
                </div>
                <div className="mt-4">
                  <h3 className="font-sans font-bold text-base text-stone-800 uppercase tracking-tight leading-tight">{item.name}</h3>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-stone-50">
                    <span className="font-serif italic text-lg text-[#b85580]">RM{item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="text-[10px] font-bold uppercase tracking-widest text-[#e6007e] border border-[#e6007e]/20 px-4 py-2 rounded-full hover:bg-[#e6007e] hover:text-white transition-all duration-300"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: COOKIES, BREAD & SWISS ROLLS */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {/* Cookies */}
          <div>
            <h2 className="font-serif italic text-xl text-stone-800 mb-6 border-b border-stone-200 pb-2">Premium Cookies</h2>
            <div className="space-y-4">
              {products.cookies.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-stone-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#ede7df] rounded-xl shrink-0 flex items-center justify-center text-[8px] text-stone-400">[ Photo ]</div>
                    <div>
                      <h4 className="font-sans text-xs font-bold text-stone-800 uppercase tracking-wide leading-tight">{item.name}</h4>
                      <p className="font-serif italic text-sm text-[#b85580] mt-1">RM{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={() => addToCart(item)} className="p-2 border border-stone-100 rounded-full text-stone-400 hover:text-[#e6007e] hover:border-[#e6007e]/30 transition-all">＋</button>
                </div>
              ))}
            </div>
          </div>

          {/* Bakery Bread */}
          <div>
            <h2 className="font-serif italic text-xl text-stone-800 mb-6 border-b border-stone-200 pb-2">Artisan Bread</h2>
            <div className="space-y-4">
              {products.breads.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-stone-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#ede7df] rounded-xl shrink-0 flex items-center justify-center text-[8px] text-stone-400">[ Photo ]</div>
                    <div>
                      <h4 className="font-sans text-xs font-bold text-stone-800 uppercase tracking-wide leading-tight">{item.name}</h4>
                      <p className="font-serif italic text-sm text-[#b85580] mt-1">RM{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={() => addToCart(item)} className="p-2 border border-stone-100 rounded-full text-stone-400 hover:text-[#e6007e] hover:border-[#e6007e]/30 transition-all">＋</button>
                </div>
              ))}
            </div>
          </div>

          {/* Swiss Rolls */}
          <div>
            <h2 className="font-serif italic text-xl text-stone-800 mb-6 border-b border-stone-200 pb-2">Hokkaido Swiss Rolls</h2>
            <div className="space-y-4">
              {products.swissRolls.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-stone-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#ede7df] rounded-xl shrink-0 flex items-center justify-center text-[8px] text-stone-400">[ Photo ]</div>
                    <div>
                      <h4 className="font-sans text-xs font-bold text-stone-800 uppercase tracking-wide leading-tight">{item.name}</h4>
                      <p className="font-serif italic text-sm text-[#b85580] mt-1">RM{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={() => addToCart(item)} className="p-2 border border-stone-100 rounded-full text-stone-400 hover:text-[#e6007e] hover:border-[#e6007e]/30 transition-all">＋</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: PREMIUM CUSTOMIZATION WORKFLOW ENGINE */}
        <div className="bg-white rounded-[48px] border border-stone-200/80 p-8 md:p-14 shadow-xl grid md:grid-cols-12 gap-12 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#e6007e]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="md:col-span-7">
            <span className="text-[9px] font-bold text-[#e6007e] tracking-[0.3em] uppercase bg-[#fdf2f7] px-4 py-1.5 rounded-full">Bespoke Creations</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-stone-900 mt-6 mb-4">
              Customize Your <br /><span className="italic font-normal text-[#e6007e]">Celebration Cake</span>
            </h2>
            <p className="font-sans text-sm text-stone-500 font-light leading-relaxed max-w-lg mb-8">
              Select your core size below to secure your date, pay your deposit down, and then shoot your design layout benchmarks right into our direct line via WhatsApp channel.
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-stone-100 pt-6 text-left">
              <div>
                <span className="font-serif italic text-lg text-[#e6007e] block">01.</span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-stone-700">Select Dimension Tier</span>
              </div>
              <div>
                <span className="font-serif italic text-lg text-[#e6007e] block">02.</span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-stone-700">Pay RM50 Deposit</span>
              </div>
              <div>
                <span className="font-serif italic text-lg text-[#e6007e] block">03.</span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-stone-700">WhatsApp Sketch</span>
              </div>
            </div>
          </div>

          {/* Selection Side Card */}
          <div className="md:col-span-5 bg-[#faf7f4] p-8 rounded-[36px] border border-stone-100 flex flex-col justify-between min-h-[340px]">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-stone-400">Estimated Total Range</p>
              <p className="font-serif italic text-2xl text-stone-800 mt-1 mb-6">RM300.00 – RM350.00</p>
              
              <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-500 block mb-2">Choose Tier Dimensions</label>
              <select 
                value={selectedSize} 
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 outline-none text-sm font-sans text-stone-700 cursor-pointer shadow-sm focus:border-[#e6007e] transition-colors"
              >
                <option>6 inch tier (Est Total: RM300)</option>
                <option>8 inch tier (Est Total: RM350)</option>
              </select>
              <p className="text-[10px] text-stone-400 mt-2 font-light italic">Secure reservation deposit tracked at checkout frame node.</p>
            </div>

            <button 
              onClick={addCustomCakeToCart}
              className="w-full text-center bg-[#e6007e] hover:bg-[#c4006b] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-md shadow-[#e6007e]/10 transition-all duration-300 block mt-8"
            >
              Add Custom Setup to Cart
            </button>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════
          SLIDING CART DRAWER BACKDROP LAYER
          ══════════════════════════════ */}
      {isCartOpen && (
        <div className="fixed inset-0 overflow-hidden font-sans" style={{ zIndex: 999999 }}>
          {/* Transparent click blur background */}
          <div onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity" />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between h-full transform transition-all duration-500">
              
              {/* Header Box */}
              <div className="px-6 py-5 bg-[#faf7f4] border-b border-stone-100 flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">Your Basket Collection</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-stone-700 text-lg">✕</button>
              </div>

              {/* Cart Items Loop Canvas */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 italic text-xs py-20">
                    Your basket is currently empty.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-stone-100 pb-4">
                      <div className="max-w-[70%]">
                        <h4 className="text-xs font-bold uppercase tracking-tight text-stone-800 leading-tight">{item.name}</h4>
                        {item.isCustom ? (
                          <p className="text-[10px] text-[#e6007e] font-semibold mt-1">RM{item.deposit.toFixed(2)} Secure Deposit Required</p>
                        ) : (
                          <p className="text-xs text-stone-400 mt-0.5">RM{item.price.toFixed(2)} each</p>
                        )}
                      </div>
                      
                      {/* Qty Counter Elements */}
                      <div className="flex items-center gap-2.5 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100/80">
                        <button onClick={() => updateQty(item.id, -1)} className="text-stone-400 hover:text-stone-800 font-bold text-xs">－</button>
                        <span className="text-xs font-bold text-stone-700">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="text-stone-400 hover:text-stone-800 font-bold text-xs">＋</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Calculations Anchor */}
              {cart.length > 0 && (
                <div className="px-6 py-6 bg-[#faf7f4] border-t border-stone-100">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wide text-stone-700 mb-2">
                    <span>Subtotal Value:</span>
                    <span className="font-serif text-sm font-normal text-[#b85580] italic">RM{cartSubtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-stone-400 font-light mb-6">Taxes and delivery allowances tracked step next framework nodes.</p>
                  
                  {/* WHATSAPP DYNAMIC CHECKOUT ENGINE */}
                  <a
                    href={`https://wa.me/60338556113?text=Hi%20RT%20Pastry,%20I%20would%20like%20to%20confirm%20my%20checkout%20order:%0A%0A${encodeURIComponent(
                      cart.map(item => `• ${item.name} (x${item.qty}) - RM${(item.price * item.qty).toFixed(2)}`).join('\n')
                    )}%0A%0A*Total%20Order%20Value:*%20RM${cartSubtotal.toFixed(2)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center bg-[#e6007e] hover:bg-[#c4006b] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors block shadow-md shadow-[#e6007e]/10"
                  >
                    Send Order to WhatsApp Checkout →
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}