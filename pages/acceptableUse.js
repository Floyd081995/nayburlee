import Head from "next/head";
import Footer from "../components/Footer";

export default function AcceptableUse() {
  return (
    <>
      <Head>
        <title>Acceptable Use Policy | Nayburlee</title>
        <meta name="description" content="Read Nayburlee's Acceptable Use Policy for platform conduct." />
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
        <h1 style={{ color: "#2fd1ba", marginBottom: "16px" }}>Acceptable Use Policy</h1>
        <p><strong>Effective Date:</strong> 25 May 2025 </p>
        <p>
          At Nayburlee, we are committed to maintaining a safe, respectful, and trustworthy platform for all users. This Acceptable Use Policy (“Policy”) outlines the types of conduct that are prohibited on our platform. By using our platform, you agree to comply with this Policy.
        </p>

        <h3 style={{ color: "#2fd1ba" }}>1. Prohibited Activities</h3>
        <ul>
          <li><strong>Illegal or Unsafe Activities:</strong> Any activities that violate applicable laws or regulations or jeopardise the safety of any individual or workspace are strictly prohibited.</li>
          <li><strong>Harassment, Hate Speech, and Discrimination:</strong> Users must not engage in any form of harassment, hate speech, or discriminatory behavior. This includes, but is not limited to, threatening language, abusive behavior, or any actions intended to intimidate or harm other users.</li>
          <li><strong>False or Misleading Information:</strong> Providing or listing false, misleading, or fraudulent information is not allowed. All listings and communications must be accurate, truthful, and reflective of the actual condition and attributes of the space.</li>
          <li><strong>Other Harmful Conduct:</strong> Any other behavior that disrupts the integrity of the Nayburlee community, undermines trust or safety, or negatively impacts the user experience is prohibited.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>2. Enforcement</h3>
        <ul>
          <li><strong>Monitoring &amp; Action:</strong> Nayburlee reserves the right to monitor platform activities and content. We may, at our sole discretion, suspend or ban any user or host who violates this Policy.</li>
          <li><strong>Consequences:</strong> Violations of this Policy may result in actions including, but not limited to, the suspension or termination of access to the platform. In cases where illegal activity is suspected, Nayburlee may provide relevant information to law enforcement authorities.</li>
          <li><strong>Appeals:</strong> Users and hosts who believe their content or behavior has been wrongly flagged may contact us at <a href="mailto:match@nayburlee.co.za" style={{ color: "#2fd1ba" }}>match@nayburlee.co.za</a> to request a review. We will consider all appeals in accordance with our internal review procedures.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>3. Modifications</h3>
        <p>
          Nayburlee reserves the right to update or modify this Acceptable Use Policy at any time. Significant changes will be communicated to users via our platform or by email. Continued use of the Nayburlee platform after such modifications constitutes your acceptance of the updated Policy.
        </p>

        <h3 style={{ color: "#2fd1ba" }}>4. Contact Us</h3>
        <p>
          If you have any questions, concerns, or require clarification regarding this Policy, please contact us at:<br />
          <strong>Email:</strong> <a href="mailto:match@nayburlee.co.za" style={{ fontSize:"20px", color: "#2fd1ba" }}>match@nayburlee.co.za</a>
        </p>

        <h3 style={{ marginTop: "24px", color: "#2fd1ba"}}>
          Thank you for helping us keep Nayburlee a safe and welcoming community.
        </h3>
      </div>
      <Footer />
    </>
  );
}