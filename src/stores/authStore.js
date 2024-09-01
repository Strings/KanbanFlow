import create from 'zustand';
import { auth } from '../firebase';

const useAuthStore = create((set) => ({
  currentUser: null,
  loading: true,
  signup: async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      // Handle signup error (e.g., display an error message)
    }
  },
  login: async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      // Handle login error (e.g., display an error message)
    }
  },
  logout: async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
      // Handle logout error
    }
  },
  initializeAuth: () => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      set({ currentUser: user, loading: false });
    });
    return unsubscribe; // Return unsubscribe function for cleanup
  }
}));

export default useAuthStore;
