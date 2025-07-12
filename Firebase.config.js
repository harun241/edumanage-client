// src/Firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";         
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

const app = initializeApp(firebaseConfig);

// analytics is optional, only use if you want analytics
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

const auth = getAuth(app);

export { app, auth, analytics };
