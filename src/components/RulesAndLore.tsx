import React from 'react';
import { BookOpen, Dices, Shield, Sparkles } from 'lucide-react';

export const RulesAndLore: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-400 uppercase font-mono mb-2">
          <span>🜃 Arcane Codex Principles</span>
          <span aria-hidden="true" className="text-amber-700">·</span>
          <span>Tabula Smaragdina</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold font-alchemist tracking-wide text-slate-100">
          Rules of the Realm & Transmutation Mechanics
        </h2>
        <p className="text-sm text-amber-200/70 mt-2 font-serif italic">
          An overview of character attributes, ability modifiers, and alchemical roll calculation formulas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-950/85 border border-amber-900/40 space-y-3 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-2.5 text-amber-300 font-alchemist font-bold text-lg">
            <Dices size={20} />
            <h3>Attribute Rolling Formula</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-serif">
            Characters are forged using the classic Tabletop 4d6 (drop the lowest die) mechanic.
            Four six-sided dice are simulated, the lowest roll is discarded, and the sum of the
            remaining three creates each score (ranging from 3 to 18).
          </p>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-400 font-mono">
            Modifier = Math.floor((Score - 10) / 2)
          </div>
          <p className="text-xs text-slate-400">
            A score of 10 represents average mortal prowess (+0 modifier). Scores of 16-18 signify exceptional heroics (+3 to +4 bonus to all relevant rolls).
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-400 font-display font-bold text-lg">
            <Shield size={20} />
            <h3>Armor & Vitality (HP & AC)</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Hit Points are determined by the adventurer's Class Hit Die (d10 for Warriors and Paladins,
            d8 for Rogues, Clerics, and Rangers, and d6 for Mages) boosted by their Constitution modifier.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Armor Class reflects armor density and agility: heavy plate grants high base protection,
            while nimble light-armor wearers add their full Dexterity modifier to dodge incoming blows.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-400 font-display font-bold text-lg">
            <Sparkles size={20} />
            <h3>Racial Ancestries & Gifts</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every hero belongs to a distinct ancestral bloodline with inherent racial gifts. High Elves
            boast innate arcane affinity, Mountain Dwarves possess formidable fortitude, and Half-Orcs
            command relentless endurance in combat.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-400 font-display font-bold text-lg">
            <BookOpen size={20} />
            <h3>Using Your Generated Heroes</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Use the "Copy Character" button to export a complete Markdown character sheet formatted for
            virtual tabletops (Roll20, Foundry VTT) or campaign note apps (Notion, Obsidian). You can
            also export your entire party roster as JSON.
          </p>
        </div>
      </div>
    </div>
  );
};
