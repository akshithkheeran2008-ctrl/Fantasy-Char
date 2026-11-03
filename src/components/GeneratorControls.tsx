import React from 'react';
import { Dices, Sparkles, Wand2, Shield, Sword } from 'lucide-react';
import { CharacterClass, CharacterRace, RollMode } from '../types/character';

interface GeneratorControlsProps {
  onGenerate: (preferredClass?: CharacterClass | 'Any', preferredRace?: CharacterRace | 'Any') => void;
  selectedClass: CharacterClass | 'Any';
  setSelectedClass: (cls: CharacterClass | 'Any') => void;
  selectedRace: CharacterRace | 'Any';
  setSelectedRace: (race: CharacterRace | 'Any') => void;
  rollMode: RollMode;
  setRollMode: (mode: RollMode) => void;
  isRolling: boolean;
}

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  onGenerate,
  selectedClass,
  setSelectedClass,
  selectedRace,
  setSelectedRace,
  rollMode,
  setRollMode,
  isRolling,
}) => {
  const classes: (CharacterClass | 'Any')[] = [
    'Any',
    'Warrior',
    'Mage',
    'Rogue',
    'Paladin',
    'Ranger',
    'Cleric',
    'Bard',
    'Druid',
    'Warlock',
    'Monk',
  ];

  const races: (CharacterRace | 'Any')[] = [
    'Any',
    'Human',
    'High Elf',
    'Mountain Dwarf',
    'Dragonborn',
    'Tiefling',
    'Wood Elf',
    'Halfling',
    'Half-Orc',
    'Deep Gnome',
    'Aasimar',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* Primary Action Button (Alchemical Transmutation) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => onGenerate(selectedClass, selectedRace)}
          disabled={isRolling}
          className="w-full sm:w-auto min-w-[300px] px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-base md:text-lg rounded-xl shadow-xl shadow-amber-950/50 border border-amber-300/40 hover:shadow-amber-500/30 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 group active:scale-98 disabled:opacity-50"
        >
          <Dices
            size={24}
            className={`transition-transform duration-500 ${isRolling ? 'animate-spin' : 'group-hover:rotate-45'}`}
          />
          <span className="font-alchemist tracking-widest uppercase text-sm md:text-base">
            Transmute Hero
          </span>
          <Sparkles size={18} className="text-amber-900" />
        </button>

        {/* Quick archetype roll shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedClass('Warrior');
              onGenerate('Warrior', selectedRace);
            }}
            title="Generate a Warrior"
            className="px-3.5 py-2.5 rounded-lg bg-slate-950/80 border border-amber-900/40 hover:border-amber-500/60 hover:bg-slate-900 text-xs font-medium text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Shield size={14} className="text-amber-400" />
            <span className="font-serif">Warrior</span>
          </button>

          <button
            onClick={() => {
              setSelectedClass('Mage');
              onGenerate('Mage', selectedRace);
            }}
            title="Generate a Mage"
            className="px-3.5 py-2.5 rounded-lg bg-slate-950/80 border border-amber-900/40 hover:border-sky-500/60 hover:bg-slate-900 text-xs font-medium text-slate-300 hover:text-sky-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Wand2 size={14} className="text-sky-400" />
            <span className="font-serif">Mage</span>
          </button>

          <button
            onClick={() => {
              setSelectedClass('Rogue');
              onGenerate('Rogue', selectedRace);
            }}
            title="Generate a Rogue"
            className="px-3.5 py-2.5 rounded-lg bg-slate-950/80 border border-amber-900/40 hover:border-emerald-500/60 hover:bg-slate-900 text-xs font-medium text-slate-300 hover:text-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Sword size={14} className="text-emerald-400" />
            <span className="font-serif">Rogue</span>
          </button>
        </div>
      </div>

      {/* Filter & Customization Toolbar styled like an ancient ledger */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-900/40 backdrop-blur-md shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Class Filter */}
          <div>
            <label className="block text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-1.5">
              Target Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value as CharacterClass | 'Any')}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls === 'Any' ? 'Any Class (Random)' : cls}
                </option>
              ))}
            </select>
          </div>

          {/* Race Filter */}
          <div>
            <label className="block text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-1.5">
              Target Ancestry / Race
            </label>
            <select
              value={selectedRace}
              onChange={(e) => setSelectedRace(e.target.value as CharacterRace | 'Any')}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {races.map((r) => (
                <option key={r} value={r}>
                  {r === 'Any' ? 'Any Race (Random)' : r}
                </option>
              ))}
            </select>
          </div>

          {/* Dice Mechanics Mode */}
          <div>
            <label className="block text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-1.5">
              Attribute Roll Mode
            </label>
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setRollMode('standard')}
                className={`flex-1 py-1 px-2 text-center rounded text-xs font-medium transition-colors cursor-pointer ${
                  rollMode === 'standard'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="4d6 drop lowest (Tabletop standard)"
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setRollMode('heroic')}
                className={`flex-1 py-1 px-2 text-center rounded text-xs font-medium transition-colors cursor-pointer ${
                  rollMode === 'heroic'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Heroic power fantasy (Stats min 12)"
              >
                Heroic
              </button>
              <button
                type="button"
                onClick={() => setRollMode('chaotic')}
                className={`flex-1 py-1 px-2 text-center rounded text-xs font-medium transition-colors cursor-pointer ${
                  rollMode === 'chaotic'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Pure d20 chaos"
              >
                Chaotic
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
