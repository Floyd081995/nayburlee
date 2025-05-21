export default function Cancelled() {
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2 style={{ color: "#d12f2f" }}>Payment Cancelled</h2>
      <p style={{ fontSize: "20px", marginTop: "20px" }}>
        Your payment was cancelled.<br />
        If this was a mistake, you can try again from your booking page.
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