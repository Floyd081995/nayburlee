// pages/spaces/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '/lib/firebasedb';
import BookingForm from '/components/BookingForm';
import Slider from "react-slick";

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
      <h1 style={{color: "#2fd1ba", borderRadius: "10px", textAlign: "center"}}className="text-2xl font-bold mb-4">
        {space.title || 'Untitled Space'}
      </h1>

      {/* Image Carousel */}
      <div className="h-auto flex justify-center gap-6" style={{maxWidth: '40%', margin: '0 auto' }}>
        <Slider {...sliderSettings}>
          {space.images?.map((url, index) => {
            // Apply Cloudinary transformation to optimize image
            const optimizedUrl = url.replace(
              "/upload/",
              "/upload/w_800,h_500,c_fit,f_auto,q_auto/"
            );

            return (
              <div key={index} className="relative h-auto">
                <img
                  src={optimizedUrl}
                  alt={`Image ${index + 1}`}
                  className="w-full object-contain rounded-lg"
                />
              </div>
            );
          })}
        </Slider>
      </div>

      <p style={{ borderRadius: "10px", textAlign: "center"}} className="mb-2 text-lg">{space.description || 'No description provided.'}</p>
      <p style={{ borderRadius: "10px", textAlign: "center" }} className="text-sm text-gray-600 mb-1">
        <strong>Type:</strong> {space.type || 'Not specified'}
      </p>
      <p style={{borderRadius: "10px", textAlign: "center"}} className="text-sm text-gray-600 mb-1">
        <strong>Features:</strong> {space.features || 'Not specified'}
      </p>
      <p style={{borderRadius: "10px", textAlign: "center"}} className="text-sm text-gray-600 mb-1">
        <strong>Location:</strong> {space.location || 'Not specified'}
      </p>
      <p style={{borderRadius: "10px", textAlign: "center"}} className="text-sm text-gray-600 mb-4">
        <strong>Price:</strong>{' '}
        {space.priceRange ? `${space.priceRange}` : 'Price on request'}
      </p>

      {/* Hidden owner details for internal use only */}
      {space.ownerContact && (
        <div className="hidden">
          <p>Owner Email: {space.ownerContact.email}</p>
        </div>
      )}

      {/* Hidden owner details for internal use only */}
      {space.ownerContact && (
        <div className="hidden">
          <p>Owner Email: {space.ownerContact.email}</p>
        </div>
      )}

      {/* Booking Form */}
      <BookingForm listingId={id} />
    </div>
  );
}
