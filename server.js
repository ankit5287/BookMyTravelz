const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// MongoDB Connection
// Users should put their MongoDB Atlas connection string in a .env file
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookmytrip';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Booking Schema
const bookingSchema = new mongoose.Schema({
    customerId: { type: String, unique: true },
    name: String,
    email: String,
    phone: String,
    address: String,
    location: String,
    guests: Number,
    minPrice: Number, // Added budget range min
    maxPrice: Number, // Added budget range max
    arrivals: Date,
    leaving: Date,
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Generate Unique ID Function
function generateCustomerId() {
    return 'CUST-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Routes
app.post('/api/book', async (req, res) => {
    try {
        const { name, email, phone, address, location, guests, minPrice, maxPrice, arrivals, leaving } = req.body;

        const newBooking = new Booking({
            customerId: generateCustomerId(),
            name,
            email,
            phone,
            address,
            location,
            guests,
            minPrice,
            maxPrice,
            arrivals,
            leaving
        });

        await newBooking.save();

        res.status(201).json({
            success: true,
            message: 'Booking Confirmed!',
            customerId: newBooking.customerId
        });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
