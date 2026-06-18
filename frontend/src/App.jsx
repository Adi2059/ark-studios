import React, { useState, useEffect } from 'react';
import Admin from './Admin'; 

export default function App() {
  // ─── SECRET ADMIN ROUTER ───
  if (typeof window !== 'undefined' && window.location.hash === '#admin') {
    return <Admin />;
  }

  const [slots, setSlots] = useState([]);
  
  // ─── POPUP & MOBILE MENU STATES ───
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile Navbar State
  
  // ─── LUXURY TIMELINE PRE-LOADER STATES ───
  const [siteLoading, setSiteLoading] = useState(true);
  const [showText, setShowText] = useState(false);
  const [fadeExit, setFadeExit] = useState(false);

<<<<<<< HEAD
=======
  // ─── LOCAL STATE FOR LANDSCAPE LIGHTBOX MODAL (POPUP PLAYER) ───
  const [activePopupVideo, setActivePopupVideo] = useState(null);

>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
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
    ownerPhoto: "/assets/ravi.jpeg"
  };

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

  const portfolioPhotos = {
    weddingShoot: [
      { src: "/assets/wed.jpg" },
      { src: "/assets/wed1.jpg" },
      { src: "/assets/wed2.jpg" },
      { src: "/assets/wed3.jpg" }
    ],
    preWeddingShoot: [
      { src: "/assets/eng.jpg" },
<<<<<<< HEAD
      { src: "/assets/eng1.jpg" },
      { src: "/assets/eng2.jpg" },
      { src: "/assets/eng3.jpg" }
    ],
=======
      { src: "/assets/pre2.jpg" }, 
      { src: "/assets/pre3.jpg" }, 
      { src: "/assets/eng3.jpg" }
    ],
    haldiMehendiShoot: [
      { src: "/assets/mh1.jpg" },
      { src: "/assets/mh2.jpg" },
      { src: "/assets/mh3.jpg" },
      { src: "/assets/mh4.jpg" },
      { src: "/assets/mh5.jpg" },
      { src: "/assets/mh6.jpg" },
      { src: "/assets/mh7.jpg" }
    ],
    babyShoot: [
      { src: "/assets/by1.jpg" },
      { src: "/assets/by2.jpg" },
      { src: "/assets/by3.jpg" },
      { src: "/assets/by4.jpg" }
    ],
    cinematicVideos: [
      { src: "/assets/vv1.webm", isVideo: true },
      { src: "/assets/vv2.webm", isVideo: true }
    ],
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
    eventCoverup: [
      { src: "/assets/bir.jpg" },
      { src: "/assets/dr.jpg" },
      { src: "/assets/dr1.jpg" },
<<<<<<< HEAD
      { src: "/assets/eng2.jpg"},
=======
      { src: "/assets/eng2.jpg"}
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
    ],
    portraitShoot: [
      { src: "/assets/wed4.jpg" },
      { src: "/assets/wed6.jpg" },
      { src: "/assets/eng4.jpg" },
<<<<<<< HEAD
      { src: "/assets/wed2.jpg" },
=======
      { src: "/assets/wed2.jpg" }
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
    ]
  };

  const packages = [
    { title: "Wedding Photography", price: "22,000", img: "/assets/wed.jpg", desc: "Premium candid and traditional coverage. We capture the raw emotions, tears of joy, and grand celebrations of your big day with high-end Sony multi-cam setups." },
    { title: "Wedding Cinematography", price: "35,000", img: "/assets/wed1.jpg", desc: "A blockbuster movie of your wedding! Shot on Sony FX30 Cinema Line with drone tracking, delivering a high-fidelity cinematic masterpiece." },
    { title: "Pre-Wedding Shoot", price: "15,000", img: "/assets/eng.jpg", desc: "Tell your love story before the wedding. Includes DJI professional flight drone operations on stunning outdoor locations with custom color grading." },
    { title: "Birthday / Event Party", price: "4,000", img: "/assets/bir.jpg", desc: "Crisp processing loops with stylized customized traditional party layouts. Perfect for birthdays, anniversaries, or ring ceremonies." },
    { title: "Portrait Shoot Portfolio", price: "3,000", img: "/assets/eng1.jpg", desc: "High contrast custom color grading portrait panels. Best for individual modeling portfolios, professional headshots, or personal styling shoots." }
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

  // ─── LIVE 30-DAY DYNAMIC CALENDAR LOGIC ───
  useEffect(() => {
    const fetchLiveSlots = async () => {
      try {
        const response = await fetch('https://ark-studios-api.onrender.com/api/slots');
        let dbSlots = [];
        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.data)) {
            dbSlots = data.data; 
          }
        }

        const generatedSlots = [];
        const today = new Date();
        
        for (let i = 0; i < 30; i++) {
          const currentDate = new Date(today);
          currentDate.setDate(today.getDate() + i);
          
          const yyyy = currentDate.getFullYear();
          const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
          const dd = String(currentDate.getDate()).padStart(2, '0');
          const dateString = `${yyyy}-${mm}-${dd}`;
          
          const monthName = currentDate.toLocaleString('default', { month: 'short' }).toUpperCase();
          const dayNum = currentDate.getDate();

          const dbMatch = dbSlots.find(s => s.date === dateString);
          
          generatedSlots.push({
            dateString: dateString,
            monthName: monthName,
            dayNum: dayNum,
            isBooked: dbMatch ? dbMatch.isBooked : false
          });
        }
        setSlots(generatedSlots);
      } catch (error) {
        console.error("Live Slots Fetch Error:", error);
      }
    };
    fetchLiveSlots();
  }, []);

  const triggerPdfDownload = (e) => {
    if (e) e.preventDefault();
<<<<<<< HEAD
    const catalogData = `=======================================================\n               ARK STUDIO PHOTOGRAPHY\n          Premium Production Portfolio Catalog\n=======================================================\nSTUDIO CONTACT DIRECTORIES:\n-------------------------------------------------------\nDirector/Owner: ${studioDetails.ownerName}\nHotline Contact: +91 ${studioDetails.phone}\nStudio Headquarters: ${studioDetails.address}\nOfficial Inbox: ${studioDetails.email}\nOFFICIAL SERVICE INVESTMENT STRUCTURE:\n-------------------------------------------------------\n1. Wedding Photography            : INR 22,000\n2. Wedding Cinematography         : INR 35,000\n3. Pre-Wedding Shoot              : INR 15,000\n4. Birthday / Event Party Coverup : INR 4,000\n5. Portrait Shoot Portfolio       : INR 3,000\nAVAILABILITY LIFECYCLE WINDOW:\n-------------------------------------------------------\n* Current Status Notice: Our seasonal calendar windows are entirely empty and open for booking!\n=======================================================\n       ARK STUDIO © 2026 - ALL RIGHTS RESERVED\n=======================================================`;
    const blob = new Blob([catalogData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const linkNode = document.createElement('a');
    linkNode.href = url;
    linkNode.download = 'ARK_Studio_Official_Investment_Brochure.txt';
    document.body.appendChild(linkNode);
    linkNode.click();
    document.body.removeChild(linkNode);
    URL.revokeObjectURL(url);
=======
    const linkNode = document.createElement('a');
    linkNode.href = '/assets/arkfinalbou.pdf';
    linkNode.download = 'arkfinalbou.pdf';
    document.body.appendChild(linkNode);
    linkNode.click();
    document.body.removeChild(linkNode);
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
  };

  const [inquiryData, setInquiryData] = useState({ name: '', phone: '', date: '', notes: '' });
  
  const handleSlotClick = (slot) => {
    if (slot.isBooked) {
      alert("⚠️ Ye date pehle se BOOKED hai! Kripya kisi 'Open' (Green) date ko select karein.");
    } else {
      setInquiryData({ ...inquiryData, date: slot.dateString });
      setShowBookingModal(true);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ark-studios-api.onrender.com/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
      if (response.ok) {
        alert(`Thank you ${inquiryData.name}! Booking request safely sent to Studio Admin.`);
        setInquiryData({ name: '', phone: '', date: '', notes: '' }); 
        setShowBookingModal(false); 
      } else alert("Server error processing your request. Please try again.");
    } catch (error) {
      alert("Network Error! Failed to connect to the studio server.");
    }
  };

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
          aiReply = "Ji bilkul, Wedding segment me humare paas clear rates hain:\n• Wedding Photography: ₹22,000\n• Wedding Cinematography: ₹35,000\n\nBooking stream generate karne ke liye kripya apna Full Name (पूरा नाम) bataiye?";
          nextStep = 'collect_name';
        } else if (refinedText.includes('pre') || refinedText.includes('pre-wedding')) {
          updatedState.package = "Pre-Wedding Master Shoot";
          aiReply = "Pre-Wedding Shoot ka package ₹15,000 hai. Kripya process aage badhane ke liye apna Full Name (पूरा नाम) share karein?";
          nextStep = 'collect_name';
        } else if (refinedText.includes('party') || refinedText.includes('birthday') || refinedText.includes('event')) {
          updatedState.package = "Party/Event Standard Track";
          aiReply = "Birthday/Event coverage ka charge ₹4,000 hai. Kripya apna Full Name (पूरा नाम) likhiye?";
          nextStep = 'collect_name';
        } else if (refinedText.includes('portrait') || refinedText.includes('portfolio') || refinedText.includes('model')) {
          updatedState.package = "Portrait Portfolio";
          aiReply = "Portrait Shoot/Portfolio ka special charge ₹3,000 hai. Kripya register karne ke liye aap apna Full Name (पूरा नाम) likhiye?";
          nextStep = 'collect_name';
        } else {
          aiReply = "Ji Namaste, main Ravish Kumar hoon. ARK STUDIO me hum Wedding (₹22,000), Cinema (₹35,000), Pre-Wedding (₹15,000), Birthday (₹4,000) aur Portrait (₹3,000) dete hain. Aap apna event bataiye?";
        }
      } else if (nextStep === 'collect_name') {
        updatedState.name = textPayload;
        aiReply = `Dhanyawad ${textPayload}. Ab kripya apna Active Contact Number (मोबाइल नंबर) share kijiye?`;
        nextStep = 'collect_phone';
      } else if (nextStep === 'collect_phone') {
        updatedState.phone = textPayload;
<<<<<<< HEAD
        aiReply = "Noted safely! Aapka event kis targeted date (तारीख) ko scheduled hai?";
=======
        aiReply = "Noted safely! Aapka event kis targeted date (तारीkh) ko scheduled hai?";
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
        nextStep = 'collect_date';
      } else if (nextStep === 'collect_date') {
        updatedState.date = textPayload;
        aiReply = `🎉 Confirm ho gaya!\n\nClient: ${updatedState.name}\nPhone: ${updatedState.phone}\nDate: ${updatedState.date}\n\nMain Ravish Kumar aapse jald hi call par baat karunga!`;
        nextStep = 'init';
      }

      setBookingState({ ...updatedState, step: nextStep });
      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 600);
  };

  const [messages, setMessages] = useState([{ sender: 'ai', text: "Namaste! Main Ravish Kumar baat kar raha hoon ARK STUDIO se. Aapko kis type ke event ki booking karni hai ya rates janne hain?" }]);
  const [chatInput, setChatInput] = useState('');
  const [bookingState, setBookingState] = useState({ step: 'init', name: '', phone: '', date: '', package: '', days: '' });

  return (
    <div className="min-h-screen bg-[#020202] text-slate-100 font-sans antialiased selection:bg-amber-600 selection:text-white scroll-smooth relative">
      
      {/* ─── STYLESHEET ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Manrope:wght@300;400;600;800&display=swap');
        .font-classic { font-family: 'Cinzel', serif; }
        .font-modern { font-family: 'Manrope', sans-serif; }
        .perspective-canvas { perspective: 1500px; }
        
        @keyframes float-rotate-3d {
          0% { transform: translateY(0px) rotateX(4deg) rotateY(-4deg); box-shadow: -10px 10px 30px rgba(0,0,0,0.8); }
          50% { transform: translateY(-15px) rotateX(-2deg) rotateY(4deg); box-shadow: -20px 20px 50px rgba(245,158,11,0.15); }
          100% { transform: translateY(0px) rotateX(4deg) rotateY(-4deg); box-shadow: -10px 10px 30px rgba(0,0,0,0.8); }
        }
        
        .rate-card-3d {
          transform-style: preserve-3d;
          animation: float-rotate-3d 6s ease-in-out infinite;
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .rate-card-3d:hover {
          animation-play-state: paused;
          transform: translateZ(40px) scale(1.05) rotateX(0deg) rotateY(0deg) !important;
          border-color: rgba(245, 158, 11, 0.8) !important;
          z-index: 20;
          box-shadow: 0 0 50px rgba(245, 158, 11, 0.2);
        }

        .card-3d-wrapper { transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s ease; }
        .card-3d-wrapper:hover { transform: rotateX(8deg) rotateY(-8deg) scale(1.03); box-shadow: -20px 20px 40px rgba(245, 158, 11, 0.15); z-index: 10; }
        .card-img-3d { transition: transform 0.6s ease; }
        .card-3d-wrapper:hover .card-img-3d { transform: translateZ(30px) scale(1.05); }
        .card-content-3d { transition: all 0.5s ease; transform: translateZ(50px); opacity: 0; }
        .card-3d-wrapper:hover .card-content-3d { opacity: 1; transform: translateZ(60px) translateY(-10px); }
        .card-glare { position: absolute; inset: 0; z-index: 5; opacity: 0; background: linear-gradient(125deg, transparent 15%, rgba(255,255,255,0.15) 25%, transparent 40%); transition: opacity 0.6s ease; pointer-events: none; }
        .card-3d-wrapper:hover .card-glare { opacity: 1; }
      `}</style>

<<<<<<< HEAD
=======
      {/* ─── FULL SCREEN CINEMATIC LANDSCAPE LIGHTBOX MODAL (16:9 FORMAT AS REQUESTED) ─── */}
      {activePopupVideo && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/95 backdrop-blur-3xl transition-all duration-300 p-4">
          <button 
            onClick={() => setActivePopupVideo(null)} 
            className="absolute top-6 right-6 text-white hover:text-amber-500 text-4xl font-light transition-colors z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 border border-white/10 shadow-2xl backdrop-blur-sm"
            title="Close Video"
          >
            &times;
          </button>
          
          {/* Landscape Wide Player Wrapper */}
          <div className="relative max-w-5xl w-full aspect-[16/9] bg-black shadow-[0_0_80px_rgba(245,158,11,0.3)] border border-amber-500/40 overflow-hidden rounded-sm">
            <video 
              src={activePopupVideo} 
              controls 
              autoPlay 
              loop
              playsInline
              className="w-full h-full object-cover bg-black"
            />
          </div>
        </div>
      )}

