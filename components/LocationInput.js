import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function LocationInput({ setFormData, initialValue = "" }) {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue || "");
  }, [initialValue]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (window.google && inputRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["geocode"],
            componentRestrictions: { country: "ZA" },
          }
        );

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current.getPlace();
          // Always get the latest value from the input
          const currentInputValue = inputRef.current.value;
        
          if (!place || !place.address_components) {
            setFormData({ location: currentInputValue });
            setQuery(currentInputValue);
            return;
          }
        
          const suburb = place.address_components.find((comp) =>
            comp.types.includes("sublocality") || comp.types.includes("neighborhood")
          )?.long_name;
        
          const city = place.address_components.find((comp) =>
            comp.types.includes("locality")
          )?.long_name;
        
          const chosenLocation = suburb
            ? `${suburb}, ${city || ""}`.trim()
            : city || "";
        
          console.log("DEBUG: LocationInput sending location:", chosenLocation);
          setFormData({ location: chosenLocation });
          setQuery(chosenLocation);
        });
      }
    });
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFormData]);

  return (
    <div>
      <input
        ref={inputRef}
        id="location-input"
        type="text"
        placeholder="Please Enter City/Suburb..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        style={{
          padding: "8px",
          width: "80%",
          marginBottom: "10px",
          marginTop: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          fontFamily: "jost",
        }}
      />
    </div>
  );
}

export default LocationInput;
