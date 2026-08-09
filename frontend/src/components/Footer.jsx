import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const isBuilder = location.pathname.includes('/builder');
  
  if (isBuilder) return null;

  return (
    <footer className="bg-white border-t border-cream-200 pt-16 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 text-cream-900 mb-4">
            <div className="w-8 h-8 bg-cream-900 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-bold text-lg tracking-tight">ResumeBuilder</span>
          </Link>
          <p className="text-sm text-cream-800 leading-relaxed">
            Build a professional resume that gets noticed. Free to use, beautiful to look at.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-cream-900 mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-cream-800">
            <li><Link to="/templates" className="hover:text-cream-900 transition-colors">Templates</Link></li>
            <li><Link to="/dashboard" className="hover:text-cream-900 transition-colors">Dashboard</Link></li>
            <li><Link to="/register" className="hover:text-cream-900 transition-colors">Create Resume</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-cream-900 mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-cream-800">
            <li><a href="#" className="hover:text-cream-900 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-cream-900 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-cream-900 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-cream-900 mb-4">Legal</h4>
          <ul className="space-y-3 text-sm text-cream-800">
            <li><a href="#" className="hover:text-cream-900 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cream-900 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-cream-900 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-cream-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-cream-500">
          © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
        </p>
        <div className="flex gap-4">
          {/* Social icons can go here */}
        </div>
      </div>
    </footer>
  );
}