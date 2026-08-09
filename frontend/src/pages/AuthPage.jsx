import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function AuthPage({ type = 'login' }) {
  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '', rememberMe: false, terms: false });
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, isLoading, error } = useAuthStore();
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

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {!isLogin && (
            <>
              <div>
                <label className="block text-cream-900 font-medium mb-1.5">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-cream-200 rounded-xl px-4 py-2.5 bg-cream-50 focus:outline-none focus:border-cream-900 focus:bg-white transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-cream-900 font-medium mb-1.5">Username</label>
                <input required type="text" name="username" value={formData.username} onChange={handleChange} className="w-full border border-cream-200 rounded-xl px-4 py-2.5 bg-cream-50 focus:outline-none focus:border-cream-900 focus:bg-white transition-colors" placeholder="johndoe123" />
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

          <button disabled={isLoading} type="submit" className="w-full py-3 mt-4 bg-cream-900 text-white rounded-xl font-medium hover:bg-cream-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLogin ? 'Sign In' : 'Create Account'}
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