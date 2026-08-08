import React from 'react';

const formats = [
  { id: 'classic', name: 'Classic Minimal', description: 'Clean, elegant, traditional layout suitable for all industries.' },
  { id: 'modern', name: 'Modern Cream', description: 'Contemporary layout with enhanced typography and clean spacing.' }
];

export default function Dashboard({ onSelectFormat }) {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif font-bold text-cream-900">Choose a Resume Layout</h1>
        <p className="text-cream-800 text-sm mt-2">Select the format that best fits your experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {formats.map((fmt) => (
          <div key={fmt.id} className="bg-white border border-cream-200 rounded-2xl p-6 shadow-sm hover:border-cream-300 transition-all flex flex-col justify-between">
            <div>
              <div className="h-40 bg-cream-100 rounded-xl mb-4 border border-cream-200 flex items-center justify-center text-cream-800 font-serif text-lg italic">
                {fmt.name} Preview
              </div>
              <h3 className="text-xl font-serif font-bold text-cream-900 mb-2">{fmt.name}</h3>
              <p className="text-cream-800 text-sm mb-6">{fmt.description}</p>
            </div>
            <button 
              onClick={() => onSelectFormat(fmt.id)}
              className="w-full bg-cream-900 hover:bg-cream-800 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
            >
              Use This Format
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}