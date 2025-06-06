import { useState, useEffect } from "react";
import { db } from "/lib/firebasedb";
import { doc, getDoc, serverTimestamp, collection, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router';
import Footer from "/components/Footer";
import { DURATION_OPTIONS } from "../lib/bookingDurations";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function BookingForm({ listingId }) {
const router = useRouter();
const { name, email, message } = router.query;

  const [form, setForm] = useState({
    name: name || "",
    email: email || "",
    cell: "",
    message: "",
  });

  useEffect(() => {
        if (name || email) {
          setForm((prev) => ({
            ...prev,
            name: name || prev.name,
            email: email || prev.email,
            message: message || prev.message,
          }));
        }
      }, [name, email, message]);

  const [bookingType, setBookingType] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [openTime, setOpenTime] = useState("08:00");
  const [closeTime, setCloseTime] = useState("18:00");

  const today = new Date().toISOString().split("T")[0];

  const [listing, setListing] = useState(null);
  const [allowedDurations, setAllowedDurations] = useState([]);
  const [bookings, setBookings] = useState([]);

  // ADD THIS useEffect block right after your useState hooks:
  useEffect(() => {
    if (listing && listing.duration && listing.duration.length > 0) {
      setBookingType(listing.duration[0]);
    }
  }, [listing]);

  useEffect(() => {
    if (!listingId) return;
    const fetchListing = async () => {
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setListing(data);
        setOpenTime(data.openTime || "08:00");
        setCloseTime(data.closeTime || "18:00");
      }
    };
    fetchListing();
      }, [listingId]);

  useEffect(() => {
  if (listing && listing.type) {
    // If type is an array, use the first value
    const typeKey = Array.isArray(listing.type) ? listing.type[0] : listing.type;
    setAllowedDurations(DURATION_OPTIONS[typeKey] || []);
    setBookingType((DURATION_OPTIONS[typeKey] || [])[0] || "");
  }
}, [listing]);

  // Fetch bookings for this listing
useEffect(() => {
  if (!listingId) return;
  const fetchBookings = async () => {
    const bookingsRef = collection(db, "listings", listingId, "bookings");
    const snapshot = await getDocs(bookingsRef);
    setBookings(snapshot.docs.map(doc => doc.data()));
  };
  fetchBookings();
}, [listingId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Name validation
    if (!form.name || form.name.trim() === "") {
      alert("Please enter your name.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Cellphone validation (already present, but you can add numeric check)
    if (!form.cell || form.cell.length < 7 || !/^\d+$/.test(form.cell)) {
      alert("Please enter a valid cellphone number.");
      return;
    }

    // Booking type validation
    if (!bookingType) {
      alert("Please select a booking type.");
      return;
    }

    // Start date validation
    if (!startDate) {
      alert("Please select a start date.");
      return;
    }

    // End date validation for non-hourly
    if (bookingType !== "Hourly" && !endDate) {
      alert("Please select an end date.");
      return;
    }

    // End date after start date for non-hourly
    if (
      (bookingType === "Daily" || bookingType === "Weekly" || bookingType === "Monthly") &&
      startDate && endDate &&
      new Date(endDate) < new Date(startDate)
    ) {
      alert("End date must be after start date.");
      return;
    }

    // Start and end time validation for hourly
    if (bookingType === "Hourly") {
      if (!startTime) {
        alert("Please select a start time.");
        return;
      }
      if (!endTime) {
        alert("Please select an end time.");
        return;
      }
      if (endTime <= startTime) {
        alert("End time must be after start time.");
        return;
      }
    }

    try {
      let price = 0;
      if (bookingType === "Hourly" && startTime && endTime) {
        const unitPrice = Number(listing.price_Hourly);
        const [startH, startM] = startTime.split(":").map(Number);
        const [endH, endM] = endTime.split(":").map(Number);
        const hours = (endH + endM / 60) - (startH + startM / 60);
        price = hours > 0 ? unitPrice * hours : 0;
      }
      if (bookingType === "Daily" && startDate && endDate) {
        const unitPrice = Number(listing.price_Daily);
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        price = days > 0 ? unitPrice * days : 0;
      }
      if (bookingType === "Weekly" && startDate && endDate) {
        const unitPrice = Number(listing.price_Weekly);
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diff = (end - start) / (1000 * 60 * 60 * 24);
        const weeks = Math.max(1, Math.ceil(diff / 7));
        price = unitPrice * weeks;
      }
      if (bookingType === "Monthly" && startDate && endDate) {
        const unitPrice = Number(listing.price_Monthly);
        const start = new Date(startDate);
        const end = new Date(endDate);
        const months =
          (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth()) +
          1;
        price = months > 0 ? unitPrice * months : 0;
      }

      console.log("Calculated price:", price);
      console.log("listing.price_Weekly:", listing.price_Weekly);
      const bookingData = {
      ...form,
      listingId,
      bookingType: bookingType.toLowerCase(),
      startDate,
      endDate,
      startTime: bookingType === "Hourly" ? startTime : null,
      endTime: bookingType === "Hourly" ? endTime : null,
      price: price > 0 ? price : 0,
      type: "", // <-- Add this line to ensure type is never undefined
      status: "pending_owner",
      timestamp: serverTimestamp(),
    };

// Calculate booking start and end times based on booking type
      let bookingStart = null, bookingEnd = null;
if (bookingType === "Hourly" && startDate && startTime && endTime) {
  bookingData.bookingStart = `${startDate}T${startTime}`;
  bookingData.bookingEnd = `${startDate}T${endTime}`;
} else if (startDate && endDate) {
  bookingData.bookingStart = `${startDate}T00:00`;
  bookingData.bookingEnd = `${endDate}T23:59`;
}

      console.log("Booking data to save:", bookingData);

      const response = await fetch("/api/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    if (response.status === 409) {
      alert("Sorry, this time slot is already booked. Please choose another.");
      return;
    }

    const data = await response.json();
    console.log("API response:", data, "Status:", response.status);

    if (response.ok) {
      setSubmitted(true);
      setForm({ name: "", email: "", cell: "", message: "" });
    } else {
      throw new Error("Booking failed");
    }

    } catch (error) {
      console.error("Booking submission error:", error);
      alert("There was an error submitting your request. Please try again.");
    }
  };

  if (submitted) {
    return (
      <p style={{ textAlign: "center", color: "#2FD1BA", padding: "20px" }}>
        <strong>
          Your booking request has been sent. We'll be in touch. <br /> Thank
          you!
        </strong>
      </p>
    );
  }

  function generateTimeOptions(start, end) {
  const options = [];
  let [h, m] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  while (h < endH || (h === endH && m <= endM)) {
    const hour = h.toString().padStart(2, "0");
    const min = m.toString().padStart(2, "0");
    options.push(`${hour}:${min}`);
    m += 30;
    if (m >= 60) { h++; m = 0; }
  }
  return options;
}

const timeOptions = generateTimeOptions(openTime, closeTime);

const filteredStartTimeOptions = timeOptions.filter((startT, idx) => {
  if (!startDate) return true;
  // Only allow this start time if there is at least one valid end time that doesn't overlap
  return timeOptions.slice(idx + 1).some((endT) => {
    return !isTimeSlotBooked(startDate, startT, endT);
  });
});

const filteredEndTimeOptions = timeOptions.filter((t) => {
  if (!startDate || !startTime || t <= startTime) return false;
  // Only allow this end time if the whole range does NOT overlap with any booking
  return !isTimeSlotBooked(startDate, startTime, t);
});

  if (!listing) {
  return <p>Loading...</p>;
}

{/* Calculated Duration */}
let calculatedDuration = "";
if (bookingType === "Hourly" && startTime && endTime) {
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  const hours = (endH + endM / 60) - (startH + startM / 60);
  if (hours > 0) calculatedDuration = `${hours} hour${hours !== 1 ? "s" : ""}`;
}
if (
  (bookingType === "Daily" || bookingType === "Weekly" || bookingType === "Monthly") &&
  startDate && endDate
) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (bookingType === "Daily") {
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    if (days > 0) calculatedDuration = `${days} day${days !== 1 ? "s" : ""}`;
  }
  if (bookingType === "Weekly") {
    const weeks = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 7));
    if (weeks > 0) calculatedDuration = `${weeks} week${weeks !== 1 ? "s" : ""}`;
  }
  if (bookingType === "Monthly") {
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;
    if (months > 0) calculatedDuration = `${months} month${months !== 1 ? "s" : ""}`;
  }
}

{/* Calculated Price after Duration is calculated */}
let estimatedPrice = "";
if (listing && calculatedDuration) {
  if (bookingType === "Hourly" && startTime && endTime) {
    const price = Number(listing.price_Hourly);
    if (!isNaN(price) && price > 0) {
      const [startH, startM] = startTime.split(":").map(Number);
      const [endH, endM] = endTime.split(":").map(Number);
      const hours = (endH + endM / 60) - (startH + startM / 60);
      estimatedPrice = hours > 0 ? `R${(price * hours).toFixed(2)}` : "TBC";
    } else {
      estimatedPrice = "TBC";
    }
  }
  if (bookingType === "Daily" && startDate && endDate) {
    const price = Number(listing.price_Daily);
    if (!isNaN(price) && price > 0) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      estimatedPrice = days > 0 ? `R${(price * days).toFixed(2)}` : "TBC";
    } else {
      estimatedPrice = "TBC";
    }
  }
  if (bookingType === "Weekly" && startDate && endDate) {
  const price = Number(listing.price_Weekly);
  if (!isNaN(price) && price > 0) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    const weeks = Math.max(1, Math.ceil(diff / 7));
    estimatedPrice = `R${(price * weeks).toFixed(2)}`;
  } else {
    estimatedPrice = "TBC";
  }
}
  if (bookingType === "Monthly" && startDate && endDate) {
    const price = Number(listing.price_Monthly);
    if (!isNaN(price) && price > 0) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()) +
        1;
      estimatedPrice = months > 0 ? `R${(price * months).toFixed(2)}` : "TBC";
    } else {
      estimatedPrice = "TBC";
    }
  }
}

