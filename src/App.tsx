/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Character, CharacterClass, CharacterRace, RollMode } from './types/character';
import { generateRandomCharacter } from './utils/characterGenerator';
import { soundEffects } from './utils/audio';
import { TopBar } from './components/TopBar';
import { GeneratorControls } from './components/GeneratorControls';
import { CharacterCard } from './components/CharacterCard';
import { MyDeck } from './components/MyDeck';
import { ClassCompendium } from './components/ClassCompendium';
import { RulesAndLore } from './components/RulesAndLore';

const DECK_STORAGE_KEY = 'arcane_codex_my_deck';
const SOUND_STORAGE_KEY = 'arcane_codex_sound_enabled';

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'deck' | 'classes' | 'about'>('generator');
  const [character, setCharacter] = useState<Character | null>(null);
  const [selectedClass, setSelectedClass] = useState<CharacterClass | 'Any'>('Any');
  const [selectedRace, setSelectedRace] = useState<CharacterRace | 'Any'>('Any');
  const [rollMode, setRollMode] = useState<RollMode>('standard');
  const [isRolling, setIsRolling] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Saved player cards in user's "My Deck"
  const [deck, setDeck] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem(DECK_STORAGE_KEY) || localStorage.getItem('arcane_codex_party_roster');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Local storage fallback
    }
    return [];
  });

  // Sound preference load
  useEffect(() => {
    try {
      const savedSound = localStorage.getItem(SOUND_STORAGE_KEY);
      if (savedSound !== null) {
        const enabled = savedSound === 'true';
        setSoundEnabled(enabled);
        soundEffects.enabled = enabled;
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.enabled = next;
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, String(next));
    } catch {
      // ignore
    }
  };

  // Generate a new random fantasy character
  const handleGenerate = useCallback(
    (prefClass?: CharacterClass | 'Any', prefRace?: CharacterRace | 'Any') => {
      setIsRolling(true);
      soundEffects.playDiceRoll();

      // Quick 200ms tactile settling delay for animation
      setTimeout(() => {
        const targetClass = prefClass !== undefined ? prefClass : selectedClass;
        const targetRace = prefRace !== undefined ? prefRace : selectedRace;

        const newChar = generateRandomCharacter({
          preferredClass: targetClass,
          preferredRace: targetRace,
          rollMode,
        });

        setCharacter(newChar);
        setIsRolling(false);
      }, 180);
    },
    [selectedClass, selectedRace, rollMode]
  );

  // Initialize with an initial character on load
  useEffect(() => {
    if (!character) {
      handleGenerate();
    }
  }, [character, handleGenerate]);

  // Spacebar shortcut to roll hero when on generator tab
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && activeTab === 'generator') {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'SELECT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handleGenerate();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, handleGenerate]);

  // Deck management
  const handleSaveToDeck = (hero: Character) => {
    setDeck((prev: Character[]) => {
      let updated: Character[];
      if (prev.some((h) => h.id === hero.id)) {
        updated = prev.filter((h) => h.id !== hero.id);
      } else {
        updated = [hero, ...prev];
      }
      try {
        localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleRemoveFromDeck = (id: string) => {
    setDeck((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      try {
        localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleClearDeck = () => {
    setDeck([]);
    try {
      localStorage.removeItem(DECK_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleSelectFromDeck = (hero: Character) => {
    setCharacter(hero);
    setActiveTab('generator');
  };

  const handleRollFromCompendium = (cls: CharacterClass) => {
    setSelectedClass(cls);
    handleGenerate(cls, selectedRace);
    setActiveTab('generator');
  };

  const handleUpdateCharacter = (updated: Character) => {
    setCharacter(updated);
    setDeck((prev) => {
      if (prev.some((h) => h.id === updated.id)) {
        const nextDeck = prev.map((h) => (h.id === updated.id ? updated : h));
        try {
          localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(nextDeck));
        } catch {
          // ignore
        }
        return nextDeck;
      }
      return prev;
    });
  };

  const isSavedInDeck = character ? deck.some((h) => h.id === character.id) : false;

  return (
    <div className="min-h-screen relative bg-[#06080d] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* Dark Textured Alchemist's Workbench Background */}
      <div
        className="fixed inset-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity z-0"
        style={{
          backgroundImage: `url('/src/assets/images/alchemist_workbench_bg_1793718480304.jpg')`,
        }}
      />
      {/* Warm candlelight glow & alchemical shadow scrim */}
      <div className="fixed inset-0 pointer-events-none bg-radial from-amber-600/12 via-slate-950/70 to-slate-950/95 z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.15),transparent_70%)] z-0" />

      {/* Content wrapper with relative z-10 */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Bar Navigation */}
        <TopBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          onQuickRoll={() => {
            setActiveTab('generator');
            handleGenerate();
          }}
          deckCount={deck.length}
        />

        {/* Main Viewport Content */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col">
          {activeTab === 'generator' && (
            <div className="space-y-6 flex-1 flex flex-col items-center">
              {/* Header intro with Alchemist Workbench motif */}
              <div className="text-center max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-400 uppercase font-mono mb-1.5">
                  <span>🜁 Player Card Summoning</span>
                  <span aria-hidden="true" className="text-amber-700">·</span>
                  <span>Opus Magnum</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-alchemist tracking-wide text-slate-100 drop-shadow-md">
                  Alchemist Player Card
                </h2>
                <p className="text-xs sm:text-sm text-amber-200/70 mt-1 font-serif italic">
                  Transmute fantasy champions into collectible player cards with Health, Mana, and Strength stats.
                </p>
              </div>

            {/* Generator Action & Filter Controls */}
            <GeneratorControls
              onGenerate={handleGenerate}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedRace={selectedRace}
              setSelectedRace={setSelectedRace}
              rollMode={rollMode}
              setRollMode={setRollMode}
              isRolling={isRolling}
            />

            {/* Bordered Player Card */}
            {character ? (
              <CharacterCard
                character={character}
                onSaveToDeck={handleSaveToDeck}
                isSavedInDeck={isSavedInDeck}
                onReroll={() => handleGenerate()}
                onUpdateCharacter={handleUpdateCharacter}
              />
            ) : (
              <div className="py-20 text-center text-slate-500 text-sm">
                Transmuting player card...
              </div>
            )}
          </div>
        )}

        {activeTab === 'deck' && (
          <MyDeck
            deck={deck}
            onSelectCard={handleSelectFromDeck}
            onRemoveFromDeck={handleRemoveFromDeck}
            onClearDeck={handleClearDeck}
            onSwitchToGenerator={() => setActiveTab('generator')}
          />
        )}

        {activeTab === 'classes' && (
          <ClassCompendium onRollClass={handleRollFromCompendium} />
        )}

        {activeTab === 'about' && <RulesAndLore />}
      </main>

      {/* Clean human footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-slate-300">Arcane Codex</span>
            <span aria-hidden="true">·</span>
            <span>Fantasy Character Generator</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono">Space</kbd> to roll</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveTab('generator')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Roll Again
            </button>
          </div>
        </div>
      </footer>
    </div>
  </div>
);
}

