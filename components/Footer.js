export default function Footer() {
  return (
    <footer
      style={{
        background: "#222",
        color: "#2FD1BA",
        fontSize: "13px",
        marginTop: "20px",
        padding: "24px 0 0 0",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 16px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "0 8px",
          lineHeight: "1.8",
        }}
      >
        <a href="/about" style={footerLink}>
          About
        </a>
        <span style={dotStyle}>·</span>
        <a href="/support_contact" style={footerLink}>
          Support Center / FAQs
        </a>
        <span style={dotStyle}>·</span>
        <a href="/cookiePolicy" style={footerLink}>
          Cookie Policy
        </a>
        <span style={dotStyle}>·</span>
        <a href="/cancellationPolicy" style={footerLink}>
          Refund & Cancellation Policy
        </a>
        <span style={dotStyle}>·</span>
        <a href="/acceptableUse" style={footerLink}>
          Acceptable Use Policy
        </a>
        <span style={dotStyle}>·</span>
        <a href="/safety" style={footerLink}>
          Safety & Community Guidelines
        </a>
        <span style={dotStyle}>·</span>
        <a href="/hostTerms" style={footerLink}>
          Host Terms of Service
        </a>
      </div>
      {/* Centered copyright and legal links */}
      <div
        style={{
          marginTop: "4px",           // Reduced gap
          padding: "4px 16px",        // Reduced padding
          textAlign: "center",
          fontSize: "12px",
          maxWidth: "500px",
          margin: "4px auto 0 auto",  // Reduced top margin
        }}
      >
        © {new Date().getFullYear()} Nayburlee Incorporated.
        <span style={{ marginLeft: "12px" }}>
          <a href="/termsandconditions" style={footerLink}>
            Terms & Conditions
          </a>
          <span style={dotStyle}>·</span>
          <a href="/privacy" style={footerLink}>
            Privacy Policy
          </a>
        </span>
      </div>
    </footer>
  );
}

const footerLink = {
  color: "#2FD1BA",
  textDecoration: "none",
  fontSize: "13px",
  margin: "0 2px",
  whiteSpace: "nowrap",
};

const dotStyle = {
  color: "#2FD1BA",
  margin: "0 4px",
};