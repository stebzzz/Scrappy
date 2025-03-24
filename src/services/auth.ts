// Fichier auth.ts simplifié au maximum
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail as firebaseSendPasswordReset,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Initialisation de l'auth
const auth = getAuth();

// Fonction de connexion
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    throw error;
  }
};

// Fonction d'inscription
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    throw error;
  }
};

// Fonction de déconnexion - EXPORT EXPLICITE
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
    throw error;
  }
};

// Obtenir l'utilisateur actuel
export const getCurrentUser = () => {
  return auth.currentUser;
};

// S'abonner aux changements d'authentification
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Connexion Google
export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Erreur de connexion Google:', error);
    throw error;
  }
};

// Récupérer les données utilisateur
export const getUserData = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Erreur de récupération des données:', error);
    throw error;
  }
};

// Ajouter cette fonction pour la page de login
export const sendPasswordResetEmail = async (email: string) => {
  try {
    await firebaseSendPasswordReset(auth, email);
  } catch (error) {
    console.error('Erreur d\'envoi d\'email de réinitialisation:', error);
    throw error;
  }
};