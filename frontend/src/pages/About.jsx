import SEO from "../components/SEO";
import React from 'react';
import { FileText, Target, Heart, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <>
      <SEO
        title="About Resumora | Free Online Resume Builder"
        description="Learn about Resumora, an easy-to-use online resume builder for creating professional and ATS-friendly resumes."
        canonical="https://resumora-pearl.vercel.app/about"
      />
      <div className="flex-grow bg-cream-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="w-16 h-16 bg-[#2F2B28] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FileText className="w-8 h-8" />
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2F2B28] mb-5">
              About ResumeBuilder
            </h1>

            <p className="text-lg md:text-xl text-cream-800 leading-relaxed">
              ResumeBuilder helps students and professionals create beautiful,
              professional, and ATS-friendly resumes with ease.
            </p>
          </div>

          {/* Our Story */}
          <div className="bg-white border border-cream-200 rounded-2xl shadow-sm p-8 md:p-12 mb-10">
            <h2 className="text-3xl font-serif font-bold text-[#2F2B28] mb-5">
              Our Story
            </h2>

            <div className="space-y-4 text-cream-800 leading-8">
              <p>
                Creating a professional resume should not be complicated.
                ResumeBuilder was created with the goal of making resume creation
                simple, accessible, and professional for everyone.
              </p>

              <p>
                Whether you are a student creating your first resume, a fresher
                starting your career, or a professional looking for new
                opportunities, ResumeBuilder gives you the tools to present your
                skills and experience effectively.
              </p>
            </div>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white border border-cream-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-cream-200 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-[#2F2B28]" />
              </div>

              <h3 className="text-xl font-bold text-[#2F2B28] mb-3">
                Our Mission
              </h3>

              <p className="text-cream-800 leading-7">
                To make professional resume creation simple and accessible for
                students and job seekers everywhere.
              </p>
            </div>

            <div className="bg-white border border-cream-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-cream-200 rounded-xl flex items-center justify-center mb-5">
                <Sparkles className="w-7 h-7 text-[#2F2B28]" />
              </div>

              <h3 className="text-xl font-bold text-[#2F2B28] mb-3">
                Simple & Powerful
              </h3>

              <p className="text-cream-800 leading-7">
                Create, edit, preview, and download your resume without dealing
                with complicated tools.
              </p>
            </div>

            <div className="bg-white border border-cream-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-cream-200 rounded-xl flex items-center justify-center mb-5">
                <Heart className="w-7 h-7 text-[#2F2B28]" />
              </div>

              <h3 className="text-xl font-bold text-[#2F2B28] mb-3">
                Built for You
              </h3>

              <p className="text-cream-800 leading-7">
                Every feature is designed to help you focus on your career story
                and make a strong first impression.
              </p>
            </div>

          </div>

          {/* Developer Section */}
          <div className="mt-10 bg-[#2F2B28] text-white rounded-2xl p-8 md:p-12 text-center">
            <p className="text-cream-200 uppercase tracking-widest text-sm mb-3">
              Developed By
            </p>

            <h2 className="text-3xl font-serif font-bold mb-4">
              Hrithik Kr Gupta
            </h2>

            <p className="text-cream-200 max-w-2xl mx-auto leading-7">
              Building useful and modern technology solutions with a focus on
              simplicity, accessibility, and user experience.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}