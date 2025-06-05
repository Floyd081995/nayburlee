import { db } from "/lib/firebasedb";
import { doc, getDoc, collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { sendBookingActionEmail } from "../../../utils/sendBookingActionEmail";
import { formatToLocalDateTime } from "../../../utils/dateHelpers";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    console.log("Booking API called");

    const { listingId, bookingType, startDate, endDate, startTime, endTime, name, email, cell, message } = req.body;
    console.log("Request body received:", { listingId, bookingType, startDate, endDate, startTime, endTime });

    if (!name || !email || !cell) {
      console.log("Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    const listingRef = doc(db, "listings", listingId);
    const listingSnap = await getDoc(listingRef);
    if (!listingSnap.exists()) {
      console.log("Listing not found:", listingId);
      return res.status(404).json({ error: "Listing not found" });
    }

    const listing = listingSnap.data();
    console.log("Listing data:", listing);

    const landlordEmail = listing.ownercontactInfo;

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
    console.log("Calculated price:", price);

    // Calculate bookingStart and bookingEnd
    let bookingStart = null, bookingEnd = null;
    if (bookingType === "hourly" && startDate && startTime && endTime) {
      bookingStart = `${startDate}T${startTime}`; // plain string, no Date
      bookingEnd = `${startDate}T${endTime}`;
    } else if (
      (bookingType === "daily" || bookingType === "weekly" || bookingType === "monthly") &&
      startDate && endDate
    ) {
      bookingStart = `${startDate}T00:00`;
      bookingEnd = `${endDate}T23:59`;
    }

    // Prevent double-booking
    if (bookingStart && bookingEnd) {
      const bookingsRef = collection(db, "listings", listingId, "bookings");
      const overlapQuery = query(
        bookingsRef,
        bookingsRef,
        where("bookingEnd", ">", bookingStart),
        where("bookingStart", "<", bookingEnd)
      );
      const overlapSnapshot = await getDocs(overlapQuery);

      if (!overlapSnapshot.empty) {
        console.log("Double booking detected");
        return res.status(409).json({ error: "This time slot is already booked. Please choose another." });
      }
    }

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
      bookingStart: bookingStart || null,
      bookingEnd: bookingEnd || null,
    });
    console.log("Booking saved with ID:", bookingRef.id);

    // Format for display: "28 May 2025, 08:00–10:00 (SAST)"
    let bookingDateTimeLocal = "";
    if (bookingType === "hourly" && bookingStart && bookingEnd) {
      const start = formatToLocalDateTime(bookingStart); // "28 May 2025 at 10:00"
      const [, endTime] = bookingEnd.split("T");         // "11:30"
      bookingDateTimeLocal = `${start} - ${endTime}`;
    } else if (bookingType !== "hourly" && startDate && endDate) {
      const startObj = new Date(`${startDate}T00:00`);
      const endObj = new Date(`${endDate}T00:00`);
      const startStr = startObj.toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric", timeZone: "Africa/Johannesburg" });
      const endStr = endObj.toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric", timeZone: "Africa/Johannesburg" });
      bookingDateTimeLocal = `${startStr} – ${endStr}`;
    }

    // Encode location for URL
    const encodedLocation = encodeURIComponent(listing.location || "");
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    const appleMapsUrl = `http://maps.apple.com/?q=${encodedLocation}`;

    // Get first image URL
    const firstImageUrl = Array.isArray(listing.images) && listing.images.length > 0 ? listing.images[0] : "";

    // Send email
    await sendBookingActionEmail({
      landlordEmail: listing.ownercontactInfo,
      bookingId: bookingRef.id,
      listingId: listingId,
      ownerName: listing.ownerName,
      listingName: listing.name,
      location: listing.location,
      capacity: listing.capacity,
      features: Array.isArray(listing.features) ? listing.features.join(", ") : listing.features,
      bookingStart: bookingStart || null,
      bookingEnd: bookingEnd || null,
      startDate,
      endDate,
      startTime,
      endTime,
      price,
      bookingType,
      name,
      message,
      googleMapsUrl,
      appleMapsUrl,
      firstImageUrl,
      listingType: type, 
      templateId: 'd-7ade5d01048d4fe9aceedde2322e91a0',
      bookingDateTimeLocal,
    });
    console.log("Booking action email sent");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
}