import create from 'zustand';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();  // Initialize the auth instance once

const useAuthStore = create((set) => ({
  currentUser: null,
  loading: true,

  signup: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User registered:', user);
    } catch (error) {
      console.log('Signup error:', error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log('Logout error:', error);
      throw error;
    }
  },

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ currentUser: user, loading: false });
    });
    return unsubscribe; // Return unsubscribe function for cleanup
  }
}));

export default useAuthStore;
