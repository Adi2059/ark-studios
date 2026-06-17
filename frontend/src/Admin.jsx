import React, { useState, useEffect } from 'react';

export default function Admin() {
  // ─── SECURITY ───
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // ─── TABS & STATES ───
  const [activeTab, setActiveTab] = useState('calendar');
  const [bookings, setBookings] = useState([]);
  const [staff, setStaff] = useState([]);
  const [slots, setSlots] = useState([]);
  const [assigningId, setAssigningId] = useState(null);
  
  // ─── FORMS & CALENDAR ───
  const [newStaff, setNewStaff] = useState({ name: '', phone: '', email: '' });
  const [assignData, setAssignData] = useState({});
  
  // Naya Custom Calendar Logic
  const [currentAdminMonth, setCurrentAdminMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]); // Multiple dates hold karne ke liye

  const API_URL = 'https://ark-studios-api.onrender.com/api'; 

  // ─── LOGIN HANDLER ───
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'ravish@2026') { 
      setIsAuthenticated(true);
    } else {
      alert('❌ Access Denied: Incorrect Password');
    }
  };

  // ─── FETCH DATA ───
  // ─── FETCH DATA (WITH 24-HOUR AUTO HIDE LOGIC) ───
  const fetchBookings = () => {
    fetch(`${API_URL}/bookings`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const now = new Date();
          
          // Filter: Jo Assigned ho gayi hain aur 24 ghante purani hain, unhe hata do
          const activeBookings = data.bookings.filter(b => {
            if (b.status === 'Assigned') {
              // Backend ke update time se check karo, agar wo nahi hai toh date se check karo
              const lastUpdated = b.updatedAt ? new Date(b.updatedAt) : new Date(b.date);
              const hoursPassed = (now - lastUpdated) / (1000 * 60 * 60);
              return hoursPassed < 24; // Agar 24 ghante se kam hua hai, tabhi dikhao
            }
            return true; // 'Pending' wali bookings hamesha dikhao
          });
          
          // List ko ulta karo taaki nayi booking sabse upar dikhe (Optional but good UX)
          setBookings(activeBookings.reverse());
        }
      })
      .catch(console.error);
  };
  const fetchStaff = () => fetch(`${API_URL}/staff`).then(res => res.json()).then(data => data.success && setStaff(data.data)).catch(console.error);
  const fetchSlots = () => fetch(`${API_URL}/slots`).then(res => res.json()).then(data => data.success && setSlots(data.data)).catch(console.error);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
      fetchStaff();
      fetchSlots();
    }
  }, [isAuthenticated]);

  // ─── 1. BOOKING ASSIGNMENT ───
  const handleAssignDuty = async (bookingId) => {
    const staffId = assignData[bookingId];
    if (!staffId) return alert("Pehle dropdown se Staff select karo bhai!");

    setAssigningId(bookingId); 
    
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffId })
      });
      const data = await res.json();
      if (data.success) {
        alert("🔥 Duty Assigned & SMS Sent Successfully!");
        fetchBookings(); 
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Network Error!");
    } finally {
      setAssigningId(null); 
    }
  };

  // ─── 2. STAFF MANAGEMENT ───
  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff)
      });
      if (res.ok) {
        alert("✅ Staff added successfully!");
        setNewStaff({ name: '', phone: '', email: '' });
        fetchStaff();
      }
    } catch (error) {
      alert("Failed to add staff");
    }
  };

  const handleDeleteStaff = async (id) => {
    if(!window.confirm("Is staff ko hatana chahte ho?")) return;
    await fetch(`${API_URL}/staff/${id}`, { method: 'DELETE' });
    fetchStaff();
  };

  // ─── 3. CUSTOM CALENDAR LOGIC ───
  const getYYYYMMDD = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const toggleDateSelection = (dateString) => {
    if (selectedDates.includes(dateString)) {
      setSelectedDates(selectedDates.filter(d => d !== dateString)); // Remove
    } else {
      setSelectedDates([...selectedDates, dateString]); // Add
    }
  };

  const handleUpdateSelectedSlots = async (isBookedStatus) => {
    if (selectedDates.length === 0) return alert("Bhai calendar se kam se kam ek date toh select kar!");
    
    try {
      const res = await fetch(`${API_URL}/slots/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dates: selectedDates, isBooked: isBookedStatus })
      });
      const data = await res.json();
      if (data.success) {
        alert(`✅ ${selectedDates.length} Dates successfully marked as ${isBookedStatus ? 'BOOKED' : 'FREE'}!`);
        setSelectedDates([]); // Clear selection after update
        fetchSlots(); 
      }
    } catch (error) {
      alert("Failed to update calendar.");
    }
  };

  const renderAdminCalendar = () => {
    const year = currentAdminMonth.getFullYear();
    const month = currentAdminMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const blanks = Array.from({ length: firstDay });
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const bookedDatesMap = new Set(slots.filter(s => s.isBooked).map(s => s.date));

    return (
      <div className="bg-[#0a0a0a] border border-zinc-800 p-6 md:p-8 rounded-sm shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest text-amber-500">// Interactive Calendar</h2>
          <div className="flex gap-4 items-center">
            <button onClick={() => setCurrentAdminMonth(new Date(year, month - 1, 1))} className="px-3 py-1 bg-zinc-900 border border-zinc-700 hover:border-amber-500 transition-colors">&larr;</button>
            <span className="font-classic text-xl tracking-widest uppercase w-48 text-center">{monthNames[month]} {year}</span>
            <button onClick={() => setCurrentAdminMonth(new Date(year, month + 1, 1))} className="px-3 py-1 bg-zinc-900 border border-zinc-700 hover:border-amber-500 transition-colors">&rarr;</button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {blanks.map((_, i) => <div key={`blank-${i}`} className="h-12 border border-transparent"></div>)}
          
          {days.map(day => {
            const dateStr = getYYYYMMDD(year, month, day);
            const isSelected = selectedDates.includes(dateStr);
            const isBookedInDB = bookedDatesMap.has(dateStr);

            return (
              <div 
                key={day}
                onClick={() => toggleDateSelection(dateStr)}
                className={`h-16 flex flex-col justify-center items-center border cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-amber-500 bg-amber-500/20 text-amber-500 scale-105 shadow-lg' 
                    : isBookedInDB 
                      ? 'border-red-900/40 bg-red-950/20 text-zinc-500 hover:border-red-500' 
                      : 'border-zinc-800 bg-black text-zinc-300 hover:border-amber-500/50'
                }`}
              >
                <span className="font-classic font-bold text-lg">{day}</span>
                {isBookedInDB && <span className="text-[7px] text-red-500 font-bold uppercase tracking-widest mt-1">Booked</span>}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-zinc-800">
          <div className="text-xs text-zinc-400 font-mono">
            Selected Dates: <span className="text-amber-500 font-bold">{selectedDates.length}</span>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
             <button onClick={() => handleUpdateSelectedSlots(false)} className="flex-1 sm:flex-none bg-emerald-600/10 text-emerald-500 border border-emerald-900 hover:bg-emerald-600 hover:text-white px-8 py-3 font-bold text-xs uppercase tracking-widest transition-all">Mark Free</button>
             <button onClick={() => handleUpdateSelectedSlots(true)} className="flex-1 sm:flex-none bg-red-600/10 text-red-500 border border-red-900 hover:bg-red-600 hover:text-white px-8 py-3 font-bold text-xs uppercase tracking-widest transition-all">Mark Booked</button>
          </div>
        </div>
      </div>
    );
  };

  // ─── LOGIN SCREEN RENDER ───
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0a0a0a] border border-zinc-800 p-8 shadow-2xl space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-amber-500 uppercase tracking-widest" style={{fontFamily: "'Cinzel', serif"}}>ARK Node</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2">Classified Access Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                autoFocus
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
                placeholder="Enter Master Password" 
                className="w-full bg-black border border-zinc-800 focus:border-amber-500 px-4 py-4 text-center text-white text-sm outline-none tracking-widest transition-all"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.2em] hover:bg-amber-500 transition-all text-xs">
              Unlock Node
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── MAIN ADMIN PANEL RENDER ───
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER & TABS */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-zinc-800 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-500 uppercase tracking-widest" style={{fontFamily: "'Cinzel', serif"}}>ARK Admin Node</h1>
            <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Secure Control Center</p>
          </div>
          <div className="flex bg-zinc-900 rounded-sm p-1 border border-zinc-800 overflow-x-auto">
            {['calendar', 'bookings', 'staff'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ─── TAB: CALENDAR MANAGER ─── */}
        {activeTab === 'calendar' && (
          <div className="space-y-8 animate-fade-in">
            {renderAdminCalendar()}
          </div>
        )}

        {/* ─── TAB: BOOKINGS & ASSIGN DUTY ─── */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-fade-in">
            {bookings.length === 0 ? <p className="text-zinc-500">No bookings found.</p> : null}
            {bookings.map((b) => (
              <div key={b._id} className="bg-[#0a0a0a] border border-zinc-800 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${b.status === 'Assigned' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                
                <div className="pl-2">
                  <h3 className="text-lg font-bold text-white uppercase">{b.name}</h3>
                  <div className="text-xs text-zinc-400 mt-2 space-y-1 font-mono">
                    <p>📞 {b.phone}</p>
                    <p>📅 {new Date(b.date).toDateString()}</p>
                    <p>📝 {b.notes || 'No extra notes'}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto bg-black p-4 border border-zinc-900 rounded-sm">
                  {b.status === 'Assigned' ? (
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-center text-emerald-500">Status: Completed</span>
                      <button disabled className="bg-emerald-950 text-emerald-500 border border-emerald-900 px-8 py-3 text-[10px] font-black uppercase tracking-widest cursor-not-allowed">
                        Assigned ✅
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-center text-amber-500">Status: Pending</span>
                      <select 
                        onChange={(e) => setAssignData({...assignData, [b._id]: e.target.value})}
                        value={assignData[b._id] || ''}
                        className="bg-[#050505] border border-zinc-800 text-xs text-zinc-300 p-2 outline-none focus:border-amber-500"
                      >
                        <option value="">-- Select Crew Member --</option>
                        {staff.map(s => <option key={s._id} value={s._id}>{s.name} ({s.phone})</option>)}
                      </select>
                      <button 
                        onClick={() => handleAssignDuty(b._id)} 
                        disabled={assigningId === b._id}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${assigningId === b._id ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-amber-500 text-black hover:bg-white'}`}
                      >
                        {assigningId === b._id ? 'Sending SMS...' : 'Assign & Notify SMS'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB: STAFF MANAGEMENT ─── */}
        {activeTab === 'staff' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="md:col-span-1 bg-[#0a0a0a] border border-zinc-800 p-6 rounded-sm shadow-xl h-fit">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-amber-500">// Register Crew</h2>
              <form onSubmit={handleAddStaff} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Full Name</label>
                  <input type="text" required value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} className="w-full bg-black border border-zinc-800 p-3 text-white focus:border-amber-500 outline-none" placeholder="e.g. Ravish" />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Phone Number (10 Digit)</label>
                  <input type="tel" required value={newStaff.phone} onChange={e => setNewStaff({...newStaff, phone: e.target.value})} className="w-full bg-black border border-zinc-800 p-3 text-white focus:border-amber-500 outline-none" placeholder="SMS Notification Number" />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Email ID</label>
                  <input type="email" required value={newStaff.email} onChange={e => setNewStaff({...newStaff, email: e.target.value})} className="w-full bg-black border border-zinc-800 p-3 text-white focus:border-amber-500 outline-none" placeholder="crew@ark.com" />
                </div>
                <button type="submit" className="w-full bg-white text-black py-3 font-bold uppercase tracking-widest hover:bg-amber-500 transition-all mt-2">Add to Roster</button>
              </form>
            </div>

            <div className="md:col-span-2 space-y-4">
              {staff.length === 0 && <p className="text-zinc-500">No staff members found.</p>}
              {staff.map(s => (
                <div key={s._id} className="bg-[#0a0a0a] border border-zinc-800 p-5 flex justify-between items-center shadow-md">
                  <div>
                    <h3 className="text-sm font-bold uppercase">{s.name}</h3>
                    <p className="text-xs text-zinc-400 font-mono mt-1">📞 {s.phone} | ✉️ {s.email}</p>
                  </div>
                  <button onClick={() => handleDeleteStaff(s._id)} className="text-red-500 hover:text-red-400 border border-red-900 bg-red-950/30 px-3 py-1 text-[10px] uppercase tracking-widest transition-colors">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}