import { useState } from "react";
import { useRouter } from "next/router"; // Next.js router
import { db } from "/lib/firebasedb";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { findMatchingListings } from "../lib/matchingLogic"; // ✅ Corrected import path
import LocationInput from "../components/LocationInput"; // ✅ Import autocomplete
import { DURATION_OPTIONS } from "../lib/bookingDurations";

export default function UserRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    type: [], // Store as an array
    location: "",
    duration: [], // Store as an array
    price: {}, // Store as an object
    requirements: "",
    features: [],
    capacity:"",
  });
  const [allowedDurations, setAllowedDurations] = useState([]);
  const [emailError, setEmailError] = useState(""); // State for email validation error

  
  const router = useRouter(); // Initialize Next.js router

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Name validation
    if (!formData.name || formData.name.trim() === "") {
      alert("Please enter your name.");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.contact)) {
      setEmailError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    // Location validation (move this up)
    if (!formData.location || formData.location.trim() === "") {
      alert("Please select a valid location.");
      setIsSubmitting(false);
      return;
    }

    // Budget validation
    if (
      !formData.price ||
      !formData.duration.length ||
      !formData.price[formData.duration[0]] ||
      isNaN(formData.price[formData.duration[0]])
    ) {
      alert("Please enter your ideal budget.");
      setIsSubmitting(false);
      return;
    }

    // If capacity is empty, set it to "1"
    const finalCapacity = formData.capacity === "" ? "1" : formData.capacity;
    const formDataToSave = { ...formData, capacity: finalCapacity };

    // Validate location
    if (!formDataToSave.location || formDataToSave.location.trim() === "") {
      alert("Please select a valid location.");
      setIsSubmitting(false);
      return;
    }

    // Match search logic FIRST
    // ...existing code...
      let matches = [];
      try {
        const selectedDuration = formDataToSave.duration[0] || "";
        const selectedPrice = formDataToSave.price[selectedDuration] || 0;

        const userInput = {
          type: Array.isArray(formDataToSave.type) ? formDataToSave.type : [],
          location: formDataToSave.location || "",
          price: selectedPrice,
          duration: selectedDuration,
          features: Array.isArray(formDataToSave.features) ? formDataToSave.features : [],
          capacity: formDataToSave.capacity || "1", // Make sure capacity is included!
        };

        if (!userInput.type.length || !userInput.location || !userInput.duration) {
          console.warn("⚠️ Invalid user input detected:", userInput);
          alert("Please make sure you've selected a space type, location, and duration.");
          setIsSubmitting(false);
          return;
        }

        // **THIS IS THE CRUCIAL LINE:**
        console.log("userInput sent to matching logic:", userInput);
        matches = await findMatchingListings(userInput);
        console.log("findMatchingListings returned:", matches);

        // Save the user's request to Firestore AFTER matching
        await addDoc(collection(db, "userRequests"), {
          ...formDataToSave,
          features: formDataToSave.features,
          matchesFound: matches.length > 0,
          timestamp: serverTimestamp(),
        });

        if (matches.length > 0) {
          sessionStorage.setItem("fromUserRequest", "1");
          console.log("Saving matches to sessionStorage:", matches);
          sessionStorage.setItem("nayburleeMatches", JSON.stringify(matches));
          sessionStorage.setItem("nayburleeMatchesTimestamp", Date.now().toString());
          router.push({
            pathname: "/spaces/indexlistingsoverview",
            query: {
              type: userInput.type[0] || "",
              location: userInput.location || "",
              name: formData.name, 
              email: formData.contact,
              message: formData.requirements,
            }
          });
        } else {
          alert("No matches found for your request.");
        }
      } catch (err) { 
            
      console.error("❌ Error finding matches or saving request:", err);
      alert("There was an error processing your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };    
  
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <form
        style={{
          borderRadius: "10px",
          display: "inline-block",
          textAlign: "center",
        }}
        onSubmit={handleSubmit}
      >

<img className= "bodylogo" src="/nayburlee-logo-image.png" alt="Nayburlee Logo"  height="80" margintop="10px"></img>

<br/>
<br/>
        {/* Full Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontFamily: "jost",
          }}
        />

        {/* Contact Info */}
        <input
          type="email"
          name="contact"
          placeholder="Email Address"
          required
          value={formData.contact}
          onChange={(e) => {
            setFormData({ ...formData, contact: e.target.value });
            setEmailError(""); // Reset error on change
          }}
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "80%",
            border: emailError ? "2px solid #e74c3c" : "1px solid #ddd",
            borderRadius: "5px",
            fontFamily: "jost",
            backgroundColor: emailError ? "#ffeaea" : "white",
          }}
        />
        {emailError && (
          <div style={{ color: "#e74c3c", marginBottom: "10px" }}>{emailError}</div>
        )}

        {/* Capacity Field */}
        <input
          type="number"
          name="capacity"
          placeholder="How many people? (Capacity)"
          min={1}
          required
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })} // <--- convert to number
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontFamily: "jost",
          }}
        />

        {/* Space Type */}
        <select
          name="type"
          required
          value={formData.type[0] || ""}
          onChange={(e) => {
            const selectedType = e.target.value;
            setFormData({ ...formData, type: [selectedType], duration: [] }); // Reset duration
            setAllowedDurations(DURATION_OPTIONS[selectedType] || []);
          }}
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontFamily: "jost",
          }}
        >
          <option value="">Select Space Type</option>
          <option value="Podcast Studio">Podcast Studio</option>
          <option value="Video/Content Creation Space">Video/Content Creation Space</option>
          <option value="Voiceover Studio">Voiceover Studio</option>
          <option value="Hybrid Space">Hybrid Space</option>
        </select>

        {/* Features Checkboxes */}
        <div>
        <label><strong>Please Select Required Features:</strong></label>
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
          
        ].map((feature) => (
          <label key={feature} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={formData.features.includes(feature)}
              onChange={(e) => {
                const updatedFeatures = e.target.checked
                  ? [...formData.features, feature]
                  : formData.features.filter((f) => f !== feature);
                setFormData({ ...formData, features: updatedFeatures });
              }}
              style={{
                fontFamily: "jost",
                marginRight: "5px",
                cursor: "pointer",
              }}
            />
            {feature}
          </label>
        ))}
      </div>
        
        {/* Preferred Location */}
        <LocationInput
          setFormData={(updates) => {
            setFormData((prev) => ({ ...prev, ...updates }));
          }}
         
        />

        {/* Select Duration */}
        <select
          name="duration"
          value={formData.duration[0] || ""}
          required
          onChange={(e) => setFormData({ ...formData, duration: [e.target.value] })}
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontFamily: "jost",
          }}
          disabled={allowedDurations.length === 0}
        >
          <option value="">Select Duration</option>
          {allowedDurations.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* Ideal Budget */}
        <input
          type="number"
          name="price"
          placeholder="Ideal Budget (ZAR)"
          required
          onChange={(e) => {
            if (!formData.duration || formData.duration.length === 0) {
              alert("Please select a duration before entering a price.");
              return;
            }
        
            setFormData({
              ...formData,
              price: { [formData.duration[0]]: parseInt(e.target.value) }, // Uses selected duration, not default "Hourly"
            });
          }}
      
          disabled={!formData.duration} // Disable input unless duration is selected
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: formData.duration ? "white" : "#f0f0f0",
            cursor: formData.duration ? "text" : "not-allowed",
            fontFamily: "jost",
          }}
        />

        {/* Special Requirements */}
        <textarea
          name="requirements"
          placeholder="Additional Message (Optional)"
          rows="4"
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontFamily: "jost",
          }}
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="cta-button" 
          style={{
              border: "none",
              width: "40%",
              transition: "background-color 0.3s ease", // Smooth hover effect
              marginBottom: "30px",
          
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#28bfa5")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2FD1BA")}

          onClick={(e) => {
            e.preventDefault(); // Prevent accidental double execution
            document.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true }));
          }}

        >
          Match
        </button>
      </form>
      
      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          margintop: "40px",
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
