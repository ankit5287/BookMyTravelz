const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB... Fetching data...'))
    .catch(err => console.error('Connection Error:', err));

const bookingSchema = new mongoose.Schema({
    customerId: String,
    name: String,
    email: String,
    location: String
}, { strict: false }); // Strict false to just see whatever is there

const Booking = mongoose.model('Booking', bookingSchema);

async function checkData() {
    try {
        const bookings = await Booking.find({});
        console.log('\n--- ALL BOOKINGS ---');
        console.log(JSON.stringify(bookings, null, 2));
        console.log('--------------------\n');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
}

checkData();
