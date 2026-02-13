import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES } from './constants.ts';
import { Game } from './types.ts';
import { gamesData } from './games.ts';
import Navbar from './components/Navbar.tsx';
import GameCard from './components/GameCard.tsx';
import GamePlayer from './components/GamePlayer.tsx';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [totalPlays, setTotalPlays] = useState<number>(0);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Game[]>([]);
  
  // Easter egg state
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    setGames(gamesData);
    
    const storedCount = localStorage.getItem('tg16_access_count');
    const currentCount = storedCount ? parseInt(storedCount, 10) : 15420;
    const nextCount = currentCount + 1;
    localStorage.setItem('tg16_access_count', nextCount.toString());
    setVisitorCount(nextCount);

    const storedPlays = localStorage.getItem('tg16_total_plays');
    setTotalPlays(storedPlays ? parseInt(storedPlays, 10) : 8421);

    // Load recently played
    const storedRecentIds = localStorage.getItem('tg16_recently_played');
    if (storedRecentIds) {
      const ids: string[] = JSON.parse(storedRecentIds);
      const recentGames = ids
        .map(id => gamesData.find(g => g.id === id))
        .filter((g): g is Game => !!g);
      setRecentlyPlayed(recentGames);
    }
    
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [games, activeCategory, searchTerm]);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    
    // Update total plays
    const newPlays = totalPlays + 1;
    setTotalPlays(newPlays);
    localStorage.setItem('tg16_total_plays', newPlays.toString());

    // Update recently played
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(g => g.id !== game.id);
      const updated = [game, ...filtered].slice(0, 5);
      localStorage.setItem('tg16_recently_played', JSON.stringify(updated.map(g => g.id)));
      return updated;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedGame(null);
  };

  const handleSecretTrigger = () => {
    const next = secretClicks + 1;
    if (next >= 5) {
      setShowSecret(true);
      setSecretClicks(0);
    } else {
      setSecretClicks(next);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        <div className="w-20 h-20 turbo-gradient rounded-2xl turbo-shadow animate-bounce flex items-center justify-center mb-8 relative z-10 overflow-hidden">
           <img src="https://media.wired.com/photos/5e62e660ebca410008eea08f/1:1/w_1758,h_1758,c_limit/Gear-Ars-TG-16-Min-SOURCE-Amazon.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-2 text-center relative z-10">
          <h2 className="font-orbitron text-2xl font-black tracking-[0.5em] text-white uppercase italic">
            TURBOGRAFX <span className="text-purple-500">16</span>
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="h-1 w-48 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 animate-[loading_1.2s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-slate-600 font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">Initializing Purple Engine</p>
          </div>
        </div>
        <style>{`
          @keyframes loading {
            0% { width: 0%; transform: translateX(-100%); }
            50% { width: 100%; transform: translateX(0%); }
            100% { width: 0%; transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      <Navbar 
        onHomeClick={handleBackToHome} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Secret Overlay */}
      {showSecret && (
        <div className="fixed inset-0 z-[100] bg-red-950/90 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
            <div className="flex flex-col items-center text-center space-y-2">
              <h2 className="font-orbitron text-4xl md:text-6xl font-black text-red-500 italic tracking-[0.2em] animate-pulse">
                ACCESS GRANTED
              </h2>
              <div className="px-4 py-1 bg-red-600 text-white font-orbitron font-black text-[10px] uppercase tracking-[0.5em] rounded">
                CLASSIFIED SYSTEM ARCHIVE // LEVEL 16
              </div>
            </div>

            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border-4 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.4)] bg-black flex flex-col items-center justify-center">
               <div className="text-center group select-none">
                 <h3 className="font-orbitron text-7xl md:text-9xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-700">
                   MOVIES
                 </h3>
                 <div className="flex items-center gap-4 justify-center -mt-4 md:-mt-8">
                    <div className="h-px w-12 md:w-24 bg-red-600"></div>
                    <h3 className="font-orbitron text-4xl md:text-6xl font-black text-red-500 tracking-[0.4em] uppercase drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                      SOON
                    </h3>
                    <div className="h-px w-12 md:w-24 bg-red-600"></div>
                 </div>
               </div>
               
               <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-red-900/40 via-transparent to-transparent opacity-60"></div>
               <div className="absolute top-4 left-4 text-[10px] text-red-500 font-mono font-bold opacity-60 uppercase tracking-[0.3em]">
                 SEC_ID: 9942-X // AUTH: Y. MUSTARD
               </div>
               <div className="absolute bottom-4 right-4 flex items-center gap-2">
                 <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                 <span className="text-[8px] text-red-500 font-mono font-bold uppercase tracking-widest opacity-60">Buffering Media Stream...</span>
               </div>
            </div>

            <button 
              onClick={() => setShowSecret(false)}
              className="px-12 py-4 bg-red-600 hover:bg-red-500 text-white font-orbitron font-black text-xs uppercase tracking-[0.3em] rounded-xl transition-all active:scale-95 shadow-lg shadow-red-500/40"
            >
              Return to Control Center
            </button>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {selectedGame ? (
          <GamePlayer game={selectedGame} onBack={handleBackToHome} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
            {/* Hero Section */}
            {!searchTerm && activeCategory === 'All' && (
              <div className="mb-12 relative group rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 turbo-gradient opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-32 -right-32 w-fuchsia-900/40 rounded-full blur-[100px]"></div>
                
                <div className="relative z-10 py-16 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="max-w-3xl text-center md:text-left">
                    <div className="inline-block px-4 py-1.5 bg-black/30 backdrop-blur-md rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                      Established 2026
                    </div>
                    <h2 className="font-orbitron text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight italic drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-tight uppercase">
                      "NO KID SHOULD SUFFER IN SCHOOL, SO I'M GIVING THEM AN <span className="text-black/50">ESCAPE.</span>"
                    </h2>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="px-5 py-2 bg-black text-purple-500 font-orbitron font-black italic skew-x-[-12deg] tracking-widest text-lg shadow-xl border-l-4 border-purple-500">
                        - y. mustard
                      </div>
                      <p className="text-white/80 text-lg font-medium tracking-tight leading-relaxed max-w-sm mt-4 md:mt-0">
                        Experience the fastest unblocked gaming console ever built. Pure adrenaline, zero restrictions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative hidden lg:block">
                     <div className="w-64 h-64 border-8 border-white/10 rounded-3xl rotate-12 flex items-center justify-center animate-pulse-glow bg-black/20 backdrop-blur-sm overflow-hidden">
                        <img src="https://media.wired.com/photos/5e62e660ebca410008eea08f/1:1/w_1758,h_1758,c_limit/Gear-Ars-TG-16-Min-SOURCE-Amazon.jpg" alt="" className="w-full h-full object-cover scale-150" />
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recently Played Section */}
            {recentlyPlayed.length > 0 && !searchTerm && (
              <section className="mb-12 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-orbitron text-xs font-black text-white uppercase tracking-[0.3em]">Recently Deployed</h3>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Continue Session</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {recentlyPlayed.map((game) => (
                    <div key={`recent-${game.id}`} className="scale-90 origin-left">
                      <GameCard 
                        game={game} 
                        onClick={handleGameSelect} 
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 pb-2 border-b border-white/5">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  <span className="text-slate-500 font-orbitron text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">Sort Library:</span>
                </div>
                <div className="hidden lg:flex items-center gap-3 px-5 py-2.5 bg-slate-900/60 rounded-2xl border border-white/10 shadow-2xl turbo-shadow">
                  <span className="text-[10px] text-slate-400 font-orbitron font-black uppercase tracking-[0.2em]">Total Games:</span>
                  <span className="text-xl text-purple-400 font-mono font-black tracking-tighter leading-none">{games.length}</span>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-xl font-orbitron text-[9px] font-black uppercase tracking-[0.2em] transition-all border whitespace-nowrap active:scale-95 ${
                      activeCategory === cat
                        ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/20 scale-105 z-10'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onClick={handleGameSelect} 
                  />
                ))
              ) : (
                <div className="col-span-full py-40 text-center glass rounded-[3rem] border-2 border-dashed border-slate-800">
                  <div className="text-slate-800 mb-8 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-orbitron text-2xl text-slate-600 font-black uppercase tracking-[0.3em]">Library Error</h3>
                  <p className="text-slate-700 mt-3 font-mono text-xs uppercase tracking-widest">[ CODE: NO_DATA_MATCHED ]</p>
                  <button 
                    onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
                    className="mt-10 px-8 py-3 bg-purple-600/10 border border-purple-500/20 text-purple-500 rounded-xl font-orbitron text-[10px] font-black hover:bg-purple-600/20 transition-all tracking-[0.2em] uppercase"
                  >
                    Reboot Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-950/80 backdrop-blur-xl border-t border-white/5 py-20 px-4 md:px-8 mt-20 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-12 turbo-gradient rounded-xl flex items-center justify-center text-white font-black font-orbitron text-2xl turbo-shadow overflow-hidden">
                 <img src="https://media.wired.com/photos/5e62e660ebca410008eea08f/1:1/w_1758,h_1758,c_limit/Gear-Ars-TG-16-Min-SOURCE-Amazon.jpg" alt="" className="w-full h-full object-cover" />
               </div>
               <span className="font-orbitron font-black text-3xl tracking-tighter text-white italic">TURBOGRAFX <span className="text-purple-500">16</span></span>
            </div>
            <p className="text-slate-500 text-base leading-relaxed mb-10 font-medium max-w-sm">
              Providing an essential escape through high-performance web entertainment. Because no student should suffer.
            </p>
            <div className="flex gap-4">
              {['FB', 'X', 'DS', 'YT'].map(social => (
                <div key={social} className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-purple-500 hover:border-purple-500/50 cursor-pointer transition-all font-black text-[10px] font-orbitron">
                  {social}
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="font-orbitron text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-50">Console</h4>
              <ul className="space-y-3 text-slate-500 text-[10px] font-black uppercase tracking-widest font-orbitron">
                <li><a href="#" className="hover:text-purple-500 transition-colors">Library</a></li>
                <li><a href="#" className="hover:text-purple-500 transition-colors">New Releases</a></li>
                <li><a href="#" className="hover:text-purple-500 transition-colors">Firmware Updates</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-orbitron text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-50">Specs</h4>
              <ul className="space-y-3 text-slate-500 text-[10px] font-black uppercase tracking-widest font-orbitron">
                <li><a href="#" className="hover:text-purple-500 transition-colors">16-Bit Engine</a></li>
                <li><a href="#" className="hover:text-purple-500 transition-colors">Web-P Rendering</a></li>
                <li><a href="#" className="hover:text-purple-500 transition-colors">Security Patch</a></li>
              </ul>
            </div>
            <div className="space-y-6 col-span-2 sm:col-span-1">
              <h4 className="font-orbitron text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-50">Legal</h4>
              <ul className="space-y-3 text-slate-500 text-[10px] font-black uppercase tracking-widest font-orbitron">
                <li><a href="#" className="hover:text-purple-500 transition-colors">Fair Use</a></li>
                <li><a href="#" className="hover:text-purple-500 transition-colors">GDPR</a></li>
                <li><a href="#" className="hover:text-purple-500 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 text-[9px] font-black uppercase tracking-[0.4em] font-orbitron text-center md:text-left">
            © {new Date().getFullYear()} TURBOGRAFX-WEB. BY Y. MUSTARD.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/50 rounded-lg border border-white/5">
              <span className="text-[8px] text-slate-500 font-orbitron font-black uppercase tracking-widest">System Accesses:</span>
              <span className="text-[10px] text-purple-500 font-mono font-bold tracking-tighter">{visitorCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/50 rounded-lg border border-white/5">
              <span className="text-[8px] text-slate-500 font-orbitron font-black uppercase tracking-widest">Games Launched:</span>
              <span className="text-[10px] text-fuchsia-500 font-mono font-bold tracking-tighter">{totalPlays.toLocaleString()}</span>
            </div>
            <div className="text-slate-800 font-mono text-[9px] uppercase tracking-widest">
              BUILD: TG16-2025.02-X.RELEASE
            </div>
            <div 
              onClick={handleSecretTrigger}
              className="px-2 py-0.5 bg-purple-500/10 rounded border border-purple-500/20 text-purple-500 text-[8px] font-black uppercase cursor-help select-none active:scale-95 transition-transform"
            >
              v1.0.4-STABLE
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;