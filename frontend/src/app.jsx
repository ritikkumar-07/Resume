import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setSelectedFormat(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-sans">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-grow">
        {!user ? (
          <Login />
        ) : !selectedFormat ? (
          <Dashboard onSelectFormat={(fmt) => setSelectedFormat(fmt)} />
        ) : (
          <Builder templateId={selectedFormat} onBack={() => setSelectedFormat(null)} />
        )}
      </main>

      <Footer />
    </div>
  );
}