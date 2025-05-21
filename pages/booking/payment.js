import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "/lib/firebasedb";

const RETURN_URL = process.env.NEXT_PUBLIC_PAYFAST_RETURN_URL;
const CANCEL_URL = process.env.NEXT_PUBLIC_PAYFAST_CANCEL_URL;

// Use the sandbox URL for testing
const PAYFAST_MERCHANT_ID = "10038945"; // Replace with your actual Merchant ID once done testing
const PAYFAST_MERCHANT_KEY = "1w3bwt4htfvyf"; // Replace with your actual Merchant Key once done testing
const PAYFAST_URL = "https://sandbox.payfast.co.za/eng/process"; // Sandbox for testing

export default function PaymentPage() {
  // Hardcoded for testing; replace with real IDs
  const router = useRouter();
  const { listingId, bookingId } = router.query;
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (listingId && bookingId) {
      const fetchBooking = async () => {
        const docRef = doc(db, "listings", listingId, "availability", bookingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBooking(docSnap.data());
        }
      };
      fetchBooking();
    }
  }, [listingId, bookingId]);

  if (!booking) return <p>Loading booking...</p>;
  if (booking.status !== "awaiting_payment") return <p>This booking is not ready for payment.</p>;

  // Example: set amount and item_name
  const amount = booking.price || "100.00"; // Replace with your logic
  const item_name = `Booking for ${booking.listingId}`;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Pay for Your Booking</h2>
      <form action={PAYFAST_URL} method="post">
        <input type="hidden" name="merchant_id" value={PAYFAST_MERCHANT_ID} />
        <input type="hidden" name="merchant_key" value={PAYFAST_MERCHANT_KEY} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="item_name" value={item_name} />
        <input type="hidden" name="return_url" value={RETURN_URL} />
        <input type="hidden" name="cancel_url" value={CANCEL_URL} />
        {/* Add more Payfast fields as needed */}
        <button
          type="submit"
          style={{
            padding: "12px 32px",
            background: "#2FD1BA",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}