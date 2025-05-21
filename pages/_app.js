import Head from "next/head";
import "../src/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [showModal, setShowModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const openNav = () => {
    setShowModal(true);
    setTimeout(() => setNavOpen(true), 10);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  useEffect(() => {
    if (!navOpen && showModal) {
      const timeout = setTimeout(() => setShowModal(false), 350); // match your CSS transition
      return () => clearTimeout(timeout);
    }
  }, [navOpen, showModal]);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  return (
    <>
      <Head>
        <title>Nayburlee | Create. Collaborate. Grow.</title>
        <meta
          name="description"
          content="Nayburlee matches creators, podcasters, and startups with flexible, bookable verified spaces across South Africa, including studios, content creation rooms, and hybrid workspaces."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Nayburlee | Create. Collaborate. Grow." />
        <meta
          property="og:description"
          content="Book verified podcast studios, content creation spaces, and hybrid workspaces in South Africa — by the hour or day. No leases, no hassle."
        />
        <meta property="og:image" content="/nayburlee-preview.jpg" />
        <meta property="og:url" content="https://nayburlee.co.za" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nayburlee | Create. Collaborate. Grow." />
        <meta
          name="twitter:description"
          content="Book verified podcast studios, content creation spaces, and hybrid workspaces in South Africa — by the hour or day. No leases, no hassle."
        />
        <meta name="twitter:image" content="/nayburlee-preview.jpg" />
      </Head>

      <div className="main-header">
        <header>
          <nav className="nav-container">
            {/* Left Section: Logo */}
            <div className="logo-container">
              <Link href="https://nayburlee.co.za/" legacyBehavior>
                <a>
                  <img
                    src="/nayburlee-icon.png"
                    alt="Nayburlee Logo"
                    className="logo"
                  />
                </a>
              </Link>
            </div>

            {/* Hamburger for mobile */}
            <button
              className="nav-toggle"
              onClick={navOpen ? closeNav : openNav}
              aria-label={navOpen ? "Close menu" : "Open menu"}
            >
              {navOpen ? (
                // Close (X) icon SVG
                <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                  <line x1="8" y1="8" x2="24" y2="24" stroke="#2FD1BA" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="24" y1="8" x2="8" y2="24" stroke="#2FD1BA" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              ) : (
                // Hamburger icon SVG
                <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                  <line x1="7" y1="10" x2="25" y2="10" stroke="#2FD1BA" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="7" y1="16" x2="25" y2="16" stroke="#2FD1BA" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="7" y1="22" x2="25" y2="22" stroke="#2FD1BA" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              )}
            </button>
            <div className={`button-container${navOpen ? " open" : ""}`}>
              <a
                className="contact-button"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
              <a className="about-us-button" href="/about">
                About
              </a>
            </div>
          </nav>
        </header>
      </div>

      {/* Overlay and Modal */}
      {showModal && (
        <div className={`nav-overlay${navOpen ? " open" : ""}`} onClick={closeNav}></div>
      )}
      {showModal && (
        <div className={`nav-modal${navOpen ? " open" : ""}`}>
          <div className="nav-modal-header">
            <a href="/" className="nav-modal-logo">
              <img src="/nayburlee-icon.png" alt="Nayburlee Logo" style={{ height: "38px" }} />
            </a>
          </div>
          <div className="nav-modal-content">
            <a
              className="modal-link"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeNav}
            >
              Contact Us
            </a>
            <a className="modal-link" href="/about" onClick={closeNav}>
              About
            </a>
          </div>
          <div className="nav-modal-footer">
            <a href="https://www.linkedin.com/company/nayburlee" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              <img src="/linkedin-icon.png" alt="LinkedIn" style={{ height: "32px", margin: "0 8px" }} />
            </a>
            <a href="https://web.facebook.com/profile.php?id=61559247897190" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              <img src="/facebook-icon.png" alt="Facebook" style={{ height: "32px", margin: "0 8px" }} />
            </a>
          </div>
        </div>
      )}

      {/* Page Content */}
      <Component {...pageProps} />
    </>
  );
}