// components/BookingForm.js
import { useState } from 'react';
import { db } from '/lib/firebasedb';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function BookingForm({ listingId }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'bookingRequests'), {
        ...form,
        listingId,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Booking submission error:', error);
    }
  };

  if (submitted)
    return (
      <p
        style={{ paddingLeft: '40px'}}
        className="text-green-600 text-center font-medium"
      >
        Your booking request has been sent. We'll be in touch. Thank you.
      </p>
    );

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-xl rounded-lg max-w-lg w-full"
      >
        <h2 style={{marginBottom: "20px", textAlign: "center" }} className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-green-500 pb-2">
          Request Booking
        </h2>
        <div style={{ borderRadius: "10px", textAlign: "center"}} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name & Surname"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <br />
          <input
            type="date"
            name="date"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <br />
          <textarea
            name="message"
            placeholder="Additional Message (Optional)"
            rows="4"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <br />
          <button
            type="submit"
            className="submit-button"
          >
            Send Request
          </button>
        </div>
      </form>

      <style jsx>{`
        /* Submit Button */
        .submit-button {
          background: #2fd1ba;
          color: white;
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: 200;
          font-size: 1.1rem;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(47, 209, 186, 0.3);
        }
        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(47, 209, 186, 0.4);
        
          }
          .submit-button {
            font-size: 1rem; /* Adjust CTA button font size */
            padding: 10px 20px; /* Reduce padding for mobile */
          }
        }
      `}</style>

<footer style={{ textAlign: "center", marginTop: "40px", padding: "20px", fontSize: "14px", color: "#2FD1BA", backgroundColor: "#f0000" }}>
  © {new Date().getFullYear()} Nayburlee Incorporated. 
  <br /> All rights reserved.
</footer>
    </div>
  );
}
