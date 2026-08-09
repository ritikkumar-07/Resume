import React from 'react';

export default function Executive({ data }) {
  const { personal, experience } = data || {};

  return (
    <div className="p-10 font-serif text-[#1F2937] leading-relaxed max-w-4xl mx-auto">
      <header className="text-center border-b-4 border-[#111827] pb-6 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest text-[#111827] mb-3">{personal?.fullName || 'Your Name'}</h1>
        <p className="text-lg font-medium italic text-[#4B5563] mb-3">{personal?.title || 'Professional Title'}</p>
        <div className="text-sm font-sans flex flex-wrap justify-center gap-4 text-[#6B7280]">
          {personal?.email && <span>{personal.email}</span>}
          {personal?.phone && <span>{personal.phone}</span>}
          {personal?.location && <span>{personal.location}</span>}
        </div>
      </header>

      {personal?.summary && (
        <section className="mb-8">
          <p className="text-sm leading-relaxed text-[#374151] text-justify">{personal.summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#111827] border-b border-[#D1D5DB] pb-2 mb-6">Professional Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg text-[#1F2937]">{exp.title}</h3>
                  <span className="text-sm font-sans font-medium text-[#4B5563]">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-sm font-sans font-semibold text-[#111827] mb-3 uppercase tracking-wide">{exp.company}</div>
                <div className="text-sm text-[#374151] pl-4 border-l-2 border-[#E5E7EB] whitespace-pre-wrap">{exp.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
