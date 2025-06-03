export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        marginTop: "40px",
        padding: "20px",
        fontSize: "14px",
        color: "#2FD1BA",
      }}
    >
      <p>© {new Date().getFullYear()} Nayburlee Incorporated. All rights reserved.</p>
      <div style={{ 
          marginTop: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1px 10px", // vertical and horizontal gap
          maxWidth: "700px", // adjust as needed for your layout
          marginLeft: "auto",
          marginRight: "auto",
      }}>

        <a href="/about" style={{color: "#2FD1BA" }}>
          About
        </a>

        <a href="/support_contact" style={{ color: "#2FD1BA" }}>
          Support Center / FAQs
        </a>

        <a href="/termsandconditions" style={{ color: "#2FD1BA" }}>
          Terms & Conditions
        </a>

        <a href="/privacy" style={{ color: "#2FD1BA" }}>
          Privacy Policy
        </a>

        <a href="/cookiePolicy" style={{ color: "#2FD1BA" }}>
          Cookie Policy
        </a>

        <a href="/cancellationPolicy" style={{ color: "#2FD1BA" }}>
          Refund & Cancellation Policy
        </a>

        <a href="/acceptableUse" style={{ color: "#2FD1BA" }}>
          Acceptable Use Policy
        </a>

        <a href="/safety" style={{ color: "#2FD1BA" }}>
          Safety & Community Guidelines
        </a>

        <a href="/hostTerms" style={{ color: "#2FD1BA" }}>
          Host Terms of Service
        </a>  

      </div>
    </footer>
  );
}