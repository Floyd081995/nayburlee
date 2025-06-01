import { db } from "/lib/firebasedb";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { sendPaymentLinkEmail } from "/utils/sendBookingActionEmail";

export default async function handler(req, res) {
  // Allow both GET and POST for approval
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const { listingId, bookingId } = req.query;

  if (!listingId || !bookingId) {
    return res.status(400).send("Missing parameters.");
  }

  try {
    // 1. Update booking status to awaiting_payment
    await updateDoc(
      doc(db, "listings", listingId, "bookings", bookingId),
      { status: "awaiting_payment" }
    );

    // 2. Fetch booking and listing data
    const bookingSnap = await getDoc(doc(db, "listings", listingId, "bookings", bookingId));
    const listingSnap = await getDoc(doc(db, "listings", listingId));
    if (!bookingSnap.exists() || !listingSnap.exists()) {
      return res.status(404).send("Booking or listing not found.");
    }
    // Add id to booking for use in payment link and email
    const booking = { id: bookingId, ...bookingSnap.data() };
    const listing = listingSnap.data();

    // 3. Generate payment link (implement this function as needed)
    const paymentLink = generatePaymentLink(booking, listing);

    console.log("About to send payment link email to:", booking.email);
    console.log("Email data:", {
      userEmail: booking.email,
      userName: booking.name,
      paymentLink,
      bookingId: booking.id,
      listingName: listing.name,
      price: booking.price,
      templateId: "d-7afd2711f21d4e6bb1859d5f59eadb16",
    });

    // 4. Send payment link email to the user
    await sendPaymentLinkEmail({
      userEmail: booking.email,
      userName: booking.name,
      paymentLink,
      bookingId: booking.id,
      listingName: listing.name,
      price: booking.price,
      templateId: "d-7afd2711f21d4e6bb1859d5f59eadb16",
    });

    console.log("Payment link email sent!");

    // 5. Respond to the request
    res.status(200).send("Booking approved! The user will be notified to pay.");
  } catch (error) {
    console.error("Error approving booking:", error);
    res.status(500).send("Error approving booking: " + error.message);
  }
}

// You need to implement this function to generate a payment link for the booking
function generatePaymentLink(booking, listing) {
  // Example: return a PayFast or Stripe payment URL with booking info
  // Replace with your real payment provider logic
  return `https://your-payment-provider.com/pay?bookingId=${booking.id}&amount=${booking.price}`;
}