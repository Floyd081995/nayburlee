import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import Footer from "../../components/Footer";
import { db } from "../../lib/firebasedb";
import { collection, getDocs } from "firebase/firestore";

// Fetch all listings from Firestore
async function fetchAllListings() {
  const querySnapshot = await getDocs(collection(db, "listings"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

const PAGE_SIZE = 6;

export default function AllSpaces() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllListings().then(data => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  // Pagination logic
  const totalPages = Math.ceil(listings.length / PAGE_SIZE);
  const paginatedListings = listings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {/* Floating Try Matching Button */}
      <button
        style={{
          position: "fixed",
          top: "120px",        // Pushes it down below your floating header
          left: "40px",       // Moves it to the left side
          zIndex: 2000,
          background: "#3357FF",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "14px 32px",
          fontWeight: "bold",
          fontSize: "1.1rem",
          cursor: "pointer",
          animation: "bounce 1.2s infinite alternate, pulse 1.8s infinite",
          boxShadow: "0 4px 16px rgba(47,209,186,0.13)",
        }}
        onClick={() => router.push("/user-request")}
      >
        Try Matching
      </button>

      {/* Main Content */}
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-grow">
          <div className="p-6 max-w-7xl mx-auto w-full">
            {/* Listings Section */}
            <div className="listings-list">
              {paginatedListings.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <p className="text-center text-gray-500">
                    No spaces available right now. Check back soon!
                  </p>
                </div>
              ) : (
                paginatedListings.map((listing, index) => (
                  <div
                    key={listing.id}
                    className="listing-card"
                  >
                    <h2
                      style={{
                        color: "#2FD1BA",
                        textAlign: "center",
                        marginTop: "30px",
                        marginBottom: "5px",
                        padding: "5px 15px",
                        fontSize: "1.8rem", // Decreased font size
                        fontWeight: 700,
                      }}
                      className="font-bold text-gray-800"
                    >
                      {listing.title || "Untitled"}
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                      <div className="h-auto flex justify-center gap-6" style={{ width: "100%", maxWidth: 350 }}>
                        <Slider {...sliderSettings}>
                          {listing.images?.map((url, idx) => {
                            const optimizedUrl = url.replace(
                              "/upload/",
                              "/upload/w_800,h_500,c_fit,f_auto,q_auto/"
                            );
                            return (
                              <div key={idx} className="relative h-auto">
                                <img
                                  src={optimizedUrl}
                                  alt={`Image ${idx + 1}`}
                                  className="w-full object-contain rounded-lg"
                                  style={{
                                    maxWidth: "350px",
                                    maxHeight: "220px",
                                    width: "100%",
                                    height: "220px",
                                    display: "block",
                                    borderRadius: "20px",
                                    objectFit: "cover",
                                    padding: 10,
                                    margin: 0,
                                  }}
                                />
                              </div>
                            );
                          })}
                        </Slider>
                      </div>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <p
                          style={{
                            textAlign: "center",
                            marginTop: "15px",
                            marginBottom: "5px",
                            marginLeft: "20px",
                            marginRight: "20px",
                            fontSize: "0.85rem", // Decreased font size
                          }}
                          className="text-xs text-gray-600"
                        >
                          {listing.description || "N/A"}
                        </p>
                        <p style={{ textAlign: "center", marginTop: "10px", marginBottom: "5px", fontSize: "0.85rem" }} className="text-xs text-gray-600">
                          <span className="font-semibold"><strong>Features:</strong> </span> {listing.features?.join(", ") || "No features listed"}
                        </p>
                        <p style={{ textAlign: "center", marginTop: "5px", marginBottom: "5px", fontSize: "0.85rem" }} className="text-xs text-gray-600">
                          <span className="font-semibold"><strong>Type:</strong></span> {listing.type?.join(", ") || "N/A"}
                        </p>
                        <p style={{ textAlign: "center", marginTop: "5px", marginBottom: "5px", fontSize: "0.85rem" }} className="text-xs text-gray-600">
                          <span className="font-semibold"><strong>Location:</strong></span> {listing.location || "N/A"}
                        </p>
                        <p style={{ textAlign: "center", marginTop: "5px", marginBottom: "5px", fontSize: "0.85rem" }} className="text-xs text-gray-600">
                          <span className="font-semibold"><strong>Capacity:</strong></span> {listing.capacity ? listing.capacity : "Not specified"}
                        </p>
                        <p style={{ textAlign: "center", marginTop: "5px", marginBottom: "5px", fontSize: "0.85rem" }} className="text-xs text-gray-600">
                          <span className="font-semibold"><strong>Included Hours: </strong></span>
                          {listing.includedHours
                            ? Object.entries(listing.includedHours)
                                .map(([key, value]) => `${value} ${key.charAt(0).toUpperCase() + key.slice(1)}`)
                                .join(", ")
                            : "N/A"}
                        </p>
                        <p style={{ textAlign: "center", marginTop: "5px", marginBottom: "5px", fontSize: "0.85rem" }} className="text-xs text-gray-500">
                          <span className="font-semibold"><strong>Price: </strong></span>
                          {["Hourly", "Daily", "Weekly", "Monthly"]
                            .map((duration) => listing[`price_${duration}`] ? `R${listing[`price_${duration}`]} (${duration})` : null)
                            .filter(Boolean)
                            .join(", ") || "No price available"}
                        </p>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: 18,
                          right: 18,
                          zIndex: 10,
                        }}
                      >
                        <button
                          onClick={() => {
                            const shareUrl = `${window.location.origin}/spaces/${listing.id}`;
                            if (navigator.share) {
                              navigator.share({
                                title: listing.title,
                                text: listing.description || "Check out this space on Nayburlee!",
                                url: shareUrl,
                              });
                            } else {
                              navigator.clipboard.writeText(shareUrl);
                              alert("Link copied! You can now share it anywhere.");
                            }
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            margin: 0,
                            outline: "none",
                          }}
                          aria-label="Share"
                          title="Share"
                        >
                          {/* Simple SVG share icon */}
                          <svg width="24" height="24" fill="none" stroke="#ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <circle cx="18" cy="5" r="3"/>
                            <circle cx="6" cy="12" r="3"/>
                            <circle cx="18" cy="19" r="3"/>
                            <path d="M8.59 13.51l6.83 3.98"/>
                            <path d="M15.41 6.51l-6.82 3.98"/>
                          </svg>
                        </button>
                      </div>
                      <button
                        style={{
                          padding: "10px",
                          borderRadius: "5px",
                          backgroundColor: "#2FD1BA",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          width: "60%",
                          maxWidth: "250px",
                          minWidth: "150px",
                          fontSize: "1rem",
                          textAlign: "center",
                          display: "block",
                          margin: "10px auto 20px auto",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        onClick={() => router.push(`/spaces/${listing.id}`)}
                        className="inline-block bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600"
                      >
                        Book Space
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            <div style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  marginRight: "10px",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  background: page === 1 ? "#ccc" : "#2FD1BA",
                  color: "#fff",
                  border: "none",
                  cursor: page === 1 ? "not-allowed" : "pointer"
                }}
              >
                Previous
              </button>
              <span style={{ alignSelf: "center", fontWeight: "bold" }}>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  marginLeft: "10px",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  background: page === totalPages ? "#ccc" : "#2FD1BA",
                  color: "#fff",
                  border: "none",
                  cursor: page === totalPages ? "not-allowed" : "pointer"
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <style jsx global>{`
          @keyframes bounce {
            0% { transform: translateY(0);}
            100% { transform: translateY(-10px);}
          }
          @media (max-width: 640px) {
            .mobile-card {
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
          }
        `}</style>
        <Footer />
      </div>
    </>
  );
}