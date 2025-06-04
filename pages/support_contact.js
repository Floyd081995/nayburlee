import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Help Center / FAQs | Nayburlee</title>
        <meta name="description" content="Contact Nayburlee for creative and hybrid spaces, support, and feedback." />
      </Head>
      <div style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "32px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        color: "#222"
      }}>
        <h1 style={{ color: "#2fd1ba", marginBottom: "16px" }}>
          Nayburlee Support Center &amp; Contact
        </h1>
        <p>
          Welcome to the Nayburlee Support Center—your one‑stop resource for answers, support, and feedback regarding our platform. You can access this page at any time via the “Support &amp; FAQs” link in our header or footer.
        </p>

        <h2 style={{ color: "#2fd1ba", marginTop: "32px" }}>Contact &amp; Support</h2>
        <p>
          Whether you have questions, ideas, or need support, our team is here to help you power your next creative project. Please use the details below or our online form to reach out.
        </p>
        <ul style={{ margin: "24px 0", paddingLeft: "20px" }}>
          <li>
            <strong>General Inquiries Email:</strong>{" "}
            <a href="mailto:match@nayburlee.co.za" style={{fontSize:"20px", color: "#2fd1ba" }}>
              match@nayburlee.co.za
            </a>
          </li>
          <li>
            <strong>Office Operating Hours:</strong> Monday to Friday, 9:00 AM – 5:00 PM (SAST / GMT+2)
          </li>
          <li>
            <strong>Headquarters:</strong> City of Johannesburg, Gauteng, South Africa
          </li>
        </ul>
        <h3 style={{ color: "#2fd1ba" }}>Social Media</h3>
        <p>
          Follow us on social media for the latest updates, news, and behind-the-scenes peeks.<br />
          <a href="https://www.linkedin.com/company/nayburlee" target="_blank" rel="noopener noreferrer" style={{ color: "#2fd1ba", marginRight: "12px" }}>
            LinkedIn
          </a>
          <a href="https://web.facebook.com/profile.php?id=61559247897190" target="_blank" rel="noopener noreferrer" style={{ color: "#2fd1ba" }}>
            Facebook
          </a>
        </p>
        <h3 style={{ color: "#2fd1ba" }}>Feedback</h3>
        <p>
          We love hearing from you! If you have suggestions or feedback, please <a href="mailto:match@nayburlee.co.za" style={{ color: "#2fd1ba" }}>email us</a> and help us keep innovating.
        </p>

        <hr style={{ margin: "40px 0", border: "none", borderTop: "1px solid #eee" }} />

        <h2 style={{ color: "#2fd1ba", marginTop: "32px" }}>Frequently Asked Questions (FAQs)</h2>

        <ul style={{ margin: "24px 0", paddingLeft: "20px" }}>
          <li>
            <strong>How do I book a space?</strong><br />
            1. Submit your requirements using our user request form.<br />
            2. Our smart algorithm matches you with the top available spaces.<br />
            3. Choose your preferred space and submit the booking form.<br />
            4. Wait for host approval (you’ll be notified by email).<br />
            5. Once approved, complete the payment to confirm your reservation.<br />
            6. After payment, your booking is confirmed and you’ll receive all the details you need.
          </li>
          <li style={{ marginTop: "16px" }}>
            <strong>When will I be charged?</strong><br />
            You will be charged only after the host approves your booking request and your session has begun.
          </li>
          <li style={{ marginTop: "16px" }}>
            <strong>How do I cancel my booking?</strong><br />
            If you need to cancel a booking, please email us at <a href="mailto:match@nayburlee.co.za" style={{ color: "#2fd1ba" }}>match@nayburlee.co.za</a> at least 24 hours before your scheduled start time. Cancellations made with less notice may be subject to our <a href="/cancellationPolicy" style={{ color: "#2fd1ba", textDecoration: "underline" }}>Refund &amp; Cancellation Policy</a>.
          </li>
          <li style={{ marginTop: "16px" }}>
            <strong>What happens if the host cancels or is a no-show?</strong><br />
            If the host cancels a confirmed booking or fails to provide the space as described (including being a no-show), you will receive a full refund of the booking amount as per our <a href="/cancellationPolicy" style={{ color: "#2fd1ba", textDecoration: "underline" }}>Refund &amp; Cancellation Policy</a>.
          </li>
          <li style={{ marginTop: "16px" }}>
            <strong>What if the space is not as described?</strong><br />
            If the booked space does not match the description, contact us immediately at <a href="mailto:match@nayburlee.co.za" style={{ color: "#2fd1ba" }}>match@nayburlee.co.za</a>. We will work quickly to arrange a refund or provide an alternative solution.
          </li>
          <li style={{ marginTop: "16px" }}>
            <strong>How do hosts get paid?</strong><br />
            Host payments are released after the tenant’s first session begins. Hosts receive 85% of the booking amount, with the remainder retained by Nayburlee as outlined in our <a href="/hostTerms" style={{ color: "#2fd1ba", textDecoration: "underline" }}>Host Terms of Service</a>.
          </li>
        </ul>
        <p>
          If you have any additional questions or require further assistance, please feel free to reach out to us at <a href="mailto:match@nayburlee.co.za" style={{ color: "#2fd1ba" }}>match@nayburlee.co.za</a>.
        </p>
      </div>
      <Footer />
    </>
  );
}