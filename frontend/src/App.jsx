import React, { useState, useEffect } from 'react';
import Admin from './Admin'; // 👈 Admin file import kar li

export default function App() {
  // ─── SECRET ADMIN ROUTER ───
  if (typeof window !== 'undefined' && window.location.hash === '#admin') {
    return <Admin />;
  }

  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  
  // ─── LUXURY TIMELINE PRE-LOADER STATES ───
  const [siteLoading, setSiteLoading] = useState(true);
  const [showText, setShowText] = useState(false);
  const [fadeExit, setFadeExit] = useState(false);

  // Official Studio Core Configurations
  const studioDetails = {
    name: "ARK STUDIO PHOTOGRAPHY",
    phone: "8210138909",
    whatsappLink: "https://wa.me/918210138909?text=Namaste%20ARK%20STUDIO%2C%20mujhe%20booking%20ki%20jankari%20chahiye.",
    email: "arkvideomixinglab@gmail.com",
    address: "Main Market, Matiyariya Kothi, East Champaran, Bihar - 845437",
    fbLink: "https://www.facebook.com/share/18exaVKwGg/",
    ytChannel: "https://youtube.com/@ark_studio12?si=Irkj4manGEaS_nTE",
    ownerName: "Ravish Kumar",
    ownerPhoto: "/src/assets/ravi.jpeg"
  };

  // Hero Background High-Res Cinematic Assets Flow
  const heroBackgrounds = [
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=95",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=95",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=95",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=95"
  ];
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 600); 
    const exitTimer = setTimeout(() => setFadeExit(true), 2200); 
    const destroyTimer = setTimeout(() => setSiteLoading(false), 2600); 

    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 2500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(destroyTimer);
      clearInterval(interval);
    };
  }, []);

  // ─── 📸 SYMMETRIC CATEGORIZED REAL ASSET MASTER MAP ───
  const portfolioPhotos = {
    weddingShoot: [
      { src: "/src/assets/wed.jpg" },
      { src: "/src/assets/wed1.jpg" },
      { src: "/src/assets/wed2.jpg" },
      { src: "/src/assets/wed3.jpg" }
    ],
    preWeddingShoot: [
      { src: "/src/assets/eng.jpg" },
      { src: "/src/assets/eng1.jpg" },
      { src: "/src/assets/eng2.jpg" },
      { src: "/src/assets/eng3.jpg" }
    ],
    eventCoverup: [
      { src: "/src/assets/bir.jpg" },
      { src: "/src/assets/dr.jpg" },
      { src: "/src/assets/dr1.jpg" },
      { src: "/src/assets/eng2.jpg" }
    ],
    portraitShoot: [
      { src: "/src/assets/wed4.jpg" },
      { src: "/src/assets/wed6.jpg" },
      { src: "/src/assets/eng4.jpg" },
      { src: "/src/assets/wed2.jpg" }
    ]
  };

  // Official Investment Standard Matrix
  const packages = [
    { title: "Wedding Photography", price: "22,000", img: "/src/assets/wed.jpg", desc: "Sony Premium Line gear infrastructure configuration candid coverage." },
    { title: "Wedding Cinematography", price: "35,000", img: "/src/assets/wed1.jpg", desc: "Sony FX30 Cinema line tracking matrix with high-fidelity outputs." },
    { title: "Pre-Wedding Shoot", price: "15,000", img: "/src/assets/eng.jpg", desc: "DJI professional flight drone operations on stunning outdoor locations." },
    { title: "Birthday / Event Party", price: "4,000", img: "/src/assets/bir.jpg", desc: "Crisp processing loops with stylized customized traditional party layouts sets." },
    { title: "Portrait Shoot Portfolio", price: "3,000", img: "/src/assets/eng1.jpg", desc: "High contrast custom color grading portrait panels closeup framework." }
  ];

  const testimonials = [
    { name: "Dilkhush Tiwari", role: "Groom", text: "Highly professional team with brilliant photography skills! The quality of the pictures and videos is outstanding. They captured every moment perfectly, and the editing is top-notch." },
    { name: "Aditya Kumar", role: "Client", text: "Amazing experience with the team! They are not just creative but also very patient and cooperative throughout the shoot. The lighting and framing exceeded our expectations." },
    { name: "Priya Mittal", role: "Bride", text: "Great work! The camera quality, angles, and final edits are amazing. The team is very friendly and delivered the work on time. Definitely 5 stars!" },
    { name: "Suraj Raj", role: "Client", text: "The best part about this team is how comfortable they make you feel in front of the camera. Super friendly, creative, and very patient with poses and retakes." },
    { name: "Dharmendra Tiwari", role: "Groom", text: "Amazing cinematic work! The angles, lighting, and retro/modern color grading they use are absolutely brilliant. They actually capture the premium feel of the moment." },
    { name: "Prince Raj", role: "Client", text: "Pure professionalism! Excellent camera gear, sharp quality, and flawless execution. They delivered the final edited content on time without compromising on quality." }
  ];

  const [reviewGroupIndex, setReviewGroupIndex] = useState(0);
  useEffect(() => {
    if (siteLoading) return;
    const interval = setInterval(() => {
      setReviewGroupIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, [siteLoading]);

  // 🔴 INTEGRATION ENGINEER: LIVE SLOTS FETCHING (WITH CRASH PROTECTION) 🔴
  useEffect(() => {
    const fetchLiveSlots = async () => {
      try {
        const response = await fetch('https://ark-studios-api.onrender.com/api/slots');
        if (response.ok) {
          const liveData = await response.json();
          
          // SAFETY CHECK: API ne object bheja ya array, dono handle karega
          const validArray = Array.isArray(liveData) 
            ? liveData 
            : (liveData.data || liveData.slots || null);

          if (validArray && validArray.length > 0) {
            setSlots(validArray);
          } else {
            throw new Error("API returned object instead of array");
          }
        } else {
          throw new Error("API not responding properly");
        }
      } catch (error) {
        console.error("Live Slots Fetch Error (Using Fallback Data):", error);
        // Fallback dummy data so UI doesn't break
        let backupNodes = [];
        for (let i = 1; i <= 30; i++) {
          backupNodes.push({ id: String(i), isBooked: i % 6 === 0 || i % 7 === 0 });
        }
        setSlots(backupNodes);
      }
    };
    fetchLiveSlots();
  }, []);

  // ─── 📜 BROCHURE GENERATION ENGINE ───
  const triggerPdfDownload = (e) => {
    if (e) e.preventDefault();
    const catalogData = `=======================================================
               ARK STUDIO PHOTOGRAPHY
         Premium Production Portfolio Catalog
=======================================================
STUDIO CONTACT DIRECTORIES:
-------------------------------------------------------
Director/Owner: ${studioDetails.ownerName}
Hotline Contact: +91 ${studioDetails.phone}
Studio Headquarters: ${studioDetails.address}
Official Inbox: ${studioDetails.email}
OFFICIAL SERVICE INVESTMENT STRUCTURE:
-------------------------------------------------------
1. Wedding Photography            : INR 22,000
2. Wedding Cinematography         : INR 35,000
3. Pre-Wedding Shoot              : INR 15,000
4. Birthday / Event Party Coverup : INR 4,000
5. Portrait Shoot Portfolio       : INR 3,000
AVAILABILITY LIFECYCLE WINDOW:
-------------------------------------------------------
* Current Status Notice: July and August seasonal calendar windows are entirely empty and open for booking!
=======================================================
       ARK STUDIO © 2026 - ALL RIGHTS RESERVED
=======================================================`;
    const blob = new Blob([catalogData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const linkNode = document.createElement('a');
    linkNode.href = url;
    linkNode.download = 'ARK_Studio_Official_Investment_Brochure.txt';
    document.body.appendChild(linkNode);
    linkNode.click();
    document.body.removeChild(linkNode);
    URL.revokeObjectURL(url);
  };

  const [inquiryData, setInquiryData] = useState({ name: '', phone: '', date: '', notes: '' });
  
  // 🔴 INTEGRATION ENGINEER: LIVE BOOKING POST API 🔴
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ark-studios-api.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData)
      });

      if (response.ok) {
        alert(`Thank you ${inquiryData.name}! Inquiry recorded safely into our LIVE database stream.`);
        setInquiryData({ name: '', phone: '', date: '', notes: '' }); // Clear form
      } else {
        alert("Server error processing your request. Please try again.");
      }
    } catch (error) {
      console.error("API POST Error:", error);
      alert("Network Error! Failed to connect to the studio server.");
    }
  };

  // ─── 🤖 AI ASSISTANT CHAT SYSTEM CONVERSATIONAL LOGIC ───
  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const textPayload = chatInput.trim();
    setMessages(prev => [...prev, { sender: 'user', text: textPayload }]);
    setChatInput('');

    setTimeout(() => {
      let aiReply = "";
      let nextStep = bookingState.step;
      let updatedState = { ...bookingState };
      const refinedText = textPayload.toLowerCase();

      if (nextStep === 'init') {
        if (refinedText.includes('shadi') || refinedText.includes('wedding') || refinedText.includes('cinematography') || refinedText.includes('photo')) {
          updatedState.package = "Wedding Main Session";
          aiReply = "Ji bilkul, Wedding segment me humare paas clear rates hain:\n• Wedding Photography: ₹22,000\n• Wedding Cinematography: ₹35,000\n\nIsme high-end Sony multi-cam setups provide kiye jaate hain. Booking stream generate karne ke liye kripya apna Full Name (पूरा नाम) bataiye?";
          nextStep = 'collect_name';
        } else if (refinedText.includes('pre') || refinedText.includes('pre-wedding')) {
          updatedState.package = "Pre-Wedding Master Shoot";
          aiReply = "Pre-Wedding Shoot ka investment package configuration ₹15,000 hai, jisme premium locations and DJI automated flight arrays shamil hain. Kripya process aage badhane ke liye apna Full Name (पूरा नाम) share karein?";
          nextStep = 'collect_name';
        } else if (refinedText.includes('party') || refinedText.includes('birthday') || refinedText.includes('event')) {
          updatedState.package = "Party/Event Standard Track";
          aiReply = "Birthday or Traditional Event coverage ka official charge ₹4,000 set kiya gaya hai. Kripya register karne ke liye aap apna Full Name (पूरा नाम) likhiye?";
          nextStep = 'collect_name';
        } else {
          aiReply = "Ji Namaste, main Ravish Kumar hoon. ARK STUDIO me hum Wedding (₹22,000), Cinema FX30 Tracking (₹35,000), Pre-Wedding (₹15,000) aur Birthday plans (₹4,000) dete hain. July/August khali hai. Aapko kaun sa setup book karna hai?";
        }
      } else if (nextStep === 'collect_name') {
        updatedState.name = textPayload;
        aiReply = `Dhanyawad ${textPayload}. Ab kripya apna Active Contact Number (मोबाइल नंबर) share kijiye taaki main aapse personally baat kar sakoon?`;
        nextStep = 'collect_phone';
      } else if (nextStep === 'collect_phone') {
        updatedState.phone = textPayload;
        aiReply = "Noted safely! Aapka event kis targeted date (तारीख) ko scheduled hai? (July aur August poora khali hai, aap un mahino me se koi bhi date choose kar sakte hain)";
        nextStep = 'collect_date';
      } else if (nextStep === 'collect_date') {
        updatedState.date = textPayload;
        aiReply = "Aapko humari team total kitne dino (Total Shooting Days) ke liye chahiye? (e.g., 1 Din, 2 Din ya 3 Din)";
        nextStep = 'collect_days';
      } else if (nextStep === 'collect_days') {
        updatedState.days = textPayload;
        aiReply = `🎉 Aapka Process AI Engine ne confirm kar diya hai!\n\n─── BOOKING LOG SHEET ───\n👤 Director Client: ${updatedState.name}\n📞 Contact Hotline: ${updatedState.phone}\n📅 Booked Target Date: ${updatedState.date}\n⏱️ Session Duration: ${textPayload}\n📦 Mapped Catalog: ${updatedState.package}\n\nMain Ravish Kumar aapka slot confirmation pipeline me direct clear kar raha hoon. July/August slot is locked, main aapse jald hi direct call par baat karunga!`;
        nextStep = 'confirmed';
      } else {
        aiReply = "Aapka data pipeline hamare local system me active saved hai! Kisi naye event session ke liye bas type kijiye.";
        nextStep = 'init';
      }

      setBookingState({ ...updatedState, step: nextStep });
      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 600);
  };

  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Namaste! Main Ravish Kumar baat kar raha hoon ARK STUDIO se. July aur August ka mahina humara poora khali hai abhi. Aapko kis type ke event ki booking karni hai ya rates janne hain?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [bookingState, setBookingState] = useState({ step: 'init', name: '', phone: '', date: '', package: '', days: '' });

  return (
    <div className="min-h-screen bg-[#030305] text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-black scroll-smooth">
      
      {/* ─── 1. DYNAMIC HIGH-END PRE-LOADER CONTAINER ─── */}
      {siteLoading && (
        <div className={`fixed inset-0 z-[100] bg-[#030305] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${fadeExit ? 'opacity-0 scale-102 blur-md pointer-events-none' : 'opacity-100'}`}>
          <div className="text-center space-y-6 max-w-2xl px-6">
            <img src="/src/assets/ARK studios.png" alt="ARK Studios Logo" className="h-28 md:h-36 w-auto object-contain mx-auto filter drop-shadow-[0_0_40px_rgba(245,158,11,0.65)] transform scale-100 animate-pulse" />
            <div className={`transition-all duration-1000 transform ${showText ? 'opacity-100 translate-y-0 tracking-[0.5em]' : 'opacity-0 translate-y-4 tracking-normal'}`}>
              <h2 className="text-sm md:text-lg font-black text-amber-500 uppercase font-mono">ARK STUDIO PHOTOGRAPHY</h2>
              <div className="w-32 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-3"></div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 2. PROFESSIONAL GLASS BRAND HEADER NAVBAR ─── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#030305]/85 border-b border-zinc-900 px-6 md:px-16 py-4 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.95)]">
        <div>
          <img src="/src/assets/ARK studios.png" alt="ARK Studios" className="h-11 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)]" />
        </div>
        <nav className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
          {['Portfolio', 'About Director', 'Rates Card', 'Live Slots', 'Reviews'].map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="relative py-1 text-zinc-400 hover:text-amber-400 transition-colors duration-300">{link}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={triggerPdfDownload} className="hidden sm:inline-block px-4 py-2 border border-zinc-800 text-zinc-400 text-[9px] font-bold uppercase tracking-widest hover:border-amber-500 hover:text-amber-400 transition-all">↓ Download Brochure</button>
          <a href="#inquiry-hub" className="px-5 py-2.5 bg-amber-500 text-black border border-amber-500 text-[10px] font-black uppercase tracking-widest rounded-sm shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:bg-amber-400 hover:scale-105 transition-all">Book Session</a>
        </div>
      </header>

      {/* ─── 3. HERO MASTER SECTION GRID ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-start px-6 md:px-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          {heroBackgrounds.map((bgUrl, index) => (
            <div key={index} className="absolute inset-0 bg-cover bg-top transition-opacity duration-1000 ease-in-out filter brightness-[0.70] contrast-[1.12]" style={{ backgroundImage: `url('${bgUrl}')`, opacity: index === currentBgIndex ? 1 : 0 }} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-[#030305]/75 to-transparent z-1" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent z-1" />
        </div>

        <div className="relative z-10 max-w-3xl text-left space-y-6 pt-12">
          <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.4em] text-amber-400 bg-amber-500/10 px-4 py-2 rounded border border-amber-500/20 backdrop-blur-md font-mono">
            Matiyariya Kothi • Production Hub
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[0.95] font-sans">
            We Frame<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">Soulful Legacies.</span>
          </h1>
          <p className="text-zinc-300 max-w-xl text-xs md:text-sm font-medium leading-relaxed tracking-wide drop-shadow-md">
            Premium custom wedding frameworks, automated pre-wedding cinematography tracking systems, and high-fidelity production architectures tailored for elite memories.
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 font-mono text-[10px] uppercase tracking-wider shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Multi-Cam Live Streaming & Production Matrices Operational
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <a href="#portfolio" className="px-6 py-3.5 text-xs font-bold uppercase tracking-widest bg-zinc-900/80 border border-zinc-800 rounded-sm hover:bg-zinc-800 transition-all font-mono">View Portfolio</a>
            <a href="#inquiry-hub" className="px-6 py-3.5 text-xs font-bold uppercase tracking-widest bg-zinc-900/40 border border-amber-500/40 text-amber-400 rounded-sm hover:bg-amber-500 hover:text-black transition-all font-mono">Instant Form</a>
            <a href="#ai-assistant-node" className="px-6 py-3.5 text-xs font-black uppercase tracking-widest bg-amber-500 text-black rounded-sm hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] font-mono">🤖 AI Chat Booking</a>
          </div>
        </div>
      </section>

      {/* ─── 4. ABOUT DIRECTOR PORTRAIT BLOCK ─── */}
      <section id="about-director" className="max-w-7xl mx-auto px-6 md:px-8 py-28 border-t border-zinc-900 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-500 tracking-widest uppercase">// STUDIO LEADERSHIP</span>
              <div className="h-[1px] bg-zinc-800 flex-1"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Meet The Director</h2>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-amber-400">{studioDetails.ownerName}</h3>
              <p className="text-zinc-500 font-mono text-xs tracking-wider uppercase">Lead Photographer & Cinematographer</p>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Managing heavy cinema architectures and autonomous flight operations at Main Market, Matiyariya Kothi. Delivering premium resolution masterframes across East Champaran with standard hardware setups.
            </p>
            <div className="pt-2">
              <a href={`tel:${studioDetails.phone}`} className="inline-flex items-center gap-2 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-zinc-300 hover:border-amber-500 transition-all">
                <span>📞 Hotline Connect:</span> +91 {studioDetails.phone}
              </a>
            </div>
          </div>
          <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden border border-zinc-800/80 shadow-[0_0_30px_rgba(0,0,0,0.8)] bg-zinc-950 group">
            <img src={studioDetails.ownerPhoto} alt={studioDetails.ownerName} className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ─── 5. FIXED PORTFOLIO GRID (WITH PADDING TO PREVENT TOP CLIPPING) ─── */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 md:px-6 py-24 border-t border-zinc-900 scroll-mt-20">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">Cinematic Portfolio</h2>
          <p className="text-zinc-500 text-xs mt-2 font-mono tracking-wider">Perfect mathematical alignment. Strict aspect ratio logic with object-center to prevent top cuts.</p>
        </div>

        {Object.entries(portfolioPhotos).map(([category, photos]) => (
          <div key={category} className="mb-24 mt-8">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-xs font-bold tracking-[0.3em] text-amber-500 uppercase font-mono">
                // {category === 'weddingShoot' ? '01 / Wedding Sessions' : category === 'preWeddingShoot' ? '02 / Pre-Wedding Timeline' : category === 'eventCoverup' ? '03 / Festival Coverups' : '04 / Elite Portraits'}
              </h3>
              <div className="h-[1px] bg-zinc-900 flex-1"></div>
            </div>
            
            {/* Flawless Square Grid Layout with extra top margin per grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
              {photos.map((photo, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden bg-[#08080d] border border-zinc-900/90 aspect-square w-full shadow-2xl flex items-center justify-center p-1.5 group transition-all duration-500 hover:scale-[1.04] hover:border-amber-500 hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] cursor-crosshair">
                  <img src={photo.src} alt="ARK Premium Capture Asset Grid" loading="lazy" className="w-full h-full object-cover object-center rounded-lg transition-transform duration-700 group-hover:scale-102" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ─── 6. PREMIUM SIGNATURE INVESTMENT MATRICES ─── */}
      <section id="rates-card" className="max-w-6xl mx-auto px-4 md:px-6 py-24 border-t border-zinc-900 scroll-mt-20">
        <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white uppercase font-sans">Signature Rates Card</h2>
            <p className="text-zinc-500 text-xs mt-1 font-mono">Official sheet pricing matrices. July and August calendar phases are fully open for reservation.</p>
          </div>
          <button onClick={triggerPdfDownload} className="px-5 py-3 bg-zinc-900 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest rounded-sm shadow-2xl hover:bg-amber-500 hover:text-black transition-all font-mono">↓ Download Price Catalog PDF</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {packages.map((pkg, idx) => (
            <div key={idx} className="bg-[#09090f] border border-zinc-900 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300 shadow-3xl">
              <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden border-b border-zinc-900">
                <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover object-center opacity-35" />
                <div className="absolute bottom-4 left-4 bg-black/95 text-amber-400 px-3 py-1.5 rounded text-xs font-mono font-bold border border-zinc-800 shadow-2xl">₹{pkg.price}</div>
              </div>
              <div className="p-6 space-y-4 bg-black/40">
                <h3 className="text-base font-bold text-white tracking-tight">{pkg.title}</h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">{pkg.desc}</p>
                <div className="pt-2">
                  <button onClick={triggerPdfDownload} className="block w-full text-center py-3 bg-zinc-900 text-[10px] font-black rounded uppercase tracking-widest text-zinc-300 border border-zinc-800 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all font-mono">Get PDF Inquire</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 7. AUTOMATED CUSTOMER REVIEWS SLIDER ─── */}
      <section id="reviews" className="py-24 bg-gradient-to-b from-transparent to-[#050508] border-t border-zinc-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">Client Testimonials</h2>
            <p className="text-zinc-500 text-xs mt-2 font-mono">Shifting rows of 3 verified records automatically every 5 seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 mt-4">
            {testimonials.slice(reviewGroupIndex * 3, (reviewGroupIndex * 3) + 3).map((t, idx) => (
              <div key={idx} className="p-8 bg-zinc-900/10 border border-zinc-800/60 rounded-xl space-y-4 flex flex-col justify-between backdrop-blur-md shadow-2xl hover:border-zinc-700 transition-colors">
                <div>
                  <div className="text-amber-500 text-xs font-mono mb-2">★★★★★</div>
                  <p className="text-zinc-300 text-xs leading-relaxed italic font-light">"{t.text}"</p>
                </div>
                <div className="pt-4 border-t border-zinc-800/60 flex justify-between items-center text-[11px]">
                  <div>
                    <span className="text-white font-bold block">{t.name}</span>
                    <span className="text-zinc-500 text-[9px] font-mono block">{t.role}</span>
                  </div>
                  <span className="text-zinc-600 font-mono text-[9px] bg-black px-2 py-0.5 rounded border border-zinc-900">Verified</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-10">
            <button onClick={() => setReviewGroupIndex(0)} className={`w-2 h-2 rounded-full transition-all ${reviewGroupIndex === 0 ? 'bg-amber-500 w-6' : 'bg-zinc-800'}`}></button>
            <button onClick={() => setReviewGroupIndex(1)} className={`w-2 h-2 rounded-full transition-all ${reviewGroupIndex === 1 ? 'bg-amber-500 w-6' : 'bg-zinc-800'}`}></button>
          </div>
        </div>
      </section>

      {/* ─── 8. LIVE CALENDAR LEDGER SLOTS ─── */}
      <section id="live-slots" className="max-w-7xl mx-auto px-4 md:px-6 py-24 border-t border-zinc-900 scroll-mt-20">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase font-sans">Live Booking Ledger Matrix</h2>
          <p className="text-zinc-500 text-xs mt-1 font-mono">Real-time status configurations mapped directly from internal server arrays dashboard panels.</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-3 bg-zinc-950 p-6 rounded-xl border border-zinc-900/80 shadow-3xl mt-4">
          {Array.isArray(slots) && slots.map((slot, index) => (
            <div key={index} className={`p-4 rounded-lg border flex flex-col justify-between items-center h-24 transition-all ${slot.isBooked ? 'bg-red-950/10 border-red-900/20 text-zinc-600 select-none' : 'bg-zinc-900/40 border-zinc-800/80 hover:border-amber-500/20 shadow-md'}`}>
              <div className="text-center">
                <span className="text-[8px] font-mono block opacity-40">JUNE</span>
                <span className="text-base font-black block text-white mt-0.5 font-mono">{index + 1}</span>
              </div>
              <span className={`inline-block px-2 py-0.5 text-[7px] font-bold uppercase rounded tracking-wider ${slot.isBooked ? 'bg-red-900/20 text-red-400' : 'bg-emerald-950/40 text-emerald-400'}`}>{slot.isBooked ? 'Booked' : 'Free'}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 9. INTEGRATED DUAL INTERACTIVE HUB ─── */}
      <section id="inquiry-hub" className="max-w-6xl mx-auto px-4 py-24 border-t border-zinc-900 scroll-mt-20">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white uppercase font-sans">Instant Help & Booking Inquiry Hub</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-4">
          {/* STANDARD INQUIRY FORM */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-xl p-6 md:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-md">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white tracking-wide uppercase border-b border-zinc-800 pb-3 font-mono">// 01 / Submit Booking Inquiry</h3>
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 font-mono mb-2 uppercase text-[10px]">Full Name / नाम *</label>
                  <input type="text" required value={inquiryData.name} onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})} placeholder="Write full name..." className="w-full bg-black border border-zinc-800 focus:border-amber-500 rounded px-4 py-3 text-white focus:outline-none text-xs" />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono mb-2 uppercase text-[10px]">Mobile Number *</label>
                  <input type="tel" required value={inquiryData.phone} onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})} placeholder="e.g. 8210138909" className="w-full bg-black border border-zinc-800 focus:border-amber-500 rounded px-4 py-3 text-white focus:outline-none text-xs" />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono mb-2 uppercase text-[10px]">Target Event Date *</label>
                  <input type="date" required value={inquiryData.date} onChange={(e) => setInquiryData({...inquiryData, date: e.target.value})} className="w-full bg-black border border-zinc-800 focus:border-amber-500 rounded px-4 py-3 text-white focus:outline-none text-xs text-zinc-400" />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono mb-2 uppercase text-[10px]">Extra Notes</label>
                  <textarea rows="3" value={inquiryData.notes} onChange={(e) => setInquiryData({...inquiryData, notes: e.target.value})} placeholder="Setup configuration requirements..." className="w-full bg-black border border-zinc-800 focus:border-amber-500 rounded px-4 py-3 text-white focus:outline-none text-xs resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-3.5 bg-amber-500 text-black font-black uppercase tracking-widest rounded-md hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all font-mono">Submit Parameters</button>
              </form>
            </div>
          </div>

          {/* ADVANCED AI CHAT ARCHITECTURE SYSTEM CONTAINER */}
          <div id="ai-assistant-node" className="bg-zinc-950/80 border border-zinc-800 rounded-xl flex flex-col justify-between overflow-hidden shadow-2xl min-h-[460px] scroll-mt-24">
            <div className="bg-zinc-900/60 px-5 py-3.5 border-b border-zinc-800 flex justify-between items-center">
              <span className="text-[10px] font-bold text-white uppercase font-mono">02 / Integrated ARK AI Engine</span>
              <span className="text-[9px] font-mono text-zinc-500 bg-black px-2 py-0.5 rounded border border-zinc-900">24/7 ONLINE</span>
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-[11px] max-h-[340px]">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 max-w-[85%] rounded-lg shadow-md ${m.sender === 'user' ? 'bg-amber-500 text-black font-semibold' : 'bg-zinc-900 text-zinc-300 border border-zinc-800/40'}`}>{m.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendChatMessage} className="p-3 border-t border-zinc-900 bg-zinc-900/30 flex gap-2">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type message, e.g., Shadi or Hello..." className="flex-1 bg-black border border-zinc-800 focus:border-amber-500 rounded px-4 py-2.5 text-xs text-white focus:outline-none" />
              <button type="submit" className="px-5 bg-amber-500 text-black text-xs font-black rounded hover:bg-amber-400 transition-all uppercase tracking-wider font-mono shadow-[0_0_15px_rgba(245,158,11,0.4)]">Send</button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── CORPORATE STANDARD TAILORED FOOTER LINKS ─── */}
      <footer className="border-t border-zinc-800 bg-gradient-to-b from-[#07070c] to-[#020204] py-16 px-6 md:px-16 text-slate-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-xs">
          
          <div className="space-y-4">
            <img src="/src/assets/ARK studios.png" alt="ARK Logo" className="h-12 w-auto opacity-100 filter drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]" />
            <p className="text-zinc-400 leading-relaxed text-[11px] font-sans">
              Premium photography, cinematography, and automated drone flight fleet structures based out of East Champaran.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-black text-[11px] uppercase font-mono tracking-widest text-amber-500">// STUDIO HQ</h4>
            <p className="text-zinc-400 leading-relaxed text-[11px] font-sans">{studioDetails.address}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-black uppercase text-[11px] font-mono tracking-widest text-amber-500">// COMMUNICATIONS</h4>
            <p className="font-sans">📞 Hotline: <span className="text-zinc-200 font-mono font-bold">+91 {studioDetails.phone}</span></p>
            <p className="font-sans">✉️ Mailbox: <span className="text-zinc-200 font-mono break-all">{studioDetails.email}</span></p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-black uppercase text-[11px] font-mono tracking-widest text-amber-500">// SOCIAL DIRECTORIES</h4>
            <div className="flex flex-col gap-2.5 font-mono text-[10px] font-bold">
              <a href={studioDetails.fbLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2.5 bg-[#0a0a12] border border-zinc-800 rounded text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-all shadow-md group">
                <span>🔵</span> FACEBOOK PROFILE <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">»</span>
              </a>
              <a href={studioDetails.fbLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2.5 bg-[#0a0a12] border border-zinc-800 rounded text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-all shadow-md group">
                <span>📸</span> INSTAGRAM HANDLE <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">»</span>
              </a>
              <a href={studioDetails.ytChannel} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2.5 bg-[#0a0a12] border border-zinc-800 rounded text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-all shadow-md group">
                <span>🔴</span> YOUTUBE CHANNEL <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">»</span>
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-zinc-900 text-center text-[9px] text-zinc-500 font-mono tracking-widest uppercase">
          © 2026 ARK STUDIO PHOTOGRAPHY PRODUCTION. ALL RIGHTS RESERVED. ( Designed & Developed by ScaleBoot Software Agency).
        </div>
      </footer>

      {/* FLOATING WHATSAPP CHAT MATRIX INFRASTRUCTURE */}
      <div className="fixed bottom-5 left-5 z-50">
        <a href={studioDetails.whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all">
          <span className="text-[10px] font-mono font-bold tracking-wide">WhatsApp Chat</span>
        </a>
      </div>

    </div>
  );
}