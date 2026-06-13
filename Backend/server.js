require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Booking = require('./models/booking');
const Staff = require('./models/Staff');

const app = express();
const PORT = process.env.PORT || 5000;

// 🛡️ VIP PASS (CORS SETUP)
app.use(cors({
    origin: ['https://ark-studio-live.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    credentials: true
}));
app.use(express.json());

// ==========================================
// 🗓️ SLOTS API (Calendar Matrix)
// ==========================================
app.get('/api/slots', (req, res) => {
    const dummySlots = [
        { _id: "101", date: "2026-06-15", isBooked: false },
        { _id: "102", date: "2026-06-16", isBooked: true },
        { _id: "103", date: "2026-06-17", isBooked: false }
    ];
    res.json({ success: true, data: dummySlots });
});

app.put('/api/slots/:id', (req, res) => {
    res.json({ success: true, message: "Slot updated" });
});

// 📦 DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000, family: 4 })
.then(() => console.log("📦 Database Connected Successfully! 🔥"))
.catch((err) => console.log("❌ DB Error:", err.message));

// ==========================================
// 📝 1. BOOKINGS API
// ==========================================
app.post('/api/bookings', async (req, res) => {
    try {
        const { name, phone, date, notes } = req.body;
        const newBooking = await Booking.create({ name, phone, date, notes, status: 'Pending' });
        res.status(201).json({ success: true, message: "Slot booked!", data: newBooking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 }); 
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ==========================================
// 👥 2. STAFF MANAGEMENT API (ADD/REMOVE)
// ==========================================
app.get('/api/staff', async (req, res) => {
    try {
        const staff = await Staff.find();
        res.status(200).json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/staff', async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const newStaff = await Staff.create({ name, phone, email });
        res.status(201).json({ success: true, message: "Staff added!", data: newStaff });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/api/staff/:id', async (req, res) => {
    try {
        await Staff.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Staff removed!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ==========================================
// 🛠️ 3. ASSIGN DUTY API (Fast2SMS Integration)
// ==========================================
app.post('/api/bookings/:id/assign', async (req, res) => {
    try {
        const bookingId = req.params.id; 
        const { staffId } = req.body;    

        if (!staffId || staffId.length < 10) {
            return res.status(400).json({ success: false, message: "Bhai dummy staff ko assign nahi kar sakte! Pehle naya Original Staff add karo." });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { staffId: staffId, status: 'Assigned' },
            { returnDocument: 'after' } 
        );

        const staffMember = await Staff.findById(staffId);
        
        if (staffMember) {
            // 📱 FAST2SMS LOGIC
            const smsMessage = `ARK Studio: Nayi Duty!\nClient: ${updatedBooking.name}\nDate: ${updatedBooking.date}\nPhone: ${updatedBooking.phone}\nNotes: ${updatedBooking.notes}`;

            fetch('https://www.fast2sms.com/dev/bulkV2', {
                method: 'POST',
                headers: {
                    'authorization': process.env.SMS_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    route: 'q', 
                    message: smsMessage,
                    flash: 0,
                    numbers: staffMember.phone 
                })
            })
            .then(response => response.json())
            .then(data => console.log("📱 SMS Server Response:", data))
            .catch(err => console.log("❌ SMS Error:", err));
        }

        return res.status(200).json({ success: true, message: "Duty Assigned & SMS Sent Successfully!", data: updatedBooking });

    } catch (error) {
        console.log("Assign Error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Shutter Kholna
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});