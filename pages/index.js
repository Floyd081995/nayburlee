import "slick-carousel/slick/slick.css"; // Import carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import carousel theme
import Slider from "react-slick"; // Import the react-slick component
import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted for SSR compatibility
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Carousel settings for properties
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Carousel settings for testimonials with fade effect
  const testimonialSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 2000,
    fade: true, // Enable fade animation
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Removes navigation arrows
  };

  return (
    <div style={{ position: "relative", fontFamily: "'Inter', Arial, sans-serif", maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Head>
        <title>Nayburlee | On-Demand Workspaces in South Africa</title>
        <meta name="description" content="Rent desks, offices, and meeting rooms by the hour or day with no long-term leases. Perfect for freelancers, startups, and teams." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Rent Commercial Space <span className="highlight">by the Hour</span> in SA
        </h1>
        <p className="hero-subtitle">
          Book shared offices, conference rooms, pop-ups and hybrid workspaces.
          <br /> 
          <br />Rent by the hour or day—<strong>no deposits</strong>.
          <br />First 50 signups get <span className="highlight">10% off</span>!
        </p>
        <a
          href="https://forms.gle/koniNevv7vnhSA4g8"
          className="cta-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Enquire Now
        </a>
      </section>

      {/* Property Carousel Section */}
      <h2 style={{ marginTop: "40px", textAlign: "center" }}>Featured Properties</h2>
      <Slider {...sliderSettings}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", gap: "30px" }}>
            <img
              src="/property1a.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%", // Adjust to fit container
                height: "auto", // Maintain aspect ratio
                borderRadius: "20px",
                objectFit: "cover",
                padding: "10px",
              }}
            />
            <img
              src="/property1b.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%", // Adjust to fit container
                height: "auto", // Maintain aspect ratio
                borderRadius: "20px",
                objectFit: "cover",
                padding: "10px",
              }}
            />
            
          </div>
          <p style={{ textAlign: "center", marginTop: "10px" }}>Podcast Studio / Office | Dainfern - R2,000 / month</p>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", gap: "30px" }}>
            <img
              src="/property2a.jpg"
              alt="Property 2 - Image A"
              style={{ height: "250px", width: "100%", maxWidth: "350px", borderRadius: "20px", objectFit: "cover", padding: "10px" }}
            />
            <img
              src="/property2b.jpg"
              alt="Property 2 - Image B"
              style={{ height: "250px", width: "100%", maxWidth: "350px", borderRadius: "20px", objectFit: "cover", padding: "10px" }}
            />
          </div>
          <p style={{ textAlign: "center", marginTop: "10px" }}>Shared Office | Durban </p>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", gap: "30px" }}>
            <img
              src="/property3a.jpg"
              alt="Property 3 - Image A"
              style={{ height: "250px", width: "100%", maxWidth: "350px", borderRadius: "20px", objectFit: "cover", padding: "10px" }}
            />
            <img
              src="/property3b.jpg"
              alt="Property 3 - Image B"
              style={{ height: "250px", width: "100%", maxWidth: "350px", borderRadius: "20px", objectFit: "cover", padding: "10px" }}
            />
          </div>
          <p style={{ textAlign: "center", marginTop: "10px" }}>Conference Rooms | Fourways </p>
        </div>
      </Slider>

      {/* Testimonial Section */}
      <h2 style={{ marginTop: "40px", marginBottom: "10px", textAlign: "center" }}>Trusted by Local Businesses</h2>
      <div style={{ marginTop: "10px", borderRadius: "10px" }}>

        <Slider {...testimonialSettings}>
          <div style={{ background: "#f9f9f9", borderRadius: "10px", padding: "20px" }}>
            <p style={{ fontStyle: "italic", fontSize: "18px", color: "#ffffff", textAlign: "center" }}>
              "Saved R8,000 compared to traditional leases. Booked a Sandton meeting room same-day for our investor pitch."
            </p>
            <p style={{ fontWeight: "bold", color: "#2fd1ba", textAlign: "center" }}>- Sarah • Tech Startup Founder • Cape Town</p>
          </div>
          <div style={{ background: "#f9f9f9", borderRadius: "10px", padding: "20px" }}>
            <p style={{ fontStyle: "italic", fontSize: "18px", color: "#ffffff", textAlign: "center" }}>
              "The conference room we booked was ideal for our quarterly meeting. We saved 15% compared to other providers. Highly recommend their service."
            </p>
            <p style={{ fontWeight: "bold", color: "#2fd1ba", textAlign: "center" }}>- Moses • Board Advisor • Johannesburg</p>
          </div>
          <div style={{ background: "#f9f9f9", borderRadius: "10px", padding: "20px" }}>
            <p style={{ fontStyle: "italic", fontSize: "18px", color: "#ffffff", textAlign: "center" }}>
              "I prefer the flexibility of renting workspaces without long-term commitments. Booked a desk for a day through Nayburlee, no hassle"
            </p>
            <p style={{ fontWeight: "bold", color: "#2fd1ba", textAlign: "center" }}>- Thandi • Consultant • Sandton</p>
          </div>
        </Slider>
      </div>

      {/* Follow Us Section */}
      <div id="follow" style={{ marginTop: "2rem" }}>
        <h2>Follow Us</h2>
        <p>Stay connected and follow us on social media!</p>
        <a href="https://www.linkedin.com/company/nayburlee" target="_blank" style={iconStyle}>
          <img src="/linkedin-icon.png" alt="LinkedIn" style={iconImageStyle} />
        </a>
        <a href="https://web.facebook.com/profile.php?id=61559247897190" target="_blank" style={iconStyle}>
          <img src="/facebook-icon.png" alt="Facebook" style={iconImageStyle} />
        </a>
      </div>

      <style jsx>{`
        /* Base Styles */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          font-family: 'Inter', Arial, sans-serif;
        }

        /* Hero Section */
        .hero {
          text-align: center;
          padding: 0px 0 20px; /* Reduced margin to tighten the gap */
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
        .highlight {
          color: #2fd1ba;
          font-weight: 600;
        }

        /* CTA Button */
        .cta-button {
          background: #2fd1ba;
          color: white;
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(47, 209, 186, 0.3);
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(47, 209, 186, 0.4);
        }
      `}</style>

<footer style={{ textAlign: "center", marginTop: "40px", padding: "20px", fontSize: "14px", color: "#2FD1BA", backgroundColor: "#f0000" }}>
  © {new Date().getFullYear()} Nayburlee Incorporated. 
  <br /> All rights reserved.
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
