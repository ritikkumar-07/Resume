import React from 'react';

const formats = [
  { id: 1, name: 'Classic Minimal', desc: 'Standard formal layout for traditional industry roles.' },
  { id: 2, name: 'Modern Executive', desc: 'Clean layout emphasizing header highlights and key technical skills.' },
  { id: 3, name: 'Tech Engineer', desc: 'Structured grid focusing on software projects, GitHub, and tech stacks.' },
  { id: 4, name: 'Corporate Elite', desc: 'Symmetrical design tailored for management and corporate positions.' },
  { id: 5, name: 'Creative Designer', desc: 'Spacious typographical setup for visual and design portfolios.' },
  { id: 6, name: 'Academic Standard', desc: 'Text-dense layout optimized for publications, education, and credentials.' },
  { id: 7, name: 'Compact One-Page', desc: 'High-density layout engineered to fit extensive data onto a single page.' },
  { id: 8, name: 'Minimalist Line', desc: 'Divider line driven structure emphasizing timeline chronology.' },
  { id: 9, name: 'Startup Professional', desc: 'Dynamic design highlighting impact, links, and project achievements.' },
  { id: 10, name: 'Software Developer', desc: 'Clean developer layout with prominent GitHub and LinkedIn fields.' }
];

export default function Dashboard({ onSelectFormat }) {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif font-bold text-cream-900">Choose a Resume Format</h1>
        <p className="text-cream-800 text-sm mt-2">Select from 10 production formats to build your resume.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formats.map((fmt) => (
          <div key={fmt.id} className="bg-white border border-cream-200 rounded-2xl p-5 shadow-sm hover:border-cream-300 transition-all flex flex-col justify-between">
            <div>
              <div className="h-36 bg-cream-100 rounded-xl mb-4 border border-cream-200 flex items-center justify-center text-cream-800 font-serif text-sm italic font-semibold">
                Format #{fmt.id} Preview
              </div>
              <h3 className="text-base font-serif font-bold text-cream-900 mb-1">{fmt.name}</h3>
              <p className="text-cream-800 text-xs mb-4">{fmt.desc}</p>
            </div>
            <button 
              onClick={() => onSelectFormat(fmt.id)}
              className="w-full bg-cream-900 hover:bg-cream-800 text-white font-medium py-2 rounded-xl transition-colors text-xs"
            >
              Use Format #{fmt.id}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}