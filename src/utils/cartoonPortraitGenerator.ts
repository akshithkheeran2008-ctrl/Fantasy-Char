import { Character, CharacterClass, CharacterRace } from '../types/character';
import { CARTOON_CLASS_PORTRAITS } from '../data/fantasyData';

// Color palettes for races
const RACE_PALETTES: Record<CharacterRace, { skin: string; skinShadow: string; eye: string }> = {
  Human: { skin: '#ffd8b3', skinShadow: '#e0a97a', eye: '#3b82f6' },
  'High Elf': { skin: '#fff0e0', skinShadow: '#e8cbaf', eye: '#10b981' },
  'Mountain Dwarf': { skin: '#eec7a2', skinShadow: '#c4956d', eye: '#d97706' },
  Dragonborn: { skin: '#d97706', skinShadow: '#92400e', eye: '#ef4444' },
  Tiefling: { skin: '#e11d48', skinShadow: '#9f1239', eye: '#fbbf24' },
  'Wood Elf': { skin: '#fcd34d', skinShadow: '#d97706', eye: '#059669' },
  Halfling: { skin: '#fed7aa', skinShadow: '#ea580c', eye: '#8b5cf6' },
  'Half-Orc': { skin: '#86efac', skinShadow: '#15803d', eye: '#eab308' },
  'Deep Gnome': { skin: '#cbd5e1', skinShadow: '#64748b', eye: '#38bdf8' },
  Aasimar: { skin: '#fef08a', skinShadow: '#facc15', eye: '#67e8f9' },
};

// Class specific themes and equipment for procedural cartoon avatar
const CLASS_CARTOON_THEMES: Record<
  CharacterClass,
  {
    bgGradient: [string, string];
    armorColor: string;
    trimColor: string;
    auraColor: string;
    weaponIcon: string;
    headgear: 'helm' | 'hat' | 'hood' | 'circlet' | 'none';
  }
> = {
  Warrior: {
    bgGradient: ['#7c2d12', '#1c1917'],
    armorColor: '#64748b',
    trimColor: '#f59e0b',
    auraColor: '#f97316',
    weaponIcon: '⚔️',
    headgear: 'helm',
  },
  Mage: {
    bgGradient: ['#1e1b4b', '#0f172a'],
    armorColor: '#4338ca',
    trimColor: '#38bdf8',
    auraColor: '#818cf8',
    weaponIcon: '🔮',
    headgear: 'hat',
  },
  Rogue: {
    bgGradient: ['#064e3b', '#022c22'],
    armorColor: '#334155',
    trimColor: '#10b981',
    auraColor: '#34d399',
    weaponIcon: '🗡️',
    headgear: 'hood',
  },
  Paladin: {
    bgGradient: ['#78350f', '#1e293b'],
    armorColor: '#eab308',
    trimColor: '#fef08a',
    auraColor: '#fbbf24',
    weaponIcon: '🛡️',
    headgear: 'helm',
  },
  Ranger: {
    bgGradient: ['#14532d', '#052e16'],
    armorColor: '#166534',
    trimColor: '#86efac',
    auraColor: '#4ade80',
    weaponIcon: '🏹',
    headgear: 'hood',
  },
  Cleric: {
    bgGradient: ['#0e7490', '#083344'],
    armorColor: '#f8fafc',
    trimColor: '#38bdf8',
    auraColor: '#7dd3fc',
    weaponIcon: '✨',
    headgear: 'circlet',
  },
  Bard: {
    bgGradient: ['#831843', '#4a044e'],
    armorColor: '#db2777',
    trimColor: '#fbcfe8',
    auraColor: '#f472b6',
    weaponIcon: '🪕',
    headgear: 'hat',
  },
  Druid: {
    bgGradient: ['#365314', '#1a2e05'],
    armorColor: '#65a30d',
    trimColor: '#bef264',
    auraColor: '#a3e635',
    weaponIcon: '🌿',
    headgear: 'circlet',
  },
  Warlock: {
    bgGradient: ['#581c87', '#2e1065'],
    armorColor: '#7e22ce',
    trimColor: '#e879f9',
    auraColor: '#c084fc',
    weaponIcon: '👁️',
    headgear: 'hood',
  },
  Monk: {
    bgGradient: ['#9a3412', '#431407'],
    armorColor: '#ea580c',
    trimColor: '#fed7aa',
    auraColor: '#fb923c',
    weaponIcon: '👊',
    headgear: 'none',
  },
};

/**
 * Generate a procedural cartoon video game vector avatar (SVG data URL)
 * Completely unique with race skin tones, expressive cartoon eyes, hair, headgear, and weapon.
 */
