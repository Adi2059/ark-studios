// 1. Tools Import
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Slot = require('./models/slot');
const Booking = require('./models/booking');
const Staff = require('./models/Staff');
const nodemailer = require('nodemailer'); 

// 2. Waiter (App) Setup
const app = express();
const PORT = process.env.PORT || 5000;

// 🛡️ SECURITY GUARD VIP PASS (CORS SETUP) 🛡️
app.use(cors({
    origin: [
        'https://ark-studio-live.vercel.app', // ✅ Tera naya Vercel Live Link
        'http://localhost:5173',              // ✅ Local Vite Frontend
        'http://localhost:5000'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Saare database actions allow kar diye
    credentials: true
}));
app.use(express.json());

// 3. 📦 KITCHEN (DATABASE) CONNECTION
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, 
    family: 4 
})
.then(() => {
    console.log("📦 Kitchen (MongoDB) Connected Successfully! 🔥");
})
.catch((error) => {
    console.log("❌ Database connection failed:", error.message);
});

// 4. Routes (Menu)

// Default Route
app.get('/', (req, res) => {
    res.send("<h1>ARK Studio is running! 🎥</h1>");
});

// Health Check API
app.get('/api/health', (req, res) => {
    res.json({ status: "Success", message: "Backend Zinda Hai! 🔥" });
});

// Dummy API for Frontend Development
app.get('/api/slots', (req, res) => {
    const dummySlots = [
        { _id: "101", date: "2026-06-15", time: "10:00 AM", isBooked: false },
        { _id: "102", date: "2026-06-15", time: "02:00 PM", isBooked: true },
        { _id: "103", date: "2026-06-16", time: "11:00 AM", isBooked: false },
        { _id: "104", date: "2026-06-16", time: "04:00 PM", isBooked: false }
    ];
    res.json({ success: true, message: "Dummy slots fetched successfully!", data: dummySlots });
});

// 📝 CREATE NEW BOOKING (Client form)
app.post('/api/bookings', async (req, res) => {
    try {
        // Note: Frontend se form data is format mein aana chahiye!
        const { clientName, clientEmail, clientPhone, eventType, slotId } = req.body;
        const newBooking = await Booking.create({
            clientName, clientEmail, clientPhone, eventType, slotId, status: 'Pending'
        });
        
        // Agar slotId bheji hai toh usko booked mark kar dega
        if (slotId) {
            await Slot.findByIdAndUpdate(slotId, { isBooked: true });
        }
        
        res.status(201).json({ success: true, message: "Slot successfully booked! 🎉", data: newBooking });
    } catch (error) {
        console.log("Booking Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// 🛡️ ADMIN PANEL: Saari bookings fetch karna
app.get('/api/admin/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 }); 
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        console.log("Admin Fetch Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// 👥 ADMIN PANEL: Naya Staff Add Karna
app.post('/api/staff', async (req, res) => {
    try {
        const newStaff = await Staff.create(req.body);
        res.status(201).json({ success: true, message: "Naya staff member add ho gaya!", data: newStaff });
    } catch (error) {
        console.log("Staff Add Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// 🛠️ ADMIN PANEL: Booking par Staff Assign karna + REAL EMAIL Bhejna
app.patch('/api/bookings/:id/assign', async (req, res) => {
    try {
        const bookingId = req.params.id; 
        const { staffId } = req.body;    

        // 1. Booking assign karna
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { staffId: staffId, status: 'Assigned' },
            { new: true } 
        );

        // 2. Staff ki details nikalna (Real email aur naam ke liye)
        const staffMember = await Staff.findById(staffId);
        
        if (!staffMember) {
            return res.status(404).json({ success: false, message: "Staff member not found!" });
        }

        // 3. NODEMAILER EMAIL LOGIC
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email ka content
        const mailOptions = {
            from: process.env.EMAIL_USER, // Bhejne wala (ARK Studio)
            to: staffMember.email,        // ✅ Paane wala (Staff ki apni original id)
            subject: '🎥 ARK Studio: New Duty Assigned!',
            text: `Hello ${staffMember.name},\n\nAapko ARK Studio ki taraf se ek nayi duty assign hui hai!\n\nClient: ${updatedBooking.clientName || 'N/A'}\nEvent: ${updatedBooking.eventType || 'N/A'}\nPhone: ${updatedBooking.clientPhone || 'N/A'}\n\nPlease check your dashboard for time and location.`
        };

        // Mail send karna
        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            success: true, 
            message: "Staff successfully assigned & Email sent! 🚀", 
            data: updatedBooking 
        });

    } catch (error) {
        console.log("Assignment/Email Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// 5. Shutter Kholna
app.listen(PORT, () => {
    console.log(`🚀 Server daud raha hai: http://localhost:${PORT}`);
});