console.log("bookingType:", bookingType);
console.log("listing.price_Hourly:", listing.price_Hourly);
console.log("listing.price_Daily:", listing.price_Daily);
console.log("listing.price_Weekly:", listing.price_Weekly);
console.log("listing.price_Monthly:", listing.price_Monthly);
console.log("listing.includedHours:", listing.includedHours);

// Display price per duration //
let pricePerDuration = "";
let includedHoursText = "";

if (listing) {
  if (bookingType === "Hourly" && Number(listing.price_Hourly) > 0) {
    pricePerDuration = `R${Number(listing.price_Hourly)} per hour`;
    if (listing.includedHours?.hourly)
      includedHoursText = `Includes ${listing.includedHours.hourly} hour${listing.includedHours.hourly !== 1 ? "s" : ""} per booking`;
  }
  if (bookingType === "Daily" && Number(listing.price_Daily) > 0) {
    pricePerDuration = `R${Number(listing.price_Daily)} per day`;
    if (listing.includedHours?.daily)
      includedHoursText = `Includes ${listing.includedHours.daily} hour${listing.includedHours.daily !== 1 ? "s" : ""} per day`;
  }
  if (bookingType === "Weekly" && Number(listing.price_Weekly) > 0) {
    pricePerDuration = `R${Number(listing.price_Weekly)} per week`;
    if (listing.includedHours?.weekly)
      includedHoursText = `Includes ${listing.includedHours.weekly} hour${listing.includedHours.weekly !== 1 ? "s" : ""} per week`;
  }
  if (bookingType === "Monthly" && Number(listing.price_Monthly) > 0) {
    pricePerDuration = `R${Number(listing.price_Monthly)} per month`;
    if (listing.includedHours?.monthly)
      includedHoursText = `Includes ${listing.includedHours.monthly} hour${listing.includedHours.monthly !== 1 ? "s" : ""} per month`;
  }
}

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column", // Stack elements vertically
          alignItems: "center", // Center align elements
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          backgroundColor: "white",
          maxWidth: "500px",
          margin: "0 auto",
        }}
        onSubmit={handleSubmit}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "24px",
            color: "#2FD1BA",
            borderBottom: "2px solid #2FD1BA",
            paddingBottom: "10px",
          }}
        >
          Request Booking
        </h2>

        {/* Full Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name & Surname"
          required
          value={form.name}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            outline: "none",
            fontSize: "14px",
          }}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            outline: "none",
            fontSize: "14px",
          }}
        />

        <input
          type="tel"
          name="cell"
          placeholder="Cellphone Number"
          required
          value={form.cell}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            outline: "none",
            fontSize: "14px",
          }}
        />

        {/* Booking Type */}
        <select
          name="bookingType"
          value={bookingType}
          onChange={(e) => setBookingType(e.target.value)}
          required
          style={{
            marginBottom: "10px",
            padding: "10px",
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            outline: "none",
            fontSize: "14px",
          }}
        >
          {allowedDurations.map((type) => (
            <option key={type} value={type}>
              {type} Booking
            </option>
          ))}
        </select>

        {/* Calendar for picking dates - Start Date  and End Date */}
        <div style={{ width: 280, margin: "0 auto", marginBottom: 24 }}>
          <Calendar
            minDate={new Date()}
            tileDisabled={({ date, view }) =>
              view === 'month' && (
                (bookingType === "Hourly" && isDateFullyBooked(date)) ||
                (bookingType !== "Hourly" && isDateBooked(date))
              )
            }
            onChange={date => {
              if (bookingType.toLowerCase() !== "hourly" && Array.isArray(date)) {
                setStartDate(formatDateYYYYMMDD(date[0]));
                setEndDate(formatDateYYYYMMDD(date[1]));
              } else if (date) {
                setStartDate(formatDateYYYYMMDD(date));
                setEndDate(""); // Clear endDate for single-day
              }
            }}
            selectRange={bookingType.toLowerCase() !== "hourly"}
            value={
              bookingType.toLowerCase() !== "hourly" && startDate && endDate
                ? [new Date(startDate), new Date(endDate)]
                : startDate
                ? new Date(startDate)
                : null
            }
          />
        </div>

        {/* Time Fields - only for Hourly Booking */}
        {bookingType === "Hourly" && (
          <>
            <select
              name="startTime"
              value={startTime}
              required
              onChange={(e) => setStartTime(e.target.value)}
              disabled={!startDate}
              style={{
                marginBottom: "10px",
                padding: "10px",
                width: "80%",
                border: "1px solid #ddd",
                borderRadius: "5px",
                outline: "none",
                fontSize: "14px",
                backgroundColor: !startDate ? "#f0f0f0" : "white",
                color: !startDate || !startTime ? "#2FD1BA" : "#2FD1BA", // <-- key line
              }}
            >
              <option value="" disabled hidden>
                {startDate ? "Select Start Time" : "Please select a date first"}
              </option>
              {startDate &&
                filteredStartTimeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
            </select>

            <select
              name="endTime"
              value={endTime}
              required
              onChange={(e) => setEndTime(e.target.value)}
              disabled={!startDate}
              style={{
                marginBottom: "10px",
                padding: "10px",
                width: "80%",
                border: "1px solid #ddd",
                borderRadius: "5px",
                outline: "none",
                fontSize: "14px",
                backgroundColor: !startDate ? "#f0f0f0" : "white",
                color: !startDate ? "#2FD1BA" : "#2FD1BA", // <-- key line
              }}
            >
              <option value="">
                {startDate ? "Select End Time" : "Please select a date first"}
              </option>
              {startDate &&
                filteredEndTimeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
            </select>
          </>
        )}

        {/* Optional Message */}
        <textarea
          name="message"
          placeholder="Additional Message (Optional)"
          rows="4"
          value={form.message}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            outline: "none",
            fontSize: "14px",
            fontFamily: "jost, trebuchet ms",
          }}
        ></textarea>

        {pricePerDuration && (
          <p style={{ color: "#2FD1BA", fontWeight: "bold", margin: "10px 0" }}>
            {pricePerDuration}
          </p>
        )}

        {calculatedDuration && (
          <p style={{ color: "#2FD1BA", fontWeight: "bold", margin: "10px 0" }}>
            {estimatedPrice && estimatedPrice !== "R0.00"
              ? `You selected ${calculatedDuration}: Estimated Price ${estimatedPrice}`
              : "Estimated Price: TBC"}
          </p>
        )}

        {includedHoursText && (
          <p style={{ color: "#888", margin: "10px 0" }}>
            {includedHoursText}
          </p>
        )}

        {bookingType === "Hourly" && startDate && filteredStartTimeOptions.length === 0 && (
          <p style={{ color: "red" }}>
            No available time slots for this day. Please choose another date.
          </p>
        )}

        <p style={{ color: "#888", fontSize: "14px", margin: "16px 0", textAlign: "left", width: "80%", marginLeft: "10%" }}>
          By submitting this booking, you confirm your agreement to our
          <a href="/termsandconditions" target="_blank" rel="noopener noreferrer" style={{ color: "#2fd1ba", textDecoration: "underline" }}> Terms & Conditions</a>,{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#2fd1ba", textDecoration: "underline" }}>Privacy Policy</a>,{" "}
          <a href="/cookiePolicy" target="_blank" rel="noopener noreferrer" style={{ color: "#2fd1ba", textDecoration: "underline" }}>Cookie Policy</a>, and{" "}
          <a href="/cancellationPolicy" target="_blank" rel="noopener noreferrer" style={{ color: "#2fd1ba", textDecoration: "underline" }}>Refund & Cancellation Policy</a>
          {" "}as previously accepted.
        </p>


        {/* Submit Button */}
        <button
          type="submit"
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#2FD1BA",
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#28bfa5")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2FD1BA")}
        >
          Submit
        </button>
      </form>
        <Footer />  
    </div>
  );

  function isDateBooked(date) {
    const dateStr = formatDateYYYYMMDD(date);

    // Block if any daily/weekly/monthly booking overlaps this date
    const isBlockedByRange = bookings.some(b => {
      if (!b.bookingStart || !b.bookingEnd) return false;
      if (b.bookingType === "hourly" || b.bookingType === "Hourly") return false;
      const start = new Date(b.bookingStart);
      const end = new Date(b.bookingEnd);
      return date >= start && date <= end;
    });

    // Block if there are any hourly bookings for this day
    const isBlockedByHourly = bookings.some(b => {
      if (b.bookingType !== "hourly" && b.bookingType !== "Hourly") return false;
      if (!b.bookingStart) return false;
      const bookingDateStr = b.bookingStart.split("T")[0];
      return bookingDateStr === dateStr;
    });

    return isBlockedByRange || isBlockedByHourly;
  }

  function isTimeSlotBooked(dateStr, startT, endT) {
  return bookings.some(b => {
    if (
      (b.bookingType !== "hourly" && b.bookingType !== "Hourly") ||
      !b.bookingStart ||
      !b.bookingEnd
    ) return false;

    const bookingDateStr = b.bookingStart.split("T")[0];
    if (bookingDateStr !== dateStr) return false;

    const bookedStart = b.bookingStart.substring(11,16); // "HH:MM"
    const bookedEnd = b.bookingEnd.substring(11,16);

    // Debug log
    console.log({startT, endT, bookedStart, bookedEnd, overlap: (startT < bookedEnd && endT > bookedStart)});

    return (
      (startT < bookedEnd && endT > bookedStart)
    );
  });
}

  function formatDateYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function isDateFullyBooked(date) {
    if (bookingType !== "Hourly") return false;
    const dateStr = formatDateYYYYMMDD(date);
    // If there are NO available start/end time pairs, the day is fully booked
    return !timeOptions.some((startT, idx) =>
      timeOptions.slice(idx + 1).some((endT) => !isTimeSlotBooked(dateStr, startT, endT))
    );
  }
}
