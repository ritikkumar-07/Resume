import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Landing from './pages/Landing';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import OAuthCallback from './pages/OAuthCallback';

import { useAuthStore } from './store/authStore';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default function App() {
  const { checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {

    // VERY IMPORTANT:
    // OAuth callback page handles authentication itself.
    // Do not call checkAuth before OAuthCallback saves token.
    if (location.pathname === '/auth/callback') {
      return;
    }

    checkAuth();

  }, [location.pathname, checkAuth]);


  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-sans text-cream-900">

      <Navbar />

      <main className="flex-grow flex flex-col">

        <Routes>

          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/login"
            element={<AuthPage type="login" />}
          />

          <Route
            path="/register"
            element={<AuthPage type="register" />}
          />

          {/* OAuth callback MUST be before protected pages */}
          <Route
            path="/auth/callback"
            element={<OAuthCallback />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/builder/:id?"
            element={
              <ProtectedRoute>
                <Builder />
              </ProtectedRoute>
            }
          />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}