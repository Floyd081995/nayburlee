import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | Nayburlee</title>
        <meta name="description" content="Contact Nayburlee for creative and hybrid spaces, support, and feedback." />
      </Head>
      <div style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "32px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        color: "#222"
      }}>
        <h1 style={{ color: "#2fd1ba", marginBottom: "16px" }}>
          Welcome to Nayburlee — Creative & Hybrid Spaces, On Demand!
        </h1>
        <p>
          Thank you for getting in touch. Whether you have questions, ideas, or need support, our team is here to help you power your next creative project. Please use the details below or our online form to reach out.
        </p>
        <ul style={{ margin: "24px 0", paddingLeft: "20px" }}>
          <li>
            <strong>General Inquiries Email:</strong>{" "}
            <a href="mailto:match@nayburlee.co.za" style={{fontSize:"20px", color: "#2fd1ba" }}>
              match@nayburlee.co.za
            </a>
          </li>
          <li>
            <strong>Office Operating Hours:</strong> Monday to Friday, 9:00 AM – 5:00 PM (SAST / GMT+2)
          </li>
          <li>
            <strong>Head Office:</strong> City of Johannesburg, Gauteng, South Africa
          </li>
        </ul>
        <h3 style={{ color: "#2fd1ba" }}>Social Media</h3>
        <p>
          Follow us on social media for the latest updates, news, and behind-the-scenes peeks.<br />
          <a href="https://www.linkedin.com/company/nayburlee" target="_blank" rel="noopener noreferrer" style={{ color: "#2fd1ba", marginRight: "12px" }}>
            LinkedIn
          </a>
          <a href="https://web.facebook.com/profile.php?id=61559247897190" target="_blank" rel="noopener noreferrer" style={{ color: "#2fd1ba" }}>
            Facebook
          </a>
        </p>
        <h3 style={{ color: "#2fd1ba" }}>Feedback</h3>
        <p>
          We love hearing from you! If you have suggestions or feedback, please fill out our quick <Link href="#" style={{ color: "#2fd1ba", textDecoration: "underline" }}>feedback form</Link> and help us keep innovating.
        </p>
      </div>
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
    </>
  );
}