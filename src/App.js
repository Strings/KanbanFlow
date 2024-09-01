import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import useAuthStore from './stores/authStore'; // Assuming authStore.js is in the context folder
import SignupPage from './pages/SignupPage';
import BoardView from './pages/BoardView';

import './App.css';

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const currentUser = useAuthStore((state) => state.currentUser);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    const unsubscribe = initializeAuth(); // Call initializeAuth to set up listener
    return () => unsubscribe(); // Clean up listener on unmount
  }, [initializeAuth]);

  console.log("Auth state:", currentUser, loading);  // Debugging line

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while checking authentication status
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupPage />} />


          <Route path="/" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/board/:boardId" element={<BoardView/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
