export default function Confirmed() {
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2 style={{ color: "#2FD1BA" }}>Payment Successful!</h2>
      <p style={{ fontSize: "20px", marginTop: "20px" }}>
        Thank you for your payment. Your booking is now confirmed.<br />
        We look forward to welcoming you!
      </p>
      <a href="/" style={{
        display: "inline-block",
        marginTop: "30px",
        padding: "12px 32px",
        background: "#2FD1BA",
        color: "#fff",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "bold"
      }}>
        Back to Home
      </a>
    </div>
  );
}