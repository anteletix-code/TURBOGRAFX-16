import React from 'react';

interface NavbarProps {
  onHomeClick: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick, searchTerm, setSearchTerm }) => {
  return (
    <nav className="sticky top-0 z-[60] glass border-b border-white/5 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={onHomeClick}
        >
          <div className="relative w-12 h-12 overflow-hidden rounded-lg border-2 border-purple-500/30 group-hover:border-purple-500 transition-all duration-300 turbo-shadow bg-slate-900">
            <img 
              src="https://media.wired.com/photos/5e62e660ebca410008eea08f/1:1/w_1758,h_1758,c_limit/Gear-Ars-TG-16-Min-SOURCE-Amazon.jpg" 
              alt="TURBOGRAFX 16"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                // Handle image error by keeping the box and potentially showing the fallback
                (e.target as HTMLImageElement).style.opacity = '0.5';
              }}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-orbitron text-xl md:text-2xl font-black tracking-tighter text-white leading-none">
              TURBOGRAFX <span className="text-purple-500 italic">16</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">System Live</span>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search library..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-slate-600 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;