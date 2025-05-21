import { db } from "/lib/firebasedb";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendBookingActionEmail } from "../../../utils/sendBookingActionEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    // Destructure at the top
    const { listingId, bookingType, startDate, endDate, startTime, endTime, name, email, cell, message } = req.body;
    if (!name || !email || !cell) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Fetch the listing
    const listingRef = doc(db, "listings", listingId);
    const listingSnap = await getDoc(listingRef);
    if (!listingSnap.exists()) return res.status(404).json({ error: "Listing not found" });

    const listing = listingSnap.data();
    const landlordEmail = listing.ownercontactInfo; // <-- Add this here

    const type = listing.type || "";
    const location = listing.location || "";
    const capacity = listing.capacity || "";
    const Features = listing.features || "";

    // Calculate price
    let price = 0;
    if (bookingType === "hourly") {
      const [startH, startM] = startTime.split(":").map(Number);
      const [endH, endM] = endTime.split(":").map(Number);
      const hours = (endH + endM / 60) - (startH + startM / 60);
      const pricePerHour = Number(listing.price_Hourly);
      if (isNaN(pricePerHour)) {
        console.error("Missing or invalid price_Hourly in listing:", listingId);
        return res.status(400).json({ error: "Listing missing price_Hourly" });
      }
      price = pricePerHour * hours;
    } else if (bookingType === "daily") {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      const pricePerDay = Number(listing.price_Daily);
      if (isNaN(pricePerDay)) {
        console.error("Missing or invalid price_Daily in listing:", listingId);
        return res.status(400).json({ error: "Listing missing price_Daily" });
      }
      price = pricePerDay * days;
    } else if (bookingType === "weekly") {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const weeks = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 7));
      const pricePerWeek = Number(listing.price_Weekly);
      if (isNaN(pricePerWeek)) {
        console.error("Missing or invalid price_Weekly in listing:", listingId);
        return res.status(400).json({ error: "Listing missing price_Weekly" });
      }
      price = pricePerWeek * weeks;
    } else if (bookingType === "monthly") {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
      const pricePerMonth = Number(listing.price_Monthly);
      if (isNaN(pricePerMonth)) {
        console.error("Missing or invalid price_Monthly in listing:", listingId);
        return res.status(400).json({ error: "Listing missing price_Monthly" });
      }
      price = pricePerMonth * months;
    }
 
    // Add this log here:
    console.log("API Calculated price:", price, "Booking type:", bookingType, "Listing:", listingId);
    // Save booking
    const bookingRef = await addDoc(collection(db, "listings", listingId, "bookings"), {
      name,
      email,
      cell,
      message,
      bookingType,
      startDate,
      endDate,
      startTime,
      endTime,
      price,
      type,
      status: "pending_owner",
      timestamp: serverTimestamp(),
    });
    console.log("Booking created:", bookingRef.id);

    // Fetch the listing data if not already available
    // const listing = ... (make sure you have the listing object here)

    await sendBookingActionEmail({
      landlordEmail: listing.ownercontactInfo,
      bookingId: bookingRef.id,
      ownerName: listing.ownerName,
      listingName: listing.name,
      location: listing.location,
      capacity: listing.capacity,
      features: Array.isArray(listing.features) ? listing.features.join(", ") : listing.features,
      bookingDateTime: `${startDate}${startTime ? " " + startTime : ""} - ${endDate}${endTime ? " " + endTime : ""}`,
      price,
      bookingType,
      name,
      message,
      type,
      templateId: 'd-7ade5d01048d4fe9aceedde2322e91a0'
    });

    /*await sendBookingActionEmail({
      landlordEmail,
      bookingId: bookingRef.id,
      listingId,
      name: name || "Unknown",
      templateId: 'd-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // your other template ID
      dynamicData: { confirmationCode: 'ABC123' }
    });

    await sendBookingActionEmail({
      landlordEmail,
      bookingId: bookingRef.id,
      listingId,
      name: name || "Unknown",
      templateId: 'd-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx2', // <-- your payment request template ID
      dynamicData: {
        amountDue: price,
        paymentLink: `https://nayburlee.com/pay?bookingId=${bookingRef.id}`,
        // add more variables as needed
      }
    });*/


    console.log("API about to send email with name:", name);
    console.log("DEBUG: name in API before email:", name);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
}