import Head from "next/head";
import Footer from "../components/Footer";

export default function CancellationPolicy() {
  return (
    <>
      <Head>
        <title>Refund & Cancellation Policy | Nayburlee</title>
        <meta name="description" content="Read Nayburlee's refund and cancellation policy for bookings." />
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
        <h1 style={{ color: "#2fd1ba", marginBottom: "16px" }}>Nayburlee Refund & Cancellation Policy</h1>
        <p><strong>Effective Date:</strong> 25 May 2025 </p>
        <p>
          At Nayburlee, we strive to deliver a seamless and transparent booking experience. We understand that plans can change, and this Refund & Cancellation Policy sets out the rules and processes for canceling bookings and processing refunds. By using our platform, you agree to these terms.
        </p>

        <h3 style={{ color: "#2fd1ba" }}>1. General Terms</h3>
        <ul>
          <li><strong>Submission:</strong> All cancellation requests must be submitted via the Nayburlee platform or by contacting us at <a href="mailto:match@nayburlee.co.za" style={{ color: "#2fd1ba" }}>match@nayburlee.co.za</a>.</li>
          <li><strong>Applicability:</strong> This policy governs all bookings made through Nayburlee, whether by tenants or resulting from host cancellations.</li>
          <li><strong>Refund Process:</strong> Refunds, where applicable, will be processed using your original payment method within <strong>7–10</strong> business days following approval. Refunds are subject to the terms outlined below and any non-refundable fees will be deducted.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>2. Cancellation by Tenants</h3>
        <p><strong>Cancellation Window & Refunds:</strong></p>
        <ul>
          <li><strong>Standard Cancellation:</strong> If you cancel your booking more than 24 hours before the scheduled start time, you will receive a full refund of the booking amount, less any non-refundable fees.</li>
          <li><strong>Late Cancellation:</strong> Cancellations made less than 24 hours prior to the scheduled start time may result in no refund or a partial refund, at the host’s discretion and as outlined in the Host Terms of Service.</li>
          <li><strong>No-Show:</strong> Failure to check in (no-show) is considered a late cancellation and is generally non‑refundable.</li>
        </ul>
        <p><strong>Procedure:</strong></p>
        <ul>
          <li>Cancellation requests must be initiated via the platform.</li>
          <li>Once submitted, the request will be reviewed, and the applicable refund will be processed according to these guidelines.</li>
          <li>Disputes or exceptions will be resolved in line with our overall Terms &amp; Conditions.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>3. Cancellation by Hosts</h3>
        <ul>
          <li>If a host cancels a confirmed booking before the scheduled start time, or fails to provide the space as described (including being a no-show), the user will receive a full refund of the booking amount.</li>
          <li>Hosts who cancel late or fail to provide the space as described may be subject to penalties, including removal from the platform or other actions as outlined in the Host Terms of Service.</li>
          <li>Hosts must communicate cancellations promptly to minimise disruption.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>4. Refund Process</h3>
        <ul>
          <li><strong>Processing:</strong> Once a cancellation is approved, refunds will be processed automatically to the original payment method within <strong>7–10</strong> business days.</li>
          <li><strong>Billing Adjustments:</strong> Refund amounts will reflect the applicable cancellation fee deductions as described above.</li>
          <li><strong>Disputes:</strong> In the event of any discrepancies or disputes regarding a refund, please contact us immediately at <a href="mailto:match@nayburlee.co.za" style={{ color: "#2fd1ba" }}>match@nayburlee.co.za</a> for resolution.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>5. Exceptions &amp; Force Majeure</h3>
        <ul>
          <li><strong>Exceptional Circumstances:</strong> In the event of circumstances beyond the control of Nayburlee (e.g., natural disasters, government restrictions), cancellation terms may be adjusted. Any changes under such circumstances will be communicated in advance to affected users.</li>
          <li><strong>Policy Adjustments:</strong> Any modifications to refund terms due to extraordinary conditions will be clearly outlined and will not affect the rights of users in previously confirmed bookings.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>6. Amendments to This Policy</h3>
        <p>
          Nayburlee reserves the right to modify this Refund &amp; Cancellation Policy at any time. Significant changes will be published on our platform and will become effective as indicated by the new effective date. For material changes, we may notify you by email (if you have provided one), by displaying a prominent notice on the Platform, or via a banner on the website. Continued use of our service after such modifications constitutes acceptance of the updated policy.
        </p>

        <h3 style={{ color: "#2fd1ba" }}>7. Contact Information</h3>
        <p>
          For all inquiries regarding refunds or cancellations, please reach out to us at:<br />
          <strong>Email:</strong> <a href="mailto:match@nayburlee.co.za" style={{ fontSize:"20px", color: "#2fd1ba" }}>match@nayburlee.co.za</a>
        </p>

        <h3 style={{ marginTop: "24px", color: "#2fd1ba"}}>
          Thank you for choosing Nayburlee. We are committed to providing a fair and transparent booking experience.
        </h3>
      </div>
      <Footer />
    </>
  );
}