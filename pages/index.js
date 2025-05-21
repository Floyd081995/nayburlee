import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Head from "next/head";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import SubscriptionForm from "../components/SubscriptionForm";
import AOS from "aos";
import "aos/dist/aos.css";
import TestimonialCard from "../components/TestimonialCard";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    AOS.init({ once: true, duration: 800 });
  }, []);

  if (!mounted) return null;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const testimonialSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 2000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      className="main-content-container"
      style={{
        position: "relative",
        width: "100%",
        margin: "0",
        padding: "50px",
      }}
    >
      <Head>
        <title>Nayburlee | Creative and Hybrid Spaces</title>
        <meta
          name="description"
          content="Find and book podcast studios, creative and hybrid workspaces by the hour or day. Perfect for creators, podcasters, and startups."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <Hero />

      {/* Subtitle Hero Section */}
      <section
        data-aos="fade-up"
        style={{
          backgroundImage: "/",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "10px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <p className="hero-subtitle" style={{ fontSize: "1.5rem", marginTop: "10px" }}>
          Discover creative and hybrid workspaces in South Africa tailored to your needs — all bookable by the hour, day, week or month.
          <br />
          <br />
          <strong>No leases.</strong>
          <br />
          First 10 bookings get <span className="highlight">15% off</span> !
        </p>
        <a
          href="/user-request"
          className="cta-button"
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            display: "inline-block",
          }}
        >
          Get Matched
        </a>
      </section>

      {/* List Space CTA Section */}
      <section
        data-aos="fade-up"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "32px 24px",
          textAlign: "center",
          marginTop: "5px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        <p
          className="hero-subtitle"
          style={{
            textAlign: "center",
            marginTop: "0px",
            marginBottom: "8px",
            fontSize: "1.5rem",
          }}
        >
          Or looking to list space with us?
        </p>
        <div
          className="list-space-container"
          style={{
            textAlign: "center",
            marginTop: "0px",
          }}
        >
          <a
            className="list-space-button"
            href="https://forms.gle/uf2REGMbp7bDXzbG6"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              margin: "0 auto",
              minWidth: "120px",
              padding: "12px 28px",
              color: "#fff",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "18px",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: "background 0.4s",
            }}
          >
            Partner With Us
          </a>
        </div>
      </section>

      {/* What is Nayburlee Section */}
      <section
        data-aos="fade-up"
        style={{
          backgroundColor: "white",
          color: "#2fd1ba",
          padding: "40px 30px",
          textAlign: "center",
          marginTop: "30px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ marginTop: "10px", marginBottom: "5px", fontSize: "40px" }}>
          What is Nayburlee?
        </h2>
        <img src="nayburlee-logo-image.png" alt="Nayburlee Logo" width="6%" />
        <p style={{ marginTop: "10px", marginBottom: "15px", fontSize: "20px", fontWeight: "bold" }}>
          Nayburlee is South Africa’s leading platform for discovering and booking flexible creative workspaces—from studios to hybrid offices.
        </p>
        <p style={{ marginTop: "5px", marginBottom: "15px", fontSize: "20px" }}>
          We connect creators, podcasters, and startups with fully equipped spaces that match their vibe and workflow—no leases, no hassle, just seamless access.
        </p>
        <p style={{ marginTop: "5px", marginBottom: "10px", fontSize: "20px" }}>
          Our smart matchmaking system simplifies booking, helping space owners fill idle time while giving users on-demand access to inspiring spaces designed for productivity and creativity.
        </p>
      </section>

      {/* How We Work Section */}
      <section data-aos="fade-up" style={{ marginTop: "60px", textAlign: "center" }}>
        <h2 style={{ textAlign: "center", fontSize: "60px", marginTop: "20px" }}>How We Work</h2>
        <div
          className="how-we-work-steps"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "40px",
            marginTop: "20px",
          }}
        >
          <div className="how-we-work-step" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="share_your_needs.png" alt="1. Share Your Needs" style={{ width: "90px", height: "90px", objectFit: "contain" }} />
            <p style={{ marginTop: "15px", fontWeight: "bold" }}>1. Share Your Requirements</p>
            <p style={{ marginTop: "5px" }}>Tell us what kind of space you want.</p>
          </div>
          <div className="how-we-work-step" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="get_matched.png" alt="2. Get Matched" style={{ width: "90px", height: "90px", objectFit: "contain" }} />
            <p style={{ marginTop: "15px", fontWeight: "bold" }}>2. Get Matched</p>
            <p style={{ marginTop: "5px" }}>We connect you with verified listings.</p>
          </div>
          <div className="how-we-work-step" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="book_space.png" alt="3. Book & Create" style={{ width: "90px", height: "90px", objectFit: "contain" }} />
            <p style={{ marginTop: "15px", fontWeight: "bold" }}>3. Reserve</p>
            <p style={{ marginTop: "5px" }}>Book your space and get started.</p>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <br />
      <h2 data-aos="fade-up" style={{ textAlign: "center", fontSize: "40px", marginTop: "20px", width: "100%" }}>
        <strong>Why us?</strong>
      </h2>
      <div className="table-responsive">
        <table
          data-aos="fade-up"
          style={{
            margin: "0 auto",
            borderCollapse: "collapse",
            width: "100%",
            backgroundColor: "transparent",
            color: "white",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid white", padding: "12px", fontSize: "18px" }}></th>
              <th style={{ border: "1px solid white", padding: "12px" }}>
                <img
                  src="/nayburlee-icon.png"
                  alt="Nayburlee Logo"
                  style={{
                    display: "block",
                    margin: "0 auto",
                    maxWidth: "120px",
                    maxHeight: "60px",
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
                <div style={{ marginTop: "5px", fontWeight: "bold" }}></div>
                <div style={{ marginTop: "5px", fontWeight: "bold" }}></div>
              </th>
              <th style={{ border: "1px solid white", padding: "12px", fontWeight: "bold" }}>Other Offerings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid white", padding: "10px" }}>Verified Listings & Hosts</td>
              <td style={{ border: "1px solid white", padding: "10px" }}>✅</td>
              <td style={{ border: "1px solid white", padding: "10px" }}>✅</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid white", padding: "10px" }}>Smart Matching Algorithm</td>
              <td style={{ border: "1px solid white", padding: "10px" }}>✅</td>
              <td style={{ border: "1px solid white", padding: "10px" }}>❌</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid white", padding: "10px" }}>Flexible Online Booking System</td>
              <td style={{ border: "1px solid white", padding: "10px" }}>✅</td>
              <td style={{ border: "1px solid white", padding: "10px" }}>❌</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid white", padding: "10px" }}>Dedicated to Hybrid & Creative Spaces</td>
              <td style={{ border: "1px solid white", padding: "10px" }}>✅</td>
              <td style={{ border: "1px solid white", padding: "10px" }}>❌</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid white", padding: "10px" }}>Curated Options (No Endless Search Results)</td>
              <td style={{ border: "1px solid white", padding: "10px" }}>✅</td>
              <td style={{ border: "1px solid white", padding: "10px" }}>❌</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid white", padding: "10px" }}>
                Booking Support & Protection with Secure Payments (No Leases, No Hassles)
              </td>
              <td style={{ border: "1px solid white", padding: "10px" }}>✅</td>
              <td style={{ border: "1px solid white", padding: "10px" }}>✅</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Featured Properties Section */}
      <h2
        data-aos="fade-up"
        style={{ textAlign: "center", fontSize: "40px", marginTop: "50px", color: "#2fd1ba" }}
      >
        Featured Properties
      </h2>
      <Slider {...sliderSettings} data-aos="fade-up">
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
              maxWidth: "90%",
              margin: "0 auto",
            }}
          >
            <img
              src="/property1a.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                borderRadius: "20px",
                objectFit: "cover",
                padding: "10px",
              }}
            />

            <img
              src="/property1b.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                borderRadius: "20px",
                objectFit: "cover",
                padding: "10px",
              }}
            />
          </div>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Podcast Studio | Johannesburg - Dainfern
            <br />
            Studio has 3 microphones, soundproof walls, and space for 4 creators.
          </p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
              maxWidth: "90%",
              margin: "0 auto",
            }}
          >
            <img
              src="/property2a.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                borderRadius: "20px",
                objectFit: "cover",
                padding: "10px",
              }}
            />

            <img
              src="/property2b.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                borderRadius: "20px",
                objectFit: "cover",
                padding: "10px",
              }}
            />
          </div>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Content Creation Room | Durban - Glenwood
            <br />
            Equipped with lighting, green screen, and recording tools for high-quality photography, videography, and livestreaming. Capacity: 4 creators.
          </p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
              maxWidth: "90%",
              margin: "0 auto",
            }}
          >
            <img
              src="/property3a.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                borderRadius: "20px",
                objectFit: "cover",
                padding: "10px",
              }}
            />

            <img
              src="/property3b.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                borderRadius: "20px",
                objectFit: "cover",
                padding: "10px",
              }}
            />
          </div>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Hybrid Space | Cape Town - Woodstock
            <br />
            Flexible workspace designed for both teamwork and solo productivity. Includes Wi-Fi, ergonomic furniture, and presentation tools. Capacity: Up to 10 people.
          </p>
        </div>
      </Slider>

      {/* Ready to Find Your Ideal Space Section */}
      <section
        data-aos="fade-up"
        style={{
          backgroundColor: "#2fd1ba",
          color: "white",
          padding: "40px 20px",
          textAlign: "center",
          marginTop: "60px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ fontSize: "30px" }}>Ready to Find Your ideal Space?</h2>
        <p style={{ marginTop: "10px", fontSize: "20px" }}>
          No subscriptions. No long-term commitments. Just the space you need, when you need it.
        </p>
        <p style={{ marginTop: "10px", fontSize: "20px" }}>
          Join a community of creators and professionals who trust Nayburlee.
        </p>
        <p style={{ marginTop: "10px", fontSize: "20px" }}>✅ Match guaranteed</p>
        <a
          href="/user-request"
          className="cta-button"
          style={{
            marginTop: "5px",
            display: "inline-block",
            backgroundColor: "#ffffff",
            color: "#2fd1ba",
          }}
        >
          Get Started
        </a>
      </section>

      <br />

      {/* Testimonial Section */}
      <section data-aos="fade-up">
        <h2 style={{ textAlign: "center", fontSize: "40px", marginTop: "30px", marginBottom: "10px" }}>
          Trusted by Users
        </h2>
        <div style={{ marginTop: "5px", borderRadius: "5px" }}>
          <Slider {...testimonialSettings}>
            <TestimonialCard
              text="'Recorded our first podcast episode in a studio that matched our ideal budget.'"
              author="- Minenhle • Podcast Founder • Cape Town"
            />
            <TestimonialCard
              text="'We booked a creative room through them. Matched with a functional space that was 15% cheaper than our previous option. Highly recommend.'"
              author="- Liam • Content Videographer • Johannesburg"
            />
            <TestimonialCard
              text="'I prefer the flexibility of renting workspaces without long-term commitments. Found and booked a space with the team through Nayburlee, no hassle.'"
              author="- Thandi • Startup Marketer • Sandton"
            />
          </Slider>
        </div>
      </section>

      {/* Subscription Form Section */}
      <div data-aos="fade-up">
        <SubscriptionForm />
      </div>

      {/* Follow Us Section */}
      <div
        id="follow"
        data-aos="fade-up"
        style={{ marginTop: "2rem", textAlign: "center" }}
      >
        <h2 style={{ fontSize: "30px" }}>Follow Us</h2>
        <p style={{ fontSize: "20px" }}>Stay connected and follow us on social media!</p>
        <a href="https://www.linkedin.com/company/nayburlee" target="_blank" style={iconStyle}>
          <img src="/linkedin-icon.png" alt="LinkedIn" style={iconImageStyle} />
        </a>
        <a href="https://web.facebook.com/profile.php?id=61559247897190" target="_blank" style={iconStyle}>
          <img src="/facebook-icon.png" alt="Facebook" style={iconImageStyle} />
        </a>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .Hero {
          text-align: left;
          padding: 0px 0 20px;
        }
        .hero-title {
          font-size: 2.5rem;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .hero-subtitle {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto 30px;
        }
        .subtitle-hero {
          margin-top: 0;
          text-align: center;
        }
        .subtitle-hero-text {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto 30px;
        }
        .highlight-text {
          color: #2fd1ba;
          font-weight: bold;
        }
      `}</style>

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
            About Us
          </a>
          <a href="/contact" style={{ marginRight: "10px", color: "#2FD1BA" }}>
            Contact
          </a>
          <a href="/privacy" style={{ color: "#2FD1BA" }}>
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}

// Inline Styles
const iconStyle = {
  marginRight: "10px",
  textDecoration: "none",
};

const iconImageStyle = {
  width: "32px",
  height: "32px",
};
