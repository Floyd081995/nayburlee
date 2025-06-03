import Head from "next/head";
import Footer from "../components/Footer";

export default function CookiePolicy() {
  return (
    <>
      <Head>
        <title>Cookie Policy | Nayburlee</title>
        <meta name="description" content="Read Nayburlee's Cookie Policy for information on cookies and tracking technologies." />
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
        <h1 style={{ color: "#2fd1ba", marginBottom: "16px" }}>Nayburlee Cookie Policy</h1>
        <p><strong>Effective Date:</strong> 25 May 2025</p>
        <p>
          At Nayburlee, we use cookies and similar tracking technologies to improve your experience on our website and deliver personalised content. This Cookie Policy explains what cookies are, which cookies and tracking pixels we use, how you can manage your cookie settings, and the retention period for each cookie category.
        </p>

        <h3 style={{ color: "#2fd1ba" }}>1. What Are Cookies and Tracking Technologies?</h3>
        <ul>
          <li><strong>Cookies:</strong> Small text files stored on your device that help us recognise you, improve site performance, and enhance your user experience.</li>
          <li><strong>Tracking Pixels:</strong> Tiny graphics or scripts that collect information about your interactions on our website, often used in tandem with cookies for analytics and advertising purposes.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>2. Cookies and Tracking Technologies We Use</h3>
        <ul>
          <li>
            <strong>a. Essential Cookies</strong><br />
            <em>Purpose:</em> These cookies are necessary for the operation of our website (e.g., session management, security, and load balancing).<br />
            <em>Retention:</em> They expire when you close your browser.
          </li>
          <li style={{ marginTop: "16px" }}>
            <strong>b. Performance / Analytics Cookies</strong><br />
            <em>Purpose:</em> These cookies help us analyse user behaviour, improve functionality, and optimise the website by collecting data such as pages visited and error messages.<br />
            <em>Retention:</em> Typically stored for up to <strong>365</strong> days (or as required by legal/operational considerations).
          </li>
          <li style={{ marginTop: "16px" }}>
            <strong>c. Advertising Cookies</strong><br />
            <em>Purpose:</em> These cookies are used to deliver relevant advertisements based on your interests and to measure the effectiveness of our marketing campaigns.<br />
            <em>Retention:</em> Stored for <strong>180</strong> days, subject to change based on specific advertising platforms and legal requirements.
          </li>
          <li style={{ marginTop: "16px" }}>
            <strong>d. Tracking Pixels</strong><br />
            <em>Purpose:</em> Used alongside cookies to collect data on user interactions and to dynamically adjust the content and advertisements you see.<br />
            <em>Retention:</em> Varies according to the specific purpose and platform; generally aligned with the retention of the associated cookie.
          </li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>3. How You Can Manage or Opt-Out</h3>
        <ul>
          <li><strong>Cookie Banner:</strong> On your first visit to our website, you will see a small banner with the options “Accept Cookies” and “Manage Settings.”</li>
          <li><strong>Accept Cookies:</strong> Continues using the site with all cookies enabled.</li>
          <li><strong>Manage Settings:</strong> Opens options to selectively disable non-essential cookies.</li>
          <li><strong>Browser Settings:</strong> You can also manage cookie settings directly via your browser preferences. For detailed instructions on managing cookies, please consult the help section of your preferred browser.</li>
          <li><strong>Impact:</strong> Please note that disabling certain cookies may affect the functionality and performance of our website.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>4. Retention Periods</h3>
        <ul>
          <li><strong>Essential Cookies:</strong> Retained for the duration of your browser session.</li>
          <li><strong>Performance / Analytics Cookies:</strong> Typically retained for up to <strong>365</strong> days.</li>
          <li><strong>Advertising Cookies:</strong> Typically retained for up to <strong>180</strong> days.</li>
          <li>Specific retention periods may be adjusted as necessary to comply with legal and operational requirements.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>5. Changes to This Cookie Policy</h3>
        <p>
          We may update this Cookie Policy from time to time. Any material changes will be posted on this page along with a new effective date. For significant changes, we may notify you by email (if you have provided one), by displaying a prominent notice on the Platform, or via a banner on the website. We encourage you to review this policy periodically.
        </p>

        <h3 style={{ color: "#2fd1ba" }}>6. How to Find This Policy</h3>
        <ul>
          <li><strong>Cookie Banner:</strong> A small banner is displayed on your first visit for you to accept or manage cookie settings.</li>
          <li><strong>Footer:</strong> A detailed “Cookie Policy” link is available in the website footer.</li>
          <li><strong>Privacy Policy:</strong> A link to this Cookie Policy is also provided within our <a href="/privacy" style={{ color: "#2fd1ba", textDecoration: "underline" }}>Privacy Policy</a> for further transparency.</li>
        </ul>

        <h3 style={{ color: "#2fd1ba" }}>7. Contact Us</h3>
        <p>
          If you have any questions or concerns about our use of cookies or wish to request further information, please contact us at:<br />
          <strong>Email:</strong> <a href="mailto:match@nayburlee.co.za" style={{ fontSize:"20px", color: "#2fd1ba" }}>match@nayburlee.co.za</a>
        </p>

        <h3 style={{ marginTop: "24px", color: "#2fd1ba"}}>
          Thank you for trusting Nayburlee. We are committed to transparency and your privacy.
        </h3>
      </div>
      <Footer />
    </>
  );
}