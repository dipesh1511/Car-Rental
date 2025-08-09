import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { IndianRupee, Car, Clock, CheckCircle2, XCircle } from "lucide-react";

const ManageBookings = () => {
  // Accessing shared context for axios instance and currency symbol
  const { axios, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);

  // Function to fetch bookings from the backend
  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to change the status of a booking
  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        status,
      });
      if (data.success) {
        toast.success(data.message);
        // Re-fetch bookings to update the UI
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch bookings on component mount
  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  // Helper function to format the payment method for display
  const getPaymentMethod = (booking) => {
    return booking.razorpayOrderId ? "Online" : "Offline";
  };

  // Helper function to get the correct CSS class for the payment method
  const getPaymentBadgeClass = (booking) => {
    if (booking.razorpayOrderId) {
      // A green badge for online payments
      return "bg-emerald-100 text-emerald-800";
    }
    // A gray badge for offline payments
    return "bg-gray-100 text-gray-600";
  };

  // Helper function to get the correct CSS class for the booking status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  // Helper function to get the status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 size={16} />;
      case "cancelled":
        return <XCircle size={16} />;
      case "pending":
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 w-full flex-1 bg-white">
      <Title
        title="Manage Bookings"
        subtitle="Track all customer bookings, approve or cancel requests, and manage bookings statuses."
        align="left"
      />

      <div className="max-w-4xl w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm mt-8">
        <table className="w-full border-collapse text-left text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="p-4 font-bold">Car</th>
              <th className="p-4 font-bold max-md:hidden">Date Range</th>
              <th className="p-4 font-bold">Total</th>
              <th className="p-4 font-bold max-md:hidden">Payment</th>
              <th className="p-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={
                        booking.car.image ||
                        `https://placehold.co/48x48/d1d5db/4b5563?text=Car`
                      }
                      alt={`${booking.car.brand} ${booking.car.model}`}
                      className="h-12 w-12 aspect-square rounded-md object-cover border border-gray-200"
                    />
                    <p className="font-semibold">
                      {booking.car.brand} {booking.car.model}
                    </p>
                  </td>

                  <td className="p-4 text-gray-500 max-md:hidden">
                    {new Date(booking.pickupDate).toLocaleDateString()} to{" "}
                    {new Date(booking.returnDate).toLocaleDateString()}
                  </td>

                  <td className="p-4 font-semibold">
                    <div className="flex items-center gap-1">
                      <IndianRupee size={16} />
                      {booking.price}
                    </div>
                  </td>

                  <td className="p-4 max-md:hidden">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getPaymentBadgeClass(
                        booking
                      )}`}
                    >
                      {getPaymentMethod(booking)}
                    </span>
                  </td>

                  <td className="p-4">
                    {booking.status === "pending" ? (
                      <div className="flex items-center gap-2">
                        <select
                          onChange={(e) =>
                            changeBookingStatus(booking._id, e.target.value)
                          }
                          value={booking.status}
                          className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-colors bg-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    ) : (
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
