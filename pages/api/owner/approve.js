import { db } from "/lib/firebasedb";
import { doc, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { listingId, bookingId } = req.query;

  if (!listingId || !bookingId) {
    return res.status(400).send("Missing parameters.");
  }

  try {
    // Update booking status to awaiting_payment
    await updateDoc(
      doc(db, "listings", listingId, "bookings", bookingId),
      { status: "awaiting_payment" }
    );
    // Show a simple confirmation message
    res.status(200).send("Booking approved! The user will be notified to pay.");
  } catch (error) {
    res.status(500).send("Error approving booking: " + error.message);
  }
}