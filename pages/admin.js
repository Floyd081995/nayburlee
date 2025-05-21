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
  getDoc
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import LocationInput from "../components/LocationInput"; // ✅ Import autocomplete
import { useRef } from "react";


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
  // After your other useState hooks:
  const editModalRef = useRef(null);
  const [selectedListingBookings, setSelectedListingBookings] = useState([]);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [currentListingName, setCurrentListingName] = useState("");
  const [data, setData] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("listings");
  const [newEntry, setNewEntry] = useState({
    name: "",
    ownerName: "",
    ownercontactInfo: "",
    officialAddress: "",
    location: "", // Initialize location
    description: "",
    images: [],
    type: [],
    duration: [],
    features: [],
    includedHours: {},
    price: {},
  });

  useEffect(() => {
    console.log("newEntry updated:", newEntry); // Debugging log
  }, [newEntry]);

  const [editingDocument, setEditingDocument] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
        try {
          setData([]); // ✅ Clear previous data before fetching
          
          let collectionRef = collection(db, selectedCollection);
          
          if (selectedCollection === "listings") {
            collectionRef = query(collectionRef, orderBy("location"), orderBy("duration"));
          } else if (selectedCollection === "userRequests") {
            collectionRef = query(collectionRef, orderBy("features"), orderBy("matchesFound"));
          }
    
          const querySnapshot = await getDocs(collectionRef);
          const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
          
          setData(documents);
        } catch (error) {
          console.error("❌ Error fetching data:", error);
        }
      };
      fetchData();
    }, [selectedCollection]);
    

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  const handleAdd = async () => {
    try {
      console.log("DEBUG: newEntry at submit", newEntry);
      console.log("Location being sent to Firestore:", newEntry.location); // Add this here
  
      if (!newEntry.location || newEntry.location.trim() === "") {
        console.error("❌ Location is missing in newEntry.");
        alert("Please select a valid location.");
        return;
      }

      if (!newEntry.name || newEntry.name.trim() === "") {
      alert("Please enter a name for the listing.");
      return;
      }

      if (!newEntry.ownercontactInfo || newEntry.ownercontactInfo.trim() === "") {
          alert("Please enter owner contact info for the listing.");
          return;
        }
  
      if (Object.keys(newEntry).length > 0) {
        const docRef = await addDoc(collection(db, selectedCollection), {
          ...newEntry,
          name: newEntry.name, // Ensure name is saved
          location: newEntry.location,
          ownerName: newEntry.ownerName,
          ownercontactInfo: newEntry.ownercontactInfo,

        });
  
        const docIdSnippet = docRef.id.slice(0, 6); // Use first 6 characters

        const formattedEntry = {
          ...newEntry,
          location: newEntry.location,
          title: `${newEntry.type?.[0]} | ${newEntry.location} | ${docIdSnippet}`,
          slug: `${newEntry.type?.[0]?.toLowerCase().replace(/ /g, "-") || "unknown"}-${newEntry.location.toLowerCase().replace(/ /g, "-")}-${docIdSnippet}`,
          isActive: newEntry.isActive === undefined ? true : newEntry.isActive,
        };
  
        await updateDoc(docRef, formattedEntry);
  
        setNewEntry({
          name: "",
          ownerName: "",
          ownercontactInfo: "",
          location: "",
          description: "",
          images: [],
          type: [],
          duration: [],
          features: [],
          includedHours: {},
          price: {},
        });
        refreshData();
      } else {
        console.error("No data provided for new entry.");
      }
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleUpdate = async (id, updatedEntry) => {
    try {
      console.log("Updating document with ID:", id); // Debugging log
      console.log("Updated entry data:", updatedEntry); // Debugging log

      const docRef = doc(db, selectedCollection, id);
      const updateData = {}; // ✅ Start with an empty update object
  
      if (selectedCollection === "listings") {
        updateData.name = updatedEntry.name || "Unnamed Listing";
        updateData.type = updatedEntry.type || [];
        updateData.price_Hourly = updatedEntry.price_Hourly !== undefined && updatedEntry.price_Hourly !== ""
          ? Number(updatedEntry.price_Hourly)
          : 0;
        updateData.price_Daily = updatedEntry.price_Daily !== undefined && updatedEntry.price_Daily !== ""
          ? Number(updatedEntry.price_Daily)
          : 0;
        updateData.price_Weekly = updatedEntry.price_Weekly !== undefined && updatedEntry.price_Weekly !== ""
          ? Number(updatedEntry.price_Weekly)
          : 0;
        updateData.price_Monthly = updatedEntry.price_Monthly !== undefined && updatedEntry.price_Monthly !== ""
          ? Number(updatedEntry.price_Monthly)
          : 0;
        updateData.includedHours = updatedEntry.includedHours || {};
        updateData.features = updatedEntry.features || [];
        updateData.location = updatedEntry.location || "Unknown";

  
        // ✅ **Fix: Ensure these fields update properly**
        updateData.duration = updatedEntry.duration || [];
        updateData.description = updatedEntry.description || "No description provided";
        // ✅ Ensure `isActive` always updates properly
        updateData.isActive = updatedEntry.hasOwnProperty("isActive") ? updatedEntry.isActive : false;
        updateData.ownerName = updatedEntry.ownerName || "No owner specified";
        updateData.ownercontactInfo = updatedEntry.ownercontactInfo || "No contact info provided";
        updateData.capacity =
        updatedEntry.capacity !== undefined && updatedEntry.capacity !== ""
          ? Number(updatedEntry.capacity)
          : "";
          updateData.officialAddress = updatedEntry.officialAddress || "";
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
        updateData.capacity =
          updatedEntry.capacity !== undefined && updatedEntry.capacity !== ""
            ? Number(updatedEntry.capacity)
            : "";
      }
  
      await updateDoc(docRef, updateData);
  
      setEditingDocument(null); // ✅ Exit edit mode
      refreshData(); // ✅ Ensure UI updates properly
    } catch (error) {
      console.error("❌ Error updating document:", error);
    }
  };
  
  // Add this function inside the Admin component:
  const handleViewBookings = async (listingId) => {
    try {
      const listing = data.find((d) => d.id === listingId);
      setCurrentListingName(listing?.name || "");
      const bookingsRef = collection(db, "listings", listingId, "bookings");
      const snapshot = await getDocs(bookingsRef);
      // Attach parentListingId to each booking
      const bookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        parentListingId: listingId, // <-- Add this line
        ...doc.data()
      }));
      setSelectedListingBookings(bookings);
      setShowBookingsModal(true);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Could not fetch bookings for this listing.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, selectedCollection, id);
      await deleteDoc(docRef);
      refreshData();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idTokenResult = await userCredential.user.getIdTokenResult();

      if (idTokenResult.claims.admin) {
      } else {
        console.error("User is not an admin");
        alert("Access denied. You are not an admin.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

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
        <button onClick={() => handleLogin(newEntry.email, newEntry.password)}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div> 
      <h1>Admin Panel
      </h1>
      <div>
        <label>Select Collection:</label>
        <select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
        >
          <option value="listings">Listings</option>
          <option value="userRequests">User Requests</option>
          <option value="subscriptions">Subscriptions</option>
        </select>
      </div>
      <div>
        <h2>Add Entry</h2>
        {selectedCollection === "listings" && data.length > 0
  ? [
      "name",
      "ownerName",
      "ownercontactInfo",
      "location",
      "description",
      "images",
      "type",
      "duration",
      "capacity",
      "features",
      "includedHours",
      "price",
      "openTime", 
      "closeTime",
      "isActive",
      "officialAddress",
    ].map((field) => {
      
      // Special handling for images
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
                    const updatedImages = [...newEntry.images];
                    updatedImages[index] = e.target.value;
                    setNewEntry({ ...newEntry, images: updatedImages });
                  }}
                />
                <button onClick={() => {
                  const filteredImages = newEntry.images.filter((_, i) => i !== index);
                  setNewEntry({ ...newEntry, images: filteredImages });
                }}>Remove</button>
              </div>
            ))}
            <button onClick={() => setNewEntry({ ...newEntry, images: [...(newEntry.images || []), ""] })}>
              + Add Another Image
            </button>
          </div>
        );
      }

     // SPECIAL HANDLING FOR LOCATION
     if (field === "location") {
      return (
        <div key={field}>
          <label>Location:</label>
          <LocationInput
            initialValue={newEntry.location || ""}
            setFormData={(updates) => setNewEntry((prev) => ({ ...prev, ...updates }))}
          />
        </div>
      );
    }

    if (field === "name") {
      return (
        <div key={field}>
          <label>Official Space Name (Hidden):</label>
          <input
            type="text"
            placeholder="Enter listing name"
            value={newEntry.name || ""}
            onChange={e => setNewEntry({ ...newEntry, name: e.target.value })}
            required
          />
        </div>
      );
    }

            if (field === "ownerName") {
              return (
                <div key={field}>
                  <label>Owner Name (Hidden):</label>
                  <input
                    type="text"
                    placeholder="Enter owner name"
                    value={newEntry.ownerName || ""}
                    onChange={e => setNewEntry({ ...newEntry, ownerName: e.target.value })}
                    required
                  />
                </div>
              );
            }

            if (field === "ownercontactInfo") {
              return (
                <div key={field}>
                  <label>Owner Contact Info (Hidden):</label>
                  <input
                    type="text"
                    placeholder="Enter owner contact info"
                    value={newEntry.ownercontactInfo || ""}
                    onChange={e => setNewEntry({ ...newEntry, ownercontactInfo: e.target.value })}
                    required
                  />
                </div>
              );
            }

            if (field === "officialAddress") {
              return (
                <div key={field}>
                  <label>Official Address (Hidden):</label>
                  <input
                    type="text"
                    placeholder="Enter official address"
                    value={newEntry.officialAddress || ""}
                    onChange={e => setNewEntry({ ...newEntry, officialAddress: e.target.value })}
                  />
                </div>
              );
            }



              if (field === "duration") {
                return (
                  <div key={field}>
                    <label>Duration:</label>
                    {["Hourly", "Daily", "Weekly", "Monthly"].map((option) => (
                      <label key={option}>
                        <input 
                          type = "checkbox"
                          checked={(newEntry.duration || []).includes(option)} style={{ color: "#2fd1ba"}}
                          onChange={(e) => {
                            const updatedValues = newEntry.duration || [];
                            setNewEntry({
                              ...newEntry,
                              duration: e.target.checked
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

              if (field === "description") {
              return (
                <div style={{ display: "flex", flexDirection: "column", marginBottom: 12}} key={field}>
                  <label>Description:</label>
                  <textarea
                    style={{ width: "90%", maxWidth: 500, minHeight: 100, resize: "vertical" }}
                    value={newEntry.description || ""}
                    onChange={e => setNewEntry({ ...newEntry, description: e.target.value })}
                    placeholder="Enter description"
                  />
                </div>
              );
            }

              if (field === "isActive") {
              return (
                <div key={field}>
                  <label>Active Status:</label>
                  <select
                    value={newEntry.isActive === undefined ? "" : newEntry.isActive ? "true" : "false"}
                    onChange={e =>
                      setNewEntry({ ...newEntry, isActive: e.target.value === "true" })
                    }
                  >
                    <option value="">Select status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              );
            }

              if (field === "features") {
                return (
                  <div key={field}>
                    <label>Features:</label>
                    {[
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
                    ].map((option) => (
                      <label key={option}>
                        <input
                          type="checkbox"
                          checked={(newEntry.features || []).includes(option)}
                          onChange={(e) => {
                            const updatedValues = newEntry.features || [];
                            setNewEntry({
                              ...newEntry,
                              features: e.target.checked
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

              if (field === "type") {
                return (
                  <div key={field}>
                    <label>Type:</label>
                    {[
                      "Podcast Studio",
                      "Video/Content Creation Space",
                      "Voiceover Studio",
                      "Hybrid Space",
                    ].map((option) => (
                      <label key={option}>
                        <input
                          type="checkbox"
                          checked={(newEntry.type || []).includes(option)}
                          onChange={(e) => {
                            const updatedValues = newEntry.type || [];
                            setNewEntry({
                              ...newEntry,
                              type: e.target.checked
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

              if (field === "capacity") {
                return (
                  <div key={field}>
                    <label>Capacity:</label>
                    <input
                      type="number"
                      min={1}
                      placeholder="How many people?"
                      value={newEntry.capacity || ""}
                      onChange={(e) => setNewEntry({ ...newEntry, capacity: Number(e.target.value) })}
                    />
                  </div>
                );
              }

              if (field === "includedHours") {
                return (
                  <div key={field}>
                    <label>Included Hours:</label>
                    {["hourly", "daily", "weekly", "monthly"].map((duration) => (
                      <input
                      key={duration}
                      type="number"
                      placeholder={`${duration} included hours`}
                      value={newEntry.includedHours?.[duration] || ""}
                      onChange={(e) => {
                        setNewEntry({
                          ...newEntry,
                          includedHours: {
                            ...newEntry.includedHours,
                            [duration]: Number(e.target.value), // Convert to number
                            },
                          });
                        }}
                      />
                    ))}
                  </div>
                );
              }

              if (field.includes("price")) {
                return (
                  <div key={field}>
                    <label>Price:</label>
                    {["Hourly", "Daily", "Weekly", "Monthly"].map((duration) => (
                      <input
                        key={duration}
                        type="number"
                        placeholder={`${duration} price`}
                        value={newEntry[`price_${duration}`] || ""} // ✅ Use flat field format
                        onChange={(e) => {
                          setNewEntry({
                            ...newEntry,
                            [`price_${duration}`]: Number(e.target.value), // ✅ Save in correct format
                          });
                        }}
                      />
                    ))}
                  </div>
                );
              }         
              
              if (field === "openTime" || field === "closeTime") {
                return (
                  <div key={field}>
                    <label>{field === "openTime" ? "Opening Time:" : "Closing Time:"}</label>
                    <input
                      type="time"
                      value={newEntry[field] || ""}
                      onChange={(e) => setNewEntry({ ...newEntry, [field]: e.target.value })}
                    />
                  </div>
                );
              }

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

        <button
          // In your admin.js, before calling handleAdd:
          onClick={() => {
            const input = document.getElementById("location-input");
            if (input) input.blur();
            setTimeout(() => handleAdd(), 0); // Wait for blur and state update
          }}
        >
          Add Entry
        </button>

      </div>
      {editingDocument && (
  <div ref={editModalRef}>
    {editingDocument && editingDocument.isBookingEdit ? (
  <div>
    
    {/* Add more fields as needed */}
    <button
      onClick={async () => {
        if (editingDocument.isBookingEdit && editingDocument.parentListingId) {
          const docRef = doc(db, "listings", editingDocument.parentListingId, "bookings", editingDocument.id);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            alert("This booking does not exist in the database. It may have been deleted or you are editing the wrong listing.");
            setEditingDocument(null);
            handleViewBookings(editingDocument.parentListingId);
            return;
          }
          // Only keep booking fields
          const {
            isBookingEdit,
            parentListingId,
            ...bookingData
          } = editingDocument;
          await updateDoc(docRef, bookingData);
          setEditingDocument(null);
          handleViewBookings(editingDocument.parentListingId);
        }
      }}
    >
      Save Changes
    </button>
    <button onClick={() => setEditingDocument(null)}>
      Cancel
    </button>
  </div>
) : (
  <div>
    <h2>Edit Document</h2>
    {Object.keys(editingDocument).map((key) => {
      if (key === "type") {
        // Render checkboxes for 'type'
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
                initialValue={editingDocument.location || ""}
                setFormData={(updates) => {
                  setEditingDocument({ ...editingDocument, ...updates });
                }}
              />
            </div>
          );
        }

        if (key === "isActive") {
          return (
            <div key={key}>
              <label>Active Status:</label>
              <select
                value={editingDocument.isActive === undefined ? "" : editingDocument.isActive ? "true" : "false"}
                onChange={e =>
                  setEditingDocument({ ...editingDocument, isActive: e.target.value === "true" })
                }
              >
                <option value="">Select status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          );
        }

        if (key === "officialAddress") {
          return (
            <div key={key}>
              <label>Official Address (Hidden):</label>
              <input
                type="text"
                placeholder="Enter official address"
                value={editingDocument.officialAddress || ""}
                onChange={e =>
                  setEditingDocument({ ...editingDocument, officialAddress: e.target.value })
                }
              />
            </div>
          );
        }

        if (key === "capacity") {
          return (
            <div key={key}>
              <label>Capacity:</label>
              <input
                type="number"
                min={1}
                placeholder="How many people?"
                value={editingDocument.capacity || ""}
                onChange={(e) =>
                  setEditingDocument({ ...editingDocument, capacity: Number(e.target.value) })
                }
              />
            </div>
          );
        }

        if (key === "openTime" || key === "closeTime") {
          return (
            <div key={key}>
              <label>{key === "openTime" ? "Opening Time:" : "Closing Time:"}</label>
              <input
                type="time"
                value={editingDocument[key] || ""}
                onChange={(e) =>
                  setEditingDocument({ ...editingDocument, [key]: e.target.value })
                }
              />
            </div>
          );
        }

      if (key === "features") {
        // Render checkboxes for 'features'
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
        // Render checkboxes for 'duration'
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

      if (key === "description") {
      return (
        <div key={key} style={{ display: "flex", flexDirection: "column", marginBottom: 12 }}>
          <label>Description:</label>
          <textarea
            style={{ width: "90%", maxWidth: 500, minHeight: 100, resize: "vertical" }}
            value={editingDocument.description || ""}
            onChange={e => setEditingDocument({ ...editingDocument, description: e.target.value })}
            placeholder="Enter description"
          />
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
    <button
      onClick={async () => {
        if (editingDocument.isBookingEdit && editingDocument.parentListingId) {
          const docRef = doc(db, "listings", editingDocument.parentListingId, "bookings", editingDocument.id);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            alert("This booking does not exist in the database. It may have been deleted or you are editing the wrong listing.");
            setEditingDocument(null);
            handleViewBookings(editingDocument.parentListingId);
            return;
          }
          // Only keep booking fields
          const {
            isBookingEdit,
            parentListingId,
            ...bookingData
          } = editingDocument;
          await updateDoc(docRef, bookingData);
          setEditingDocument(null);
          handleViewBookings(editingDocument.parentListingId);
        } else {
          handleUpdate(editingDocument.id, editingDocument);
        }
      }}
    >
      Save Changes
    </button>
    <button onClick={() => setEditingDocument(null)}>Cancel</button>
  </div>
)}
  </div>
)}
  
  <ul>
  {data.map((listingDoc) => {
    // ✅ Define validPrices inside the loop to prevent errors
    const validPrices = ["Hourly", "Daily", "Weekly", "Monthly"]
      .filter((duration) => listingDoc?.[`price_${duration}`] && listingDoc[`price_${duration}`] > 0)
      .map((duration) => `${duration}: R${listingDoc[`price_${duration}`].toLocaleString()}`);

    return (
      <li key={listingDoc.id}>
            <p><strong>Title:</strong> {listingDoc.title}</p>
            <p><strong>ID:</strong> {listingDoc.id}</p>
        
        {/* ✅ Show different fields depending on the selectedCollection */}
        {selectedCollection === "listings" && (
          <>
            <p><strong>Official Name (Hidden):</strong> {listingDoc.name}</p>
            <p><strong>Type:</strong> {Array.isArray(listingDoc.type) ? listingDoc.type.join(", ") : "Not specified"}</p>
            <p><strong>Description:</strong> {listingDoc.description}</p>
            {listingDoc.features && Array.isArray(listingDoc.features) && (
              <p><strong>Features:</strong> {listingDoc.features.join(", ")}</p>
            )}
            
            <p><strong>Location:</strong> {listingDoc.location}</p>
            <p><strong>Capacity:</strong> {listingDoc.capacity ? listingDoc.capacity : "Not specified"}</p>
            <p><strong>Duration:</strong> {Array.isArray(listingDoc.duration) ? listingDoc.duration.join(", ") : "Not specified"}</p>
            {listingDoc.includedHours && Object.keys(listingDoc.includedHours).length > 0 && (
              <p><strong>Included Hours: </strong> 
                {Object.entries(listingDoc.includedHours).map(([key, value]) => `${key}: ${value} hours`).join(" | ")}
              </p>
            )}
            {validPrices.length > 0 && (
              <p><strong>Price:</strong> {validPrices.join(" | ")}</p> // ✅ Render only once
            )}

            {listingDoc.isActive !== undefined && (
              <p><strong>Active Status:</strong> {listingDoc?.isActive ? "✅ Active" : "❌ Inactive"}</p>
            )}

            <p><strong>Owner (Hidden):</strong> {listingDoc.ownerName}</p>
            <p><strong>Contact Info (Hidden):</strong> {listingDoc.ownercontactInfo}</p>
            {listingDoc.officialAddress && (
              <p><strong>Official Address (Hidden):</strong> {listingDoc.officialAddress}</p>
            )}
          </>
        )}

        {selectedCollection === "userRequests" && (
          <>
            <p><strong>Name:</strong> {listingDoc.name}</p>
            <p><strong>Contact:</strong> {listingDoc.contact}</p>
            <p><strong>Location Required:</strong> {listingDoc.location}</p>
            <p><strong>Capacity Required:</strong> {listingDoc.capacity ? listingDoc.capacity : "Not specified"}</p>
            <p><strong>Duration Required:</strong> {Array.isArray(listingDoc.duration) ? listingDoc.duration.join(", ") : "Not specified"}</p>
            <p><strong>Features Required:</strong> {Array.isArray(listingDoc.features) ? listingDoc.features.join(", ") : "Not specified"}</p>
           
            <p><strong>Requirements:</strong> {listingDoc.requirements || "Not specified"}</p>
            <p><strong>Type Required:</strong> {Array.isArray(listingDoc.type) ? listingDoc.type.join(", ") : "Not specified"}</p>
            {listingDoc.price && (
              <p><strong>Price Budget: </strong>
                {Object.entries(listingDoc.price).map(([key, value]) => `${key}: R${value}`).join(" | ")}
              </p>
            )}
             <p><strong>Matches Found:</strong> {listingDoc.matchesFound ? "✅ Yes" : "❌ No"}</p>
          </>
        )}


        {selectedCollection === "subscriptions" && (
          <>
            <p><strong>Email:</strong> {listingDoc.email}</p>
            <p><strong>Subscribed At:</strong> {listingDoc.createdAt && listingDoc.createdAt.toDate
              ? listingDoc.createdAt.toDate().toLocaleString()
              : String(listingDoc.createdAt)}
            </p>
          </>
        )}

        {/* ✅ Restore Editing Option */}
        <button onClick={() => {
          setEditingDocument({
            ...listingDoc,
            officialAddress: listingDoc.officialAddress || ""
          });
          setTimeout(() => {
            if (editModalRef.current) {
              editModalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 100); // Wait for modal to render
        }}>
          Edit
        </button>

        {/* ✅ Restore Delete Confirmation */}
        <button 
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this entry? This action cannot be undone.")) {
              handleDelete(listingDoc.id);
            }
          }}
        >
          Delete
        </button>
        {/* ADD THIS BUTTON: */}
          <button onClick={() => handleViewBookings(listingDoc.id)}>View Bookings</button>
      
      {showBookingsModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div 
            style={{
              background: "white",
              color: "black",
              padding: 24,
              borderRadius: 8,
              maxWidth: 600,
              width: "90%",
              position: "relative",
              maxHeight: "80vh",         // <-- Add this
              overflowY: "auto",         // <-- And this
            }}
        >
            <button onClick={() => setShowBookingsModal(false)} style={{ position: "absolute", top: 10, right: 10 }}>Close</button>
            <h2>Bookings for {currentListingName}</h2>
            {editingDocument && editingDocument.isBookingEdit ? (
  <div>
    <h3>Edit Booking</h3> {/* Edit Booking modal*/}
    <input
      type="text"
      value={editingDocument.name || ""}
      onChange={e => setEditingDocument({ ...editingDocument, name: e.target.value })}
      placeholder="Name"
    />
    <input
      type="email"
      value={editingDocument.email || ""}
      onChange={e => setEditingDocument({ ...editingDocument, email: e.target.value })}
      placeholder="Email"
    />
    <label>Booking Duration:</label>
    <select
      value={editingDocument.bookingType || ""}
      onChange={e => setEditingDocument({ ...editingDocument, bookingType: e.target.value })}
    >
      <option value="">Select Booking Duration</option>
      <option value="Hourly">Hourly</option>
      <option value="Daily">Daily</option>
      <option value="Weekly">Weekly</option>
      <option value="Monthly">Monthly</option>
    </select>
    <input
      type="date"
      value={editingDocument.startDate || ""}
      onChange={e => setEditingDocument({ ...editingDocument, startDate: e.target.value })}
      placeholder="Start Date"
    />
    <input
      type="time"
      value={editingDocument.startTime || ""}
      onChange={e => setEditingDocument({ ...editingDocument, startTime: e.target.value })}
      placeholder="Start Time"
    />
    <input
      type="date"
      value={editingDocument.endDate || ""}
      onChange={e => setEditingDocument({ ...editingDocument, endDate: e.target.value })}
      placeholder="End Date"
    />
    <input
      type="time"
      value={editingDocument.endTime || ""}
      onChange={e => setEditingDocument({ ...editingDocument, endTime: e.target.value })}
      placeholder="End Time"
    />
    <input
      type="number"
      value={editingDocument.price || ""}
      onChange={e => setEditingDocument({ ...editingDocument, price: Number(e.target.value) })}
      placeholder="Price"
    />
    <label>Status:</label>
    <select
      value={editingDocument.status || ""}
      onChange={e => setEditingDocument({ ...editingDocument, status: e.target.value })}
    >
      <option value="">Select Status</option>
      <option value="pending_owner">Pending Owner</option>
      <option value="awaiting_payment">Awaiting Payment</option>
      <option value="confirmed">Confirmed</option>
      <option value="rejected">Rejected</option>
      <option value="cancelled">Cancelled</option>
    </select>
    <textarea
      value={editingDocument.message || ""}
      onChange={e => setEditingDocument({ ...editingDocument, message: e.target.value })}
      placeholder="Message"
    />
    {/* Add more fields as needed */}
    <button
      onClick={async () => {
        if (editingDocument.isBookingEdit && editingDocument.parentListingId) {
          const docRef = doc(db, "listings", editingDocument.parentListingId, "bookings", editingDocument.id);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            alert("This booking does not exist in the database. It may have been deleted or you are editing the wrong listing.");
            setEditingDocument(null);
            handleViewBookings(editingDocument.parentListingId);
            return;
          }
          // Only keep booking fields
          const {
            isBookingEdit,
            parentListingId,
            ...bookingData
          } = editingDocument;
          await updateDoc(docRef, bookingData);
          setEditingDocument(null);
          handleViewBookings(editingDocument.parentListingId);
        }
      }}
    >
      Save Changes
    </button>
    <button onClick={() => setEditingDocument(null)}>
      Cancel
    </button>
  </div>
) : (
  selectedListingBookings.length === 0 ? (
    <p>No bookings for this listing.</p>
  ) : (
    <ul>
      {selectedListingBookings.map((booking) => (
        <li key={booking.id} style={{ borderBottom: "2px solid #2FD1BA", marginBottom: 8, paddingBottom: 8 }}>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Booking Type:</strong> {booking.bookingType}</p>
          <p><strong>Start:</strong> {booking.startDate}{booking.startTime ? `, ${booking.startTime}` : ""}</p>
          <p><strong>End:</strong> {booking.endDate}{booking.endTime ? `, ${booking.endTime}` : ""}</p>
          <p><strong>Price:</strong> {typeof booking.price === "number" && !isNaN(booking.price) ? `R${booking.price.toFixed(2)}` : "Not set"}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <p><strong>Message:</strong> {booking.message}</p>
          <p><strong>Timestamp:</strong> {booking.timestamp && booking.timestamp.toDate ? booking.timestamp.toDate().toISOString() : String(booking.timestamp)}</p>
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            {/* Approve/Reject/Edit/Delete buttons */}
            {booking.status === "pending_owner" && (
              <>
                <button
                  style={{ background: "#2FD1BA", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px" }}
                  onClick={async () => {
                    const docRef = doc(db, "listings", booking.parentListingId, "bookings", booking.id);
                    await updateDoc(docRef, { status: "awaiting_payment" });
                    handleViewBookings(booking.parentListingId);
                  }}
                >
                  Approve
                </button>
                <button
                  style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px" }}
                  onClick={async () => {
                    const docRef = doc(db, "listings", booking.parentListingId, "bookings", booking.id);
                    await updateDoc(docRef, { status: "rejected" });
                    handleViewBookings(booking.parentListingId);
                  }}
                >
                  Reject
                </button>
              </>
            )}
            <button
              style={{ background: "#f1c40f", color: "#222", border: "none", borderRadius: 4, padding: "4px 10px" }}
              onClick={() => setEditingDocument({ ...booking, isBookingEdit: true, parentListingId: booking.parentListingId })}
            >
              Edit
            </button>
            <button
              style={{ background: "#b71c1c", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px" }}
              onClick={async () => {
                if (window.confirm("Are you sure you want to delete this booking?")) {
                  const docRef = doc(db, "listings", booking.parentListingId, "bookings", booking.id);
                  const docSnap = await getDoc(docRef);
                  if (!docSnap.exists()) {
                    alert("This booking does not exist in the database. It may have been deleted or you are viewing the wrong listing.");
                    handleViewBookings(booking.parentListingId);
                    return;
                  }
                  await deleteDoc(docRef);
                  handleViewBookings(booking.parentListingId);
                }
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
)}
          </div>
        </div>
      )}  
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
        © {new Date().getFullYear()} Nayburlee Incorporated. <br /> All rights
        reserved.
      </footer>
    </div>

  );
}
