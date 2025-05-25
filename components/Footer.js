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
      <div style={{ marginTop: "10px" }}>
        <a href="/about" style={{ marginRight: "10px", color: "#2FD1BA" }}>
          About
        </a>
        <a href="/contact" style={{ marginRight: "10px", color: "#2FD1BA" }}>
          Contact Us
        </a>
        <a href="/privacy" style={{ color: "#2FD1BA" }}>
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}