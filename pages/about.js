import Head from "next/head";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us & FAQ | Nayburlee</title>
        <meta name="description" content="Learn more about Nayburlee and find answers to common questions about creative and hybrid spaces." />
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
        <h1 style={{ color: "#2fd1ba", marginBottom: "16px" }}>
          About Nayburlee
        </h1>
        <p>
          Nayburlee is South Africa’s leading platform for discovering and booking flexible creative workspaces—from studios to hybrid offices. We connect creators, podcasters, and startups with fully equipped spaces that match their vibe and workflow—no leases, no hassle, just seamless access.
        </p>
        <hr style={{ margin: "32px 0" }} />
  
        <div style={{ marginTop: "32px" }}>
          <h3 style={{ color: "#2fd1ba" }}>What is Nayburlee?</h3>
          <p>
            We’re revolutionising the way you discover and book dynamic spaces—from podcast studios and content creation rooms to voiceover studios and hybrid workspaces—tailored to fuel your creative journey.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>Why choose Nayburlee?</h3>
          <p>
            With verified listings, flexible booking options (hourly, daily, weekly, or monthly), and a passion for innovation, we connect you with spaces that inspire.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>How does Nayburlee work?</h3>
          <p>
            Explore our curated listings of creative and professional spaces—from innovatively designed podcast and voiceover studios, hybrid workspaces to fully equipped video / content creation rooms. With a few easy clicks, discover the perfect space for your project and secure your booking through our seamless, all‑in‑one platform.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>How can Nayburlee help you?</h3>
          <p>
            At Nayburlee, we remove the hassle from finding and booking the right space. Enjoy a fully supported experience—from detailed listings and flexible booking options—so you can focus on bringing your vision to life without distraction.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>What are the service costs?</h3>
          <p>
            Our pricing is dynamic, based on duration and the value each space offers. Explore our listings for transparent pricing details on each option.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>Are the listings verified?</h3>
          <p>
            Absolutely. Every space on Nayburlee is thoroughly vetted to ensure quality and reliability, giving you peace of mind when you book.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>Can I schedule property viewings?</h3>
          <p>
            Yes! Arrange in-person visits to see if a space is the perfect fit before you commit.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>Is my personal information secure?</h3>
          <p>
            Your privacy is a priority. We use state-of-the-art security measures to ensure that all your data remains safe and confidential.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>How do I reach out for support?</h3>
          <p>
            For any additional queries, tap into our support channels via our <a href="/support_contact" style={{ color: "#2fd1ba" }}> Contact Support </a>. Our dedicated team is ready to assist you swiftly.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>Is Nayburlee available in my area?</h3>
          <p>
            Currently, we’re showcasing verified listings across South Africa—but stay tuned for expansion updates as we continue to grow!
          </p>
        </div>
        <p style={{ marginTop: "32px" }}>
          We’re committed to helping you discover the spaces that spark creativity. If your question isn’t listed here, don’t hesitate to get in touch.
        </p>
        <h3 style={{ marginTop: "24px", color: "#2fd1ba"}}>
          Thank you for choosing Nayburlee. We’re excited to be part of your journey!
        </h3>
      </div>
      <Footer />  
    </>
  );
}