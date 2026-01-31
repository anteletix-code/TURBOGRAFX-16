import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      className="group bg-slate-900/40 rounded-2xl overflow-hidden cursor-pointer border border-slate-800/60 hover:border-purple-500/50 transition-all hover:-translate-y-1.5 duration-500 shadow-xl hover:shadow-purple-500/10"
      onClick={() => onClick(game)}
    >
      <div className="relative aspect-video overflow-hidden bg-slate-950">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=480&h=270';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="bg-purple-600 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
            {game.category}
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-white/5">
        <div className="flex justify-between items-center mb-1.5">
          <h3 className="font-orbitron font-bold text-base text-white group-hover:text-purple-500 transition-colors truncate pr-2 tracking-tight">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-[10px] text-amber-500 font-black bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
            <span>★</span>
            <span>{game.rating}</span>
          </div>
        </div>
        <p className="text-slate-500 text-[10px] line-clamp-2 leading-relaxed font-semibold uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;