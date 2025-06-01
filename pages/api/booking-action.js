import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { sendPaymentLinkEmail } from "/utils/sendBookingActionEmail";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBB6hSwpZObxsCpnoocvM-57zLL8krsuUY",
  authDomain: "feedback-1st-prototype.firebaseapp.com",
  projectId: "feedback-1st-prototype",
  storageBucket: "feedback-1st-prototype.appspot.com",
  messagingSenderId: "153842210945",
  appId: "1:153842210945:web:f6f8a1ff5281b7cee95580",
};

// Initialize Firebase only once
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

export default async function handler(req, res) {
  // Only allow GET or POST (for email links, GET is common)
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { bookingId, listingId, action } = req.query;

  // Basic validation
  if (!bookingId || !listingId || !action) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // TODO: Optionally validate token for security

  try {
    const bookingRef = doc(db, "listings", listingId, "bookings", bookingId);
    const bookingSnap = await getDoc(bookingRef);

    if (!bookingSnap.exists()) {
      return res.status(404).json({ error: "Booking not found" });
    }

    let newStatus;
    if (action === "approve") {
      newStatus = "awaiting_payment";
      await updateDoc(bookingRef, { status: newStatus });

      // Fetch booking and listing data
      const booking = { id: bookingId, ...bookingSnap.data() };
      const listingSnap = await getDoc(doc(db, "listings", listingId));
      const listing = listingSnap.data();

      // Generate payment link
      const paymentLink = generatePaymentLink(booking, listing);

      // Send payment link email
      await sendPaymentLinkEmail({
        userEmail: booking.email,
        userName: booking.name,
        paymentLink,
        bookingId: booking.id,
        listingName: listing.name,
        price: booking.price,
        templateId: "d-7afd2711f21d4e6bb1859d5f59eadb16",
      });
    } else if (action === "reject") {
      newStatus = "rejected";
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    await updateDoc(bookingRef, { status: newStatus });

    // Optionally, render a simple HTML response for the user
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
      <html>
        <body>
          <h2>Booking ${action === "approve" ? "approved" : "rejected"}!</h2>
          <p>The booking status has been updated to <b>${newStatus}</b>.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}