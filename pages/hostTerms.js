import Head from "next/head";
import Footer from "../components/Footer";

export default function HostTerms() {
  return (
    <>
      <Head>
        <title>Host Terms of Service | Nayburlee</title>
        <meta name="description" content="Read Nayburlee's Host Terms of Service for listing properties." />
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
        <h1 style={{ color: "#2fd1ba", marginBottom: "16px" }}>Host Terms of Service</h1>
        <p><strong>Effective Date:</strong> 25 May 2025 </p>
        <p>
          These Host Terms of Service (“Terms”) set forth the obligations and responsibilities of you, as a host (“Host”), when listing your property on Nayburlee (the “Platform”). By using the Platform, you agree to comply with these Terms and to ensure that your listing accurately reflects your space.
        </p>

        <h3 style={{ color: "#2fd1ba" }}>1. Host Obligations</h3>
        <ul>
          <li><strong>Accurate and Complete Listings:</strong> You must provide truthful, complete, and up-to-date information regarding your property, including its address, available equipment, pricing, availability, and any other relevant details. Misrepresentations that result in tenant dissatisfaction or disputes may lead to removal from the Platform.</li>
          <li><strong>Maintenance &amp; Safety:</strong> You are responsible for maintaining your space in a safe, clean, and functional state in accordance with the description mentioned on the Platform. Additionally, you must secure any licenses, permits, or other regulatory approvals required for your property.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>2. Booking Acceptance</h3>
        <ul>
          <li><strong>Timely Response:</strong> You are required to review and either approve or reject booking requests within 2 hours of receipt (or as otherwise agreed). Failure to respond within this timeframe may result in an automatic cancellation of the request.</li>
          <li><strong>Commitment to Confirmed Bookings:</strong> Once a booking is confirmed, you must honor the reservation. In cases where you must cancel a confirmed booking, you are obligated to issue a timely cancellation and notify the tenant, subject to the cancellation guidelines described herein.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>3. Payouts</h3>
        <ul>
          <li>
            <strong>Payment Processing:</strong> Nayburlee will hold the tenant’s payment until the commencement of the tenant’s first session. After confirmation that the session has begun, <strong>85% of the booking payment will be released to you within 1–5 working days, and the remaining 15% will be retained by Nayburlee as a service fee. This payout structure is subject to periodic review and may be updated at Nayburlee’s discretion. Any changes will be communicated in advance.</strong>
          </li>
          <li>
            <strong>Invoicing and Automated Payments:</strong> Hosts are required to invoice Nayburlee for their payout unless an automated payment system is implemented. If automated payments are in place, payouts will be processed automatically.
          </li>
          <li>
            <strong>Host’s Financial Responsibilities:</strong> You acknowledge and agree that you are solely responsible for any taxes, fees, or local compliance obligations arising from the receipt of payouts. It is your duty to ensure that you meet any applicable regulatory or tax requirements.
          </li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>4. Cancellations &amp; Refunds</h3>
        <ul>
          <li><strong>Host-Initiated Cancellations:</strong> If you cancel a confirmed booking prior to the scheduled start time, or fail to provide the space as described (including being a no-show), a full refund will be issued to the tenant.</li>
          <li><strong>Permissible Cancellation Reasons:</strong> Cancellations are permitted only for valid, justifiable reasons (such as emergencies or inadvertent duplicate bookings). Unauthorised or arbitrary cancellations may result in penalties, including but not limited to the suspension or termination of your Host privileges.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>5. Liability</h3>
        <ul>
          <li><strong>Insurance Requirement:</strong> You must maintain adequate insurance coverage to cover any injury or damage incidents that occur on your property during a tenant’s usage. This insurance should cover, at minimum, any claims arising from accidents, property damage, or bodily injury.</li>
          <li><strong>Limitation of Platform Liability:</strong> Nayburlee is not liable for any incidents, injuries, or damages that occur on or in connection with your premises. You agree to indemnify and hold Nayburlee harmless from any claims, losses, or liabilities arising out of or relating to your property or your listing.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>6. Notices and Communications</h3>
        <p>
          All communications or notices regarding these Terms, including questions or clarifications, should be directed to us at:<br />
          <strong>Email:</strong> <a href="mailto:match@nayburlee.co.za" style={{ fontSize:"20px", color: "#2fd1ba" }}>match@nayburlee.co.za</a>
        </p>

        <p style={{ marginTop: "24px" }}>
          By listing your property on the Nayburlee Platform, you acknowledge that you have read, understood, and agreed to these Host Terms of Service. Nayburlee reserves the right to modify these Terms at any time, with such modifications becoming effective as indicated in the updated Terms. For material changes, we may notify you by email (if you have provided one), by displaying a prominent notice on the Platform, or via a banner on the website. Your continued use of the Platform following any modifications constitutes your acceptance of such changes.
        </p>
      </div>
      <Footer />
    </>
  );
}