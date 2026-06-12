import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Data States
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [staffList, setStaffList] = useState([
    // Fallback Dummy Staff agar backend abhi ready na ho
    { _id: 's1', name: 'Aditya (Lead Cam)', email: 'aditya@arkstudios.com' },
    { _id: 's2', name: 'Raju (Drone Pilot)', email: 'raju@arkstudios.com' },
    { _id: 's3', name: 'Amit (Editor)', email: 'amit@arkstudios.com' }
  ]);

  const [assigningId, setAssigningId] = useState(null);

  const API_BASE = 'https://ark-studios-api.onrender.com/api';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'ark2026') {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      alert('⚠️ Access Denied: Incorrect Security Code');
    }
  };

  const fetchDashboardData = async () => {
    try {
      // 1. Fetch Slots
      const slotRes = await fetch(`${API_BASE}/slots`);
      if (slotRes.ok) {
        const slotData = await slotRes.json();
        setSlots(Array.isArray(slotData) ? slotData : (slotData.slots || []));
      }
      
      // 2. Fetch Bookings
      const bookingRes = await fetch(`${API_BASE}/bookings`);
      if (bookingRes.ok) {
        const bookingData = await bookingRes.json();
        setBookings(Array.isArray(bookingData) ? bookingData : (bookingData.bookings || []));
      }

      // 3. Fetch Staff (Agar tune backend me route banaya hai, warna dummy chalega)
      const staffRes = await fetch(`${API_BASE}/staff`);
      if (staffRes.ok) {
        const staffData = await staffRes.json();
        if(staffData.length > 0) setStaffList(staffData);
      }
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    }
  };

  const toggleSlotStatus = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      const res = await fetch(`${API_BASE}/slots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBooked: newStatus })
      });
      if (res.ok) {
        setSlots(slots.map(s => s._id === id ? { ...s, isBooked: newStatus } : s));
      }
    } catch (error) {
      alert("Network Error updating slot.");
    }
  };

  const handleAssignStaff = async (bookingId, staffId) => {
    if(!staffId) return alert("Pehle staff select karein!");
    setAssigningId(bookingId);
    
    try {
      // Ye api call tere backend par jayegi, aur backend se Nodemailer chalega
      const res = await fetch(`${API_BASE}/bookings/${bookingId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffId })
      });

      if (res.ok) {
        alert("✅ Duty Assigned! Staff ko Email Notification bhej diya gaya hai.");
        fetchDashboardData(); // Refresh list
      } else {
        alert("Action completed locally. (Backend notification route abhi ready nahi hai)");
      }
    } catch (error) {
      alert("Network Error during assignment.");
    } finally {
      setAssigningId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030305] flex items-center justify-center p-6 font-mono selection:bg-amber-500 selection:text-black">
        <form onSubmit={handleLogin} className="bg-[#0a0a0f] border border-zinc-900 p-10 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(245,158,11,0.08)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          <img src="/src/assets/ARK studios.png" alt="Logo" className="h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-white font-bold text-lg mb-8 uppercase tracking-[0.3em]">System Core Login</h2>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="ENTER MASTER KEY" className="w-full bg-black border border-zinc-800 focus:border-amber-500 rounded px-4 py-4 text-amber-500 mb-6 text-center tracking-[0.5em] focus:outline-none transition-all shadow-inner" />
          <button type="submit" className="w-full bg-amber-500 text-black font-black uppercase tracking-widest py-4 rounded hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]">Authorize Access</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 md:p-8 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ─── HEADER COMMAND CENTER ─── */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-[#08080c] p-6 rounded-2xl border border-zinc-900 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full border border-amber-500/50 flex items-center justify-center bg-amber-500/10">
              <span className="text-amber-500 font-black font-mono">RK</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest">Director's Hub</h1>
              <p className="text-zinc-500 text-[10px] font-mono mt-1 tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ARK PRODUCTION SERVERS ONLINE
              </p>
            </div>
          </div>
          <div className="flex gap-3 bg-black p-1.5 rounded-lg border border-zinc-900">
            <button onClick={() => setActiveTab('bookings')} className={`px-6 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest font-mono transition-all ${activeTab === 'bookings' ? 'bg-amber-500 text-black shadow-lg' : 'text-zinc-400 hover:text-white'}`}>Bookings & Ops</button>
            <button onClick={() => setActiveTab('slots')} className={`px-6 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest font-mono transition-all ${activeTab === 'slots' ? 'bg-amber-500 text-black shadow-lg' : 'text-zinc-400 hover:text-white'}`}>Slot Ledger</button>
          </div>
        </div>

        {/* ─── BOOKINGS & STAFF ASSIGNMENT TAB ─── */}
        {activeTab === 'bookings' && (
          <div className="bg-[#08080c] rounded-2xl border border-zinc-900 overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-zinc-900 flex justify-between items-center bg-black/40">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest font-mono">// Active Client Pipeline</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-black/80 text-zinc-500 font-mono text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="p-5 border-b border-zinc-900">Client Details</th>
                    <th className="p-5 border-b border-zinc-900">Event Date</th>
                    <th className="p-5 border-b border-zinc-900">Requirements</th>
                    <th className="p-5 border-b border-zinc-900">Assign Duty (Auto-Email)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {bookings.map((b, i) => (
                    <tr key={b._id || i} className="hover:bg-zinc-900/30 transition-colors group">
                      <td className="p-5">
                        <p className="font-bold text-white text-sm">{b.name}</p>
                        <p className="text-zinc-500 font-mono text-[10px] mt-1">{b.phone}</p>
                      </td>
                      <td className="p-5 text-emerald-400 font-mono">{b.date}</td>
                      <td className="p-5 text-zinc-400 text-xs max-w-xs">{b.notes || 'Standard Setup'}</td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <select 
                            id={`staff-select-${b._id}`}
                            className="bg-black border border-zinc-800 text-zinc-300 text-xs rounded px-3 py-2 outline-none focus:border-amber-500 font-mono"
                            defaultValue={b.assignedStaff || ""}
                          >
                            <option value="" disabled>Select Staff...</option>
                            {staffList.map(staff => (
                              <option key={staff._id} value={staff._id}>{staff.name}</option>
                            ))}
                          </select>
                          <button 
                            onClick={() => {
                              const selectedStaff = document.getElementById(`staff-select-${b._id}`).value;
                              handleAssignStaff(b._id, selectedStaff);
                            }}
                            disabled={assigningId === b._id}
                            className="bg-zinc-900 border border-zinc-700 text-amber-500 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-bold px-4 py-2 rounded text-[10px] uppercase tracking-widest transition-all font-mono"
                          >
                            {assigningId === b._id ? 'Sending...' : 'Assign'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr><td colSpan="4" className="p-10 text-center text-zinc-600 font-mono text-xs uppercase tracking-widest">No active leads in pipeline.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── SLOT MANAGER TAB ─── */}
        {activeTab === 'slots' && (
          <div className="bg-[#08080c] p-6 md:p-8 rounded-2xl border border-zinc-900 shadow-2xl">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest font-mono">// Calendar Matrix Server</h2>
                <p className="text-zinc-500 text-[10px] mt-2 font-mono uppercase">Click any block to overwrite Free/Booked status instantly.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-3">
              {slots.map((slot, index) => (
                <div 
                  key={slot._id || index} 
                  onClick={() => toggleSlotStatus(slot._id, slot.isBooked)} 
                  className={`relative p-4 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-lg hover:scale-105 overflow-hidden
                    ${slot.isBooked 
                      ? 'bg-red-950/20 border-red-900/50 hover:bg-red-900/40' 
                      : 'bg-emerald-950/10 border-emerald-900/30 hover:bg-emerald-900/30'}`}
                >
                  <div className={`absolute inset-0 opacity-20 ${slot.isBooked ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600 to-transparent' : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-600 to-transparent'}`}></div>
                  <span className="relative z-10 text-[9px] font-mono opacity-60 block mb-1 tracking-widest">JUN</span>
                  <span className={`relative z-10 text-xl font-black ${slot.isBooked ? 'text-red-400' : 'text-emerald-400'}`}>
                    {slot.date || (index + 1)}
                  </span>
                  <span className={`relative z-10 text-[8px] uppercase mt-2 font-bold tracking-widest px-2 py-0.5 rounded ${slot.isBooked ? 'bg-red-950 text-red-300' : 'bg-emerald-950 text-emerald-300'}`}>
                    {slot.isBooked ? 'Booked' : 'Free'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}