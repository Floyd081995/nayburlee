// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBB6hSwpZObxsCpnoocvM-57zLL8krsuUY',
  authDomain: 'feedback-1st-prototype.firebaseapp.com',
  projectId: 'feedback-1st-prototype',
  storageBucket: 'feedback-1st-prototype.firebasestorage.app',
  messagingSenderId: '153842210945',
  appId: '1:153842210945:web:f6f8a1ff5281b7cee95580',
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };