const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

process.env.GOOGLE_APPLICATION_CREDENTIALS = "C:/Users/mthun/projects/nayburlee/serviceAccountKey.json";

initializeApp({ credential: applicationDefault() });
const db = getFirestore();

async function updateListings() {
  const snapshot = await db.collection("listings").get();
  for (const doc of snapshot.docs) {
    const data = doc.data();
    if (data.location) {
      // Split location by comma, trim, and lowercase each part
      const keywords = data.location
        .split(",")
        .map(s => s.trim().toLowerCase())
        .filter(Boolean);
      await doc.ref.update({ location_keywords: keywords });
      console.log(`Updated ${doc.id} with keywords:`, keywords);
    }
  }
  console.log("Done updating all listings.");
}

updateListings();