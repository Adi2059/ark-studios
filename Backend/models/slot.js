const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    date: { type: String, required: true }, // Format: "2026-06-15"
    time: { type: String, required: true }, // Format: "10:00 AM"
    isBooked: { type: Boolean, default: false } // Default khali rahega
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);