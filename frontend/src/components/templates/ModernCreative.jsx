import React from 'react';

export default function ModernCreative({ data }) {
  const { personal, experience } = data || {};

  return (
    <div className="p-0 font-sans text-gray-800 flex flex-col h-full bg-white">
      <header className="bg-[#D4CEB0] p-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-[#332E2B] mb-2">{personal?.fullName || 'Your Name'}</h1>
          <h2 className="text-xl font-medium text-[#5A4E47]">{personal?.title || 'Professional Title'}</h2>
        </div>
        <div className="text-right text-sm text-[#5A4E47] space-y-1">
          {personal?.email && <div>{personal.email}</div>}
          {personal?.phone && <div>{personal.phone}</div>}
          {personal?.location && <div>{personal.location}</div>}
        </div>
      </header>

      <div className="flex flex-grow">
        {/* Left Column */}
        <div className="w-1/3 bg-[#F5EFE6] p-8 border-r border-[#E8DFD8]">
          <section className="mb-8">
            <h3 className="text-lg font-bold text-[#332E2B] uppercase tracking-wider mb-4 border-b-2 border-[#D4CEB0] inline-block pb-1">About Me</h3>
            <p className="text-sm leading-relaxed text-[#5A4E47]">{personal?.summary || 'Brief professional summary goes here.'}</p>
          </section>
        </div>

        {/* Right Column */}
        <div className="w-2/3 p-8">
          {experience && experience.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-bold text-[#332E2B] uppercase tracking-wider mb-6 flex items-center gap-4">
                <span className="w-8 h-8 bg-[#D4CEB0] rounded-full flex items-center justify-center text-white">★</span>
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-[#D4CEB0]">
                    <div className="absolute w-3 h-3 bg-[#D4CEB0] rounded-full -left-[7px] top-1.5" />
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-lg text-[#332E2B]">{exp.title}</h4>
                      <span className="text-xs font-bold text-[#D4CEB0] bg-[#FDFBF7] px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-sm font-semibold text-[#5A4E47] mb-2">{exp.company}</div>
                    <p className="text-sm text-[#5A4E47] whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
