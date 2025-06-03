import Head from "next/head";
import Footer from "../components/Footer";

export default function Safety() {
  return (
    <>
      <Head>
        <title>Safety & Community Guidelines | Nayburlee </title>
        <meta name="description" content="Read Nayburlee's Safety & Community Guidelines for guests and hosts." />
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
        <h1 style={{ color: "#2fd1ba", marginBottom: "16px" }}>Safety & Community Guidelines</h1>
        <p><strong>Effective Date:</strong> 25 May 2025 </p>
        <p>
          At Nayburlee, we are committed to fostering a safe, respectful, and high-quality experience for everyone on our platform. These guidelines outline the standards of conduct expected from both users (guests) and hosts.
        </p>

        <h3 style={{ color: "#2fd1ba" }}>1. For Users (Guests)</h3>
        <ul>
          <li><strong>Punctuality &amp; Respect:</strong> Arrive on time for your booking and adhere to any house or host-specific rules provided at check-in.</li>
          <li><strong>Careful Use of Space:</strong> Treat the space and all equipment with care. Any damage resulting from misuse may result in liability for the guest.</li>
          <li><strong>Reporting Issues:</strong> Should you encounter any issues, safety concerns, or discrepancies during your booking, please report them immediately via email at <a href="mailto:match@nayburlee.co.za" style={{ color: "#2fd1ba" }}>match@nayburlee.co.za</a> or via our WhatsApp support channel. Timely reports enable prompt resolution and help maintain quality standards for all users.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>2. For Hosts</h3>
        <ul>
          <li><strong>Space Maintenance:</strong> Ensure your property is clean, well-maintained, and that all listed equipment is in proper working order prior to guest arrival.</li>
          <li><strong>Clear Communication:</strong> Provide guests with clear check-in instructions and, where applicable, emergency contact details to ensure a smooth and safe experience.</li>
          <li><strong>Professional Conduct:</strong> Respond promptly and professionally to all guest inquiries and concerns. This includes addressing any safety or quality issues reported by guests in a timely manner.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>3. Updates to These Guidelines</h3>
        <p>
          Nayburlee may update these Safety & Community Guidelines from time to time. Any significant changes will be communicated on our platform, by email (if you have provided one), or via a banner on the website. Continued use of the platform after such updates constitutes your acceptance of the revised guidelines.
        </p>

        <p>
          These guidelines are designed to protect the interests of both guests and hosts while maintaining the high standards expected in our community. Any failure to adhere to these standards may result in account suspension or other corrective actions, as determined by Nayburlee.
        </p>
        <p>
          If you have any questions or require further clarification, please contact us at <a href="mailto:match@nayburlee.co.za" style={{ color: "#2fd1ba" }}>match@nayburlee.co.za</a>.
        </p>
        <h3 style={{ marginTop: "24px", color: "#2fd1ba"}}>
          Thank you for helping us create a safe, respectful, and reliable community at Nayburlee.
        </h3>
      </div>
      <Footer />
    </>
  );
}