export function generateProceduralCartoonAvatar(character: Character, variantIndex: number = 0): string {
  const racePalette = RACE_PALETTES[character.race] || RACE_PALETTES.Human;
  const classTheme = CLASS_CARTOON_THEMES[character.characterClass] || CLASS_CARTOON_THEMES.Warrior;

  const expressions = [
    { mouth: 'M 180 260 Q 200 280 220 260', desc: 'Heroic Grin' },
    { mouth: 'M 185 265 Q 200 272 215 265', desc: 'Calm Smile' },
    { mouth: 'M 180 255 Q 200 290 220 255', desc: 'Joyful Laugh' },
    { mouth: 'M 185 268 L 215 260', desc: 'Sly Smirk' },
  ];
  const expression = expressions[variantIndex % expressions.length];

  const eyeTypes = [
    // Big animated game eyes
    `<ellipse cx="175" cy="210" rx="14" ry="16" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
     <circle cx="178" cy="212" r="9" fill="${racePalette.eye}"/>
     <circle cx="180" cy="208" r="4" fill="#ffffff"/>
     <ellipse cx="225" cy="210" rx="14" ry="16" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
     <circle cx="222" cy="212" r="9" fill="${racePalette.eye}"/>
     <circle cx="224" cy="208" r="4" fill="#ffffff"/>`,
    // Winking game eyes
    `<ellipse cx="175" cy="210" rx="14" ry="16" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
     <circle cx="178" cy="212" r="9" fill="${racePalette.eye}"/>
     <circle cx="180" cy="208" r="4" fill="#ffffff"/>
     <path d="M 215 212 Q 225 204 235 212" stroke="#1e293b" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  ];
  const eyeMarkup = eyeTypes[variantIndex % eyeTypes.length];

  // Headgear SVG
  let headgearSvg = '';
  if (classTheme.headgear === 'helm') {
    headgearSvg = `
      <!-- Knight / Paladin Game Helmet -->
      <path d="M 140 180 C 140 110, 260 110, 260 180 L 255 195 L 145 195 Z" fill="${classTheme.armorColor}" stroke="#1e293b" stroke-width="4"/>
      <path d="M 190 110 L 200 65 L 210 110 Z" fill="${classTheme.trimColor}" stroke="#1e293b" stroke-width="3"/>
      <path d="M 150 175 L 250 175" stroke="${classTheme.trimColor}" stroke-width="6" stroke-linecap="round"/>
    `;
  } else if (classTheme.headgear === 'hat') {
    headgearSvg = `
      <!-- Wizard / Mage Pointed Hat -->
      <path d="M 130 190 Q 200 170 270 190 C 250 120, 230 60, 200 40 C 180 90, 160 130, 130 190 Z" fill="${classTheme.armorColor}" stroke="#1e293b" stroke-width="4"/>
      <path d="M 120 190 Q 200 175 280 190 Q 200 205 120 190 Z" fill="${classTheme.trimColor}" stroke="#1e293b" stroke-width="3"/>
      <circle cx="200" cy="40" r="8" fill="${classTheme.trimColor}"/>
    `;
  } else if (classTheme.headgear === 'hood') {
    headgearSvg = `
      <!-- Rogue / Ranger Shadow Hood -->
      <path d="M 130 190 C 130 95, 270 95, 270 190 C 275 240, 255 260, 245 270 C 230 220, 170 220, 155 270 C 145 260, 125 240, 130 190 Z" fill="${classTheme.armorColor}" stroke="#1e293b" stroke-width="4"/>
      <path d="M 140 190 Q 200 160 260 190" stroke="${classTheme.trimColor}" stroke-width="3" fill="none"/>
    `;
  } else if (classTheme.headgear === 'circlet') {
    headgearSvg = `
      <!-- Holy Circlet -->
      <path d="M 145 180 Q 200 160 255 180" stroke="${classTheme.trimColor}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <polygon points="200,160 207,175 193,175" fill="#38bdf8"/>
    `;
  } else {
    // Spiky anime hero hair
    headgearSvg = `
      <path d="M 145 180 C 130 130, 170 120, 185 100 C 195 125, 220 90, 235 110 C 250 125, 265 140, 255 180 Z" fill="#78350f" stroke="#1e293b" stroke-width="4"/>
    `;
  }

  // Elf pointed ears or horns
  let earSvg = `
    <circle cx="140" cy="220" r="12" fill="${racePalette.skinShadow}"/>
    <circle cx="260" cy="220" r="12" fill="${racePalette.skinShadow}"/>
  `;
  if (character.race.includes('Elf') || character.race === 'Deep Gnome') {
    earSvg = `
      <!-- Elven Pointed Ears -->
      <polygon points="145,210 115,190 145,230" fill="${racePalette.skin}" stroke="#1e293b" stroke-width="3"/>
      <polygon points="255,210 285,190 255,230" fill="${racePalette.skin}" stroke="#1e293b" stroke-width="3"/>
    `;
  } else if (character.race === 'Tiefling') {
    earSvg = `
      <!-- Demonic Horns -->
      <path d="M 160 140 Q 130 80 110 70 Q 140 90 165 125" fill="#4c0519" stroke="#1e293b" stroke-width="3"/>
      <path d="M 240 140 Q 270 80 290 70 Q 260 90 235 125" fill="#4c0519" stroke="#1e293b" stroke-width="3"/>
    `;
  }

  const svgContent = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${classTheme.bgGradient[0]}"/>
        <stop offset="100%" stop-color="${classTheme.bgGradient[1]}"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>

    <!-- Background Frame -->
    <rect width="400" height="400" rx="24" fill="url(#bgGrad)"/>

    <!-- Background Arcane Ring -->
    <circle cx="200" cy="200" r="160" fill="none" stroke="${classTheme.auraColor}" stroke-width="3" opacity="0.3" stroke-dasharray="10 8"/>
    <circle cx="200" cy="200" r="140" fill="none" stroke="${classTheme.trimColor}" stroke-width="1.5" opacity="0.25"/>

    <!-- Dynamic Aura Sparks -->
    <circle cx="70" cy="90" r="4" fill="${classTheme.trimColor}" filter="url(#glow)"/>
    <circle cx="330" cy="110" r="5" fill="${classTheme.auraColor}" filter="url(#glow)"/>
    <circle cx="80" cy="300" r="3" fill="#ffffff" filter="url(#glow)"/>
    <circle cx="320" cy="290" r="4" fill="${classTheme.trimColor}" filter="url(#glow)"/>

    <!-- Shoulders & Armor (Cel-shaded Video Game Style) -->
    <path d="M 90 380 Q 200 320 310 380 L 320 400 L 80 400 Z" fill="${classTheme.armorColor}" stroke="#1e293b" stroke-width="5"/>
    <path d="M 120 360 Q 200 340 280 360" stroke="${classTheme.trimColor}" stroke-width="6" fill="none"/>
    <polygon points="200,340 215,365 185,365" fill="${classTheme.trimColor}"/>

    <!-- Neck & Face -->
    <rect x="180" y="270" width="40" height="30" fill="${racePalette.skinShadow}"/>
    ${earSvg}

    <!-- Round Cute Cartoon Head -->
    <circle cx="200" cy="220" r="60" fill="${racePalette.skin}" stroke="#1e293b" stroke-width="4"/>

    <!-- Cheeks (Kawaii / Video game blush) -->
    <ellipse cx="160" cy="235" rx="8" ry="4" fill="#fb7185" opacity="0.5"/>
    <ellipse cx="240" cy="235" rx="8" ry="4" fill="#fb7185" opacity="0.5"/>

    <!-- Eyes -->
    ${eyeMarkup}

    <!-- Eyebrows -->
    <path d="M 165 190 Q 178 185 190 190" stroke="#1e293b" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M 210 190 Q 222 185 235 190" stroke="#1e293b" stroke-width="4" stroke-linecap="round" fill="none"/>

    <!-- Nose -->
    <circle cx="200" cy="235" r="3" fill="${racePalette.skinShadow}"/>

    <!-- Mouth -->
    <path d="${expression.mouth}" stroke="#1e293b" stroke-width="4" stroke-linecap="round" fill="none"/>

    <!-- Headgear / Hat / Hair Layer -->
    ${headgearSvg}

    <!-- Video Game HUD Badge & Weapon Emblem in corner -->
    <rect x="18" y="18" width="56" height="56" rx="14" fill="#0f172a" stroke="${classTheme.trimColor}" stroke-width="2" opacity="0.9"/>
    <text x="46" y="52" font-size="26" text-anchor="middle">${classTheme.weaponIcon}</text>

    <!-- Class title footer banner -->
    <rect x="50" y="356" width="300" height="30" rx="8" fill="#090d16" stroke="${classTheme.trimColor}" stroke-width="1.5" opacity="0.9"/>
    <text x="200" y="376" font-family="sans-serif" font-weight="bold" font-size="13" fill="#f8fafc" text-anchor="middle" letter-spacing="2">
      ${character.characterClass.toUpperCase()} · ${character.race.toUpperCase()}
    </text>
  </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
}

/**
 * Main routine to generate or regenerate a cartoon/video game style portrait.
 * Attempts server-side Gemini image generation, or falls back seamlessly to
 * authentic cel-shaded artwork and dynamic procedural video game SVG avatars!
 */
export async function generateCartoonPortrait(
  character: Character,
  variantIndex: number = 0,
  stylePrompt?: string
): Promise<{ url: string; source: 'gemini' | 'cel-shaded-art' | 'procedural' }> {
  // 1. Try server-side Gemini image generation if available
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('/api/generate-portrait', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ character, stylePrompt }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.imageUrl && !data.fallback) {
        return { url: data.imageUrl, source: 'gemini' };
      }
    }
  } catch {
    // Timeout or server error, proceed immediately to local engine
  }

  // 2. Check if we have pre-rendered cel-shaded cartoon art for this class
  const classCartoonList = CARTOON_CLASS_PORTRAITS[character.characterClass];
  if (classCartoonList && classCartoonList.length > 0 && variantIndex % 2 === 0) {
    const chosen = classCartoonList[variantIndex % classCartoonList.length];
    return { url: chosen, source: 'cel-shaded-art' };
  }

  // 3. Generate high-fidelity procedural cartoon video game avatar with custom race, expression, and gear
  const proceduralUrl = generateProceduralCartoonAvatar(character, variantIndex);
  return { url: proceduralUrl, source: 'procedural' };
}
