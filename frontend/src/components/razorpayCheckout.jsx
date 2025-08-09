// frontend/src/components/RazorpayCheckout.jsx
import axios from "axios";
import React from "react";

function loadRazorpaySdk() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function RazorpayCheckout({ amount, bookingId, user }) {
  // amount: number in rupees (e.g., 199)
  const handlePay = async () => {
    const ok = await loadRazorpaySdk();
    if (!ok) return alert("Razorpay SDK failed to load.");

    // 1) create order on server
    const resp = await axios.post("/api/payments/create-order", {
      amount,
      bookingId,
    });
    if (!resp.data || !resp.data.orderId)
      return alert("Could not create order");

    const data = resp.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Car Rental",
      description: "Booking Payment",
      order_id: data.orderId,
      handler: async function (response) {
        // response has razorpay_payment_id, razorpay_order_id, razorpay_signature
        try {
          const verifyRes = await axios.post("/api/payments/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            dbOrderId: data.dbOrderId,
          });
          if (verifyRes.data.success) {
            alert("Payment successful!");
            // redirect or update UI
          } else {
            alert("Verification failed");
          }
        } catch (err) {
          console.error(err);
          alert("Verification error");
        }
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: user?.phone || "",
      },
      notes: { bookingId: bookingId || "" },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (resp) {
      console.error("payment.failed", resp.error);
      alert("Payment failed: " + resp.error.description);
    });
    rzp.open();
  };

  return <button onClick={handlePay}>Pay ₹{amount}</button>;
}
