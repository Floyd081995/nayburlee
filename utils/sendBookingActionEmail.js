/* global process */
import sgMail from '@sendgrid/mail';
import { formatToLocalDate, formatToLocalDateTime } from "./dateHelpers";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendBookingActionEmail({
  landlordEmail,
  bookingId,
  listingId,
  ownerName,
  listingName,
  location,
  price,
  message,
  bookingType,
  capacity,
  listingType,
  features,
  bookingStart, // Show booking start date
  bookingEnd,   // Show booking end date
  startTime,
  endTime,
  templateId,
  ...dynamicData // keep for any extra fields
}) {
  const isHourly = bookingType && bookingType.toLowerCase() === "hourly";
  const isRange = bookingType && ["daily", "weekly", "monthly"].includes(bookingType.toLowerCase());

  let bookingDateTimeLocal = "";

  if (isHourly && bookingStart && bookingEnd) {
    const start = formatToLocalDateTime(bookingStart); // "28 May 2025 at 10:00"
    const [, endTime] = bookingEnd.split("T");         // "11:30"
    bookingDateTimeLocal = `${start} - ${endTime}`;
  } else if (isHourly && bookingStart && startTime && endTime) {
    // Only show the date (no time) for hourly bookings
    bookingDateTimeLocal = `${formatToLocalDate(bookingStart, "Africa/Johannesburg", { day: "2-digit", month: "short", year: "numeric" })}, ${startTime}–${endTime} (SAST)`;
  } else if (isRange && bookingStart && bookingEnd) {
    // Range: show date range (date only)
    bookingDateTimeLocal = `${formatToLocalDate(bookingStart)} to ${formatToLocalDate(bookingEnd)}`;
  } else if (bookingStart) {
    // Single date fallback
    bookingDateTimeLocal = formatToLocalDate(bookingStart);
  } else {
    bookingDateTimeLocal = "";
  }

  const msg = {
    to: landlordEmail,
    from: 'match@nayburlee.co.za',
    subject: 'Nayburlee - New Booking Request',
    templateId: templateId || 'd-7ade5d01048d4fe9aceedde2322e91a0',
    dynamic_template_data: {
      landlordName: ownerName,
      listingName,
      location,
      capacity,
      features,
      bookingId,
      listingId,
      price,
      listingType,
      bookingType,
      message,
      bookingDateTimeLocal, // Formatted for display in template
      ...dynamicData
    }
  };

  console.log("EMAIL DATA:", msg.dynamic_template_data);

  await sgMail.send(msg);
}