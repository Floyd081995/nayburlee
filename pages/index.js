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
import Footer from "../components/Footer";


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
        paddingTop: "130px", // or your header's true height
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingBottom: "32px",
      }}
    >
    <Head>
      <title>Nayburlee | Creative & Hybrid Workspaces in South Africa</title>
      <meta name="description" content="Book flexible podcast studios, content creation rooms, voiceover studios, and hybrid workspaces across South Africa—by the hour, day, week, or month. No leases. No hassle." />
      <meta name="keywords" content="creative workspace, studio rental, coworking space, podcast studio, content creation room, voiceover studio, production space, flexible workspace, hybrid office, hourly studio rental, monthly workspace, South Africa, Johannesburg, Cape Town, Durban, Pretoria"></meta>
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href="https://nayburlee.co.za/" />

      {/* Open Graph */}
      <meta property="og:locale" content="en_ZA" />
      <meta property="og:site_name" content="Nayburlee" />
      <meta property="og:title" content="Nayburlee | Creative & Hybrid Workspaces in South Africa"/>
      <meta property="og:description" content="Book flexible podcast studios, content creation rooms, voiceover studios, and hybrid workspaces across South Africa—by the hour, day, week, or month. No leases. No hassle."/>
      <meta property="og:image" content="https://nayburlee.co.za/preview-image.jpeg" />
      <meta property="og:url" content="https://nayburlee.co.za" />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Nayburlee | Creative & Hybrid Workspaces in South Africa"/>
      <meta name="twitter:description" content="Book flexible podcast studios, content creation rooms, voiceover studios, and hybrid workspaces across South Africa—by the hour, day, week, or month. No leases. No hassle."/>
      <meta name="twitter:image" content="https://nayburlee.co.za/preview-image.jpeg" />
      <link rel="icon" href="/favicon.ico" />
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
        <p className="hero-subtitle">
          Discover creative and hybrid workspaces in South Africa tailored to your needs — all bookable by the hour, day, week or month.
          <br /><br />
          <strong>No leases.</strong>
          <br />
          First 10 bookings get <span className="highlight">15% off</span> !
        </p>
        <a
          className="cta-button"
          href="https://forms.gle/FHhkD2iDEKZ2urqY8"
          target="_blank"
          rel="noopener noreferrer"
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
          backgroundColor: "#222",
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
        >
          Or looking to list space?
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
            href="https://forms.gle/Gh7Rpvkua3qquDTdA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Partner With Us
          </a>
        </div>
      </section>

      {/* What is Nayburlee Section */}
      <section
        className="nayburlee-section"
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
        <h2 style={{ marginTop: "10px", marginBottom: "5px" }}>
          What is Nayburlee?
        </h2>
        <p style={{ marginTop: "10px", marginBottom: "15px", fontSize: "20px", fontWeight: "bold" }}>
          Nayburlee is a South African leading platform for discovering and booking flexible creative & hybrid spaces—including <strong>podcast studios</strong>, <strong>video and content creation rooms</strong>, <strong>voiceover studios</strong>, and <strong>hybrid workspaces</strong>.
        </p>
        <p style={{ marginTop: "5px", marginBottom: "15px", fontSize: "20px" }}>
          We connect creators, podcasters, and professionals with fully equipped spaces that match their vibe and workflow—no leases, no hassle, just seamless access to the best studios and work environments.
        </p>
        <p style={{ marginTop: "5px", marginBottom: "10px", fontSize: "20px" }}>
          Our smart matchmaking system simplifies booking, helping space owners fill idle time while giving users on-demand access to inspiring spaces designed for productivity, creativity, and collaboration.
        </p>
        <img src="nayburlee-logo-image.png" alt="Nayburlee" width="6%" />
      </section>

      {/* How We Work Section */}
      <section data-aos="fade-up" style={{ marginTop: "60px", textAlign: "center" }}>
        <h2 style={{ textAlign: "center", fontSize: "40px", marginTop: "20px" }}>How We Work</h2>
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
      <Slider {...sliderSettings} data-aos="fade-up" className="featured-properties-section">
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
          <p className="featured-properties-paragraph" style={{ textAlign: "center", marginTop: "10px" }}>
            Podcast Studio | Johannesburg - Dainfern
            <br />
            Studio has 3 microphones, soundproof walls, and capacity for 4 creators.
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
          <p className="featured-properties-paragraph" style={{ textAlign: "center", marginTop: "10px" }}>
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
          <p className="featured-properties-paragraph" style={{ textAlign: "center", marginTop: "10px" }}>
            Hybrid Space | Cape Town - Woodstock
            <br />
            Flexible workspace designed for both teamwork and solo productivity. Includes Wi-Fi, ergonomic furniture, and presentation tools. Capacity: Up to 10 people.
          </p>
        </div>
      </Slider>

      {/* Ready to Find Your Ideal Space Section */}
      <section
        className="ready-section"
        data-aos="fade-up"
        style={{
          backgroundColor: "#2fd1ba",
          color: "white",
          padding: "40px 20px",
          textAlign: "center",
          marginTop: "30px",
          borderRadius: "10px",
        }}
      >
        <h2>Ready to Find Your ideal Space?</h2>
        <p style={{ marginTop: "10px" }}>
          No subscriptions. No long-term commitments. Just the space you need, when you need it.
        </p>
        <p style={{ marginTop: "10px" }}>
          Join a community of creators and professionals who trust Nayburlee.
        </p>
        <p style={{ marginTop: "10px" }}>✅ Match guaranteed</p>
        <a
          href="https://forms.gle/FHhkD2iDEKZ2urqY8"
          target="_blank"
          rel="noopener noreferrer"
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
      <section data-aos="fade-up" className="trusted-users-section">
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
        <a href="https://www.tiktok.com/@nayburlee?is_from_webapp=1&sender_device=pc" target="_blank" style={iconStyle}>
          <img src="/tiktok-icon.png" alt="TikTok" style={iconImageStyle} />
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

      <Footer />
    </div>
  );
}

// Inline Styles
const iconStyle = {
  marginRight: "18px", // Increased gap
  marginLeft: "18px",
  textDecoration: "none",
  display: "inline-block",
};

const iconImageStyle = {
  width: "32px",
  height: "32px",
};
