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
        <title>Nayburlee | Creative and Hybrid Spaces</title>
        <meta name="description" content="Find and book podcast studios, creative and hybrid workspaces by the hour or day. Perfect for creators, podcasters, and startups." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Subtitle Hero Section */}
      <section className="subtitle-hero" style={{ marginTop: "0px" }}>
        <p className="hero-subtitle">
          Match with verified studios, content creation rooms, and hybrid workspaces in South Africa — all bookable by the hour, day, or month.
          <br /> 
          <br /><strong>No leases.</strong>
          <br />First 10 bookings get <span className="highlight">25% off</span> !
        </p>
        <a
          href="https://forms.gle/koniNevv7vnhSA4g8"
          className="cta-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start Matching
        </a>
      </section>

      {/* Property Carousel Section */}
      <h2 style={{ marginTop: "40px", textAlign: "center" }}>Featured Properties</h2>
      <Slider {...sliderSettings}>
        <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap", // Allows items to wrap on smaller screens
            justifyContent: "center",
            gap: "20px",
            maxWidth: "90%", // Limit container width
            margin: "0 auto", // Center the container
          }}
        >   
            <img
             src="/property1a.jpg"
             alt="Property 1 - Image A"
             style={{
               width: "100%", // Scale image based on parent container
               maxWidth: "300px", // Sets the maximum width
               height: "auto", // Maintain aspect ratio
               borderRadius: "20px",
               objectFit: "cover", // Crops the image while maintaining proportions
               padding: "10px",
             }}
           />
         
            <img
             src="/property1b.jpg"
             alt="Property 1 - Image A"
             style={{
               width: "100%", // Scale image based on parent container
               maxWidth: "300px", // Sets the maximum width
               height: "auto", // Maintain aspect ratio
               borderRadius: "20px",
               objectFit: "cover", // Crops the image while maintaining proportions
               padding: "10px",
             }}
           />

          </div>
          <p style={{ textAlign: "center", marginTop: "10px" }}>Podcast Studio | Johannesburg - Dainfern 
            <br />Studio has 3 microphones, soundproof walls, and space for 4 creators.
            </p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap", // Allows items to wrap
              justifyContent: "center", // Aligns content
              gap: "20px", // Adds consistent spacing
              maxWidth: "90%", // Limits container width
              margin: "0 auto", // Centers the container
            }}
          >

            <img
              src="/property2a.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%", // Scale image based on parent container
                maxWidth: "300px", // Sets the maximum width
                height: "auto", // Maintain aspect ratio
                borderRadius: "20px",
                objectFit: "cover", // Crops the image while maintaining proportions
                padding: "10px",
              }}
            />
            
            <img
              src="/property2b.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%", // Scale image based on parent container
                maxWidth: "300px", // Sets the maximum width
                height: "auto", // Maintain aspect ratio
                borderRadius: "20px",
                objectFit: "cover", // Crops the image while maintaining proportions
                padding: "10px",
              }}
            />
            
          </div>
          <p style={{ textAlign: "center", marginTop: "10px" }}> Content Creation Room | Durban - Glenwood
          <br />Equipped with lighting, green screen, and recording tools for high-quality photography, videography, and livestreaming. Capacity: 4 creators.

          </p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap", // Allows items to wrap
              justifyContent: "center", // Aligns content
              gap: "20px", // Adds consistent spacing
              maxWidth: "90%", // Limits container width
              margin: "0 auto", // Centers the container
            }}
          >
            <img
              src="/property3a.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%", // Scale image based on parent container
                maxWidth: "300px", // Sets the maximum width
                height: "auto", // Maintain aspect ratio
                borderRadius: "20px",
                objectFit: "cover", // Crops the image while maintaining proportions
                padding: "10px",
              }}
            />
            
            <img
              src="/property3b.jpg"
              alt="Property 1 - Image A"
              style={{
                width: "100%", // Scale image based on parent container
                maxWidth: "300px", // Sets the maximum width
                height: "auto", // Maintain aspect ratio
                borderRadius: "20px",
                objectFit: "cover", // Crops the image while maintaining proportions
                padding: "10px",
              }}
            />
            
          </div>
          <p style={{ textAlign: "center", marginTop: "10px" }}>Hybrid Space | Cape Town - Woodstock 
          <br />Flexible workspace designed for both teamwork and solo productivity. Includes Wi-Fi, ergonomic furniture, and presentation tools. Capacity: Up to 10 people.
          </p>
        </div>
      </Slider>

      <p style={{ textAlign: "center",fontSize: "40px", marginTop: "20px" }}>Why us?</p>

      {/* Insert Comparison Table Below Testimonials */}
      <table style={{ borderCollapse: "collapse", width: "100%", backgroundColor: "transparent", color: "white", textAlign: "center" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid white", padding: "10px;" }}></th>
            <th style={{ border: "1px solid white", padding: "10px;" }}>
            <img src="/nayburlee-icon.png" alt="Nayburlee Logo" style={{ maxHeight: "40px", width: "auto", height: "40px" }} />
            </th>
            <th style={{ border: "1px solid white", padding: "10px", paddingTop: "30px"}}>Other Offerings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid white", padding: "10px;" }}>Verified Listings</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>✅</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>❌</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid white", padding: "10px;" }}>Strategic Matches to Support & Cultivate Creative Environments</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>✅</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>❌</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid white", padding: "10px;" }}>Simple Plug-and-Play Platform</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>✅</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>✅</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid white", padding: "10px;" }}>Dedicated to Hybrid and Creative Spaces</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>✅</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>✅</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid white", padding: "10px;" }}>Curated Options Only (no endless search result pages)</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>✅</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>❌</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid white", padding: "10px;" }}>Save Time, Get Better Results</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>✅</td>
            <td style={{ border: "1px solid white", padding: "10px;" }}>❌</td>
          </tr>
        </tbody>
      </table>

         <p style={{ textAlign: "center",fontSize: "25px",color: "#2fd1ba", marginTop: "10px" }}><br /><strong>No subscriptions. No long-term commitments. Just the space you need, when you need it.</strong>
         </p>
         <p style={{ textAlign: "center",fontSize: "25px", marginTop: "20px" }}>✅ Match guaranteed | No spam</p>

      {/* Testimonial Section */}
      <h2 style={{ marginTop: "60px", marginBottom: "0px", textAlign: "left" }}>Trusted by Users </h2>
      <div style={{ marginTop: "10px", borderRadius: "5px" }}>
        <Slider {...testimonialSettings}>
          <div style={{ background: "#f9f9f9", borderRadius: "10px", padding: "20px" }}>
            <p style={{ marginTop: "10px", fontStyle: "italic", fontSize: "18px", color: "#ffffff", textAlign: "center" }}>
              "Recorded our first podcast episode in a studio that matched our ideal budget."
            </p>
            <p style={{ fontWeight: "bold", color: "#2fd1ba", textAlign: "center" }}>- Minenhle • Podcast Founder • Cape Town</p>
          </div>
          <div style={{ background: "#f9f9f9", borderRadius: "10px", padding: "20px" }}>
            <p style={{ fontStyle: "italic", fontSize: "18px", color: "#ffffff", textAlign: "center" }}>
              "We booked a creative room through them. Matched with a functional space that was 15% cheaper. Highly recommend."
            </p>
            <p style={{ fontWeight: "bold", color: "#2fd1ba", textAlign: "center" }}>- Liam • Content Videographer • Johannesburg</p>
          </div>
          <div style={{ background: "#f9f9f9", borderRadius: "10px", padding: "20px" }}>
            <p style={{ fontStyle: "italic", fontSize: "18px", color: "#ffffff", textAlign: "center" }}>
              "I prefer the flexibility of renting workspaces without long-term commitments. Found and booked a space for a day with the team through Nayburlee, no hassle."
            </p>
            <p style={{ fontWeight: "bold", color: "#2fd1ba", textAlign: "center" }}>- Thandi • Startup Marketer  • Sandton</p>
          </div>
        </Slider>
      </div>

      {/* Follow Us Section */}
      <div id="follow" style={{ marginTop: "2rem", textAlign: "center" }}>
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
          font-family: 'Jost', Arial, sans-serif;
        }

        /* Hero Section */
        .Hero {
          text-align: left;
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

        /* Subtitle Hero Section */
        .subtitle-hero {
          margin-top: 0; /* Removes gap */
          text-align: center;
        }
        .subtitle-hero-text {
          font-size: 1.2rem;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto 30px;
        }
        .highlight-text {
          color: #2fd1ba;
          font-weight: bold;
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

        @media screen and (max-width: 768px) {
          img {
            width: 100%;
            max-width: 250px; /* Reduces max image size for mobile screens */
            height: auto;
          }
          .container {
            flex-direction: column; /* Stack items vertically */
          }
          .subtitle-hero-text {
            font-size: 1rem; /* Smaller font size for mobile screens */
          }
          .cta-button {
            font-size: 1rem; /* Adjust CTA button font size */
            padding: 10px 20px; /* Reduce padding for mobile */
          }
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
