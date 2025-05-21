const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function setAdminClaim(uid) {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log(`Admin claim set for user with UID: ${uid}`);
}

// Call this function with the UID of the user you want to make an admin
setAdminClaim("SDxgy06bUhUQCQHOa3CZ66NHRKH2");
