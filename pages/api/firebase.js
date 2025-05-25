/* eslint-disable no-undef */
import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL is optional unless you use the Realtime Database
    // databaseURL: "https://feedback-1st-prototype.firebaseio.com",
  });
}

export const db = admin.firestore();
