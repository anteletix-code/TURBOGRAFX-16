export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: 'Action' | 'Puzzle' | 'Sports' | 'Retro' | 'Strategy' | 'Horror' | 'RPG' | 'Simulator';
  rating: number;
}

export type ViewState = 'home' | 'game-detail' | 'category';