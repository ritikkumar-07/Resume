import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  LayoutTemplate,
  Sparkles,
  Briefcase,
  Palette
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const templates = [
  {
    id: 'Minimal',
    name: 'Minimal',
    icon: FileText,
    description:
      'A clean and simple layout focused on readability and professionalism.',
    bestFor: 'Students, freshers and modern professionals',
    features: [
      'Clean and distraction-free',
      'ATS-friendly structure',
      'Easy to read'
    ]
  },
  {
    id: 'Executive',
    name: 'Executive',
    icon: Briefcase,
    description:
      'A professional and structured design for experienced candidates.',
    bestFor: 'Experienced professionals and corporate roles',
    features: [
      'Professional appearance',
      'Strong information hierarchy',
      'Ideal for corporate roles'
    ]
  },
  {
    id: 'ModernCreative',
    name: 'Modern Creative',
    icon: Palette,
    description:
      'A modern design that gives your resume a visually distinctive look.',
    bestFor: 'Developers, designers and creative professionals',
    features: [
      'Modern visual layout',
      'Creative presentation',
      'Stand out from the crowd'
    ]
  }
];

function ResumePreview({ template }) {
  if (template === 'Executive') {
    return (
      <div className="w-full aspect-[3/4] bg-white shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-[#1F1C1A] h-24 p-5">
          <div className="w-28 h-3 bg-white rounded mb-2" />
          <div className="w-20 h-2 bg-white/60 rounded" />
        </div>

        <div className="p-5 space-y-5">
          <div>
            <div className="w-20 h-2 bg-[#2F2B28] rounded mb-3" />
            <div className="space-y-2">
              <div className="h-1.5 bg-gray-200 rounded w-full" />
              <div className="h-1.5 bg-gray-200 rounded w-11/12" />
              <div className="h-1.5 bg-gray-200 rounded w-4/5" />
            </div>
          </div>

          <div>
            <div className="w-24 h-2 bg-[#2F2B28] rounded mb-3" />
            <div className="space-y-2">
              <div className="h-2 bg-gray-300 rounded w-2/3" />
              <div className="h-1.5 bg-gray-200 rounded w-full" />
              <div className="h-1.5 bg-gray-200 rounded w-5/6" />
            </div>
          </div>

          <div>
            <div className="w-16 h-2 bg-[#2F2B28] rounded mb-3" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-4 bg-gray-100 rounded" />
              <div className="h-4 bg-gray-100 rounded" />
              <div className="h-4 bg-gray-100 rounded" />
              <div className="h-4 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template === 'ModernCreative') {
    return (
      <div className="w-full aspect-[3/4] bg-white shadow-lg border border-gray-200 overflow-hidden flex">
        <div className="w-[32%] bg-[#2F2B28] p-4 pt-8">
          <div className="w-12 h-12 rounded-full border-2 border-white/60 mb-6 mx-auto" />

          <div className="space-y-3">
            <div className="h-2 bg-white/70 rounded w-full" />
            <div className="h-2 bg-white/40 rounded w-4/5" />
            <div className="h-2 bg-white/40 rounded w-full" />
          </div>

          <div className="mt-8">
            <div className="h-2 bg-white/80 rounded w-3/4 mb-3" />
            <div className="space-y-2">
              <div className="h-1.5 bg-white/30 rounded" />
              <div className="h-1.5 bg-white/30 rounded w-5/6" />
              <div className="h-1.5 bg-white/30 rounded w-3/4" />
            </div>
          </div>
        </div>

        <div className="w-[68%] p-5 pt-8">
          <div className="w-24 h-3 bg-[#2F2B28] rounded mb-2" />
          <div className="w-16 h-2 bg-gray-300 rounded mb-8" />

          <div className="space-y-6">
            <div>
              <div className="w-20 h-2 bg-[#2F2B28] rounded mb-3" />
              <div className="space-y-2">
                <div className="h-1.5 bg-gray-200 rounded w-full" />
                <div className="h-1.5 bg-gray-200 rounded w-11/12" />
                <div className="h-1.5 bg-gray-200 rounded w-4/5" />
              </div>
            </div>

            <div>
              <div className="w-24 h-2 bg-[#2F2B28] rounded mb-3" />
              <div className="h-2 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="space-y-2">
                <div className="h-1.5 bg-gray-200 rounded w-full" />
                <div className="h-1.5 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[3/4] bg-white shadow-lg border border-gray-200 p-6">
      <div className="text-center border-b border-gray-200 pb-5">
        <div className="w-32 h-3 bg-[#2F2B28] rounded mx-auto mb-3" />
        <div className="w-20 h-2 bg-gray-300 rounded mx-auto" />
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <div className="w-16 h-2 bg-[#2F2B28] rounded mb-3" />
          <div className="space-y-2">
            <div className="h-1.5 bg-gray-200 rounded w-full" />
            <div className="h-1.5 bg-gray-200 rounded w-11/12" />
            <div className="h-1.5 bg-gray-200 rounded w-4/5" />
          </div>
        </div>

        <div>
          <div className="w-20 h-2 bg-[#2F2B28] rounded mb-3" />
          <div className="h-2 bg-gray-300 rounded w-1/2 mb-2" />
          <div className="space-y-2">
            <div className="h-1.5 bg-gray-200 rounded w-full" />
            <div className="h-1.5 bg-gray-200 rounded w-5/6" />
          </div>
        </div>

        <div>
          <div className="w-14 h-2 bg-[#2F2B28] rounded mb-3" />
          <div className="flex flex-wrap gap-2">
            <div className="w-12 h-4 bg-gray-100 rounded" />
            <div className="w-14 h-4 bg-gray-100 rounded" />
            <div className="w-10 h-4 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Templates() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const handleUseTemplate = (templateId) => {
    if (isAuthenticated) {
      navigate(`/builder?template=${templateId}`);
    } else {
      navigate(`/register?template=${templateId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF]">

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cream-300/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto text-center">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-cream-800 hover:text-[#2F2B28] mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-cream-200 rounded-full shadow-sm text-sm font-medium text-cream-900 mb-6">
              <Sparkles className="w-4 h-4" />
              Choose a design that fits your career
            </div>

            <h1 className="text-5xl md:text-6xl font-serif font-bold text-cream-900 mb-6">
              Professional Resume
              <span className="block text-cream-700">
                Templates.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-cream-800 leading-relaxed">
              Select a professionally designed template and start building
              a resume that highlights your skills and experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Template Cards */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {templates.map((template, index) => {
            const Icon = template.icon;

            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12
                }}
                className="group bg-white rounded-3xl border border-cream-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Preview */}
                <div className="bg-cream-100 p-6 md:p-8 relative overflow-hidden">

                  <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-[#2F2B28] shadow-sm">
                    {template.name}
                  </div>

                  <div className="transition-transform duration-500 group-hover:scale-[1.03]">
                    <ResumePreview template={template.id} />
                  </div>

                </div>

                {/* Content */}
                <div className="p-7">

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#2F2B28] text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-cream-900">
                        {template.name}
                      </h2>

                      <p className="text-xs text-cream-700">
                        Resume Template
                      </p>
                    </div>
                  </div>

                  <p className="text-cream-800 leading-relaxed mb-5">
                    {template.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-cream-900 mb-3">
                      Best for
                    </p>

                    <p className="text-sm text-cream-700">
                      {template.bestFor}
                    </p>
                  </div>

                  <div className="space-y-2 mb-7">
                    {template.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-cream-800"
                      >
                        <Check className="w-4 h-4 text-[#2F2B28]" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    className="w-full py-3.5 bg-[#2F2B28] text-white rounded-xl font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 group/button"
                  >
                    Use This Template

                    <ArrowRight className="w-5 h-5 transition-transform group-hover/button:translate-x-1" />
                  </button>

                </div>
              </motion.div>
            );
          })}

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto bg-[#2F2B28] rounded-3xl text-center px-8 py-16 text-white">

          <LayoutTemplate className="w-10 h-10 mx-auto mb-6" />

          <h2 className="text-4xl font-serif font-bold mb-4">
            Can't decide yet?
          </h2>

          <p className="text-white/70 max-w-xl mx-auto text-lg mb-8">
            Start creating your resume and choose the template that best
            represents your professional style.
          </p>

            <Link
              to={isAuthenticated ? "/builder" : "/register"}
              className="inline-flex items-center gap-2 bg-white text-[#2F2B28] px-7 py-4 rounded-xl font-bold hover:bg-cream-100 transition-all"
            >
              Create My Resume
              <ArrowRight className="w-5 h-5" />
            </Link>

        </div>
      </section>

    </div>
  );
}