import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookmarkPlus,
  BookmarkCheck,
  Copy,
  Check,
  Shield,
  Heart,
  Sparkles,
  MapPin,
  Crosshair,
  ScrollText,
  Gamepad2,
  RefreshCw,
  Download,
  Feather,
  BookOpen,
  Zap,
  Sword,
  Flame,
} from 'lucide-react';
import { Character } from '../types/character';
import { CLASS_DETAILS } from '../data/fantasyData';
import { ClassCrest } from './ClassCrest';
import { calculateModifier, formatModifier, exportCharacterToMarkdown } from '../utils/characterGenerator';
import { soundEffects } from '../utils/audio';
import { generateCartoonPortrait } from '../utils/cartoonPortraitGenerator';
import { generateCharacterBackstory } from '../utils/backstoryGenerator';

interface CharacterCardProps {
  character: Character;
  onSaveToDeck: (character: Character) => void;
  isSavedInDeck: boolean;
  onReroll: () => void;
  onUpdateCharacter: (updated: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSaveToDeck,
  isSavedInDeck,
  onReroll,
  onUpdateCharacter,
}) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [variantCounter, setVariantCounter] = useState(0);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [backstoryVariant, setBackstoryVariant] = useState(0);

  const classInfo = CLASS_DETAILS[character.characterClass];

  const handleCopy = async () => {
    try {
      const markdown = exportCharacterToMarkdown(character);
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      soundEffects.playSavePing();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSaveDeck = () => {
    onSaveToDeck(character);
    soundEffects.playSavePing();
  };

  // Generate cartoon/video game style portrait
  const handleGenerateCartoon = async () => {
    setIsGeneratingPortrait(true);
    soundEffects.playDiceRoll();

    try {
      const nextVariant = variantCounter + 1;
      setVariantCounter(nextVariant);

      const result = await generateCartoonPortrait(character, nextVariant);
      onUpdateCharacter({
        ...character,
        cartoonPortraitUrl: result.url,
        activePortraitMode: 'cartoon',
      });
      setImageError(false);
    } catch (err) {
      console.error('Failed to generate portrait:', err);
    } finally {
      setIsGeneratingPortrait(false);
    }
  };

  // Generate / Regenerate unique 1-to-2-sentence origin backstory
  const handleGenerateBackstory = async () => {
    setIsGeneratingBackstory(true);
    soundEffects.playDiceRoll();

    try {
      const nextVariant = backstoryVariant + 1;
      setBackstoryVariant(nextVariant);

      const backstory = await generateCharacterBackstory(character, nextVariant);
      onUpdateCharacter({
        ...character,
        backstory,
      });
    } catch (err) {
      console.error('Failed to generate backstory:', err);
    } finally {
      setIsGeneratingBackstory(false);
    }
  };

  // Switch between cartoon and realistic mode
  const togglePortraitMode = (mode: 'cartoon' | 'realistic') => {
    onUpdateCharacter({
      ...character,
      activePortraitMode: mode,
    });
    setImageError(false);
  };

  // Download the active portrait image
  const handleDownloadPortrait = () => {
    const activeUrl =
      character.activePortraitMode === 'cartoon' && character.cartoonPortraitUrl
        ? character.cartoonPortraitUrl
        : character.portraitUrl;

    if (!activeUrl) return;

    const anchor = document.createElement('a');
    anchor.href = activeUrl;
    anchor.download = `${character.name.toLowerCase()}-${character.characterClass.toLowerCase()}-card-portrait.png`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const isCartoonActive = character.activePortraitMode === 'cartoon' && !!character.cartoonPortraitUrl;
  const currentPortrait = isCartoonActive ? character.cartoonPortraitUrl : character.portraitUrl;

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={character.id}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl p-2.5 sm:p-3.5 bg-gradient-to-b from-[#2a1e12] via-[#15120e] to-[#0a0c10] border-4 border-amber-600/80 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(217,119,6,0.18)]"
        >
          {/* Inner Ornate Filigree Card Foil Inset Border */}
          <div className="relative rounded-xl bg-gradient-to-b from-[#131722]/95 via-[#0e121a]/95 to-[#0b0e14]/98 border-2 border-amber-500/40 p-4 sm:p-6 flex flex-col gap-4 shadow-inner">
            {/* Metallic Corner Ornaments */}
            <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
            <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
            <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

            {/* 1. TOP CARD HEADER: Name & Level Crest */}
            <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-950/60 via-slate-900/90 to-amber-950/60 border border-amber-600/40 shadow-md">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
                  <ClassCrest characterClass={character.characterClass} size={18} />
                </div>
                <div className="truncate">
                  {/* Stylized Fantasy Font for Character Name */}
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-fantasy tracking-wider bg-gradient-to-r from-amber-100 via-amber-300 to-amber-200 bg-clip-text text-transparent truncate drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]">
                    {character.fullName}
                  </h1>
                </div>
              </div>

              {/* Card Level / Cost Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/20 border border-amber-400/50 shrink-0">
                <span className="text-[10px] uppercase font-bold text-amber-300 font-mono tracking-wider">LVL</span>
                <span className="text-sm font-black text-amber-200 tabular-nums">{character.level}</span>
              </div>
            </div>

            {/* 2. FRAMED CARD ART WINDOW */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-xl overflow-hidden border-2 border-amber-600/50 bg-slate-950 shadow-lg group">
              {currentPortrait && !imageError ? (
                <img
                  key={currentPortrait}
                  src={currentPortrait}
                  alt={`${character.fullName} player card portrait`}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 to-slate-950">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-800 border border-amber-500/40 mb-2 text-amber-400">
                    <ClassCrest characterClass={character.characterClass} size={32} />
                  </div>
                  <div className="text-base font-bold font-display text-slate-200">{character.characterClass}</div>
                  <div className="text-xs text-slate-400">{character.race} · {classInfo.role}</div>
                </div>
              )}

              {/* Atmospheric lighting scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

              {/* Card Artwork Overlay Controls (Top & Bottom) */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs z-10">
                {/* Art Mode Switcher */}
                {character.cartoonPortraitUrl ? (
                  <div className="flex items-center gap-1 p-0.5 bg-slate-950/90 rounded-md border border-amber-500/40 backdrop-blur-xs">
                    <button
                      onClick={() => togglePortraitMode('realistic')}
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded transition-colors cursor-pointer ${
                        !isCartoonActive ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Classic
                    </button>
                    <button
                      onClick={() => togglePortraitMode('cartoon')}
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded transition-colors cursor-pointer ${
                        isCartoonActive ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Cartoon
                    </button>
                  </div>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-medium text-amber-300">
                    Classic Art
                  </span>
                )}

                {/* Download Art Icon */}
                <button
                  onClick={handleDownloadPortrait}
                  title="Download Card Art"
                  className="p-1.5 rounded-md bg-slate-950/80 border border-slate-700 hover:bg-slate-850 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <Download size={13} />
                </button>
              </div>

              {/* Bottom Art Banner Button: Generate / Regenerate Cartoon Portrait */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10">
                <span className="text-[11px] font-serif italic text-amber-200/90 drop-shadow">
                  "{character.epithet}"
                </span>

                <button
                  onClick={handleGenerateCartoon}
                  disabled={isGeneratingPortrait}
                  className="px-2.5 py-1 rounded-md bg-slate-950/90 border border-amber-500/50 hover:bg-amber-400 hover:text-slate-950 text-amber-300 text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isGeneratingPortrait ? (
                    <>
                      <RefreshCw size={11} className="animate-spin" />
                      <span>Drawing...</span>
                    </>
                  ) : character.cartoonPortraitUrl ? (
                    <>
                      <RefreshCw size={11} />
                      <span>Regenerate Art</span>
                    </>
                  ) : (
                    <>
                      <Gamepad2 size={12} />
                      <span>Generate Cartoon</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 3. TYPE STRIP: Race & Class Badge */}
            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-950/80 border border-amber-900/40 text-xs">
              <div className="flex items-center gap-2 font-medium">
                <span className="text-amber-400 font-semibold">{character.race}</span>
                <span aria-hidden="true" className="text-amber-700">·</span>
                <span className="text-slate-200 font-bold">{character.characterClass}</span>
                <span aria-hidden="true" className="text-amber-700">·</span>
                <span className="text-slate-400 text-[11px]">{character.alignment}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-serif italic truncate max-w-[150px]">
                {character.originRealm}
              </span>
            </div>

            {/* 4. RULES & ABILITY TEXT BOX */}
            <div className="p-3.5 rounded-xl bg-slate-950/85 border border-amber-900/30 flex flex-col gap-3 text-xs">
              {/* Signature Technique & Weapon */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Sparkles size={12} />
                    <span>Signature Technique</span>
                  </span>
                  <span className="text-slate-400 text-[10px]">{character.primaryWeapon}</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {character.signatureAbility}
                </p>
              </div>

              {/* Origin Chronicle / Backstory */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <BookOpen size={12} className="text-amber-400" />
                    <span>Origin Chronicle</span>
                  </div>

                  <button
                    onClick={handleGenerateBackstory}
                    disabled={isGeneratingBackstory}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingBackstory ? (
                      <>
                        <RefreshCw size={10} className="animate-spin" />
                        <span>Inscribing...</span>
                      </>
                    ) : character.backstory ? (
                      <>
                        <RefreshCw size={10} />
                        <span>Regenerate</span>
                      </>
                    ) : (
                      <>
                        <Feather size={10} />
                        <span>Generate Backstory</span>
                      </>
                    )}
                  </button>
                </div>

                {character.backstory ? (
                  <p className="text-amber-100/90 font-serif italic leading-relaxed text-xs bg-amber-950/20 p-2.5 rounded-lg border border-amber-600/30">
                    "{character.backstory}"
                  </p>
                ) : (
                  <p className="text-slate-500 font-serif italic text-[11px]">
                    No backstory inscribed yet. Click "Generate Backstory" to transmute their origin story.
                  </p>
                )}
              </div>
            </div>

            {/* 5. SPECIFICALLY REQUESTED PLAYER CARD STATS: HEALTH, MANA, AND STRENGTH */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {/* HEALTH STAT BADGE */}
              <div className="p-3 rounded-xl bg-gradient-to-b from-rose-950/60 to-rose-950/20 border-2 border-rose-500/50 shadow-md flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase tracking-wider mb-0.5">
                  <Heart size={14} className="fill-rose-500/40 text-rose-400" />
                  <span>Health</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-rose-100 tabular-nums font-mono drop-shadow-[0_2px_6px_rgba(244,63,94,0.4)]">
                  {character.health}
                </div>
                <div className="text-[10px] text-rose-300/70 font-semibold mt-0.5">Vitality Points</div>
              </div>

              {/* MANA STAT BADGE */}
              <div className="p-3 rounded-xl bg-gradient-to-b from-sky-950/60 to-sky-950/20 border-2 border-sky-500/50 shadow-md flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold uppercase tracking-wider mb-0.5">
                  <Zap size={14} className="fill-sky-500/40 text-sky-400" />
                  <span>Mana</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-sky-100 tabular-nums font-mono drop-shadow-[0_2px_6px_rgba(14,165,233,0.4)]">
                  {character.mana}
                </div>
                <div className="text-[10px] text-sky-300/70 font-semibold mt-0.5">Arcane Ether</div>
              </div>

              {/* STRENGTH STAT BADGE */}
              <div className="p-3 rounded-xl bg-gradient-to-b from-amber-950/60 to-amber-950/20 border-2 border-amber-500/50 shadow-md flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-0.5">
                  <Sword size={14} className="text-amber-400" />
                  <span>Strength</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-100 tabular-nums font-mono drop-shadow-[0_2px_6px_rgba(245,158,11,0.4)]">
                  {character.strength}
                </div>
                <div className="text-[10px] text-amber-300/70 font-semibold mt-0.5">Physical Might</div>
              </div>
            </div>

            {/* 6. CARD ACTION FOOTER (SAVE TO DECK & TRANSMUTE ANOTHER) */}
            <div className="pt-3 border-t border-amber-900/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {/* SPECIFICALLY REQUESTED: Save to Deck Button */}
                <button
                  onClick={handleSaveDeck}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer shadow-md ${
                    isSavedInDeck
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/20'
                      : 'bg-slate-950 border-amber-600/50 text-amber-300 hover:bg-amber-950/40 hover:border-amber-400'
                  }`}
                >
                  {isSavedInDeck ? <BookmarkCheck size={16} /> : <BookmarkPlus size={16} />}
                  <span>{isSavedInDeck ? 'Saved in Deck' : 'Save to Deck'}</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium rounded-xl bg-slate-950 border border-slate-700 text-slate-300 hover:text-slate-100 hover:bg-slate-900 transition-colors cursor-pointer"
                  title="Copy Card Markdown"
                >
                  {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <button
                onClick={onReroll}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all cursor-pointer shadow-md shadow-amber-950/40 active:scale-95"
              >
                <ScrollText size={15} />
                <span>Transmute Another</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
