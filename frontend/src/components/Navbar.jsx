import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  const isBuilder = location.pathname.includes('/builder');

  // Builder has its own header
  if (isBuilder) return null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-[#2F2B28]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-[#1F1C1A] hover:opacity-80 transition-opacity"
          >
            <FileText className="w-6 h-6 text-[#1F1C1A]" />

            <span className="text-xl font-bold text-[#1F1C1A]">
              ResumeBuilder
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-[#1F1C1A] hover:text-black transition-colors"
            >
              Home
            </Link>

            <Link
              to="/templates"
              className="text-sm font-medium text-[#1F1C1A] hover:text-black transition-colors"
            >
              Templates
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-sm font-medium text-[#1F1C1A] hover:text-black transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {isAuthenticated ? (
              <div className="flex items-center gap-4">

                {/* User */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#F5F1EA] border border-[#2F2B28] rounded-full flex items-center justify-center text-[#1F1C1A] font-bold text-xs">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <span className="text-sm font-medium text-[#1F1C1A]">
                    {user?.username}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="text-sm font-medium text-[#1F1C1A] hover:text-red-600 transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />

                  <span className="hidden sm:inline">
                    Logout
                  </span>
                </button>

              </div>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-[#1F1C1A] hover:text-black transition-colors"
                >
                  Log In
                </Link>

                {/* Create Account */}
                <Link
                  to="/register"
                  className="px-6 py-3 bg-[#2F2B28] text-white border border-[#2F2B28] rounded-xl font-semibold hover:bg-[#1F1C1A] hover:border-[#1F1C1A] transition-all duration-200 shadow-sm"
                >
                  Create Account
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}