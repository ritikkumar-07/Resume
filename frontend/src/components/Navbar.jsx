import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  const isBuilder = location.pathname.includes('/builder');
  if (isBuilder) return null; // Builder has its own header

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-cream-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-cream-900 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-cream-900 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif font-bold text-lg tracking-tight">ResumeBuilder</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-cream-800 hover:text-cream-900 transition-colors">Home</Link>
          <Link to="/templates" className="text-sm font-medium text-cream-800 hover:text-cream-900 transition-colors">Templates</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-sm font-medium text-cream-800 hover:text-cream-900 transition-colors">Dashboard</Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 bg-cream-200 rounded-full flex items-center justify-center text-cream-900 font-bold text-xs">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-cream-900">{user?.username}</span>
              </div>
              <button 
                onClick={logout} 
                className="text-sm font-medium text-cream-800 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-cream-800 hover:text-cream-900 transition-colors">Log In</Link>
              <Link to="/register" className="text-sm font-medium bg-cream-900 text-white px-5 py-2.5 rounded-xl hover:bg-cream-800 transition-all shadow-sm">
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}