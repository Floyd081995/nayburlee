import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebasedb";  // Ensure this path is correct
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function findMatchingListings(userInput) {
  try {
    //console.log("🔥 Searching for matching listings with:", userInput);

  // 1. Fetch all listings
    const snapshot = await getDocs(collection(db, "listings"));
    let matchingListings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    //console.log("⚡ Raw Listings Before Filtering:", matchingListings);

  // 2. Normalize user input (e.g., convert capacity and price to numbers, trim strings, etc.)
    const userDurations = (Array.isArray(userInput.duration) ? userInput.duration : [userInput.duration])
      .map(d => d.trim().toLowerCase());
    const userBudgets = {};
    userDurations.forEach(duration => {
      const key = `price_${capitalizeFirst(duration)}`;
      userBudgets[duration] = isFinite(userInput[key])
        ? Number(userInput[key])
        : Number(userInput.price) || 0;
    });

  // 3a. Query Firestore for listings matching the given location.
    if (!userInput.location || userInput.location.trim() === "") {
      //console.warn("⚠️ No location provided or input is blank.");
      return []; // Prevents errors when location is missing or empty
    }
  // 3b. Location filter
    matchingListings = matchingListings.filter(listing =>
      (listing.location || "").toLowerCase().includes(userInput.location.toLowerCase())
    );
    //console.log("🔍 User Location Input:", userInput.location);

  // 4. Duration filter
    console.log("Before duration filter:", matchingListings.map(l => ({id: l.id, duration: l.duration})));
    matchingListings = matchingListings.filter(listing => {
      const durations = Array.isArray(listing.duration)
        ? listing.duration.map(d => d.trim().toLowerCase())
        : typeof listing.duration === "string" && listing.duration
          ? [listing.duration.trim().toLowerCase()]
          : [];
      return durations.some(d => userDurations.includes(d));
    });
    console.log("After duration filter:", matchingListings.map(l => ({id: l.id, duration: l.duration})));
    //console.log("✅ Listings After Duration Filtering:", matchingListings);


  // 5. Capacity filter
      console.log("userInput.capacity before filtering:", userInput.capacity);
      if (userInput.capacity) {
      const requestedCapacity = Number(userInput.capacity);
      matchingListings = matchingListings.filter(listing => {
        let listingCapacity = listing.capacity;
        if (typeof listingCapacity === "string") {
          listingCapacity = listingCapacity.replace(/[^\d.]/g, "").trim();
        }
        listingCapacity = Number(listingCapacity);
        console.log("Requested:", requestedCapacity, "Listing:", listing.capacity, "Parsed:", listingCapacity);
        // Only match if listingCapacity is a valid number and >= requested
        return !isNaN(listingCapacity) && listingCapacity >= requestedCapacity;
        });
        //console.log("✅ Listings After Capacity Filtering:", matchingListings);
    }

    // 6. Features matching
      if (userInput.features && userInput.features.length > 0) {
        matchingListings = matchingListings.map(listing => {
          const matchedFeatures = listing.features
            ? listing.features.filter(feature => userInput.features.includes(feature)).length
            : 0;
          return { ...listing, matchedFeatures };
        });
      }
      //console.log("🔍 Listings After Feature Matching:", matchingListings);

    // 7. Price/budget matching
      matchingListings = matchingListings.map(listing => {
        let bestMatch = null;
        for (const duration of userDurations) {
          const key = `price_${capitalizeFirst(duration)}`;
          const listingPrice = Number(listing[key]);
          const budget = userBudgets[duration];
          if (isFinite(listingPrice) && listingPrice <= budget) {
            const diff = budget - listingPrice;
            if (bestMatch === null || diff < bestMatch.diff) {
              bestMatch = { duration, effectivePrice: listingPrice, diff };
            }
          }
        }
        if (bestMatch) {
          return {
            ...listing,
            chosenDuration: bestMatch.duration,
            effectivePrice: bestMatch.effectivePrice,
            priceDifference: bestMatch.diff,
            overBudget: false,
          };
        } else {
          // No price within budget: mark as over budget, but use the lowest available price for sorting
          let minPrice = Infinity;
          let minDuration = null;
          for (const duration of userDurations) {
            const key = `price_${capitalizeFirst(duration)}`;
            const listingPrice = Number(listing[key]);
            if (isFinite(listingPrice) && listingPrice < minPrice) {
              minPrice = listingPrice;
              minDuration = duration;
            }
          }
          return {
            ...listing,
            chosenDuration: minDuration,
            effectivePrice: minPrice,
            priceDifference: Infinity,
            overBudget: true,
          };
        }
      });
    //console.log("💰 Listings After Budget Filtering:", matchingListings);
    //console.log("💲 User Budgets by Duration:", userBudgets);

    // 8. Sorting
    //Sort the listings by:
    //  a. Price difference (closer to the budget is better),
    //  b. Number of matched features (more is better),
    //  c. Effective price (cheaper is better).
    // Sort so that listings closest to the budget (but not over) come first
    matchingListings.sort((a, b) => {
      // 1. Under-budget listings come before over-budget
      if (a.overBudget !== b.overBudget) {
        return a.overBudget ? 1 : -1;
      }
      // 2. For under-budget, sort by priceDifference DESC (closer to 0 is better, but higher price is preferred)
      if (!a.overBudget && !b.overBudget) {
        return b.effectivePrice - a.effectivePrice;
      }
      // 3. For over-budget, sort by effectivePrice ASC (cheapest over-budget first)
      return a.effectivePrice - b.effectivePrice;
    });
    console.log("Sorted listings:", matchingListings.map(l => ({
      id: l.id,
      effectivePrice: l.effectivePrice,
      overBudget: l.overBudget
    })));

    console.log("🚩 Final listings to return:", matchingListings.map(l => ({
      id: l.id,
      type: l.type,
      location: l.location,
      duration: l.duration,
      effectivePrice: l.effectivePrice,
      chosenDuration: l.chosenDuration
    })));

    //console.log("🚀 Final Ranked Listings:", matchingListings);
    return matchingListings;

  } catch {
    return [];
  }
}
