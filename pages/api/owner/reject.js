import { db } from "/lib/firebasedb";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { listingId, bookingId } = req.query;

  if (!listingId || !bookingId) {
    return res.status(400).send("Missing parameters.");
  }

  try {
    const bookingRef = doc(db, "listings", listingId, "bookings", bookingId);
    const bookingSnap = await getDoc(bookingRef);

    if (!bookingSnap.exists()) {
      return res.status(404).send("Booking not found.");
    }

    // Update booking status to rejected
    await updateDoc(bookingRef, { status: "rejected" });
    res.status(200).send("Booking rejected.");
  } catch (error) {
    res.status(500).send("Error rejecting booking: " + error.message);
  }
}