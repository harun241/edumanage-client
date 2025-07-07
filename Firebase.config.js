// src/Firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";          // <-- import getAuth for authentication
import { getAnalytics } from "firebase/analytics";

// Firebase config from env variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth and export it
const auth = getAuth(app);

export default auth;  // <-- export auth so other files can import it
