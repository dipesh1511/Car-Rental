import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { CalendarDays, MapPin } from "lucide-react";

// Assuming a mock assets object for the logo
const assets = {
  logo_icon: "https://placehold.co/100x100/FFECD0/78350F?text=Logo",
};

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false); // For disabling button during payment

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings.");
    }
  };

  useEffect(() => {
    user && fetchMyBookings();
  }, [user, axios]);

  // --- RAZORPAY PAYMENT HANDLER ---
  const handlePayment = async (booking) => {
    setLoading(true);
    try {
      // 1. Create a booking order on the backend
      const {
        data: { order },
      } = await axios.post("/api/payments/create-order", {
        bookingId: booking._id,
      });

      // 2. Get Razorpay Key from backend
      const {
        data: { key },
      } = await axios.get("/api/payments/get-key");

      // 3. Configure Razorpay options, using a handler function
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Car Rental Inc.",
        description: `Payment for Booking #${booking._id.slice(-6)}`,
        image: assets.logo_icon, // Your logo from assets
        order_id: order.id,
        // ----------------------------------------------------
        // FIX #1: Use a handler function instead of callback_url
        // ----------------------------------------------------
        handler: async (response) => {
          try {
            // This code runs after the user successfully pays
            // We now explicitly call our backend to verify the payment
            const verificationResponse = await axios.post(
              "/api/payments/verify",
              response
            );

            if (verificationResponse.data.success) {
              toast.success("Payment Successful!");
              // Redirect or update UI after successful verification
              // Note: A full redirect is still the most robust way to avoid state issues
              window.location.href = `/my-bookings?payment=success`;
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            toast.error("An error occurred during verification.");
            console.error("Verification error:", error);
          }
        },
        // The callback_url is not needed when using a handler
        // callback_url: "http://localhost:5000/api/payments/verify",
        prefill: {
          name: user.name,
          email: user.email,
        },
        notes: {
          address: "Car Rental HQ",
          booking_id: booking._id,
        },
        theme: {
          color: "#00a3ff",
        },
      };

      // 4. Open Razorpay payment window
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl mx-auto">
      <Title
        title="My Bookings"
        subtitle="View and manage your all car bookings"
        align="left"
      />

      <div className="mt-12">
        {bookings.map((booking, index) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-gray-200 bg-white rounded-xl shadow-sm mt-5 first:mt-0"
          >
            {/* car image + info */}
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden mb-3">
                <img
                  src={booking.car.image}
                  alt=""
                  className="w-full h-auto aspect-video object-cover"
                />
              </div>
              <p className="text-base font-semibold text-gray-800 mt-2">
                {booking.car.brand} {booking.car.model}
              </p>
              <p className="text-gray-500 text-sm">
                {booking.car.year} &bull; {booking.car.category} &bull;{" "}
                {booking.car.location}
              </p>
            </div>

            {/* booking info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <p className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                  Booking #{booking._id.slice(-6)}
                </p>
                <p
                  className={`px-3 py-1 text-xs rounded-full font-semibold capitalize ${
                    booking.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  Payment: {booking.paymentStatus}
                </p>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <CalendarDays size={18} className="text-orange-400 mt-1" />
                <div>
                  <p className="text-gray-500 text-xs">Rental Period</p>
                  <p className="font-medium text-gray-800">
                    {booking.pickupDate.split("T")[0]} to{" "}
                    {booking.returnDate.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <MapPin size={18} className="text-orange-400 mt-1" />
                <div>
                  <p className="text-gray-500 text-xs">Pick-up Location</p>
                  <p className="font-medium text-gray-800">
                    {booking.car.location}
                  </p>
                </div>
              </div>
            </div>

            {/* price and payment button */}
            <div className="md:col-span-1 flex flex-col justify-between items-end gap-6">
              <div className="text-sm text-gray-500 text-right">
                <p className="text-xs">Total Price</p>
                <h1 className="text-2xl font-bold text-orange-600">
                  {currency}
                  {booking.price}
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                  Booked on {booking.createdAt.split("T")[0]}
                </p>
              </div>

              {booking.paymentStatus === "Pending" && (
                <button
                  onClick={() => handlePayment(booking)}
                  disabled={loading}
                  className="w-full bg-orange-500 text-white font-semibold py-2.5 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400"
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
