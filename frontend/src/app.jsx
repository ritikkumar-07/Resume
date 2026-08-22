import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import { useAuthStore } from './store/authStore';
import OAuthCallback from './pages/OAuthCallback';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-cream-50">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return children;
};

export default function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-sans text-cream-900">
      <Navbar />

      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/register" element={<AuthPage type="register" />} />
          <Route
            path="/auth/callback"
            element={<OAuthCallback />}
          />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/builder/:id?" element={<ProtectedRoute><Builder /></ProtectedRoute>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
