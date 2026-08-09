import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { asBlob } from 'html-docx-js-typescript';

export default function Builder({ templateId, onBack }) {
  const resumeRef = useRef();

  const [formData, setFormData] = useState({
    fullName: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '+91 9876543210',
    github: 'https://github.com/rahulkumar',
    linkedin: 'https://linkedin.in/in/rahulkumar',
    summary: 'Computer Science Engineering student skilled in React, Node.js, and web application development.',
    education: 'B.Tech in Computer Science Engineering (2025 - 2029)',
    skills: 'React.js, Node.js, Express, C++, Tailwind CSS, MongoDB, Git',
    experience: 'Software Engineering Intern - Developed full-stack web platforms and integrated OAuth APIs.'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0.4,
      filename: `${formData.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const downloadDOCX = async () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><style>body { font-family: Arial, sans-serif; line-height: 1.5; }</style></head>
        <body>${resumeRef.current.innerHTML}</body>
      </html>
    `;
    const blob = await asBlob(htmlContent);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${formData.fullName.replace(/\s+/g, '_')}_Resume.docx`;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-cream-900 font-medium text-xs hover:underline">
          ← Change Format (Selected Format #{templateId})
        </button>

        <div className="flex gap-3">
          <button onClick={downloadPDF} className="bg-cream-900 hover:bg-cream-800 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-all">
            Download PDF
          </button>
          <button onClick={downloadDOCX} className="bg-white border border-cream-200 text-cream-900 hover:bg-cream-100 text-xs font-medium px-4 py-2.5 rounded-xl transition-all">
            Download DOCX (Editable)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dynamic Inputs Form */}
        <div className="bg-white border border-cream-200 p-6 rounded-2xl shadow-sm space-y-4 text-xs">
          <h2 className="text-lg font-serif font-bold text-cream-900 mb-2">Enter Resume Details</h2>
          
          <div>
            <label className="block font-semibold text-cream-900 mb-1">Full Name</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border border-cream-200 p-2.5 rounded-lg bg-cream-50 focus:outline-none focus:border-cream-800" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-cream-900 mb-1">Email</label>
              <input name="email" value={formData.email} onChange={handleChange} className="w-full border border-cream-200 p-2.5 rounded-lg bg-cream-50 focus:outline-none focus:border-cream-800" />
            </div>
            <div>
              <label className="block font-semibold text-cream-900 mb-1">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-cream-200 p-2.5 rounded-lg bg-cream-50 focus:outline-none focus:border-cream-800" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-cream-900 mb-1">GitHub Profile Link</label>
              <input name="github" value={formData.github} onChange={handleChange} className="w-full border border-cream-200 p-2.5 rounded-lg bg-cream-50 focus:outline-none focus:border-cream-800" />
            </div>
            <div>
              <label className="block font-semibold text-cream-900 mb-1">LinkedIn Profile Link</label>
              <input name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full border border-cream-200 p-2.5 rounded-lg bg-cream-50 focus:outline-none focus:border-cream-800" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-cream-900 mb-1">Professional Summary</label>
            <textarea name="summary" value={formData.summary} onChange={handleChange} rows="3" className="w-full border border-cream-200 p-2.5 rounded-lg bg-cream-50 focus:outline-none focus:border-cream-800" />
          </div>

          <div>
            <label className="block font-semibold text-cream-900 mb-1">Education</label>
            <input name="education" value={formData.education} onChange={handleChange} className="w-full border border-cream-200 p-2.5 rounded-lg bg-cream-50 focus:outline-none focus:border-cream-800" />
          </div>

          <div>
            <label className="block font-semibold text-cream-900 mb-1">Skills</label>
            <input name="skills" value={formData.skills} onChange={handleChange} className="w-full border border-cream-200 p-2.5 rounded-lg bg-cream-50 focus:outline-none focus:border-cream-800" />
          </div>

          <div>
            <label className="block font-semibold text-cream-900 mb-1">Experience / Projects</label>
            <textarea name="experience" value={formData.experience} onChange={handleChange} rows="3" className="w-full border border-cream-200 p-2.5 rounded-lg bg-cream-50 focus:outline-none focus:border-cream-800" />
          </div>
        </div>

        {/* Live Resume Rendering View */}
        <div className="bg-cream-100 p-6 rounded-2xl border border-cream-200 overflow-auto">
          <div ref={resumeRef} className="bg-white p-8 rounded-xl border border-cream-200 text-cream-900 font-sans min-h-[650px]">
            <h1 className="text-3xl font-serif font-bold border-b border-cream-200 pb-2">{formData.fullName}</h1>
            <div className="flex flex-wrap gap-2 text-[11px] text-cream-800 mt-2">
              <span>{formData.email}</span> | <span>{formData.phone}</span>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] text-blue-700 underline mt-1">
              {formData.github && <a href={formData.github}>{formData.github}</a>}
              {formData.linkedin && <a href={formData.linkedin}>{formData.linkedin}</a>}
            </div>

            <section className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-cream-900 border-b border-cream-200 pb-1">Professional Summary</h3>
              <p className="text-xs text-cream-800 mt-2 leading-relaxed">{formData.summary}</p>
            </section>

            <section className="mt-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-cream-900 border-b border-cream-200 pb-1">Education</h3>
              <p className="text-xs text-cream-800 mt-2">{formData.education}</p>
            </section>

            <section className="mt-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-cream-900 border-b border-cream-200 pb-1">Skills</h3>
              <p className="text-xs text-cream-800 mt-2">{formData.skills}</p>
            </section>

            <section className="mt-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-cream-900 border-b border-cream-200 pb-1">Experience & Projects</h3>
              <p className="text-xs text-cream-800 mt-2 leading-relaxed">{formData.experience}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}