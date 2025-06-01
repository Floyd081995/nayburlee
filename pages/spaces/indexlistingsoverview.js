import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Slider from "react-slick";
import Footer from "../../components/Footer";

export default function SpacesOverview({ }) {
  const router = useRouter();
  const didRun = useRef(false);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  const [currentType, setCurrentType] = useState("");
  const [locationSearch] = useState("");

useEffect(() => {
  if (didRun.current) return;
  didRun.current = true;

  if (typeof window !== "undefined") {
    // --- Session expiration logic ---
    const matchesTimestamp = sessionStorage.getItem("nayburleeMatchesTimestamp");
    const now = Date.now();
    const maxAge = 10 * 60 * 1000; // 10 minutes

    console.log("Session age (ms):", now - Number(matchesTimestamp), "Max age (ms):", maxAge);

    if (!matchesTimestamp || now - Number(matchesTimestamp) > maxAge) {
      sessionStorage.removeItem("nayburleeMatches");
      sessionStorage.removeItem("nayburleeMatchesTimestamp");
      router.replace("/user-request");
      return;
    }

    // Load matches from sessionStorage
    const stored = sessionStorage.getItem("nayburleeMatches");
    if (stored) {
      setListings(JSON.parse(stored));
    } else {
      setListings([]);
    }
    setLoading(false);
  }
}, [router]);

  if (loading) return <div>Loading...</div>;

  const handleFilterChange = (newType) => {
    setCurrentType(newType);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, type: newType, location: locationSearch }
    }, undefined, { shallow: true });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  const search = locationSearch.trim().toLowerCase();

  let filteredSortedListings = listings; // Show all matches by default

  // Only filter if the user actually selects a type or enters a location
  const hasActiveFilter = currentType || search;
  if (hasActiveFilter && listings.length > 0) {
    filteredSortedListings = listings
      .filter(listing => {
        if (currentType && (!listing.type || !listing.type.includes(currentType))) {
          return false;
        }
        if (!search) return true;
        if (!listing.location) return false;
        const searchParts = search
          .split(/[\s,]+/)
          .map(s => s.trim())
          .filter(Boolean);
        return searchParts.some(part =>
          listing.location.toLowerCase().includes(part)
        );
      })
      .sort((a, b) => {
        const aLoc = (a.location || "").trim().toLowerCase();
        const bLoc = (b.location || "").trim().toLowerCase();

        // 1. Exact match
        if (search) {
          if (aLoc === search && bLoc !== search) return -1;
          if (bLoc === search && aLoc !== search) return 1;
        }

        // 2. All search parts present
        const searchParts = search.split(/[\s,]+/).filter(Boolean);
        const aAllParts = searchParts.every(part => aLoc.includes(part));
        const bAllParts = searchParts.every(part => bLoc.includes(part));
        if (aAllParts && !bAllParts) return -1;
        if (bAllParts && !aAllParts) return 1;

        // 3. By features (as before)
        const scoreA = (a.features?.includes("Wi-Fi") ? 1 : 0) + (a.features?.includes("Soundproof") ? 1 : 0);
        const scoreB = (b.features?.includes("Wi-Fi") ? 1 : 0) + (b.features?.includes("Soundproof") ? 1 : 0);
        return scoreB - scoreA;
      })
      .slice(0, 3); // Limit to 3 listings
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow">
        <div className="p-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <header className="mb-8">
            <h1 style={{ marginLeft: "50px" }} className="text-4xl font-extrabold text-center text-gray-800">
              {filteredSortedListings.length === 0
                ? "No Matches Found"
                : "Here are your matches:"}
            </h1>
          </header>

          {/* Filter Section */}
          <div style={{ marginLeft: "50px" }} className="mb-6 flex justify-center">
            <div className="flex items-center gap-4">
              <label htmlFor="typeFilter" className="text-lg font-semibold text-gray-700">
                Filter by type:
              </label>
              <select
                id="typeFilter"
                value={currentType}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="Podcast Studio">Podcast Studio</option>
                <option value="Video/Content Creation Space">Video/Content Creation Space</option>
                <option value="Voiceover Studio">Voiceover Studio</option>
                <option value="Hybrid Space">Hybrid Space</option>
              </select>
            </div>
          </div>

          {/* Listings Section */}
          {filteredSortedListings.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "20px" }} className="mb-6 flex justify-center">
              <p className="text-center text-gray-500">
                Sorry, we couldn't find a perfect match for your request right now.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                But don't lose hope! We’re always adding new spaces. Try adjusting your search or check back soon for more options!
              </p>
            </div>
          ) : (
            <div
              className="space-y-6 overflow-y-auto max-h-[600px] px-4"
              style={{ scrollbarColor: "light gray", scrollbarWidth: "thin" }}
            >
              {filteredSortedListings.map((listing, index) => (
                <div key={listing.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 mobile-card">
                  {/* Listing Title */}
                  <h2 style={{ color: "#2FD1BA", textAlign: "center", marginTop: "50px", marginBottom: "5px", padding: "5px 15px"}} className="text-lg font-bold text-gray-800">
                    {listing.title || "Untitled"}
                  </h2>

                  {/* Match Label */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <div
                      className="p-2 text-white font-semibold text-center"
                      style={{
                        backgroundColor: index === 0 ? "#FF5733" : index === 1 ? "#FFC300" : "#6C757D",
                        borderRadius: "5px",
                        marginBottom: "24px",
                        padding: "5px 15px",
                        fontSize: "0.9rem",
                        textAlign: "center",
                        maxWidth: "220px",
                        minHeight: "38px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {index === 0
                        ? "🔥 Best Match"
                        : index === 1
                          ? "⭐ Recommended Alternative"
                          : "📌 Other Available Space"}
                    </div>

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
                                  margin: 0, // Ensure no margin on image
                                }}
                              />
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ textAlign: "center", marginTop: "15px", marginBottom: "5px", marginLeft: "50px", marginRight: "50px" }} className="text-sm text-gray-600 text-center mt-1">
                    <span className="font-semibold"><strong></strong></span> {listing.description || "N/A"}
                  </p>

                  {/* Features */}
                  <p style={{ textAlign: "center", marginTop: "15px", marginBottom: "5px" }} className="text-sm text-gray-600 text-center mt-1">
                    <span className="font-semibold"><strong>Features:</strong> </span> {listing.features?.join(", ") || "No features listed"}
                  </p>

                  {/* Type */}
                  <p style={{ textAlign: "center", marginTop: "15px", marginBottom: "5px" }} className="text-sm text-gray-600 text-center mt-1">
                    <span className="font-semibold"><strong>Type:</strong></span> {listing.type?.join(", ") || "N/A"}
                  </p>

                  {/* Location */}
                  <p style={{ textAlign: "center", marginTop: "15px", marginBottom: "5px" }} className="text-sm text-gray-600 text-center mt-1">
                    <span className="font-semibold"><strong>Location:</strong></span> {listing.location || "N/A"}
                  </p>

                  {/* Capacity */}
                  <p style={{ textAlign: "center", marginTop: "15px", marginBottom: "5px" }} className="text-sm text-gray-600 text-center mt-1">
                    <span className="font-semibold"><strong>Capacity (People):</strong></span> {listing.capacity ? listing.capacity : "Not specified"}
                  </p>

                  {/* Included Hours */}
                  <p style={{ textAlign: "center", marginTop: "15px", marginBottom: "5px" }} className="text-sm text-gray-600 text-center mt-1">
                    <span className="font-semibold"><strong>Included Hours: </strong></span>
                    {listing.includedHours
                      ? Object.entries(listing.includedHours)
                          .map(([key, value]) => `${value} ${key.charAt(0).toUpperCase() + key.slice(1)}`)
                          .join(", ")
                      : "N/A"}
                  </p>

                  {/* Price */}
                  <p style={{ textAlign: "center", marginTop: "15px", marginBottom: "5px" }} className="text-sm text-gray-500 mt-2">
                    <span className="font-semibold"><strong>Price: </strong></span>
                    {["Hourly", "Daily", "Weekly", "Monthly"]
                      .map((duration) => listing[`price_${duration}`] ? `R${listing[`price_${duration}`]} (${duration})` : null)
                      .filter(Boolean)
                      .join(", ") || "No price available"}
                  </p>

                  {/* View Space Button */}
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
                      margin: "10px auto",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    
                    onClick={() => router.push({
                      pathname: `/spaces/${listing.id}`,
                      query: {...router.query } // This keeps name and email (and any other params) in the URL
                    })}
                    className="inline-block bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600"
                  >
                    Book Space
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>
        {`
          @media (max-width: 640px) {
            .mobile-card {
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
          }
        `}
      </style>
      <Footer />
    </div>
  );
}
