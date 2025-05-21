/* eslint-disable no-undef */
import admin from "firebase-admin";

const serviceAccount = require('../../serviceAccountKey.json');  // adjust accordingly

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<YOUR_PROJECT_ID>.firebaseio.com",
  });
}

export const db = admin.firestore();
