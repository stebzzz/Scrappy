// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuvz1kqwn_RX1cUtwwtgzCGsl0SZTmWYs",
  authDomain: "scrappy-4ca62.firebaseapp.com",
  projectId: "scrappy-4ca62",
  storageBucket: "scrappy-4ca62.firebasestorage.app",
  messagingSenderId: "172008556580",
  appId: "1:172008556580:web:4c4e3a24087ffaace070b1",
  measurementId: "G-Q5XL52YYP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };