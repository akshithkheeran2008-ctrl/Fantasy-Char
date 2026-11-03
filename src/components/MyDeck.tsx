import React from 'react';
import { Trash2, ExternalLink, Download, Layers, PlusCircle, Heart, Zap, Sword } from 'lucide-react';
import { Character } from '../types/character';
import { ClassCrest } from './ClassCrest';
import { CLASS_DETAILS } from '../data/fantasyData';

interface MyDeckProps {
  deck: Character[];
  onSelectCard: (character: Character) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
  onSwitchToGenerator: () => void;
}

export const MyDeck: React.FC<MyDeckProps> = ({
  deck,
  onSelectCard,
  onRemoveFromDeck,
  onClearDeck,
  onSwitchToGenerator,
}) => {
  const exportFullDeck = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(deck, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `my-alchemical-deck-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (deck.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto py-16 px-6 text-center bg-slate-950/85 border-2 border-amber-900/40 rounded-2xl shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-amber-950/40 border-2 border-amber-600/50 mx-auto flex items-center justify-center text-amber-400 mb-4 shadow-inner">
          <Layers size={32} />
        </div>
        <h2 className="text-2xl font-bold font-alchemist text-slate-100">Your Card Deck is Empty</h2>
        <p className="text-sm text-amber-200/70 max-w-md mx-auto mt-2 font-serif italic">
          You haven't saved any player cards to your deck yet. Transmute fantasy champions and click "Save to Deck" to build your hand.
        </p>
        <button
          onClick={onSwitchToGenerator}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-950/50 active:scale-95"
        >
          <PlusCircle size={16} />
          <span>Transmute Your First Card</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950/90 border-2 border-amber-900/50 shadow-xl backdrop-blur-md">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-400 uppercase font-mono mb-1">
            <span>🜁 Card Collection</span>
            <span aria-hidden="true" className="text-amber-700">·</span>
            <span>Alchemical Vault</span>
          </div>
          <h2 className="text-2xl font-bold font-alchemist text-slate-100 flex items-center gap-3">
            <span>My Deck</span>
            <span className="text-xs text-amber-300 font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/50">
              {deck.length} {deck.length === 1 ? 'Card' : 'Cards'}
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportFullDeck}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 transition-colors cursor-pointer border border-slate-700 shadow-sm"
          >
            <Download size={14} />
            <span>Export Deck (JSON)</span>
          </button>
          <button
            onClick={onClearDeck}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-rose-950/30 hover:bg-rose-950/60 text-rose-300 transition-colors cursor-pointer border border-rose-800/40 shadow-sm"
          >
            <Trash2 size={14} />
            <span>Empty Deck</span>
          </button>
        </div>
      </div>

      {/* Bordered Player Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {deck.map((card) => {
          const classInfo = CLASS_DETAILS[card.characterClass];
          const activePortrait =
            card.activePortraitMode === 'cartoon' && card.cartoonPortraitUrl
              ? card.cartoonPortraitUrl
              : card.portraitUrl || card.cartoonPortraitUrl;

          return (
            <div
              key={card.id}
              className="relative rounded-2xl p-2.5 bg-gradient-to-b from-[#261b10] via-[#141210] to-[#0a0c10] border-2 border-amber-600/70 shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group"
            >
              <div className="rounded-xl bg-slate-950/90 border border-amber-500/30 p-3.5 flex flex-col gap-3">
                {/* Card mini-header */}
                <div className="flex items-center justify-between gap-2 border-b border-amber-900/40 pb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-md bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                      <ClassCrest characterClass={card.characterClass} size={15} />
                    </div>
                    <div className="truncate">
                      <h3 className="text-base font-bold font-fantasy text-amber-200 truncate">
                        {card.fullName}
                      </h3>
                      <div className="text-[11px] text-slate-400">
                        {card.race} · <span className={classInfo.color}>{card.characterClass}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFromDeck(card.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors cursor-pointer shrink-0"
                    title="Remove card from deck"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Card portrait art preview */}
                <div className="w-full aspect-[16/10] rounded-lg overflow-hidden border border-amber-700/40 relative bg-slate-900 group-hover:border-amber-500/60 transition-colors">
                  {activePortrait ? (
                    <img
                      src={activePortrait}
                      alt={card.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                      <ClassCrest characterClass={card.characterClass} size={28} className="text-amber-400 mb-1" />
                      <span className="text-xs text-slate-400">{card.characterClass}</span>
                    </div>
                  )}

                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[10px] font-mono text-amber-300">
                    LVL {card.level}
                  </div>
                </div>

                {/* SPECIFICALLY REQUESTED STATS: Health, Mana, Strength */}
                <div className="grid grid-cols-3 gap-1.5 py-1 text-center">
                  <div className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-500/40">
                    <div className="flex items-center justify-center gap-1 text-[9px] font-bold uppercase text-rose-400">
                      <Heart size={10} className="fill-rose-500/40 text-rose-400" />
                      <span>HP</span>
                    </div>
                    <div className="text-sm font-black text-rose-100 font-mono tabular-nums">{card.health}</div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-sky-950/40 border border-sky-500/40">
                    <div className="flex items-center justify-center gap-1 text-[9px] font-bold uppercase text-sky-400">
                      <Zap size={10} className="fill-sky-500/40 text-sky-400" />
                      <span>Mana</span>
                    </div>
                    <div className="text-sm font-black text-sky-100 font-mono tabular-nums">{card.mana}</div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-amber-950/40 border border-amber-500/40">
                    <div className="flex items-center justify-center gap-1 text-[9px] font-bold uppercase text-amber-400">
                      <Sword size={10} className="text-amber-400" />
                      <span>STR</span>
                    </div>
                    <div className="text-sm font-black text-amber-100 font-mono tabular-nums">{card.strength}</div>
                  </div>
                </div>

                {/* Backstory or quote snippet */}
                {card.backstory ? (
                  <p className="text-[11px] text-amber-200/80 font-serif italic line-clamp-2 bg-amber-950/20 p-2 rounded border border-amber-900/30">
                    "{card.backstory}"
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 italic line-clamp-1">
                    "{card.quote}"
                  </p>
                )}
              </div>

              {/* Card Footer: View Card Action */}
              <div className="mt-2 pt-2 px-2 flex items-center justify-between border-t border-amber-900/40 text-xs">
                <span className="text-[10px] text-slate-400">{card.originRealm}</span>
                <button
                  onClick={() => onSelectCard(card)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>Play Card</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
