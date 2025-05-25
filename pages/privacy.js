import Head from "next/head";
import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Nayburlee</title>
        <meta name="description" content="Read Nayburlee's privacy policy for creative and hybrid spaces." />
      </Head>
      <div style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "32px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        color: "#222"
      }}>
        <h1 style={{ color: "#2fd1ba", marginBottom: "16px" }}>Nayburlee Privacy Policy</h1>
        <p><strong>Effective Date:</strong> [25 May 2025]</p>
        <p>
          Welcome to Nayburlee – Creative & Hybrid Spaces, On Demand! Your privacy is important to us, and we’re committed to protecting your personal information while you explore and book dynamic spaces through our platform. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information.
        </p>
        <h3 style={{ color: "#2fd1ba" }}>1. Information We Collect</h3>
        <p><strong>Personal Information</strong><br />
        When you interact with Nayburlee (for example, signing up, contacting us, or making a booking), we may collect details such as:</p>
        <ul>
          <li>Your Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Any other information you voluntarily provide</li>
        </ul>
        <p><strong>Usage Data</strong><br />
        We automatically collect information about how you use our site. This includes:</p>
        <ul>
          <li>Browser type, IP address, and device details</li>
          <li>Pages visited and interactions with our content (via cookies and similar technologies)</li>
        </ul>
        <p><strong>Booking and Listing Data</strong><br />
        For users booking spaces and landlords listing properties, we collect details relevant to your inquiry or listing (e.g., booking preferences, listing descriptions, images, etc.).</p>
        <h3 style={{ color: "#2fd1ba" }}>2. How We Use Your Information</h3>
        <ul>
          <li><strong>Provide Our Services:</strong> Process bookings, manage listings, and help match you with spaces that suit your needs.</li>
          <li><strong>Communicate With You:</strong> Send you updates, notifications, and promotional materials. (Make sure you provide an email you frequently check!)</li>
          <li><strong>Improve Our Platform:</strong> Understand user interactions to enhance our services and deliver a more personalised experience.</li>
          <li><strong>Ensure Security:</strong> Monitor and improve our site’s safety and protect against fraudulent activities.</li>
        </ul>
        <h3 style={{ color: "#2fd1ba" }}>3. Data Sharing and Disclosure</h3>
        <p>We respect your privacy and do not sell your personal information. We may share your data only in the following instances:</p>
        <ul>
          <li><strong>Trusted Service Providers:</strong> With partners who help us operate our services, under strict confidentiality agreements.</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect the rights, property, or safety of Nayburlee, our users, or others.</li>
          <li><strong>Consent-Based Sharing:</strong> With your explicit consent when needed.</li>
        </ul>
        <h3 style={{ color: "#2fd1ba" }}>4. Data Security</h3>
        <p>
          We implement industry-standard security measures to protect your information. Although we strive for maximum security, no method is completely foolproof. By using our platform, you acknowledge this risk.
        </p>
        <h3 style={{ color: "#2fd1ba" }}>5. Your Rights</h3>
        <ul>
          <li><strong>Access and Update:</strong> Request access to your information and correct any inaccuracies.</li>
          <li><strong>Deletion or Restriction:</strong> Ask us to delete or restrict the use of your data (subject to legal obligations).</li>
          <li><strong>Withdraw Consent:</strong> Revoke consent for data processing where applicable, though this may affect your ability to use certain features of our platform.</li>
        </ul>
        <h3 style={{ color: "#2fd1ba" }}>6. Cookies and Tracking Technologies</h3>
        <p>
          Our site uses cookies to enhance your experience and monitor site usage. You can adjust your cookie settings at any time through your browser preferences. Note that disabling cookies may affect site functionality.
        </p>
        <h3 style={{ color: "#2fd1ba" }}>7. Changes to This Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Any material changes will be posted on this page along with a new effective date, so please check back periodically.
        </p>
        <h3 style={{ color: "#2fd1ba" }}>8. Contact Us</h3>
        <p>
          If you have any questions, concerns, or requests regarding your personal information or this Privacy Policy, please reach out to us at:<br />
          <strong>Email:</strong> <a href="mailto:match@nayburlee.co.za" style={{ fontSize:"20px", color: "#2fd1ba" }}>match@nayburlee.co.za</a>
        </p>
        <h3 style={{ marginTop: "24px", color: "#2fd1ba"}}>
          Thank you for trusting Nayburlee. We’re here to help you discover and book spaces that inspire innovation.
        </h3>
      </div>
      <Footer />
    </>
  );
}