import React from 'react';
import { Trash2, ExternalLink, Download, Users, PlusCircle } from 'lucide-react';
import { Character } from '../types/character';
import { ClassCrest } from './ClassCrest';
import { CLASS_DETAILS } from '../data/fantasyData';

interface PartyRosterProps {
  roster: Character[];
  onSelectCharacter: (character: Character) => void;
  onRemoveFromRoster: (id: string) => void;
  onClearRoster: () => void;
  onSwitchToGenerator: () => void;
}

export const PartyRoster: React.FC<PartyRosterProps> = ({
  roster,
  onSelectCharacter,
  onRemoveFromRoster,
  onClearRoster,
  onSwitchToGenerator,
}) => {
  const exportFullRoster = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(roster, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `adventuring-party-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (roster.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto py-16 px-6 text-center bg-slate-950/85 border border-amber-900/40 rounded-xl shadow-xl backdrop-blur-sm">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-amber-900/50 mx-auto flex items-center justify-center text-amber-400 mb-4 shadow-inner">
          <Users size={32} />
        </div>
        <h2 className="text-xl font-bold font-alchemist text-slate-200">The Guild Ledger is Empty</h2>
        <p className="text-sm text-amber-200/70 max-w-md mx-auto mt-2 font-serif italic">
          No champions have been inscribed into the grand ledger yet. Transmute heroes and click "Save to Party" to recruit them.
        </p>
        <button
          onClick={onSwitchToGenerator}
          className="mt-6 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all inline-flex items-center gap-2 cursor-pointer shadow-md shadow-amber-950/30"
        >
          <PlusCircle size={16} />
          <span>Transmute Your First Hero</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/85 border border-amber-900/40 shadow-xl backdrop-blur-sm">
        <div>
          <h2 className="text-xl font-bold font-alchemist text-slate-100 flex items-center gap-2">
            <span>Guild Hall Roster</span>
            <span className="text-xs text-amber-300 font-mono font-semibold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40">
              {roster.length} {roster.length === 1 ? 'Hero' : 'Heroes'} Enlisted
            </span>
          </h2>
          <p className="text-xs text-amber-200/70 mt-1 font-serif italic">
            Assembled companions ready for dungeon expeditions and heroic campaigns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportFullRoster}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
          >
            <Download size={14} />
            <span>Export Roster (JSON)</span>
          </button>
          <button
            onClick={onClearRoster}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-950/30 hover:bg-rose-950/60 text-rose-300 transition-colors cursor-pointer border border-rose-800/40"
          >
            <Trash2 size={14} />
            <span>Disband Party</span>
          </button>
        </div>
      </div>

      {/* Hero cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roster.map((hero) => {
          const classInfo = CLASS_DETAILS[hero.characterClass];
          return (
            <div
              key={hero.id}
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0 overflow-hidden">
                      {hero.cartoonPortraitUrl || hero.portraitUrl ? (
                        <img
                          src={hero.activePortraitMode === 'cartoon' && hero.cartoonPortraitUrl ? hero.cartoonPortraitUrl : hero.portraitUrl || hero.cartoonPortraitUrl}
                          alt={hero.fullName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ClassCrest characterClass={hero.characterClass} size={20} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-100 font-display leading-tight">
                        {hero.fullName}
                      </h3>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {hero.race} · <span className={classInfo.color}>{hero.characterClass}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFromRoster(hero.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded transition-colors cursor-pointer"
                    title="Dismiss hero"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="text-xs text-slate-400 italic line-clamp-1 mb-3">
                  "{hero.epithet}"
                </p>

                {/* Stat pills summary */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-xs">
                  <div className="text-left">
                    <div className="text-[10px] uppercase text-slate-500 font-semibold">HP</div>
                    <div className="text-sm font-bold text-slate-200 tabular-nums">{hero.hitPoints}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase text-slate-500 font-semibold">AC</div>
                    <div className="text-sm font-bold text-slate-200 tabular-nums">{hero.armorClass}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase text-slate-500 font-semibold">Primary</div>
                    <div className="text-sm font-bold text-slate-200 tabular-nums">
                      {hero.attributes[classInfo.primaryAttr]} {classInfo.primaryAttr.slice(0, 3).toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Weapon:</span> {hero.primaryWeapon}
                </div>

                {hero.backstory && (
                  <p className="mt-2 text-[11px] text-amber-200/80 font-serif italic line-clamp-2 bg-amber-950/20 p-2 rounded border border-amber-900/30">
                    "{hero.backstory}"
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-800/60">
                <span className="text-[11px] text-slate-400">{hero.originRealm}</span>
                <button
                  onClick={() => onSelectCharacter(hero)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>View Folio</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
