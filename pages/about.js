import Head from "next/head";

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
        <h2 style={{ color: "#2fd1ba", marginBottom: "16px" }}>
          Frequently Asked Questions
        </h2>
        <p>
          Welcome to the Nayburlee FAQ page – your go-to guide for exploring creative and hybrid spaces on demand! We’ve gathered some of the most common questions below. If you need more details, our team is always here to help power your next project.
        </p>
        <div style={{ marginTop: "32px" }}>
          <h3 style={{ color: "#2fd1ba" }}>What is Nayburlee all about?</h3>
          <p>
            We’re revolutionising the way you discover and book dynamic spaces—from podcast studios and content creation rooms to voiceover studios and hybrid workspaces—tailored to fuel your creative journey.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>Why choose Nayburlee?</h3>
          <p>
            With verified listings, flexible booking options (hourly, daily, weekly, or monthly), and a passion for innovation, we connect you with spaces that inspire.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>How does Nayburlee work?</h3>
          <p>
            Browse our curated listings, find the perfect space for your project, and book with ease through our straightforward, all-in-one platform.
          </p>
          <h3 style={{ color: "#2fd1ba" }}>How can Nayburlee help you?</h3>
          <p>
            We take the hassle out of finding the right space and offer robust support—from booking to on-site visits—so you can focus on bringing your vision to life.
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
            For any additional queries, tap into our support channels via our <a href="/contact" style={{ color: "#2fd1ba" }}> Contact Support </a>. Our dedicated team is ready to assist you swiftly.
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
                <a href="#" style={{ marginRight: "10px", color: "#2FD1BA" }}>
                    About
                </a>
                <a href="#" style={{ marginRight: "10px", color: "#2FD1BA" }}>
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