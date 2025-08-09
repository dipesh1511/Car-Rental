import Razorpay from 'razorpay';
import crypto from 'crypto';
import Booking from '../models/Booking.js'; // Adjust path if needed

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
export const createOrder = async (req, res) => {
    try {
        console.log("-----------------------------------------");
        console.log("Step 1: Received request for createOrder");
        console.log("Request Body:", req.body);

        const { bookingId } = req.body;

        if (!bookingId) {
            console.error("Error: bookingId is missing from the request body.");
            return res.status(400).json({ message: "Booking ID is required." });
        }

        console.log("Step 2: Finding booking with ID:", bookingId);
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            console.error("Error: Booking not found for ID:", bookingId);
            return res.status(404).json({ message: "Booking not found" });
        }
        
        console.log("Step 3: Booking found. Price is:", booking.price);
        console.log("Amount for Razorpay:", booking.price * 100);

        const options = {
            amount: booking.price * 100, // amount in paise
            currency: "INR",
            receipt: booking._id.toString(),
        };

        console.log("Step 4: Creating Razorpay order with options:", options);
        const order = await razorpay.orders.create(options);
        console.log("Step 5: Razorpay order created successfully. Order ID:", order.id);
        
        // This part will only run if the schema has the razorpayOrderId field.
        booking.razorpayOrderId = order.id;
        await booking.save();

        console.log("Step 6: Booking saved successfully.");
        res.status(200).json({ success: true, order });

    } catch (error) {
        // This will now log the specific error from the backend.
        console.error("-----------------------------------------");
        console.error("An error occurred in createOrder:");
        console.error("Error Message:", error.message);
        console.error("Stack Trace:", error.stack);
        console.error("-----------------------------------------");
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};



// Verify Payment
export const verifyPayment = async (req, res) => {
    try {
        
        
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        console.log("[verifyPayment] Received Razorpay callback.");
        console.log("[verifyPayment] Received razorpay_order_id:", razorpay_order_id);
        console.log("[verifyPayment] Received razorpay_payment_id:", razorpay_payment_id);

        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                         .update(body.toString())
                                         .digest('hex');
        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
             console.log("[verifyPayment] Signature verification failed!");
             return res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
        
        console.log("[verifyPayment] Signature is authentic. Finding booking with razorpayOrderId...");
        // The problem is almost certainly here.
        const booking = await Booking.findOne({ razorpayOrderId: razorpay_order_id });
        
        if (!booking) {
            console.error("[verifyPayment] Error: Booking not found for razorpay_order_id:", razorpay_order_id);
            // You can log all bookings here to confirm the data
            // const allBookings = await Booking.find({});
            // console.log("All current bookings:", allBookings);
            return res.status(404).json({ success: false, message: "Booking not found for verification." });
        }
        
        console.log("[verifyPayment] Booking found. Updating payment status.");
        booking.paymentStatus = 'paid';
        await booking.save();
        
        console.log("[verifyPayment] Payment successful, redirecting.");
        res.redirect(`http://localhost:3000/my-bookings?payment=success`);

    } catch (error) {
        console.error("[verifyPayment] An error occurred:");
        console.error("Error Message:", error.message);
        console.error("Stack Trace:", error.stack);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};



// get keys
export const getRazorpayKey = (req, res) => {
    try {
        const key = process.env.RAZORPAY_KEY_ID; 
        res.status(200).json({ key });
    } catch (error) {
        console.error("Error fetching Razorpay key:", error);
        res.status(500).json({ message: "Could not fetch Razorpay key." });
    }
};