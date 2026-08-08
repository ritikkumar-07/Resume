import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-cream-100 border-b border-cream-200 px-8 py-4 flex justify-between items-center text-cream-900 shadow-sm">
      <div className="text-2xl font-serif font-bold tracking-tight text-cream-900">
        CV<span className="text-cream-800 italic">Craft</span>
      </div>
      
      {user ? (
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 bg-white border border-cream-200 px-4 py-1.5 rounded-full shadow-sm">
            {user.avatar ? (
              <img src={user.avatar} alt="User Avatar" className="w-7 h-7 rounded-full border border-cream-200" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-cream-300 flex items-center justify-center font-bold text-xs text-cream-900">
                {user.name?.charAt(0)}
              </div>
            )}
            <span className="text-sm font-medium text-cream-900">{user.name}</span>
          </div>
          <button 
            onClick={onLogout}
            className="text-xs bg-cream-200 hover:bg-cream-300 text-cream-900 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      ) : (
        <span className="text-xs text-cream-800 font-medium">Please sign in to build your resume</span>
      )}
    </nav>
  );
}