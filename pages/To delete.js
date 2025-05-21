import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import LocationInput from "../components/LocationInput"; // ✅ Import autocomplete

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB6hSwpZObxsCpnoocvM-57zLL8krsuUY",
  authDomain: "feedback-1st-prototype.firebaseapp.com",
  projectId: "feedback-1st-prototype",
  storageBucket: "feedback-1st-prototype.firebasestorage.app",
  messagingSenderId: "153842210945",
  appId: "1:153842210945:web:f6f8a1ff5281b7cee95580",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function Admin() {
  const [data, setData] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("bookingRequests");
  const [newEntry, setNewEntry] = useState({});
  const [editingDocument, setEditingDocument] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        setData([]); // Clear previous data before fetching

        let collectionRef = collection(db, selectedCollection);
        if (selectedCollection === "listings") {
          collectionRef = query(collectionRef, orderBy("location"), orderBy("duration"));
        } else if (selectedCollection === "bookingRequests") {
          collectionRef = query(collectionRef, orderBy("startDate"), orderBy("endDate"));
        } else if (selectedCollection === "userRequests") {
          collectionRef = query(collectionRef, orderBy("features"), orderBy("matchesFound"));
        }

        const querySnapshot = await getDocs(collectionRef);
        const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        console.log(`🔥 Firestore Retrieved ${selectedCollection}:`, documents.length);
        setData(documents);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedCollection]);

  // Listen for authentication changes
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  // ADD ENTRY FUNCTION
  const handleAdd = async () => {
    try {
      if (Object.keys(newEntry).length > 0) {
        // Create the document with preliminary newEntry data
        const docRef = await addDoc(collection(db, selectedCollection), newEntry);
        const docIdSnippet = docRef.id.slice(0, 4);

        // Create formattedEntry with generated title & slug including location
        const formattedEntry = {
          ...newEntry,
          title: `${newEntry.type?.[0]} | ${newEntry.duration?.join(", ")} | ${newEntry.location} | ${docIdSnippet}`,
          slug: `${newEntry.type?.[0].toLowerCase().replace(/ /g, "-")}-${newEntry.location.toLowerCase().replace(/ /g, "-")}-${docIdSnippet}`,
          isActive: true,
        };

        // Update the document with formatted data
        await updateDoc(docRef, formattedEntry);
        setNewEntry({});
        refreshData();
      } else {
        console.error("No data provided for new entry.");
      }
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  // UPDATE DOCUMENT FUNCTION
  const handleUpdate = async (id, updatedEntry) => {
    try {
      const docRef = doc(db, selectedCollection, id);
      const updateData = {};

      if (selectedCollection === "listings") {
        updateData.name = updatedEntry.name || "Unnamed Listing";
        updateData.type = updatedEntry.type || [];
        updateData.price_Hourly = updatedEntry.price_Hourly || 0;
        updateData.price_Daily = updatedEntry.price_Daily || 0;
        updateData.price_Weekly = updatedEntry.price_Weekly || 0;
        updateData.price_Monthly = updatedEntry.price_Monthly || 0;
        updateData.includedHours = updatedEntry.includedHours || {};
        updateData.features = updatedEntry.features || [];
        updateData.location = updatedEntry.location || "Unknown";

        updateData.duration = updatedEntry.duration || [];
        updateData.description = updatedEntry.description || "No description provided";
        updateData.isActive = updatedEntry.hasOwnProperty("isActive") ? updatedEntry.isActive : false;
        updateData.ownerName = updatedEntry.ownerName || "No owner specified";
        updateData.ownercontactInfo = updatedEntry.ownercontactInfo || "No contact info provided";
      }

      if (selectedCollection === "bookingRequests") {
        updateData.message = updatedEntry.message || "No message provided";
        updateData.startDate = updatedEntry.startDate || null;
        updateData.endDate = updatedEntry.endDate || null;
        updateData.email = updatedEntry.email || "No email provided";
        updateData.listingId = updatedEntry.listingId || "No listing ID provided";
      }

      if (selectedCollection === "userRequests") {
        updateData.requirements = updatedEntry.requirements || "No special requirements";
        updateData.contact = updatedEntry.contact || "No contact provided";
        updateData.duration = updatedEntry.duration || [];
        updateData.features = updatedEntry.features || [];
        updateData.location = updatedEntry.location || "Unknown";
        updateData.type = updatedEntry.type || [];
        updateData.price = updatedEntry.price || {};
        updateData.matchesFound = updatedEntry.matchesFound !== undefined ? updatedEntry.matchesFound : false;
      }

      await updateDoc(docRef, updateData);
      setEditingDocument(null); // Exit edit mode
      refreshData();
    } catch (error) {
      console.error("❌ Error updating document:", error);
    }
  };

  // DELETE DOCUMENT FUNCTION
  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, selectedCollection, id);
      await deleteDoc(docRef);
      refreshData();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  // LOGIN FUNCTION
  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idTokenResult = await userCredential.user.getIdTokenResult();

      if (idTokenResult.claims.admin) {
        console.log("User is an admin");
      } else {
        console.error("User is not an admin");
        alert("Access denied. You are not an admin.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  // REFRESH DATA FUNCTION
  const refreshData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, selectedCollection));
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      setData(documents);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  // If not authenticated, show the login form.
  if (!isAuthenticated) {
    return (
      <div>
        <h1>Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setNewEntry({ ...newEntry, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })}
        />
        <button onClick={() => handleLogin(newEntry.email, newEntry.password)}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <label>Select Collection:</label>
        <select value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)}>
          <option value="bookingRequests">Booking Requests</option>
          <option value="listings">Listings</option>
          <option value="userRequests">User Requests</option>
        </select>
      </div>

      {/* ADD ENTRY SECTION */}
      <div>
        <h2>Add Entry</h2>
        {selectedCollection === "listings" && data.length > 0
          ? [
              "name",
              "ownerName",
              "ownercontactInfo",
              "location", // Location field handled by autocomplete
              "description",
              "images",
              "type",
              "duration",
              "features",
              "includedHours",
              "price",
            ].map((field) => {
              if (field === "images") {
                return (
                  <div key={field}>
                    <label>Images:</label>
                    {newEntry.images?.map((image, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          placeholder="Enter image URL"
                          value={image}
                          onChange={(e) => {
                            const updatedImages = [...(newEntry.images || [])];
                            updatedImages[index] = e.target.value;
                            setNewEntry({ ...newEntry, images: updatedImages });
                          }}
                        />
                        <button
                          onClick={() => {
                            const filteredImages = newEntry.images.filter((_, i) => i !== index);
                            setNewEntry({ ...newEntry, images: filteredImages });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        setNewEntry({ ...newEntry, images: [...(newEntry.images || []), ""] })
                      }
                    >
                      + Add Another Image
                    </button>
                  </div>
                );
              }

              if (field === "location") {
                return (
                  <div key={field}>
                    <label>Location:</label>
                    <LocationInput setFormData={(updates) => setNewEntry({ ...newEntry, ...updates })} />
                  </div>
                );
              }

              return (
                <div key={field}>
                  <label>{field}:</label>
                  <input
                    type="text"
                    value={newEntry[field] || ""}
                    onChange={(e) => setNewEntry({ ...newEntry, [field]: e.target.value })}
                  />
                </div>
              );
            })
          : ["name", "email"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={`Enter ${field}`}
                value={newEntry[field] || ""}
                onChange={(e) => setNewEntry({ ...newEntry, [field]: e.target.value })}
              />
            ))}
        <button onClick={handleAdd}>Add Entry</button>
      </div>

      {/* EDIT ENTRY SECTION */}
      {editingDocument && (
        <div>
          <div>
            <h2>Edit Document</h2>
            {Object.keys(editingDocument).map((key) => {
              if (key === "type") {
                const typeOptions = [
                  "Podcast Studio",
                  "Video/Content Creation Space",
                  "Voiceover Studio",
                  "Hybrid Space",
                ];
                return (
                  <div key={key}>
                    <label>{key}:</label>
                    {typeOptions.map((option) => (
                      <label key={option}>
                        <input
                          type="checkbox"
                          checked={(editingDocument[key] || []).includes(option)}
                          onChange={(e) => {
                            const updatedValues = editingDocument[key] || [];
                            setEditingDocument({
                              ...editingDocument,
                              [key]: e.target.checked
                                ? [...updatedValues, option]
                                : updatedValues.filter((val) => val !== option),
                            });
                          }}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                );
              }
              if (key === "location") {
                return (
                  <div key={key}>
                    <label>Location:</label>
                    <LocationInput
                      setFormData={(updates) => setEditingDocument({ ...editingDocument, ...updates })}
                    />
                  </div>
                );
              }
              if (key === "features") {
                const featureOptions = [
                  "Recording Equipment",
                  "Wi-Fi",
                  "Soundproof",
                  "Parking",
                  "Green Screen/Backdrops",
                  "AC / Ventilation",
                  "Lighting Equipment",
                  "Furniture",
                  "Tea/Coffee Facilities",
                  "Dedicated Team Support",
                ];
                return (
                  <div key={key}>
                    <label>{key}:</label>
                    {featureOptions.map((option) => (
                      <label key={option}>
                        <input
                          type="checkbox"
                          checked={(editingDocument[key] || []).includes(option)}
                          onChange={(e) => {
                            const updatedValues = editingDocument[key] || [];
                            setEditingDocument({
                              ...editingDocument,
                              [key]: e.target.checked
                                ? [...updatedValues, option]
                                : updatedValues.filter((val) => val !== option),
                            });
                          }}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                );
              }
              if (key === "price") {
                return (
                  <div key={key}>
                    <label>
                      <strong>Price:</strong>
                    </label>
                    {["Hourly", "Daily", "Weekly", "Monthly"].map((duration) => (
                      <div
                        key={duration}
                        style={{ display: "flex", gap: "10px", marginBottom: "5px" }}
                      >
                        <span>{duration}:</span>
                        <input
                          type="number"
                          placeholder={`Enter ${duration} price`}
                          value={editingDocument?.price?.[duration] || ""}
                          onChange={(e) => {
                            setEditingDocument({
                              ...editingDocument,
                              price: {
                                ...editingDocument.price,
                                [duration]: Number(e.target.value),
                              },
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                );
              }
              if (key === "includedHours") {
                return (
                  <div key={key}>
                    <label>{key}:</label>
                    {["hourly", "daily", "weekly", "monthly"].map((duration) => (
                      <input
                        key={duration}
                        type="number"
                        placeholder={`${duration} included hours`}
                        value={editingDocument[key]?.[duration] || ""}
                        onChange={(e) => {
                          setEditingDocument({
                            ...editingDocument,
                            [key]: {
                              ...editingDocument[key],
                              [duration]: e.target.value,
                            },
                          });
                        }}
                      />
                    ))}
                  </div>
                );
              }
              if (key === "duration") {
                const durationOptions = ["Hourly", "Daily", "Weekly", "Monthly"];
                return (
                  <div key={key}>
                    <label>{key}:</label>
                    {durationOptions.map((option) => (
                      <label key={option}>
                        <input
                          type="checkbox"
                          checked={(editingDocument[key] || []).includes(option)}
                          onChange={(e) => {
                            const updatedValues = editingDocument[key] || [];
                            setEditingDocument({
                              ...editingDocument,
                              [key]: e.target.checked
                                ? [...updatedValues, option]
                                : updatedValues.filter((val) => val !== option),
                            });
                          }}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                );
              }
              // Render other fields as regular inputs
              return key !== "id" ? (
                <input
                  key={key}
                  type="text"
                  placeholder={key}
                  value={editingDocument[key] || ""}
                  onChange={(e) =>
                    setEditingDocument({ ...editingDocument, [key]: e.target.value })
                  }
                />
              ) : null;
            })}
            <button onClick={() => handleUpdate(editingDocument.id, editingDocument)}>
              Save Changes
            </button>
            <button onClick={() => setEditingDocument(null)}>Cancel</button>
          </div>
        )}
      </div>

      {/* LISTING DOCUMENTS */}
      <ul>
        {data.map((doc) => {
          const validPrices = ["Hourly", "Daily", "Weekly", "Monthly"]
            .filter((duration) => doc?.[`price_${duration}`] && doc[`price_${duration}`] > 0)
            .map((duration) => `${duration}: R${doc[`price_${duration}`].toLocaleString()}`);

          return (
            <li key={doc.id}>
              <p>
                <strong>Title:</strong> {doc.title}
              </p>
              <p>
                <strong>ID:</strong> {doc.id}
              </p>

              {selectedCollection === "listings" && (
                <>
                  <p>
                    <strong>Type:</strong>{" "}
                    {Array.isArray(doc.type) ? doc.type.join(", ") : "Not specified"}
                  </p>
                  <p>
                    <strong>Description:</strong> {doc.description}
                  </p>
                  {doc.features && Array.isArray(doc.features) && (
                    <p>
                      <strong>Features:</strong> {doc.features.join(", ")}
                    </p>
                  )}
                  <p>
                    <strong>Location:</strong> {doc.location}
                  </p>
                  <p>
                    <strong>Duration:</strong>{" "}
                    {Array.isArray(doc.duration) ? doc.duration.join(", ") : "Not specified"}
                  </p>
                  {doc.includedHours && Object.keys(doc.includedHours).length > 0 && (
                    <p>
                      <strong>Included Hours: </strong>
                      {Object.entries(doc.includedHours)
                        .map(([key, value]) => `${key}: ${value} hours`)
                        .join(" | ")}
                    </p>
                  )}
                  {validPrices.length > 0 && (
                    <p>
                      <strong>Price:</strong> {validPrices.join(" | ")}
                    </p>
                  )}
                  {doc.isActive !== undefined && (
                    <p>
                      <strong>Active Status:</strong> {doc?.isActive ? "✅ Active" : "❌ Inactive"}
                    </p>
                  )}
                  <p>
                    <strong>Owner:</strong> {doc.ownerName}
                  </p>
                  <p>
                    <strong>Contact Info:</strong> {doc.ownercontactInfo}
                  </p>
                </>
              )}

              {selectedCollection === "bookingRequests" && (
                <>
                  <p>
                    <strong>Name:</strong> {doc.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {doc.email}
                  </p>
                  <p>
                    <strong>Booking Type:</strong> {doc.bookingType}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {doc.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {doc.endDate}
                  </p>
                  <p>
                    <strong>Message:</strong> {doc.message}
                  </p>
                  <p>
                    <strong>Listing ID:</strong> {doc.listingId}
                  </p>
                </>
              )}

              {selectedCollection === "userRequests" && (
                <>
                  <p>
                    <strong>Name:</strong> {doc.name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {doc.contact}
                  </p>
                  <p>
                    <strong>Location:</strong> {doc.location}
                  </p>
                  <p>
                    <strong>Duration:</strong>{" "}
                    {Array.isArray(doc.duration) ? doc.duration.join(", ") : "Not specified"}
                  </p>
                  <p>
                    <strong>Features:</strong>{" "}
                    {Array.isArray(doc.features) ? doc.features.join(", ") : "Not specified"}
                  </p>
                  <p>
                    <strong>Matches Found:</strong> {doc.matchesFound ? "✅ Yes" : "❌ No"}
                  </p>
                  <p>
                    <strong>Requirements:</strong> {doc.requirements || "Not specified"}
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    {Array.isArray(doc.type) ? doc.type.join(", ") : "Not specified"}
                  </p>
                  {doc.price && (
                    <p>
                      <strong>Price:</strong>{" "}
                      {Object.entries(doc.price)
                        .map(([key, value]) => `${key}: R${value}`)
                        .join(" | ")}
                    </p>
                  )}
                </>
              )}

              {/* EDIT & DELETE OPTIONS */}
              <button onClick={() => setEditingDocument(doc)}>Edit</button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this entry? This action cannot be undone."
                    )
                  ) {
                    handleDelete(doc.id);
                  }
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <footer
        style={{
          textAlign: "center",
          marginTop: "40px",
          fontSize: "14px",
          color: "#2FD1BA",
        }}
      >
        © {new Date().getFullYear()} Nayburlee Incorporated. <br /> All rights reserved.
      </footer>
    </div>
  );
}
