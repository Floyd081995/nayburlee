// Import global styles
import '../src/globals.css'; // Ensure the correct path to the CSS file

// Import other dependencies
import Link from "next/link";

export default function App({ Component, pageProps }) {
  // The functional component must contain the return inside its body
  return (
    <>
      <nav style={{ padding: "1rem", backgroundColor: "#000000" }}>
        <Link href="/" legacyBehavior>
          <a style={{ display: "inline-block" }}>
            <img
              src="/nayburlee-icon.png"
              alt="Nayburlee Logo"
              style={{ width: "120px", height: "50px", verticalAlign: "middle" }}
            />
          </a>
        </Link>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
