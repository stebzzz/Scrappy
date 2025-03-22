// Firebase Authentication Service
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  User,
  UserCredential,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Register a new user with email and password
 * @param email User's email
 * @param password User's password
 * @returns Firebase UserCredential
 */
export const registerUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Update user profile information
 * @param displayName User's display name
 * @param photoURL User's photo URL
 * @returns Promise<void>
 */
export const updateUserProfile = async (displayName?: string, photoURL?: string): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');
    
    await updateProfile(user, {
      displayName: displayName || user.displayName,
      photoURL: photoURL || user.photoURL,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Sign in a user with email and password
 * @param email User's email
 * @param password User's password
 * @returns Firebase UserCredential
 */
export const signInUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error signing in user:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 * @returns Promise<void>
 */
export const signOutUser = async (): Promise<void> => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error('Error signing out user:', error);
    throw error;
  }
};

/**
 * Send a password reset email to the user
 * @param email User's email
 * @returns Promise<void>
 */
export const resetPassword = async (email: string): Promise<void> => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

/**
 * Update user's email
 * @param newEmail New email address
 * @returns Promise<void>
 */
export const updateUserEmail = async (newEmail: string): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');
    
    await updateEmail(user, newEmail);
  } catch (error) {
    console.error('Error updating user email:', error);
    throw error;
  }
};

/**
 * Update user's password
 * @param newPassword New password
 * @returns Promise<void>
 */
export const updateUserPassword = async (newPassword: string): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');
    
    await updatePassword(user, newPassword);
  } catch (error) {
    console.error('Error updating user password:', error);
    throw error;
  }
};

/**
 * Get the current authenticated user
 * @returns The current user or null if not authenticated
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Subscribe to auth state changes
 * @param callback Function to call when auth state changes
 * @returns Unsubscribe function
 */
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Check if a user is authenticated
 * @returns Boolean indicating if a user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!auth.currentUser;
};