
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: false }, // optional
  razorpayOrderId: { type: String, required: true, unique: true },
  razorpayPaymentId: { type: String },
  amount: { type: Number, required: true }, // in paise
  currency: { type: String, default: '₹' },
  receipt: { type: String },
  status: { type: String, enum: ['created','paid','failed'], default: 'created' },
  
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
