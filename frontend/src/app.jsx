import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-grow">
        {!user ? (
          <AuthPage onAuthSuccess={(userData) => setUser(userData)} />
        ) : (
          <Dashboard user={user} />
        )}
      </main>

      <Footer />
    </div>
  );
}