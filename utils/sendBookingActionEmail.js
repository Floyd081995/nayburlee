/* global process */
import { Data } from '@react-google-maps/api';
import sgMail from '@sendgrid/mail';

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
  bookingDateTime,
  dynamicData,
  templateId
}) {
  const msg = {
    to: landlordEmail,
    from: 'match@nayburlee.co.za',
    subject: 'Nayburlee - New Booking Request',
    templateId: templateId || 'd-7ade5d01048d4fe9aceedde2322e91a0',
    dynamic_template_data: {
      landlordName: ownerName, // [Landlord Name]
      listingName,             // [Listing Name]
      location,                // [Listing Location]
      capacity,                // [Listing Capacity]
      features,                // [Listing Features]
      bookingId,               // [Booking ID]
      listingId,              // [Listing ID]
      price,                // [Booking Price]
      listingType,              // [Listing Type]
      bookingType,            // [Booking Type]
      message,              // [Booking Duration]
      bookingDateTime,         // [Booking DateTime]
      ...dynamicData
    }
  };

  console.log("EMAIL DATA:", msg.dynamic_template_data); // <-- Add here

  await sgMail.send(msg);
}