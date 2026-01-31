import React, { useState } from 'react';
import { Game } from '../types';

interface GamePlayerProps {
  game: Game;
  onBack: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-white transition-all font-orbitron text-[10px] font-black uppercase tracking-[0.3em] group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Library
      </button>

      <div className={`relative transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-[100] bg-black' : 'bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800/50'}`}>
        <div className={`flex flex-col h-full ${isFullscreen ? '' : 'aspect-video w-full'}`}>
          <div className="flex-grow bg-black">
            <iframe
              src={game.iframeUrl}
              title={game.title}
              className="w-full h-full border-none"
              allowFullScreen
              allow="autoplay; fullscreen; keyboard-map; xr-spatial-tracking"
            />
          </div>
          
          <div className="bg-slate-900 border-t border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h2 className="font-orbitron font-black text-lg md:text-xl text-white tracking-tighter">{game.title}</h2>
                <span className="hidden sm:inline-block bg-purple-600/10 text-purple-500 text-[9px] px-2 py-0.5 rounded-full border border-purple-500/20 font-black tracking-widest uppercase">
                  {game.category}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-0.5">Ready for Input</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleFullscreen}
                className="bg-slate-800 hover:bg-purple-500 text-white p-2.5 rounded-xl transition-all active:scale-95 shadow-lg"
                title="Fullscreen Toggle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <h3 className="font-orbitron font-black text-sm text-purple-500 uppercase tracking-[0.2em]">Mission Briefing</h3>
            <p className="text-slate-300 leading-relaxed text-lg font-medium italic">
              "{game.description}"
            </p>
          </div>
          
          <div className="p-1 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-2xl">
            <div className="bg-slate-950 p-6 rounded-[calc(1rem-1px)] border border-white/5">
              <h4 className="font-orbitron text-xs font-black text-white uppercase tracking-widest mb-4">Controls & Tips</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Standard WASD or Arrow keys for movement. Use Space or Enter for primary actions. Some games may require mouse interaction. If the game doesn't load, try disabling your ad-blocker as some iframe providers require it.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
            <h3 className="font-orbitron font-black text-[10px] text-slate-500 uppercase tracking-[0.3em] mb-5">System Metadata</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold uppercase">Performance Rating</span>
                <span className="text-amber-500 font-black tracking-widest">★ {game.rating}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold uppercase">Architecture</span>
                <span className="text-white font-black tracking-widest">WEB-16</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold uppercase">Input Support</span>
                <span className="text-white font-black tracking-widest uppercase">KBD/MOUSE</span>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Status</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-500 font-black text-[10px] uppercase tracking-widest">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;