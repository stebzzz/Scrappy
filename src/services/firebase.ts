// Firebase configuration
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDJ8r5TxMZf3NQAOI_UcDCn5T3N4qDcMZ0",
  authDomain: "scrappy-3d478.firebaseapp.com",
  projectId: "scrappy-3d478",
  storageBucket: "scrappy-3d478.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Éviter la double initialisation
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Utiliser l'app existante
}

// Initialiser Firestore
export const firestore = getFirestore(app);

export default app; 