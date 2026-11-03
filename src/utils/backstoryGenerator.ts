import { Character } from '../types/character';

// Procedural origin story templates (1 to 2 sentences) customized by character features
const ORIGIN_TEMPLATES = [
  (c: Character) =>
    `Born beneath an eclipse in the ${c.originRealm}, ${c.name} took up their ${c.primaryWeapon} after their ancestral temple fell to an ancient curse. Now they wander the frontiers, seeking redemption through mastery of their ${c.signatureAbility.split('—')[0].trim()}.`,

  (c: Character) =>
    `Exiled from the ${c.originRealm} for uncovering forbidden celestial secrets, ${c.name} forged their ${c.primaryWeapon} from fallen star-iron. Driven by their solemn vow, they travel the realm proving that true strength lies beyond mortal boundaries.`,

  (c: Character) =>
    `Once a humble apprentice in the ${c.originRealm}, ${c.name} unlocked the dormant power of ${c.signatureAbility.split('—')[0].trim()} during an unprovoked demonic siege. With their ${c.primaryWeapon} at their side, they will not rest until the realm's sacred balance is restored.`,

  (c: Character) =>
    `Orphaned in the shadow of the ${c.originRealm}, ${c.fullName} survived the wilderness through unmatched tenacity and the lethal grace of their ${c.primaryWeapon}. Word of their martial prowess has begun spreading across the tavern hearths of the civilized kingdoms.`,

  (c: Character) =>
    `Bound by an unbreakable alchemical oath to the elders of ${c.originRealm}, ${c.name} was entrusted with their ${c.primaryWeapon} to hunt an encroaching primeval darkness. Though haunted by past failures, their blade never wavers when innocent lives are on the line.`,

  (c: Character) =>
    `Trained in secret among the cloistered ruins of ${c.originRealm}, ${c.fullName} escaped an inquisitor's purge with nothing but their ${c.primaryWeapon} and an unyielding will. Every battle is a step toward reclaiming the stolen legacy of their ancestral bloodline.`,
];

/**
 * Generate a unique 1-to-2-sentence origin backstory for the character.
 * Calls server-side Gemini 3.8 Flash, or falls back seamlessly to procedural lore matrix.
 */
export async function generateCharacterBackstory(
  character: Character,
  seedIndex: number = 0
): Promise<string> {
  // 1. Try server-side Gemini API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch('/api/generate-backstory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ character }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.backstory && !data.fallback) {
        return data.backstory;
      }
    }
  } catch {
    // Timeout or network error, proceed immediately to local generator
  }

  // 2. Procedural Fallback Engine
  const template = ORIGIN_TEMPLATES[seedIndex % ORIGIN_TEMPLATES.length];
  return template(character);
}
