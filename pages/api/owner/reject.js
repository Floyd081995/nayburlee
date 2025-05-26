import { db } from "/lib/firebasedb";
import { doc, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { listingId, bookingId } = req.query;

  if (!listingId || !bookingId) {
    return res.status(400).send("Missing parameters.");
  }

  try {
    // Update booking status to rejected
    await updateDoc(
      doc(db, "listings", listingId, "bookings", bookingId),
      { status: "rejected" }
    );
    res.status(200).send("Booking rejected.");
  } catch (error) {
    res.status(500).send("Error rejecting booking: " + error.message);
  }
}