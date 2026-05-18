import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo  from '../assets/logo.png';
import store from '../assets/rtpastry.png';

/* ── Google Fonts ── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&family=Fraunces:ital,opsz,wght@1,9..144,300;1,9..144,400&display=swap');`;

/* ── palette ── */
const C = {
  cream:    '#faf7f4',
  cream2:   '#f5f0eb',
  cream3:   '#ede7df',
  rose:     '#e8b4c8',      /* muted dusty rose  */
  pink:     '#d4739a',      /* soft mauve-pink   */
  pinkDark: '#b85580',      /* accent only       */
  text:     '#2d1f28',      /* dark plum-brown   */
  muted:    '#9a7d8a',      /* warm greige       */
  faint:    '#c9b5be',      /* ultra-light text  */
  border:   'rgba(180,120,150,0.15)',
  borderMid:'rgba(180,120,150,0.25)',
};

/* ── helpers ── */
const cl=(v,a,b)=>Math.min(b,Math.max(a,v));
const lr=(a,b,t)=>a+(b-a)*t;
const eo3=t=>1-Math.pow(1-t,3);
const eio=t=>t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1;
const ARCLEN=291, SC=[[70,-70],[70,70],[-70,70],[-70,-70]];

/* ════════════════════════════════════════════
   CIRCLE STATS — scroll-wheel locked
════════════════════════════════════════════ */
function CircleStats() {
  const TOTAL=1600, ref=useRef(null);
  const r={
    arcs:[useRef(),useRef(),useRef(),useRef()],
    jd:  [useRef(),useRef(),useRef(),useRef()],
    sl:  [useRef(),useRef(),useRef(),useRef()],
    inner:useRef(),outer:useRef(),center:useRef(),
    wm:useRef(),cue:useRef(),fill:useRef(),pct:useRef(),lbl:useRef(),
  };

  useEffect(()=>{
    let v=0,ty=0;
    const draw=raw=>{
      const p=eio(raw);
      if(r.fill.current)  r.fill.current.style.width=`${raw*100}%`;
      if(r.pct.current)   r.pct.current.textContent=`${Math.round(raw*100)}%`;
      if(r.lbl.current)   r.lbl.current.textContent=raw>=.98?'assembled':'scroll to assemble';
      if(r.cue.current)   r.cue.current.style.opacity=cl(1-p*8,0,1);
      if(r.wm.current)    r.wm.current.style.opacity=cl(p*2,0,.05);
      const cv=cl(p/.65,0,1),st=1-eo3(cv);
      const ep=eo3(cl((p-.75)/.25,0,1));
      r.arcs.forEach((a,i)=>{
        const el=a.current; if(!el)return;
        el.setAttribute('transform',`translate(${SC[i][0]*st},${SC[i][1]*st})`);
        const s=i*.06,dp=cl((p-s*.3)/(.65+s*.1),0,1);
        el.style.strokeDashoffset=ARCLEN*(1-eo3(dp));
        el.style.strokeWidth=lr(12,14,ep);
      });
      r.sl.forEach((a,i)=>{
        const el=a.current; if(!el)return;
        el.style.transform=`translate(${SC[i][0]*st*.55}px,${SC[i][1]*st*.55}px)`;
        el.style.opacity=lr(.08,1,eo3(cv));
      });
      r.jd.forEach((a,i)=>{
        const el=a.current; if(!el)return;
        el.style.opacity=eo3(cl((p-.58-i*.04)/.16,0,1));
      });
      if(r.inner.current) r.inner.current.style.opacity=ep*.7;
      if(r.outer.current) r.outer.current.style.opacity=ep*.4;
      if(r.center.current)r.center.current.style.opacity=ep;
    };
    const inView=()=>{
      const el=ref.current; if(!el)return false;
      const rc=el.getBoundingClientRect();
      return rc.top<=1&&rc.bottom>window.innerHeight*.3;
    };
    const onWheel=e=>{
      if(!inView())return;
      if(v<=0&&e.deltaY<0)return;
      if(v>=TOTAL&&e.deltaY>0)return;
      e.preventDefault();
      v=cl(v+e.deltaY,0,TOTAL); draw(v/TOTAL);
    };
    const onTS=e=>{ty=e.touches[0].clientY};
    const onTM=e=>{
      if(!inView())return;
      const dy=ty-e.touches[0].clientY; ty=e.touches[0].clientY;
      if(v<=0&&dy<0)return; if(v>=TOTAL&&dy>0)return;
      e.preventDefault(); v=cl(v+dy*2.5,0,TOTAL); draw(v/TOTAL);
    };
    const onScroll=()=>{
      const el=ref.current; if(!el)return;
      if(el.getBoundingClientRect().top>1){v=0;draw(0);}
    };
    window.addEventListener('wheel',onWheel,{passive:false});
    window.addEventListener('touchstart',onTS,{passive:true});
    window.addEventListener('touchmove',onTM,{passive:false});
    window.addEventListener('scroll',onScroll,{passive:true});
    draw(0);
    return()=>{
      window.removeEventListener('wheel',onWheel);
      window.removeEventListener('touchstart',onTS);
      window.removeEventListener('touchmove',onTM);
      window.removeEventListener('scroll',onScroll);
    };
  },[]);

  const stats=[
    {r:r.sl[0],n:'500+',l:'Products',  s:'quality bakery',pos:{top:16,left:16}},
    {r:r.sl[1],n:'17',  l:'Outlets',   s:'across KV',     pos:{top:16,right:16}},
    {r:r.sl[2],n:'23',  l:'Years',     s:'of excellence', pos:{bottom:16,left:16}},
    {r:r.sl[3],n:'360', l:'Days Fresh',s:'baked daily',   pos:{bottom:16,right:16}},
  ];

  return(
    <section ref={ref} style={{
      position:'sticky',top:0,height:'100vh',zIndex:10,
      display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
      overflow:'hidden',background:C.cream2,
    }}>
      <div style={{textAlign:'center',marginBottom:20,position:'relative',zIndex:2}}>
        <p style={{fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.45em',textTransform:'uppercase',color:C.pink,fontWeight:400,marginBottom:8}}>By the numbers</p>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:'clamp(26px,3vw,40px)',fontWeight:300,color:C.text,lineHeight:1.15,margin:0,fontStyle:'italic'}}>
          23 years of <em style={{color:C.pinkDark}}>baking happiness</em>
        </h2>
      </div>

      {/* watermark */}
      <div ref={r.wm} aria-hidden style={{
        position:'absolute',fontFamily:"'Fraunces',serif",fontStyle:'italic',
        fontSize:280,fontWeight:300,color:`rgba(180,100,130,0.05)`,letterSpacing:'-0.06em',
        pointerEvents:'none',userSelect:'none',
        top:'50%',left:'50%',transform:'translate(-50%,-50%)',opacity:0,whiteSpace:'nowrap',
      }}>RT</div>

      <div style={{position:'relative',width:440,height:440,flexShrink:0}}>
        <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible'}}
          viewBox="0 0 460 460" aria-hidden>
          <circle cx="230" cy="230" r="185" fill="none" stroke={`rgba(180,120,150,0.12)`} strokeWidth="1.5"/>
          {["M 415,230 A 185,185 0 0,1 230,415","M 230,415 A 185,185 0 0,1 45,230",
            "M 45,230 A 185,185 0 0,1 230,45","M 230,45 A 185,185 0 0,1 415,230"].map((d,i)=>(
            <path key={i} ref={r.arcs[i]} d={d} fill="none" stroke={C.pinkDark}
              strokeWidth="12" strokeLinecap="round"
              strokeDasharray={ARCLEN} strokeDashoffset={ARCLEN}/>
          ))}
          {[[415,230],[230,415],[45,230],[230,45]].map(([cx,cy],i)=>(
            <circle key={i} ref={r.jd[i]} cx={cx} cy={cy} r="4" fill={C.pink} style={{opacity:0}}/>
          ))}
          <circle ref={r.inner} cx="230" cy="230" r="152" fill="none"
            stroke={`rgba(180,100,130,0.15)`} strokeWidth="1" strokeDasharray="5 10" style={{opacity:0}}/>
          <circle ref={r.outer} cx="230" cy="230" r="205" fill="none"
            stroke={`rgba(180,100,130,0.08)`} strokeWidth="1" strokeDasharray="3 10" style={{opacity:0}}/>
        </svg>

        {stats.map(({r:sr,n,l,s,pos})=>(
          <div key={l} ref={sr} style={{
            position:'absolute',...pos,
            display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',
            pointerEvents:'none',opacity:.08,
          }}>
            <span style={{fontFamily:"'Fraunces',serif",fontStyle:'italic',fontWeight:300,fontSize:50,lineHeight:1,color:C.pinkDark,letterSpacing:'-0.02em'}}>{n}</span>
            <span style={{fontFamily:'Jost,sans-serif',fontSize:8,letterSpacing:'0.3em',textTransform:'uppercase',color:C.muted,fontWeight:400,marginTop:5}}>{l}</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',fontSize:12,color:C.rose,fontWeight:300,marginTop:2}}>{s}</span>
          </div>
        ))}

        <div ref={r.center} style={{
          position:'absolute',inset:0,display:'flex',flexDirection:'column',
          alignItems:'center',justifyContent:'center',pointerEvents:'none',opacity:0,
        }}>
          <img src={logo} alt="RT Pastry" style={{
            width:80,height:80,objectFit:'contain',borderRadius:'50%',
            background:'#fff',padding:10,
            boxShadow:`0 0 0 10px rgba(212,115,154,0.08),0 0 0 20px rgba(212,115,154,0.04)`,
          }}/>
          <p style={{marginTop:12,fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic',fontSize:14,color:C.muted,textAlign:'center',lineHeight:1.5}}>
            Baking happiness<br/>since 2001
          </p>
        </div>
      </div>

      {/* progress */}
      <div style={{position:'absolute',bottom:28,display:'flex',alignItems:'center',gap:12,fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.28em',textTransform:'uppercase',color:C.faint,fontWeight:300}}>
        <span ref={r.lbl}>scroll to assemble</span>
        <div style={{width:80,height:1,background:C.border,borderRadius:1,overflow:'hidden'}}>
          <div ref={r.fill} style={{height:'100%',background:C.pink,width:'0%'}}/>
        </div>
        <span ref={r.pct}>0%</span>
      </div>
      <div ref={r.cue} aria-hidden style={{
        position:'absolute',bottom:28,right:48,display:'flex',flexDirection:'column',
        alignItems:'center',gap:6,fontFamily:'Jost,sans-serif',fontSize:8,
        letterSpacing:'0.3em',textTransform:'uppercase',color:C.faint,
        animation:'bounceCue 1.8s ease-in-out infinite',
      }}>
        <span>↓</span>
        <div style={{width:1,height:22,background:`linear-gradient(to bottom,${C.pink},transparent)`}}/>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   HOME
════════════════════════════════════════════ */
export default function Home() {
  return(
    <>
      <style>{FONTS}{`
        @keyframes bounceCue{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes spinSlow{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        .rt-hover-card{transition:transform .4s cubic-bezier(.2,0,.2,1),box-shadow .4s}
        .rt-hover-card:hover{transform:translateY(-3px)!important;box-shadow:0 16px 40px rgba(180,100,140,0.1)!important}
        .rt-outlet:hover{border-color:rgba(180,120,150,0.4)!important;background:rgba(250,247,244,0.8)!important}
        .rt-ticker:hover .rt-inner{animation-play-state:paused}
      `}</style>

      <div style={{fontFamily:'Jost,sans-serif',background:C.cream,color:C.text,overflowX:'hidden'}}>

        {/* ══════════════════════════════
            HERO
        ══════════════════════════════ */}
        <section style={{
          height:'83vh', minHeight:'86vh',display:'grid',gridTemplateColumns:'1fr 1fr',
          borderBottom:`1px solid ${C.border}`,
        }}>
          {/* LEFT */}
          <div style={{
            padding:'110px 56px 80px',display:'flex',flexDirection:'column',
            justifyContent:'center',position:'relative',
            background:`linear-gradient(150deg,${C.cream} 0%,#f8f0f3 100%)`,
          }}>
            {/* very subtle grid lines */}
            <div style={{
              position:'absolute',inset:0,
              backgroundImage:`linear-gradient(to right,rgba(180,120,150,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(180,120,150,0.04) 1px,transparent 1px)`,
              backgroundSize:'48px 48px',pointerEvents:'none',
            }}/>

            <div style={{animation:'fadeUp .9s ease both',position:'relative'}}>
              {/* eyebrow */}
              <div style={{
                display:'inline-flex',alignItems:'center',gap:8,
                fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.45em',
                fontWeight:400,textTransform:'uppercase',color:C.pink,
                marginBottom:32,
              }}>
                <div style={{width:16,height:1,background:C.rose}}/>
                Nutritious · Delicious · Est 2001
              </div>

              <h1 style={{
                fontFamily:"'Fraunces',serif",
                fontSize:'clamp(48px,6vw,82px)',fontWeight:300,
                lineHeight:.94,letterSpacing:'-0.02em',color:C.text,
                marginBottom:0,fontStyle:'italic',
              }}>
                Baking<br/>
                <span style={{color:C.pinkDark}}>the taste</span><br/>
                of happiness
              </h1>

              <div style={{width:36,height:1,background:C.rose,margin:'28px 0'}}/>

              <p style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:17,lineHeight:1.8,color:C.muted,
                fontWeight:300,maxWidth:380,marginBottom:40,fontStyle:'italic',
              }}>
                Premium ingredients, authentic recipes, and sincere dedication to the craft — 23 years of baking happiness.
              </p>

              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <a href="#order" style={{
                  padding:'12px 30px',background:C.pinkDark,color:'#fff',
                  fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.22em',
                  textTransform:'uppercase',fontWeight:500,border:'none',
                  borderRadius:100,cursor:'pointer',textDecoration:'none',
                  boxShadow:`0 6px 24px rgba(184,85,128,0.22)`,
                  transition:'all .3s',
                }}>Order Here</a>
                <Link to="/outlets" style={{
                  padding:'11px 26px',border:`1px solid ${C.borderMid}`,
                  color:C.pink,fontFamily:'Jost,sans-serif',fontSize:9,
                  letterSpacing:'0.22em',textTransform:'uppercase',fontWeight:400,
                  background:'transparent',borderRadius:100,cursor:'pointer',
                  textDecoration:'none',transition:'all .3s',
                }}>Find Outlet</Link>
              </div>
            </div>

            {/* 23 years badge — soft */}
            <div style={{
              position:'absolute',bottom:40,right:40,
              width:88,height:88,
              border:`1px solid ${C.borderMid}`,borderRadius:'50%',
              background:'rgba(255,255,255,0.7)',backdropFilter:'blur(8px)',
              display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
            }}>
              <span style={{fontFamily:"'Fraunces',serif",fontSize:30,fontWeight:300,fontStyle:'italic',color:C.pinkDark,lineHeight:1}}>23</span>
              <span style={{fontFamily:'Jost,sans-serif',fontSize:7,letterSpacing:'0.28em',fontWeight:400,color:C.faint,marginTop:3,textTransform:'uppercase'}}>years</span>
            </div>
          </div>

          {/* RIGHT — image */}
          <div style={{position:'relative',overflow:'hidden',background:C.cream3}}>
            <img src={store} alt="RT Pastry" style={{
              width:'100%',height:'100%',objectFit:'cover',
              filter:'brightness(0.97) saturate(0.9)',
              transition:'transform 7s ease',
            }}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.03)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}/>
            {/* soft gradient overlay bottom */}
            <div style={{
              position:'absolute',bottom:0,left:0,right:0,height:'40%',
              background:`linear-gradient(to top,rgba(250,247,244,0.6),transparent)`,
            }}/>
            <div style={{
              position:'absolute',bottom:28,left:28,
              background:'rgba(250,247,244,0.88)',backdropFilter:'blur(10px)',
              border:`1px solid ${C.border}`,padding:'12px 20px',
            }}>
              <p style={{fontFamily:'Jost,sans-serif',fontSize:8,letterSpacing:'0.28em',textTransform:'uppercase',color:C.faint,marginBottom:3}}>Est. 2001</p>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontStyle:'italic',color:C.text,fontWeight:300}}>17 outlets across Klang Valley</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            TICKER — very soft
        ══════════════════════════════ */}
        <div className="rt-ticker" style={{
          background:C.cream3,padding:'12px 0',
          overflow:'hidden',whiteSpace:'nowrap',
          borderBottom:`1px solid ${C.border}`,
        }}>
          <div className="rt-inner" style={{display:'inline-flex',animation:'ticker 28s linear infinite',width:'max-content'}}>
            {['Freshly Baked Daily','17 Outlets','500+ Products','23 Years of Excellence','Delivery & Pick Up','Rich in Vitamins & Minerals',
              'Freshly Baked Daily','17 Outlets','500+ Products','23 Years of Excellence','Delivery & Pick Up','Rich in Vitamins & Minerals'].map((t,i)=>(
              <React.Fragment key={i}>
                <span style={{fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.28em',textTransform:'uppercase',color:C.muted,fontWeight:300,padding:'0 28px'}}>{t}</span>
                <span style={{color:C.border,padding:'0 4px'}}>·</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
            ABOUT — cream, side by side
        ══════════════════════════════ */}
        <section style={{
          display:'grid',gridTemplateColumns:'1fr 1fr',
          borderBottom:`1px solid ${C.border}`,
          background:C.cream,
        }}>
          {/* LEFT — spinning logo panel */}
          <div style={{
            position:'relative',overflow:'hidden',
            background:`linear-gradient(135deg,${C.cream} 0%,#f0e8ed 100%)`,
            display:'flex',alignItems:'center',justifyContent:'center',
            padding:'80px 56px',minHeight:480,
            borderRight:`1px solid ${C.border}`,
          }}>
            {/* very faint spinning rings */}
            <div style={{position:'absolute',width:300,height:300,borderRadius:'50%',border:`1px dashed rgba(180,120,150,0.12)`,animation:'spinSlow 80s linear infinite'}}/>
            <div style={{position:'absolute',width:220,height:220,borderRadius:'50%',border:`1px solid rgba(180,120,150,0.08)`,animation:'spinSlow 50s linear infinite reverse'}}/>

            <div style={{
              width:148,height:148,borderRadius:'50%',
              background:'rgba(255,255,255,0.8)',backdropFilter:'blur(8px)',
              border:`1px solid ${C.border}`,
              display:'flex',alignItems:'center',justifyContent:'center',
              padding:20,position:'relative',zIndex:2,
              boxShadow:`0 8px 40px rgba(180,100,130,0.1)`,
            }}>
              <img src={logo} alt="RT Pastry" style={{width:'100%',objectFit:'contain'}}/>
            </div>

            <p style={{
              position:'absolute',bottom:28,
              fontFamily:'Jost,sans-serif',fontSize:8,letterSpacing:'0.35em',
              textTransform:'uppercase',color:C.faint,fontWeight:300,
            }}>Rumah Tangga · Family First</p>
          </div>

          {/* RIGHT — text */}
          <div style={{padding:'80px 56px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <p style={{fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.45em',textTransform:'uppercase',color:C.pink,fontWeight:400,marginBottom:14}}>Our Story</p>
            <div style={{width:28,height:1,background:C.rose,marginBottom:20}}/>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:'clamp(32px,3.5vw,48px)',fontWeight:300,color:C.text,lineHeight:1.1,marginBottom:20,fontStyle:'italic'}}>
              Taste of<br/><em style={{color:C.pinkDark}}>happiness</em>
            </h2>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,lineHeight:1.9,color:C.muted,fontWeight:300,marginBottom:14,fontStyle:'italic'}}>
              "RT" stands for <strong style={{fontStyle:'normal',fontWeight:400,color:C.text}}>Rumah Tangga</strong> — family. We see every customer as family. For family, only the best will do: premium ingredients, authentic recipes, and sincere dedication to the craft.
            </p>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,lineHeight:1.9,color:C.muted,fontWeight:300,marginBottom:32,fontStyle:'italic'}}>
              Each loaf, each slice, prepared with the same care we would offer our own loved ones. With 17 outlets across Malaysia, RT Pastry delivers moments of joy, made to be shared.
            </p>
            <div style={{paddingTop:20,borderTop:`1px solid ${C.border}`}}>
              <p style={{fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.28em',textTransform:'uppercase',color:C.faint,fontWeight:300}}>
                Baking the taste of happiness, with heart.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            CIRCLE STATS
        ══════════════════════════════ */}
        <CircleStats />

        {/* ══════════════════════════════
            PRODUCTS — Option B: alternating image-text rows
        ══════════════════════════════ */}
        <section style={{background:'#fff',borderTop:`1px solid ${C.border}`}}>

          {/* section header */}
          <div style={{
            display:'flex',alignItems:'flex-end',justifyContent:'space-between',
            padding:'48px 56px 40px',
            background:C.cream,
            borderBottom:`1px solid ${C.border}`,
          }}>
            <div>
              <p style={{fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.45em',textTransform:'uppercase',color:C.pink,fontWeight:400,marginBottom:8}}>Our Creations</p>
              <h2 style={{fontFamily:"'Fraunces',serif",fontSize:'clamp(26px,3vw,40px)',fontWeight:300,color:C.text,lineHeight:1.1,margin:0,fontStyle:'italic'}}>
                Explore our <em style={{color:C.pinkDark}}>signatures</em>
              </h2>
            </div>
            <Link to="/menu" style={{fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.faint,textDecoration:'none',fontWeight:400}}>
              View all →
            </Link>
          </div>

          {/* alternating rows */}
          {[
            {
              tag:'Signature',
              name:'Fresh Cream Swiss Roll',
              desc:'Impossibly fluffy sponge wrapped around rich, melt-in-your-mouth Hokkaido fresh cream. Our legendary number one — baked fresh every single morning without exception.',
              detail:'Bestseller · Daily fresh',
              imgBg:'#f5eef2',
              dotColor:'rgba(184,85,128,0.22)',
              reverse:false,
            },
            {
              tag:'Daily Baked',
              name:'Artisan Loaves',
              desc:'Traditional natural fermentation techniques give our loaves their signature pillowy texture. Baked before sunrise, every loaf carries the warmth of genuine craft and sincere ingredients.',
              detail:'Baked before sunrise · Every day',
              imgBg:'#f5f0ea',
              dotColor:'rgba(160,130,90,0.22)',
              reverse:true,
            },
            {
              tag:'Celebration',
              name:'Layer Cakes',
              desc:'Crafted by our pastry team with minimalist designs and perfectly balanced sweetness. Available for custom orders — made for your most precious milestones and celebrations.',
              detail:'Custom orders welcome',
              imgBg:'#eef0f7',
              dotColor:'rgba(100,120,180,0.2)',
              reverse:false,
            },
            {
              tag:'Morning',
              name:'Butter Croissants',
              desc:'Hand-laminated with 72 layers of pure butter. Shatteringly crisp on the outside, impossibly pillowy within — a perfect start to any morning across all 17 of our outlets.',
              detail:'Morning pick · 17 outlets',
              imgBg:'#f7f5ea',
              dotColor:'rgba(160,150,80,0.2)',
              reverse:true,
            },
            {
              tag:'Premium Gift',
              name:'Gift Hampers',
              desc:'Curated selections of RT Pastry\'s finest creations — beautifully presented for corporate gifting, festive seasons, and every occasion that calls for something truly special.',
              detail:'Corporate · Festive · Occasions',
              imgBg:'#eaf5ef',
              dotColor:'rgba(80,160,110,0.18)',
              reverse:false,
            },
            {
              tag:'Seasonal',
              name:'Festive Specials',
              desc:'Limited-edition creations that celebrate the richness of Malaysian festivals and the finest seasonal ingredients. Each release is designed to be savoured — while it lasts.',
              detail:'Limited edition · Seasonal',
              imgBg:'#f3eef7',
              dotColor:'rgba(140,90,180,0.18)',
              reverse:true,
            },
          ].map(({tag,name,desc,detail,imgBg,dotColor,reverse},i)=>{

            const isLast = i === 5;

            const imgPanel = (
              <div key="img" style={{
                background:imgBg,
                display:'flex',alignItems:'center',justifyContent:'center',
                minHeight:220,
                position:'relative',
                overflow:'hidden',
              }}>
                {/* subtle concentric rings */}
                <div style={{
                  position:'absolute',
                  width:200,height:200,borderRadius:'50%',
                  border:`1px solid ${dotColor.replace('0.22','0.12').replace('0.2','0.12').replace('0.18','0.12')}`,
                  pointerEvents:'none',
                }}/>
                <div style={{
                  position:'absolute',
                  width:130,height:130,borderRadius:'50%',
                  border:`1px solid ${dotColor.replace('0.22','0.08').replace('0.2','0.08').replace('0.18','0.08')}`,
                  pointerEvents:'none',
                }}/>
                {/* center dot */}
                <div style={{
                  width:52,height:52,borderRadius:'50%',
                  background:dotColor,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  position:'relative',zIndex:1,
                }}>
                  <div style={{width:18,height:18,borderRadius:'50%',background:dotColor.replace('0.22','0.5').replace('0.2','0.5').replace('0.18','0.5')}}/>
                </div>
                {/* item number */}
                <div style={{
                  position:'absolute',bottom:16,right:20,
                  fontFamily:"'Fraunces',serif",fontStyle:'italic',
                  fontSize:40,fontWeight:300,
                  color:`rgba(0,0,0,0.06)`,lineHeight:1,
                  pointerEvents:'none',
                }}>{String(i+1).padStart(2,'0')}</div>
              </div>
            );

            const txtPanel = (
              <div key="txt" style={{
                padding:'40px 52px',
                display:'flex',flexDirection:'column',justifyContent:'center',
                borderLeft: reverse ? 'none' : `1px solid ${C.border}`,
                borderRight: reverse ? `1px solid ${C.border}` : 'none',
                background:'#fff',
              }}>
                <p style={{fontFamily:'Jost,sans-serif',fontSize:8,letterSpacing:'0.35em',textTransform:'uppercase',color:C.pink,fontWeight:400,marginBottom:12}}>
                  {tag}
                </p>
                <h3 style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:'clamp(22px,2.5vw,30px)',
                  fontWeight:400,color:C.text,
                  marginBottom:14,lineHeight:1.15,
                }}>{name}</h3>
                <div style={{width:24,height:1,background:C.rose,marginBottom:16}}/>
                <p style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:15,color:C.muted,
                  fontWeight:300,lineHeight:1.85,
                  fontStyle:'italic',marginBottom:20,
                }}>{desc}</p>
                <p style={{
                  fontFamily:'Jost,sans-serif',
                  fontSize:8,letterSpacing:'0.22em',
                  textTransform:'uppercase',color:C.faint,fontWeight:300,
                }}>{detail}</p>
              </div>
            );

            return (
              <div key={i} style={{
                display:'grid',
                gridTemplateColumns: reverse ? '3fr 2fr' : '2fr 3fr',
                borderBottom: isLast ? 'none' : `1px solid ${C.border}`,
              }}>
                {reverse ? [txtPanel, imgPanel] : [imgPanel, txtPanel]}
              </div>
            );
          })}

        </section>
        
        {/* ══════════════════════════════
            OUTLETS — Option B: ghost number cards
        ══════════════════════════════ */}
        <section style={{background:'#fff',borderTop:`1px solid ${C.border}`}}>

          {/* header */}
          <div style={{
            display:'flex',alignItems:'flex-end',justifyContent:'space-between',
            padding:'48px 56px 40px',
            background:C.cream,
            borderBottom:`1px solid ${C.border}`,
          }}>
            <div>
              <p style={{fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.45em',textTransform:'uppercase',color:C.pink,fontWeight:400,marginBottom:8}}>Find Us</p>
              <h2 style={{fontFamily:"'Fraunces',serif",fontSize:'clamp(26px,3vw,40px)',fontWeight:300,color:C.text,lineHeight:1.1,margin:0,fontStyle:'italic'}}>
                17 outlets across <em style={{color:C.pinkDark}}>Klang Valley</em>
              </h2>
            </div>
            <Link to="/outlets" style={{fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.faint,textDecoration:'none',fontWeight:400}}>
              All outlets →
            </Link>
          </div>

          {/* 3-col ghost number grid */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)'}}>
            {[
              {n:'01', name:'Cheras',       addr:'Leisure Mall, Jalan Manis 6',    area:'Kuala Lumpur'},
              {n:'02', name:'Kepong',       addr:'Metro Prima Shopping Centre',    area:'Kuala Lumpur'},
              {n:'03', name:'Puchong',      addr:'IOI Mall Puchong',               area:'Selangor'},
              {n:'04', name:'Shah Alam',    addr:'AEON Shah Alam',                 area:'Selangor'},
              {n:'05', name:'Subang Jaya',  addr:'Empire Shopping Gallery',        area:'Selangor'},
              {n:'06', name:'Petaling Jaya',addr:'Jaya Shopping Centre',           area:'Selangor'},
            ].map(({n, name, addr, area}, i) => {
              const isLastRow  = i >= 3;
              const isLastCol  = i % 3 === 2;
              return (
                <div
                  key={i}
                  style={{
                    padding:'32px 36px',
                    borderRight:  isLastCol  ? 'none' : `1px solid ${C.border}`,
                    borderBottom: isLastRow  ? 'none' : `1px solid ${C.border}`,
                    position:'relative',
                    overflow:'hidden',
                    background:'#fff',
                    transition:'background .25s',
                    cursor:'default',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fdf8fb'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  {/* large ghost number behind everything */}
                  <div style={{
                    position:'absolute',
                    top:-8, right:8,
                    fontFamily:"'Fraunces',serif",
                    fontStyle:'italic',
                    fontSize:80,
                    fontWeight:300,
                    color:'rgba(180,100,130,0.06)',
                    lineHeight:1,
                    userSelect:'none',
                    pointerEvents:'none',
                  }}>{n}</div>

                  {/* small pink dot accent */}
                  <div style={{
                    width:5, height:5, borderRadius:'50%',
                    background:'rgba(184,85,128,0.25)',
                    marginBottom:16,
                  }}/>

                  {/* small numbered label */}
                  <p style={{
                    fontFamily:"'Fraunces',serif",
                    fontStyle:'italic',
                    fontSize:13,
                    fontWeight:300,
                    color:'rgba(180,100,130,0.4)',
                    marginBottom:12,
                    lineHeight:1,
                  }}>{n}</p>

                  {/* outlet name */}
                  <h4 style={{
                    fontFamily:'Jost,sans-serif',
                    fontSize:15,
                    fontWeight:500,
                    color:C.text,
                    marginBottom:6,
                    letterSpacing:'0.02em',
                  }}>{name}</h4>

                  {/* address */}
                  <p style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:13,
                    color:C.muted,
                    fontStyle:'italic',
                    fontWeight:300,
                    marginBottom:12,
                    lineHeight:1.5,
                  }}>{addr}</p>

                  {/* area tag */}
                  <p style={{
                    fontFamily:'Jost,sans-serif',
                    fontSize:8,
                    letterSpacing:'0.22em',
                    textTransform:'uppercase',
                    color:C.faint,
                    fontWeight:300,
                  }}>{area}</p>

                </div>
              );
            })}
          </div>

          {/* bottom CTA strip */}
          <div style={{
            padding:'20px 56px',
            borderTop:`1px solid ${C.border}`,
            background:C.cream,
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
          }}>
            <p style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:14,
              fontStyle:'italic',
              color:C.faint,
              fontWeight:300,
            }}>
              Showing 6 of 17 outlets — more coming soon
            </p>
            <Link to="/outlets" style={{
              display:'inline-flex',
              alignItems:'center',
              gap:8,
              padding:'9px 22px',
              border:`1px solid ${C.borderMid}`,
              borderRadius:100,
              fontFamily:'Jost,sans-serif',
              fontSize:9,
              letterSpacing:'0.2em',
              textTransform:'uppercase',
              color:C.pinkDark,
              textDecoration:'none',
              fontWeight:400,
              transition:'all .25s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background=C.pinkDark;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=C.pinkDark;}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=C.pinkDark;e.currentTarget.style.borderColor=C.borderMid;}}>
              View all 17 outlets →
            </Link>
          </div>

        </section>

        {/* ══════════════════════════════
            SHOP CTA — very soft
        ══════════════════════════════ */}
        <section style={{
          background:`linear-gradient(135deg,#f5edf2 0%,${C.cream2} 50%,#edf0f5 100%)`,
          borderTop:`1px solid ${C.border}`,
          padding:'80px 56px',
          display:'grid',gridTemplateColumns:'1fr 1fr',
          alignItems:'center',gap:64,
          position:'relative',overflow:'hidden',
        }}>
          {/* ghost text */}
          <div style={{
            position:'absolute',right:-20,top:-20,
            fontFamily:"'Fraunces',serif",fontStyle:'italic',
            fontSize:220,fontWeight:300,
            color:`rgba(180,100,130,0.04)`,lineHeight:1,
            pointerEvents:'none',letterSpacing:'-0.05em',whiteSpace:'nowrap',
          }}>Shop</div>

          <div style={{position:'relative',zIndex:1}}>
            <p style={{fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.45em',textTransform:'uppercase',color:C.pink,fontWeight:400,marginBottom:12}}>Online Shop</p>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:'clamp(30px,4vw,52px)',fontWeight:300,color:C.text,lineHeight:1.05,fontStyle:'italic',margin:0}}>
              Visit our<br/><em style={{color:C.pinkDark}}>online shop</em>
            </h2>
          </div>

          <div style={{position:'relative',zIndex:1}}>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:C.muted,fontWeight:300,lineHeight:1.8,fontStyle:'italic',maxWidth:360,marginBottom:28}}>
              More exciting products coming soon. Order fresh, delivered to your door — or pick up at any of our 17 outlets across Klang Valley.
            </p>
            <button style={{
              padding:'12px 32px',
              background:'transparent',
              border:`1px solid ${C.borderMid}`,
              color:C.pinkDark,
              fontFamily:'Jost,sans-serif',fontSize:9,letterSpacing:'0.22em',
              textTransform:'uppercase',fontWeight:500,
              cursor:'pointer',borderRadius:100,
              transition:'all .3s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background=C.pinkDark;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=C.pinkDark;}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=C.pinkDark;e.currentTarget.style.borderColor=C.borderMid;}}>
              Add to Cart
            </button>
          </div>
        </section>

      </div>
    </>
  );
}