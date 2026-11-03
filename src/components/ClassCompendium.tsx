import React from 'react';
import { CharacterClass } from '../types/character';
import { CLASS_DETAILS, CLASS_PORTRAITS } from '../data/fantasyData';
import { ClassCrest } from './ClassCrest';
import { Dices } from 'lucide-react';

interface ClassCompendiumProps {
  onRollClass: (cls: CharacterClass) => void;
}

export const ClassCompendium: React.FC<ClassCompendiumProps> = ({ onRollClass }) => {
  const classes = Object.keys(CLASS_DETAILS) as CharacterClass[];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-400 uppercase font-mono mb-2">
          <span>🜁 Arcane Disciplines</span>
          <span aria-hidden="true" className="text-amber-700">·</span>
          <span>Grimoire Codex</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold font-alchemist tracking-wide text-slate-100">
          The Grand Compendium of Classes
        </h2>
        <p className="text-sm text-amber-200/70 mt-2 font-serif italic">
          Explore the martial traditions, arcane disciplines, and shadowy arts of fantasy archetypes.
          Select any discipline to forge a champion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map((cls) => {
          const detail = CLASS_DETAILS[cls];
          const portrait = CLASS_PORTRAITS[cls];

          return (
            <div
              key={cls}
              className="p-5 rounded-xl bg-slate-950/85 border border-amber-900/40 hover:border-amber-500/60 flex flex-col justify-between transition-all group shadow-xl backdrop-blur-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400">
                      <ClassCrest characterClass={cls} size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-display text-slate-100 group-hover:text-amber-300 transition-colors">
                        {cls}
                      </h3>
                      <div className="text-xs text-slate-400">{detail.role}</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">d{detail.hitDie}</span>
                </div>

                {portrait && (
                  <div className="w-full h-32 rounded-lg overflow-hidden border border-slate-800 mb-3 bg-slate-950">
                    <img
                      src={portrait}
                      alt={cls}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {detail.description}
                </p>

                <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3 mb-4">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Key Attribute:</span>
                    <span className="text-slate-200 font-semibold uppercase">
                      {detail.primaryAttr} & {detail.secondaryAttr}
                    </span>
                  </div>
                  <div className="text-slate-400">
                    <span className="block mb-1">Signature Techniques:</span>
                    <ul className="space-y-1 text-slate-300">
                      {detail.abilities.slice(0, 2).map((ab) => (
                        <li key={ab.name} className="flex items-center gap-1.5">
                          <span className="text-amber-400">·</span>
                          <span className="font-medium text-slate-200">{ab.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onRollClass(cls)}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Dices size={15} />
                <span>Forge {cls}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