>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
      {/* ─── PACKAGE DETAILS POP-UP MODAL ─── */}
      {selectedPackage && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all">
          <div className="bg-[#050505] border border-amber-500/30 p-0 w-full max-w-4xl shadow-[0_0_80px_rgba(245,158,11,0.15)] relative animate-fade-in flex flex-col md:flex-row rounded-sm overflow-hidden">
            <button onClick={() => setSelectedPackage(null)} className="absolute top-4 right-5 text-white bg-black/50 hover:text-amber-500 text-4xl font-light transition-colors z-10 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm border border-white/10 hover:border-amber-500">&times;</button>
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
               <img src={selectedPackage.img} alt={selectedPackage.title} className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1]" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent md:bg-gradient-to-r" />
               <div className="absolute bottom-6 left-6">
                 <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-500 bg-black/50 px-3 py-1 border border-amber-500/30 backdrop-blur-md">ARK Original Quality</span>
               </div>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold block mb-2">// Premium Session</span>
                <h3 className="font-classic text-3xl md:text-4xl text-white font-black leading-tight tracking-wide">{selectedPackage.title}</h3>
              </div>
              <p className="text-zinc-400 text-sm font-light leading-relaxed tracking-wide">{selectedPackage.desc}</p>
              <div className="pt-6 border-t border-white/10 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Standard Investment</span>
                  <span className="font-classic text-4xl text-amber-500 font-bold">₹{selectedPackage.price}</span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 text-right">Per Event<br/>Session</span>
              </div>
              <button onClick={() => { setSelectedPackage(null); document.getElementById('live-slots').scrollIntoView({ behavior: 'smooth' }); }} className="w-full mt-4 py-4 bg-white text-black font-bold uppercase tracking-[0.2em] hover:bg-amber-500 transition-all text-xs shadow-[0_0_20px_rgba(255,255,255,0.1)]">Proceed To Booking Matrix</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── BOOKING FORM POP-UP MODAL ─── */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
          <div className="bg-[#050505] border border-white/10 p-8 w-full max-w-md shadow-2xl relative animate-fade-in rounded-sm">
            <button onClick={() => setShowBookingModal(false)} className="absolute top-4 right-5 text-zinc-500 hover:text-red-500 text-3xl font-light transition-colors">&times;</button>
            <h3 className="text-sm font-bold text-amber-500 tracking-[0.2em] uppercase border-b border-white/10 pb-4 mb-6">// Book Your Session</h3>
            <form onSubmit={handleInquirySubmit} className="space-y-6 text-sm">
              <div>
                <label className="block text-zinc-400 tracking-widest uppercase text-[10px] mb-2">Target Event Date (Selected)</label>
                <input type="date" required readOnly value={inquiryData.date} className="w-full bg-[#0a0a0a] border border-emerald-500/50 text-emerald-500 px-4 py-4 focus:outline-none transition-colors cursor-not-allowed font-mono" />
              </div>
              <div>
                <label className="block text-zinc-400 tracking-widest uppercase text-[10px] mb-2">Full Name / नाम *</label>
                <input type="text" required value={inquiryData.name} onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})} placeholder="Write your full name" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-amber-500 px-4 py-4 text-white focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-zinc-400 tracking-widest uppercase text-[10px] mb-2">Mobile Number *</label>
                <input type="tel" required value={inquiryData.phone} onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})} placeholder="e.g. 8210138909" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-amber-500 px-4 py-4 text-white focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-zinc-400 tracking-widest uppercase text-[10px] mb-2">Extra Notes</label>
                <textarea rows="2" value={inquiryData.notes} onChange={(e) => setInquiryData({...inquiryData, notes: e.target.value})} placeholder="Any specific requirements..." className="w-full bg-[#0a0a0a] border border-white/10 focus:border-amber-500 px-4 py-4 text-white focus:outline-none resize-none transition-colors"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-amber-500 text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-all mt-4">Confirm Request</button>
            </form>
          </div>
        </div>
      )}

      {/* ─── PRE-LOADER ─── */}
      {siteLoading && (
        <div className={`fixed inset-0 z-[100] bg-[#020202] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${fadeExit ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'}`}>
          <div className="text-center space-y-6 max-w-2xl px-6">
            <img src="/assets/ARK studios.png" alt="ARK Studios Logo" className="h-28 md:h-40 w-auto object-contain mx-auto filter drop-shadow-[0_0_40px_rgba(245,158,11,0.5)] transform scale-100 animate-pulse" />
            <div className={`transition-all duration-1000 transform ${showText ? 'opacity-100 translate-y-0 tracking-[0.5em]' : 'opacity-0 translate-y-4 tracking-normal'}`}>
              <h2 className="text-sm md:text-lg text-white font-modern font-light uppercase">Premium Studios</h2>
              <div className="w-24 h-[1px] bg-amber-500/50 mx-auto mt-4"></div>
            </div>
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* ─── HEADER NAVBAR (NEW MOBILE MENU SYSTEM) ─── */}
=======
      {/* ─── HEADER NAVBAR ─── */}
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
      <header className="fixed top-0 w-full z-40 backdrop-blur-2xl bg-[#020202]/80 border-b border-white/5 px-6 md:px-16 py-4 flex justify-between items-center transition-all">
        <div>
          <img src="/assets/ARK studios.png" alt="ARK Studios" className="h-12 w-auto object-contain filter drop-shadow-[0_2px_15px_rgba(245,158,11,0.3)]" />
        </div>
        
        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-10 text-[11px] font-modern font-bold uppercase tracking-[0.2em] text-zinc-400">
          {['Portfolio', 'About Director', 'Rates Card', 'Live Slots'].map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="relative hover:text-amber-400 transition-colors duration-300">{link}</a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="#live-slots" className="hidden lg:inline-block px-6 py-2.5 bg-white text-black text-[10px] font-modern font-black uppercase tracking-widest rounded-sm hover:bg-amber-500 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">Book Session</a>
          
          {/* Mobile Hamburger Button */}
          <button 
            className="lg:hidden text-white hover:text-amber-500 transition-colors" 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#020202]/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-10 animate-fade-in">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 transition-colors">&times;</button>
          {['Portfolio', 'About Director', 'Rates Card', 'Live Slots'].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(' ', '-')}`} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-2xl font-classic font-bold uppercase tracking-[0.3em] text-white hover:text-amber-500 transition-colors"
            >
              {link}
            </a>
          ))}
          <a href="#live-slots" onClick={() => setIsMobileMenuOpen(false)} className="mt-8 px-10 py-4 bg-amber-500 text-black text-sm font-black uppercase tracking-widest hover:bg-white transition-all">Book Session</a>
        </div>
      )}

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex items-center justify-start px-6 md:px-20 overflow-hidden bg-black font-modern">
        <div className="absolute inset-0 z-0">
          {heroBackgrounds.map((bgUrl, index) => (
            <div key={index} className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out filter brightness-[0.45] contrast-[1.1]" style={{ backgroundImage: `url('${bgUrl}')`, opacity: index === currentBgIndex ? 1 : 0 }} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-1" />
        </div>

        <div className="relative z-10 max-w-4xl text-left space-y-6 pt-20">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500 border border-amber-500/30 px-4 py-2 backdrop-blur-md">
            Matiyariya Kothi • Established Excellence
          </span>
<<<<<<< HEAD
          <h1 className="font-classic text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[1.05]">
            Framing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-700 italic font-medium">Soulful Legacies.</span>
          </h1>
          <p className="text-zinc-400 max-w-xl text-sm md:text-base font-light leading-relaxed tracking-wide">
            Premium custom wedding frameworks, automated pre-wedding cinematography tracking systems, and high-fidelity production architectures.
          </p>
          
          <div className="pt-8 flex flex-wrap gap-5">
=======
          <h1 className="font-classic text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white text-left leading-[1.05]">
            Framing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-700 italic font-medium">Soulful Legacies.</span>
          </h1>
          <p className="text-zinc-400 max-w-xl text-sm md:text-base font-light leading-relaxed tracking-wide text-left">
            Premium custom wedding frameworks, automated pre-wedding cinematography tracking systems, and high-fidelity production architectures.
          </p>
          
          <div className="pt-8 flex flex-wrap gap-5 justify-start">
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
            <a href="#portfolio" className="px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] bg-white text-black hover:bg-amber-500 transition-all">Explore Work</a>
            <a href="#live-slots" className="px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] border border-white/20 text-white hover:border-amber-500 hover:text-amber-500 transition-all backdrop-blur-sm">🗓️ Check Slots</a>
          </div>
        </div>
      </section>

      {/* ─── ABOUT DIRECTOR ─── */}
      <section id="about-director" className="max-w-7xl mx-auto px-6 md:px-8 py-32 border-t border-white/5 scroll-mt-20 font-modern">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
<<<<<<< HEAD
          <div className="space-y-6">
=======
          <div className="space-y-6 text-left">
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
            <div className="flex items-center gap-3">
              <span className="text-xs font-modern text-amber-500 tracking-[0.3em] uppercase">// Studio Leadership</span>
              <div className="h-[1px] bg-white/10 flex-1"></div>
            </div>
<<<<<<< HEAD
            <h2 className="font-classic text-4xl md:text-6xl font-black text-white uppercase tracking-wider">Meet The <span className="text-amber-500 italic">Director</span></h2>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">{studioDetails.ownerName}</h3>
              <p className="text-zinc-500 text-xs tracking-wider uppercase">Lead Photographer & Cinematographer</p>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Managing heavy cinema architectures and autonomous flight operations at Main Market, Matiyariya Kothi. Delivering premium resolution masterframes across East Champaran with standard hardware setups.
            </p>
            <div className="pt-4">
=======
            <h2 className="font-classic text-4xl md:text-6xl font-black text-white uppercase tracking-wider text-left">Meet The <span className="text-amber-500 italic">Director</span></h2>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white text-left">{studioDetails.ownerName}</h3>
              <p className="text-zinc-500 text-xs tracking-wider uppercase text-left">Lead Photographer & Cinematographer</p>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-light text-left">
              Managing heavy cinema architectures and autonomous flight operations at Main Market, Matiyariya Kothi. Delivering premium resolution masterframes across East Champaran with standard hardware setups.
            </p>
            <div className="pt-4 text-left">
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
              <a href={`tel:${studioDetails.phone}`} className="inline-flex items-center gap-3 text-xs uppercase tracking-widest border border-white/20 rounded-sm px-6 py-3 text-zinc-300 hover:border-amber-500 hover:text-amber-500 transition-all">
                <span>📞 Connect:</span> +91 {studioDetails.phone}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-black group">
            <img src={studioDetails.ownerPhoto} alt={studioDetails.ownerName} className="w-full h-full object-cover object-center filter contrast-[1.1] brightness-[0.9] transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* ─── 3D PORTFOLIO GRID ─── */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-white/5 scroll-mt-20 font-modern">
        <div className="mb-20 text-center">
          <h2 className="font-classic text-4xl md:text-6xl font-bold text-white uppercase tracking-widest">Cinematic <span className="text-amber-500 italic">Portfolio</span></h2>
          <p className="text-zinc-500 text-sm mt-4 tracking-widest uppercase font-light">Hover over frames to experience 3D depth</p>
        </div>

        {Object.entries(portfolioPhotos).map(([category, photos]) => (
          <div key={category} className="mb-28">
            <div className="flex items-center gap-6 mb-12">
              <h3 className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase">
                 {category === 'weddingShoot' ? '01 // Wedding Sessions' : category === 'preWeddingShoot' ? '02 // Pre-Wedding' : category === 'eventCoverup' ? '03 // Event Coverups' : '04 // Elite Portraits'}
              </h3>
              <div className="h-[1px] bg-white/10 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 perspective-canvas">
              {photos.map((photo, i) => (
                <div key={i} className="card-3d-wrapper relative rounded-sm overflow-hidden bg-[#0a0a0a] border border-white/10 aspect-[4/5] cursor-crosshair group">
                  <div className="card-glare"></div>
                  <img src={photo.src} alt="ARK Capture" loading="lazy" className="card-img-3d w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="card-content-3d absolute bottom-6 left-6 right-6">
                     <span className="text-amber-400 text-[9px] tracking-[0.3em] uppercase block mb-1 font-bold">Premium Asset</span>
                     <span className="text-white font-classic text-xl italic tracking-wide">ARK Original</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ─── 3D FLOATING RATES CARD SECTION ─── */}
=======
      {/* ─── PORTFOLIO GRID ─── */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-white/5 scroll-mt-20 font-modern">
        <div className="mb-20 text-center">
          <h2 className="font-classic text-4xl md:text-6xl font-bold text-white uppercase tracking-widest">Cinematic <span className="text-amber-500 italic">Portfolio</span></h2>
          <p className="text-zinc-500 text-sm mt-4 tracking-widest uppercase font-light">Explore premium media assets</p>
        </div>

        {Object.entries(portfolioPhotos).map(([category, photos]) => {
          let sectionHeading = "";
          if (category === 'weddingShoot') sectionHeading = "01 // Wedding Sessions";
          else if (category === 'preWeddingShoot') sectionHeading = "02 // Pre-Wedding Shoot";
          else if (category === 'haldiMehendiShoot') sectionHeading = "03 // Haldi & Mehendi Rituals";
          else if (category === 'babyShoot') sectionHeading = "04 // Adorable Baby Shoot";
          else if (category === 'cinematicVideos') sectionHeading = "05 // Elite Landscape Masterframes & Reels";
          else if (category === 'eventCoverup') sectionHeading = "06 // Event Coverups";
          else if (category === 'portraitShoot') sectionHeading = "07 // Elite Portraits";

          const isVideoSection = category === 'cinematicVideos';

          return (
            <div key={category} className="mb-28">
              <div className="flex items-center gap-6 mb-12">
                <h3 className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase text-left">
                   {sectionHeading}
                </h3>
                <div className="h-[1px] bg-white/10 flex-1"></div>
              </div>
              
              {/* 16:9 WIDE CINEMATIC LANDSCAPE GRID ARCHITECTURE AS REQUESTED */}
              <div className={`grid ${isVideoSection ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'} perspective-canvas`}>
                {photos.map((photo, i) => {
                  return (
                    <div 
                      key={i} 
                      onClick={() => isVideoSection && setActivePopupVideo(photo.src)}
                      className={
                        isVideoSection 
                          ? 'relative rounded-sm overflow-hidden bg-black border border-white/10 aspect-[16/9] w-full cursor-pointer group shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-[0_25px_60px_rgba(245,158,11,0.25)]'
                          : 'card-3d-wrapper relative rounded-sm overflow-hidden bg-[#0a0a0a] border border-white/10 aspect-[4/5] cursor-crosshair group'
                      }
                    >
                      {isVideoSection ? (
                        /* PERFECT 16:9 LANDSCAPE CARD WITH LANDSCAPE VIDEO PREVIEW */
                        <div className="w-full h-full relative overflow-hidden aspect-[16/9]">
                          <video 
                            src={photo.src} 
                            muted 
                            autoPlay 
                            loop 
                            playsInline 
                            className="w-full h-full object-cover transition-transform duration-700 filter brightness-[0.8] group-hover:brightness-100 group-hover:scale-105" 
                          />
                          
                          {/* Dark Cinematic Gradient Shading */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/30 pointer-events-none" />
                          
                          <div className="absolute top-4 left-4 bg-amber-500 text-black border border-amber-600 px-2 py-0.5 text-[8px] font-black tracking-[0.15em] uppercase font-modern rounded-xs">
                            CINEMATIC WIDE
                          </div>

                          <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end z-10 pointer-events-none">
                            <div className="text-left">
                              <span className="text-[9px] uppercase tracking-widest text-amber-500 block mb-0.5 font-bold">16:9 Ultra HD</span>
                              <h4 className="font-classic text-base text-white font-bold tracking-wide">Master Session Cut #{i+1}</h4>
                            </div>
                            
                            {/* Tap To Play Icon Frame */}
                            <div className="flex items-center gap-1.5 text-zinc-400 text-[9px] tracking-widest font-bold bg-black/60 px-2 py-1 border border-white/5 backdrop-blur-sm">
                              <svg className="w-3 h-3 text-amber-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                              <span>PLAY VIDEO</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Standard Photo Framing Asset */
                        <>
                          <div className="card-glare"></div>
                          <img src={photo.src} alt="ARK Capture" loading="lazy" className="card-img-3d w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                          <div className="card-content-3d absolute bottom-6 left-6 right-6 text-left">
                             <span className="text-amber-400 text-[9px] tracking-[0.3em] uppercase block mb-1 font-bold text-left">Premium Asset</span>
                             <span className="text-white font-classic text-xl italic tracking-wide text-left">ARK Original</span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* ─── RATES CARD SECTION ─── */}
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
      <section id="rates-card" className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-white/5 scroll-mt-20 font-modern bg-[#020202] perspective-canvas overflow-hidden">
        <div className="mb-20 text-center">
          <h2 className="font-classic text-3xl md:text-5xl font-bold tracking-widest text-white uppercase">Investment <span className="text-amber-500 italic">Tiers</span></h2>
          <p className="text-zinc-500 text-xs mt-4 tracking-widest uppercase font-light">Click on any rotating module for premium details</p>
          <button onClick={triggerPdfDownload} className="mt-8 px-6 py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:border-amber-500 hover:text-amber-500 transition-all z-20 relative">↓ Download Official PDF</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 px-4 py-8">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedPackage(pkg)}
<<<<<<< HEAD
              className="rate-card-3d bg-[#080808] border border-white/10 p-8 flex flex-col justify-between cursor-pointer"
              style={{ animationDelay: `${idx * 1.2}s` }} 
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <h3 className="font-classic text-2xl font-bold text-white tracking-wider max-w-[70%] leading-tight">{pkg.title}</h3>
                  <span className="text-[10px] text-amber-500 border border-amber-500/30 px-2 py-1 uppercase tracking-widest font-bold bg-amber-500/5">View</span>
                </div>
                <div className="w-12 h-[1px] bg-amber-500 transition-all duration-500"></div>
                <p className="text-zinc-500 text-xs font-light leading-relaxed line-clamp-3">{pkg.desc}</p>
=======
              className="rate-card-3d bg-[#080808] border border-white/10 p-8 flex flex-col justify-between cursor-pointer text-left"
              style={{ animationDelay: `${idx * 1.2}s` }} 
            >
              <div className="space-y-6 text-left">
                <div className="flex justify-between items-start">
                  <h3 className="font-classic text-2xl font-bold text-white tracking-wider max-w-[70%] leading-tight text-left">{pkg.title}</h3>
                  <span className="text-[10px] text-amber-500 border border-amber-500/30 px-2 py-1 uppercase tracking-widest font-bold bg-amber-500/5">View</span>
                </div>
                <div className="w-12 h-[1px] bg-amber-500 transition-all duration-500"></div>
                <p className="text-zinc-500 text-xs font-light leading-relaxed line-clamp-3 text-left">{pkg.desc}</p>
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
              </div>
              <div className="mt-12 flex justify-between items-end border-t border-white/5 pt-6">
                <span className="text-amber-500 font-classic text-3xl font-bold tracking-wider">₹{pkg.price}</span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-600 font-bold">Standard</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── AUTOMATED CUSTOMER REVIEWS ─── */}
      <section id="reviews" className="py-32 bg-gradient-to-b from-[#020202] to-[#050505] border-t border-white/5 scroll-mt-20 font-modern">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-classic text-3xl md:text-5xl font-bold tracking-widest text-white uppercase">Client <span className="text-amber-500 italic">Stories</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500 mt-4">
            {testimonials.slice(reviewGroupIndex * 3, (reviewGroupIndex * 3) + 3).map((t, idx) => (
<<<<<<< HEAD
              <div key={idx} className="p-8 bg-[#0a0a0a] border border-white/5 flex flex-col justify-between shadow-2xl hover:border-amber-500/30 transition-colors">
                <div>
                  <div className="text-amber-500 text-sm mb-4 tracking-widest">★★★★★</div>
                  <p className="text-zinc-400 text-sm leading-relaxed font-classic italic">"{t.text}"</p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-white font-bold block uppercase tracking-widest text-xs">{t.name}</span>
                    <span className="text-amber-500 text-[10px] uppercase tracking-widest block mt-1">{t.role}</span>
=======
              <div key={idx} className="p-8 bg-[#0a0a0a] border border-white/5 flex flex-col justify-between shadow-2xl hover:border-amber-500/30 transition-colors text-left">
                <div className="text-left">
                  <div className="text-amber-500 text-sm mb-4 tracking-widest text-left">★★★★★</div>
                  <p className="text-zinc-400 text-sm leading-relaxed font-classic italic text-left">"{t.text}"</p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center text-left">
                  <div className="text-left">
                    <span className="text-white font-bold block uppercase tracking-widest text-xs text-left">{t.name}</span>
                    <span className="text-amber-500 text-[10px] uppercase tracking-widest block mt-1 text-left">{t.role}</span>
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-3 mt-12">
            <button onClick={() => setReviewGroupIndex(0)} className={`h-1 transition-all ${reviewGroupIndex === 0 ? 'bg-amber-500 w-8' : 'bg-white/20 w-4'}`}></button>
            <button onClick={() => setReviewGroupIndex(1)} className={`h-1 transition-all ${reviewGroupIndex === 1 ? 'bg-amber-500 w-8' : 'bg-white/20 w-4'}`}></button>
          </div>
        </div>
      </section>

      {/* ─── LIVE CALENDAR LEDGER SLOTS ─── */}
      <section id="live-slots" className="max-w-7xl mx-auto px-4 md:px-6 py-32 border-t border-white/5 scroll-mt-20 font-modern">
        <div className="mb-16 text-center">
          <h2 className="font-classic text-3xl md:text-5xl font-bold tracking-widest text-white uppercase">Availability <span className="text-amber-500 italic">Matrix</span></h2>
          <p className="text-zinc-500 text-xs mt-4 tracking-widest uppercase">Click on any <span className="text-emerald-500">"Open"</span> date to book your session directly.</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-4 bg-[#050505] p-8 border border-white/5 shadow-2xl mt-4">
          {slots.map((slot, index) => (
            <div 
              key={index} 
              onClick={() => handleSlotClick(slot)}
              className={`p-4 border flex flex-col justify-between items-center h-28 transition-all cursor-pointer ${slot.isBooked ? 'bg-[#110505] border-red-900/30 text-zinc-600 opacity-50' : 'bg-[#0a0a0a] border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/10 shadow-md'}`}
            >
              <div className="text-center pointer-events-none">
                <span className="text-[9px] tracking-widest uppercase block text-zinc-500">{slot.monthName}</span>
                <span className="font-classic text-2xl font-bold block text-white mt-1">{slot.dayNum}</span>
              </div>
              <span className={`inline-block px-2 py-1 text-[8px] font-bold uppercase tracking-widest ${slot.isBooked ? 'text-red-500' : 'text-emerald-500'}`}>{slot.isBooked ? 'Booked' : 'Open'}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── AI CHAT HUB ─── */}
      <section id="inquiry-hub" className="max-w-4xl mx-auto px-4 py-32 border-t border-white/5 scroll-mt-20 font-modern">
        <div className="mb-16 text-center">
          <h2 className="font-classic text-3xl md:text-5xl font-bold tracking-widest text-white uppercase">AI Assistant <span className="text-amber-500 italic">Node</span></h2>
          <p className="text-zinc-500 text-xs mt-4 tracking-widest uppercase">Have questions? Ask our 24/7 AI System</p>
        </div>

        <div id="ai-assistant-node" className="bg-[#050505] border border-white/10 flex flex-col justify-between overflow-hidden shadow-2xl min-h-[500px] scroll-mt-24">
          <div className="bg-[#0a0a0a] px-8 py-5 border-b border-white/10 flex justify-between items-center">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">// ARK AI Engine</span>
            <span className="text-[9px] text-emerald-500 bg-emerald-500/10 px-3 py-1 border border-emerald-500/20 tracking-widest">ONLINE</span>
          </div>
          <div className="flex-1 p-8 overflow-y-auto space-y-6 text-sm max-h-[400px]">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
<<<<<<< HEAD
                <div className={`p-4 max-w-[85%] leading-relaxed ${m.sender === 'user' ? 'bg-amber-500 text-black font-semibold' : 'bg-[#0a0a0a] text-zinc-300 border border-white/10'}`}>{m.text}</div>
=======
                <div className={`p-4 max-w-[85%] leading-relaxed text-left ${m.sender === 'user' ? 'bg-amber-500 text-black font-semibold' : 'bg-[#0a0a0a] text-zinc-300 border border-white/10'}`}>{m.text}</div>
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
              </div>
            ))}
          </div>
          <form onSubmit={handleSendChatMessage} className="p-4 border-t border-white/10 bg-[#0a0a0a] flex gap-3">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type message, e.g., Shadi or Hello..." className="flex-1 bg-black border border-white/10 focus:border-amber-500 px-4 py-3 text-white focus:outline-none transition-colors" />
            <button type="submit" className="px-6 bg-white text-black text-xs font-bold hover:bg-amber-500 transition-all uppercase tracking-[0.2em]">Send</button>
          </form>
        </div>
      </section>

<<<<<<< HEAD
      {/* ─── PREMIUM CINEMATIC FOOTER ─── */}
=======
      {/* ─── FOOTER ─── */}
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
      <footer className="relative bg-[#020202] border-t border-white/5 pt-32 pb-12 overflow-hidden font-modern">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-classic font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter">
          ARK STUDIO
        </div>

<<<<<<< HEAD
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-16 text-sm">
          <div className="space-y-6 col-span-1 md:col-span-2">
            <img src="/assets/ARK studios.png" alt="ARK Logo" className="h-16 w-auto opacity-100 filter drop-shadow-[0_2px_15px_rgba(245,158,11,0.2)]" />
            <p className="text-zinc-500 max-w-sm font-light leading-loose pt-2">
=======
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-16 text-sm text-left">
          <div className="space-y-6 col-span-1 md:col-span-2 text-left">
            <img src="/assets/ARK studios.png" alt="ARK Logo" className="h-16 w-auto opacity-100 filter drop-shadow-[0_2px_15px_rgba(245,158,11,0.2)] text-left" />
            <p className="text-zinc-500 max-w-sm font-light leading-loose pt-2 text-left">
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
              Setting the gold standard in wedding cinematography and premium photography frameworks across East Champaran. 
            </p>
          </div>

<<<<<<< HEAD
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em]">// Headquarter</h4>
            <p className="text-zinc-400 font-light leading-loose">{studioDetails.address}</p>
            <div className="space-y-2 pt-2">
              <p className="text-zinc-400">T: <a href={`tel:${studioDetails.phone}`} className="text-white hover:text-amber-500 transition-colors">+91 {studioDetails.phone}</a></p>
              <p className="text-zinc-400">E: <a href={`mailto:${studioDetails.email}`} className="text-white hover:text-amber-500 transition-colors">arkvideomixinglab</a></p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em]">// Social</h4>
            <div className="flex flex-col gap-4">
              <a href={studioDetails.fbLink} className="text-zinc-400 hover:text-amber-500 text-xs tracking-[0.2em] uppercase transition-colors">Instagram</a>
              <a href={studioDetails.fbLink} className="text-zinc-400 hover:text-amber-500 text-xs tracking-[0.2em] uppercase transition-colors">Facebook</a>
              <a href={studioDetails.ytChannel} className="text-zinc-400 hover:text-amber-500 text-xs tracking-[0.2em] uppercase transition-colors">YouTube</a>
=======
          <div className="space-y-6 text-left">
            <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] text-left">// Headquarter</h4>
            <p className="text-zinc-400 font-light leading-loose text-left">{studioDetails.address}</p>
            <div className="space-y-2 pt-2 text-left">
              <p className="text-zinc-400 text-left">T: <a href={`tel:${studioDetails.phone}`} className="text-white hover:text-amber-500 transition-colors">+91 {studioDetails.phone}</a></p>
              <p className="text-zinc-400 text-left">E: <a href={`mailto:${studioDetails.email}`} className="text-white hover:text-amber-500 transition-colors">{studioDetails.email}</a></p>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] text-left">// Social</h4>
            <div className="flex flex-col gap-4 text-left">
              <a href="https://www.instagram.com/arkravish?igsh=Zmg2bmo3NG10OHNn" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-amber-500 text-xs tracking-[0.2em] uppercase transition-colors text-left">Instagram</a>
              <a href={studioDetails.fbLink} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-amber-500 text-xs tracking-[0.2em] uppercase transition-colors text-left">Facebook</a>
              <a href={studioDetails.ytChannel} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-amber-500 text-xs tracking-[0.2em] uppercase transition-colors text-left">YouTube</a>
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* NEW FOOTER BOTTOM WITH SECRET ADMIN BUTTON */}
        <div className="relative z-10 max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-zinc-600 tracking-widest uppercase">
          <p>© 2026 ARK STUDIO PRODUCTION.</p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {/* ✨ SECRET ADMIN BUTTON ✨ */}
          <button 
  onClick={() => {
    window.location.hash = 'admin';
    window.location.reload();
  }} 
  className="hover:text-amber-500 transition-colors border border-zinc-800 px-4 py-2 rounded-sm bg-black/50 backdrop-blur-md cursor-pointer"
>
  ⚙️ Admin Node
</button>
            <p>Designed & Engineered by ScaleBoot</p>
=======
        <div className="relative z-10 max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-zinc-600 tracking-widest uppercase">
          <p>© 2026 ARK STUDIO PRODUCTION.</p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <button 
              onClick={() => {
                window.location.hash = 'admin';
                window.location.reload();
              }} 
              className="hover:text-amber-500 transition-colors border border-zinc-800 px-4 py-2 rounded-sm bg-black/50 backdrop-blur-md cursor-pointer"
            >
              ⚙️ Admin Node
            </button>
            <p>Designed & Engineered by AfterUs Global</p>
>>>>>>> 83de00f61561bc676d812df9908290f2d66a8046
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href={studioDetails.whatsappLink} target="_blank" rel="noreferrer" className="flex items-center justify-center w-14 h-14 bg-amber-500 text-black rounded-full shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:bg-white hover:scale-110 active:scale-95 transition-all">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        </a>
      </div>

    </div>
  );
}