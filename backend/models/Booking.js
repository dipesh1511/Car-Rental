
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    price: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
    
}, { timestamps: true });  

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;