import React from 'react';
import { Volume2, VolumeX, Dices } from 'lucide-react';

interface TopBarProps {
  activeTab: 'generator' | 'deck' | 'classes' | 'about';
  setActiveTab: (tab: 'generator' | 'deck' | 'classes' | 'about') => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  onQuickRoll: () => void;
  deckCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  toggleSound,
  onQuickRoll,
  deckCount,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-amber-900/50 bg-[#080b12]/92 backdrop-blur-md sticky top-0 z-40 shadow-xl shadow-black/50">
      {/* Zone 1: Brand Wordmark (Single text element) */}
      <button
        onClick={() => setActiveTab('generator')}
        className="text-lg md:text-xl font-bold tracking-widest text-amber-300 font-alchemist whitespace-nowrap shrink-0 hover:text-amber-200 transition-colors cursor-pointer text-left drop-shadow-[0_1px_6px_rgba(245,158,11,0.2)]"
      >
        🜄 Arcane Alchemist
      </button>

      {/* Zone 2: 4 single-line nav links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('generator')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'generator' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Player Card
        </button>
        <button
          onClick={() => setActiveTab('deck')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'deck' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          My Deck ({deckCount})
        </button>
        <button
          onClick={() => setActiveTab('classes')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'classes' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Class Compendium
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'about' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Rules & Lore
        </button>
      </nav>

      {/* Zone 3: 1 primary action with sound control */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={toggleSound}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          title={soundEnabled ? 'Sound Enabled' : 'Sound Muted'}
          className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <button
          onClick={onQuickRoll}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-md shadow-amber-500/10 cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
        >
          <Dices size={16} />
          <span>Roll Hero</span>
        </button>
      </div>
    </header>
  );
};
