import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Wand2, Layout, Download } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center pt-16 pb-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cream-300/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-200/50 text-cream-900 text-sm font-medium mb-8">
          <Wand2 className="w-4 h-4 text-cream-800" />
          <span>The next generation resume builder</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream-900 tracking-tight leading-tight mb-6">
          Build a Resume That <br className="hidden md:block" />
          <span className="text-cream-800">Gets Noticed.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-cream-800 max-w-2xl mx-auto mb-10 leading-relaxed">
          Create professional, ATS-friendly resumes in minutes. Choose from elegant templates, customize your content, and download in PDF or editable Word format.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 bg-cream-900 text-[#1f1c1a] border border-[#2F2B28] rounded-xl font-medium text-lg hover:bg-cream-800 transition-all shadow-soft hover:shadow-lg flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Create My Resume
          </Link>

          <Link
            to="/templates"
            className="w-full sm:w-auto px-8 py-4 bg-white text-cream-900 border border-cream-200 rounded-xl font-medium text-lg hover:bg-cream-50 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Layout className="w-5 h-5" />
            Explore Templates
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-20 w-full max-w-5xl"
      >
        <div className="bg-white p-2 rounded-2xl border border-cream-200 shadow-2xl relative">
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="bg-cream-50 mt-8 rounded-xl h-[500px] border border-cream-100 flex items-center justify-center">
            <p className="text-cream-800 font-medium">Interactive Preview Mockup</p>
          </div>
        </div>
      </motion.div>
      
      <div className="max-w-6xl w-full mt-32 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-cream-200 rounded-2xl flex items-center justify-center mx-auto mb-6 text-cream-900">
            <Layout className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-cream-900">Premium Templates</h3>
          <p className="text-cream-800">Stand out with recruiter-approved designs that highlight your professional journey.</p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-cream-200 rounded-2xl flex items-center justify-center mx-auto mb-6 text-cream-900">
            <Wand2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-cream-900">Live Editing</h3>
          <p className="text-cream-800">See your changes instantly with our robust split-screen live preview editor.</p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-cream-200 rounded-2xl flex items-center justify-center mx-auto mb-6 text-cream-900">
            <Download className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-cream-900">Export Anywhere</h3>
          <p className="text-cream-800">Download pixel-perfect PDFs or editable DOCX formats completely free.</p>
        </div>
      </div>
    </div>
  );
}
