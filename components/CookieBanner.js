import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("nayburlee_cookie_consent")) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("nayburlee_cookie_consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#2fd1ba",
        color: "#fff",
        padding: "18px 40px", // Default desktop padding
        textAlign: "center",
        zIndex: 1000,
        fontSize: "16px"
      }}
    >
      We use cookies to improve your experience. See our{" "}
      <a href="/cookiePolicy" style={{ color: "#fff", textDecoration: "underline" }}>Cookie Policy</a>.
      <button
        onClick={acceptCookies}
        style={{
          marginLeft: "18px",
          background: "#fff",
          color: "#2fd1ba",
          border: "none",
          borderRadius: "4px",
          padding: "8px 18px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Accept Cookies
      </button>
    </div>
  );
}