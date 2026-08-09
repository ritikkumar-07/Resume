import React from 'react';

export default function Minimal({ data }) {
  const { personal, experience } = data || {};

  return (
    <div className="p-10 font-sans text-gray-900 leading-relaxed">
      <header className="border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{personal?.fullName || 'Your Name'}</h1>
        <div className="text-sm font-medium text-gray-600 flex flex-wrap gap-x-4">
          {personal?.email && <span>{personal.email}</span>}
          {personal?.phone && <span>{personal.phone}</span>}
          {personal?.location && <span>{personal.location}</span>}
        </div>
      </header>

      {personal?.summary && (
        <section className="mb-6">
          <p className="text-sm text-gray-800">{personal.summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-4">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{exp.title}</h3>
                  <span className="text-sm font-medium text-gray-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</div>
                <p className="text-sm text-gray-800 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
