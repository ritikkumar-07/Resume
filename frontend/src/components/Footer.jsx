import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-cream-100 border-t border-cream-200 text-cream-800 text-center py-5 text-xs font-medium mt-auto">
      <p>© {new Date().getFullYear()} CVCraft Resume Builder. All rights reserved.</p>
    </footer>
  );
}