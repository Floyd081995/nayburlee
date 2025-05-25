import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebasedb";

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function findMatchingListings(userInput) {
  try {
    console.log("User input location:", userInput.location.trim().toLowerCase());
    // 1. Build Firestore query with as many filters as possible
    let q = collection(db, "listings");
    const filters = [];

    // 3. Location filter (using keywords array)
    if (userInput.location && userInput.location.trim() !== "") {
      // Split user input into keywords
      const locationKeywords = userInput.location
        .toLowerCase()
        .split(/[\s,]+/)
        .filter(Boolean);

      // Use array-contains-any for up to 10 keywords
      if (locationKeywords.length > 0) {
        filters.push(
          where("location_keywords", "array-contains-any", locationKeywords)
        );
      }
    } else {
      return [];
    }
    
    // 3. Capacity filter (greater than or equal)
    const requestedCapacity = Number(userInput.capacity);
    console.log("Requested capacity (as number):", requestedCapacity, "Type:", typeof requestedCapacity);
    if (!isNaN(requestedCapacity)) {
      filters.push(where("capacity", ">=", requestedCapacity));
    }

    // 4. Only active listings
    filters.push(where("isActive", "==", true));

    // 5. Build the query
    if (filters.length > 0) {
      q = query(q, ...filters);
    }

    // 6. Fetch filtered listings
    const snapshot = await getDocs(q);
    let matchingListings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 7. Type filter (client-side, after fetching)
    if (Array.isArray(userInput.type) && userInput.type.length > 0) {
      matchingListings = matchingListings.filter(listing =>
        Array.isArray(listing.type) &&
        listing.type.some(t => userInput.type.includes(t))
      );
    }

    // 8. Normalize user input (e.g., convert capacity and price to numbers, trim strings, etc.)
    const userDurations = (Array.isArray(userInput.duration) ? userInput.duration : [userInput.duration])
      .map(d => d.trim().toLowerCase());
    const userBudgets = {};
    userDurations.forEach(duration => {
      const key = `price_${capitalizeFirst(duration)}`;
      userBudgets[duration] = isFinite(userInput[key])
        ? Number(userInput[key])
        : Number(userInput.price) || 0;
    });

    // 9. Duration filter (client-side, since Firestore can't do array overlap)
    matchingListings = matchingListings.filter(listing => {
      const durations = Array.isArray(listing.duration)
        ? listing.duration.map(d => d.trim().toLowerCase())
        : typeof listing.duration === "string" && listing.duration
          ? [listing.duration.trim().toLowerCase()]
          : [];
      return durations.some(d => userDurations.includes(d));
    });

    // 10. Features matching (client-side)
    if (userInput.features && userInput.features.length > 0) {
      matchingListings = matchingListings.map(listing => {
        const matchedFeatures = listing.features
          ? listing.features.filter(feature => userInput.features.includes(feature)).length
          : 0;
        return { ...listing, matchedFeatures };
      });
    }

    // 11. Price/budget matching (client-side)
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

    // 12. Location relevance scoring (for sorting)
    const userLocation = userInput.location.trim().toLowerCase();
    matchingListings = matchingListings.map(listing => {
      let locationScore = 0;
      if (listing.location && listing.location.toLowerCase() === userLocation) {
        locationScore = 2; // Exact match
      } else if (
        Array.isArray(listing.location_keywords) &&
        listing.location_keywords.includes(userLocation)
      ) {
        locationScore = 1; // Keyword match
      }
      return { ...listing, locationScore };
    });

    // 13. Sorting: location relevance, then price/overBudget logic
    matchingListings.forEach(listing => {
    // You can adjust the weights (e.g., 1000) to make location more or less important
    listing.combinedScore =
      (listing.locationScore * 100) - //You can adjust the weights (e.g., 1000)
      (listing.overBudget ? 10000 : 0) -
      (isFinite(listing.priceDifference) ? listing.priceDifference : 0);
  });

matchingListings.sort((a, b) => b.combinedScore - a.combinedScore);

    console.log("Fetched listings:", matchingListings);

    return matchingListings;

  } catch (err) {
    console.error("Firestore error:", err);
    return [];
  }
}
