require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Models
const Booking = require('./models/booking');
const Staff = require('./models/Staff');

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 🛡️ SECURITY & BODY PARSER (Yahi miss tha!)
// ==========================================
app.use(express.json()); // ISKE BINA DATA UNDEFINED AATA HAI!

const corsOptions = {
    origin: [
        'http://localhost:5173', 
        'https://ark-studio-live.vercel.app', 
        'https://thearkphotography.com', 
        'https://www.thearkphotography.com' 
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions));


// ==========================================
// 🗓️ LIVE CALENDAR SLOTS DATABASE MODEL
// ==========================================
const slotSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true }, 
    isBooked: { type: Boolean, default: false }
});
const Slot = mongoose.model('Slot', slotSchema);

app.get('/api/slots', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const slots = await Slot.find({ date: { $gte: today } }).sort({ date: 1 });
        res.json({ success: true, data: slots });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/slots/update', async (req, res) => {
    try {
        const { dates, isBooked } = req.body; 
        
        if (!dates || dates.length === 0) {
            return res.status(400).json({ success: false, message: "Bhai koi date toh select kar!" });
        }

        for (let date of dates) {
            await Slot.findOneAndUpdate(
                { date: date }, 
                { isBooked: isBooked }, 
                { upsert: true, new: true } 
            );
        }
        res.status(200).json({ success: true, message: "Calendar Slots Updated Successfully! 🔥" });
    } catch (error) {
        console.log("Slot Update Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// 📦 DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000, family: 4 })
.then(() => console.log("📦 Database Connected Successfully! 🔥"))
.catch((err) => console.log("❌ DB Error:", err.message));

// ==========================================
// 📝 1. BOOKINGS API (ONLY DATABASE SAVE, NO SMS HERE)
// ==========================================
app.post('/api/bookings', async (req, res) => {
    try {
        const { name, phone, date, notes } = req.body;
        
        // Data aate hi direct save, koi dusra jhanjhat nahi!
        const newBooking = await Booking.create({ name, phone, date, notes, status: 'Pending' });
        
        res.status(201).json({ success: true, message: "Slot booked!", data: newBooking });
    } catch (error) {
        console.log("Booking Submit Error:", error);
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
// 🛠️ 3. ASSIGN DUTY API (ONLY THIS WILL SEND SMS)
// ==========================================
app.post('/api/bookings/:id/assign', async (req, res) => {
    try {
        const bookingId = req.params.id; 
        const { staffId } = req.body;    

        if (!staffId || staffId.length < 10) {
            return res.status(400).json({ success: false, message: "Bhai dummy staff ko assign nahi kar sakte! Pehle naya Original Staff add karo." });
        }

        // 1. Update Booking Status
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { staffId: staffId, status: 'Assigned' },
            { new: true } 
        );

        // 2. Fetch Staff Details
        const staffMember = await Staff.findById(staffId);
        
        // 3. Send SMS if Staff exists
        if (staffMember) {
            const dateObj = new Date(updatedBooking.date);
            const cleanDate = `${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()}`;
            
            const smsMessage = `ARK Studio: Nayi Duty!\nClient: ${updatedBooking.name}\nDate: ${cleanDate}\nPhone: ${updatedBooking.phone}\nNotes: ${updatedBooking.notes || 'None'}`;

            // Try-Catch for SMS so server doesn't crash if Fast2SMS is down
            try {
                const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
                    method: 'POST',
                    headers: {
                        'authorization': process.env.SMS_API_KEY, // Make sure 'SMS_API_KEY' is exactly same in Render!
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        route: 'q', 
                        message: smsMessage,
                        flash: 0,
                        numbers: staffMember.phone 
                    })
                });
                const smsData = await response.json();
                console.log("📱 SMS Delivered:", smsData);
            } catch (smsError) {
                console.log("❌ SMS Error (but duty assigned):", smsError.message);
            }
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