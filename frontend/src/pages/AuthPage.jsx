import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function AuthPage({ type = 'login' }) {
  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '', rememberMe: false, terms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null); // 'google' | 'microsoft' | null
  const [socialError, setSocialError] = useState(null);
  const { login, register, socialLogin, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const isLogin = type === 'login';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const res = await login(formData.email, formData.password, formData.rememberMe);
      if (res.success) navigate('/dashboard');
    } else {
      if (formData.password !== formData.confirmPassword) return alert("Passwords don't match");
      if (!formData.terms) return alert("Please accept Terms & Conditions");
      const res = await register(formData.name, formData.username, formData.email, formData.password);
      if (res.success) navigate('/login');
    }
  };

  // Google OAuth handler
  // const API_BASE = import.meta.env.VITE_API_BASE || 'http://10.143.83.197:5001';
const API_BASE = import.meta.env.VITE_API_URL;

  const handleGoogleLogin = useCallback(() => {
    if (socialLoading) return;
    setSocialError(null);
    setSocialLoading('google');
    // Start server-side OAuth redirect
    window.location.href = `${API_BASE}/auth/google`;
  }, [socialLoading]);

  // Microsoft OAuth handler
  const handleMicrosoftLogin = useCallback(() => {
    if (socialLoading) return;
    setSocialError(null);
    setSocialLoading('microsoft');
    // const API_BASE = import.meta.env.VITE_API_BASE || 'http://10.143.83.197:5001';
const API_BASE = import.meta.env.VITE_API_URL;
    window.location.href = `${API_BASE}/auth/microsoft`;
  }, [socialLoading]);

  const displayError = socialError || error;

  return (
    <div className="flex-grow flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-cream-100/50 -z-10" />
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-soft border border-cream-200"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-cream-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-cream-800 text-sm">
            {isLogin ? 'Enter your details to access your workspace.' : 'Start building your professional resume today.'}
          </p>
        </div>

        {displayError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg text-center">
            {displayError}
          </div>
        )}

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={!!socialLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-cream-50 text-cream-900 font-medium border border-cream-200 py-3 px-4 rounded-xl transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cream-300"
          >
            {socialLoading === 'google' ? (
              <Loader2 className="w-5 h-5 animate-spin text-cream-800" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            )}
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleMicrosoftLogin}
            disabled={!!socialLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-cream-50 text-cream-900 font-medium border border-cream-200 py-3 px-4 rounded-xl transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cream-300"
          >
            {socialLoading === 'microsoft' ? (
              <Loader2 className="w-5 h-5 animate-spin text-cream-800" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
            )}
            Continue with Microsoft
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-cream-200"></div>
          <span className="text-xs font-medium text-cream-800 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-cream-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {!isLogin && (
            <>
              <div>
                <label className="block text-cream-900 font-medium mb-1.5">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-cream-200 rounded-xl px-4 py-2.5 bg-cream-50 focus:outline-none focus:border-cream-900 focus:bg-white transition-colors" placeholder="Hrithik Kumar" />
              </div>
              <div>
                <label className="block text-cream-900 font-medium mb-1.5">Username</label>
                <input required type="text" name="username" value={formData.username} onChange={handleChange} className="w-full border border-cream-200 rounded-xl px-4 py-2.5 bg-cream-50 focus:outline-none focus:border-cream-900 focus:bg-white transition-colors" placeholder="hrithik123" />
              </div>
            </>
          )}

          <div>
            <label className="block text-cream-900 font-medium mb-1.5">
              {isLogin ? 'Email or Username' : 'Email Address'}
            </label>
            <input required type={isLogin ? 'text' : 'email'} name="email" value={formData.email} onChange={handleChange} className="w-full border border-cream-200 rounded-xl px-4 py-2.5 bg-cream-50 focus:outline-none focus:border-cream-900 focus:bg-white transition-colors" placeholder={isLogin ? "you@example.com" : "you@example.com"} />
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-cream-900 font-medium">Password</label>
              {isLogin && <Link to="/forgot-password" className="text-xs text-cream-800 hover:text-cream-900 underline">Forgot Password?</Link>}
            </div>
            <div className="relative">
              <input required type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="w-full border border-cream-200 rounded-xl px-4 py-2.5 bg-cream-50 focus:outline-none focus:border-cream-900 focus:bg-white transition-colors" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-800 hover:text-cream-900">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-cream-900 font-medium mb-1.5">Confirm Password</label>
              <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full border border-cream-200 rounded-xl px-4 py-2.5 bg-cream-50 focus:outline-none focus:border-cream-900 focus:bg-white transition-colors" placeholder="••••••••" />
            </div>
          )}

          {isLogin ? (
            <div className="flex items-center gap-2 pt-1">
              <input type="checkbox" id="remember" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="w-4 h-4 rounded border-cream-200 text-cream-900 focus:ring-cream-900 accent-cream-900" />
              <label htmlFor="remember" className="text-cream-800 select-none cursor-pointer">Remember me</label>
            </div>
          ) : (
            <div className="flex items-center gap-2 pt-1">
              <input required type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} className="w-4 h-4 rounded border-cream-200 text-cream-900 focus:ring-cream-900 accent-cream-900" />
              <label htmlFor="terms" className="text-cream-800 select-none cursor-pointer">I agree to the Terms & Conditions</label>
            </div>
          )}
          
          <button
            disabled={isLoading}
            type="submit"
            className="w-full h-14 mt-4 bg-[#2F2B28] !text-white rounded-xl font-semibold hover:bg-[#1F1C1A] transition-all duration-200 flex items-center justify-center gap-2 border border-[#2F2B28] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="w-4 h-4 text-white animate-spin" />}
            <span className="text-white">
              {isLogin ? 'Sign In' : 'Create Account'}
            </span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-cream-200 text-center text-sm">
          <p className="text-cream-800">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link to={isLogin ? '/register' : '/login'} className="text-cream-900 font-semibold hover:underline">
              {isLogin ? 'Sign up' : 'Log in'}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}