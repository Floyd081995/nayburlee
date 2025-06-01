import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '/lib/firebasedb';
import BookingForm from '/components/BookingForm';
import Slider from "react-slick";
import Head from 'next/head'; // Import Head for metadata
import Footer from '/components/Footer';

export default function SpaceDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchSpace = async () => {
      try {
        const docRef = doc(db, 'listings', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setSpace(data);
        } else {
          console.error('No such listing!');
        }
      } catch (err) {
        console.error('Error fetching listing:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpace();
  }, [id]);

  if (loading) return <div className="p-4 text-gray-500">Loading listing...</div>;
  if (!space) return <div className="p-4 text-red-500">Listing not found.</div>;

  // Initialize validPrices properly
  const validPrices = ["Hourly", "Daily", "Weekly", "Monthly"]
    .map((duration) => space[`price_${duration}`] ? `R${space[`price_${duration}`]} (${duration})` : null)
    .filter(Boolean); // ✅ Removes undefined prices

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Dynamic metadata */}
      <Head>
        <title>{space.title || 'Nayburlee | Space Details'}</title>
        <meta name="description" content={space.description || 'Detailed information about this workspace'} />
        <meta property="og:title" content={space.title || 'Nayburlee | Space Details'} />
        <meta property="og:description" content={space.description || 'Find detailed information about this workspace and book your spot today!'} />
        <meta property="og:image" content={space.images?.[0] || '/default-image.jpg'} /> {/* First image or default */}
        <meta property="og:url" content={`https://your-domain.com/spaces/${id}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={space.title || 'Nayburlee | Space Details'} />
        <meta name="twitter:description" content={space.description || 'Find detailed information about this workspace and book your spot today!'} />
        <meta name="twitter:image" content={space.images?.[0] || '/default-image.jpg'} />
      </Head>

      <h1 style={{ color: "#2fd1ba", borderRadius: "10px", textAlign: "center" }} className="text-2xl font-bold mb-4">
        {space.title || 'Untitled Space'}
      </h1>

      {/* Image Carousel */}
      <div className="h-auto flex justify-center gap-6" style={{ maxWidth: 480, margin: '0 auto' }}>
        <Slider {...sliderSettings}>
          {space.images?.map((url, index) => {
            const optimizedUrl = url.replace(
              "/upload/",
              "/upload/w_800,h_500,c_fit,f_auto,q_auto/"
            );
            return (
              <div key={index} className="relative h-auto">
                <img
                  src={optimizedUrl}
                  alt={`Image ${index + 1}`}
                  className="w-full object-cover rounded-lg"
                  style={{
                    maxWidth: "480px",
                    maxHeight: "300px",
                    width: "100%",
                    height: "300px",
                    display: "block",
                    borderRadius: "40px",
                    objectFit: "cover",
                    margin: 0,
                    padding: 30,
                  }}
                />
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Space Description */}
      <p style={{ borderRadius: "10px", textAlign: "center", padding: "10px" }} className="mb-2 text-lg">{space.description || 'No description provided.'}</p>
      
      {/* Type */}
      <p style={{ borderRadius: "10px", textAlign: "center" }} className="text-sm text-gray-600 mb-1">
        <strong>Type:</strong>{" "}
        {Array.isArray(space.type)
          ? space.type.join(", ")
          : space.type || "Not specified"}
      </p>

      {/* Features */}
      <p style={{ borderRadius: "10px", textAlign: "center" }} className="mb-2 text-lg"><strong>Features:</strong> {space.features ? space.features.join(", ") : "No features listed"}</p>

      {/* Duration */}
      <p style={{ borderRadius: "10px", textAlign: "center" }} className="mb-2 text-lg"><strong>Duration:</strong> {Array.isArray(space.duration) ? space.duration.join(", ") : "Not specified"}</p>
      
      {/* Capacity */}
      <p style={{ borderRadius: "10px", textAlign: "center" }} className="mb-2 text-lg">
          <strong>Capacity (People):</strong> {space.capacity ? space.capacity : "Not specified"}
        </p>
      {/* Included Hours */}
      {space.includedHours && Object.keys(space.includedHours).length > 0 && (
        <p style={{ borderRadius: "10px", textAlign: "center", padding: "10px" }} className="mb-2 text-lg"><strong>Included Hours: </strong> 
          {Object.entries(space.includedHours).map(([key, value]) => `${key}: ${value} hours`).join(" | ")}
        </p>
      )}

      {/* Price Display */}
      {validPrices.length > 0 && (
        <p style={{ borderRadius: "10px", textAlign: "center" }} className="mb-2 text-lg"><strong>Price:</strong> {validPrices.join(" | ")}</p>
      )}

      {/* Booking Form */}
      <BookingForm listingId={id} />
    </div>
  );
  <Footer />
}
