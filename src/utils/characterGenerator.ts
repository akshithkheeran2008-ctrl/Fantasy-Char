import {
  Character,
  CharacterClass,
  CharacterRace,
  Attributes,
  RollMode,
} from '../types/character';
import {
  CLASS_DETAILS,
  CLASS_PORTRAITS,
  FIRST_NAMES,
  SURNAMES,
  EPITHETS,
  RACES,
  ALIGNMENTS,
  REALMS,
  PERSONALITY_TRAITS,
  FLAWS,
  QUOTES,
} from '../data/fantasyData';

function getRandomItem<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 4d6 drop lowest roll
function roll4d6DropLowest(): number {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
}

export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function generateRandomCharacter(options?: {
  preferredClass?: CharacterClass | 'Any';
  preferredRace?: CharacterRace | 'Any';
  rollMode?: RollMode;
}): Character {
  const classesList: CharacterClass[] = [
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

  const characterClass: CharacterClass =
    options?.preferredClass && options.preferredClass !== 'Any'
      ? options.preferredClass
      : getRandomItem(classesList);

  const racesList = Object.keys(RACES) as CharacterRace[];
  const race: CharacterRace =
    options?.preferredRace && options.preferredRace !== 'Any'
      ? options.preferredRace
      : getRandomItem(racesList);

  const classInfo = CLASS_DETAILS[characterClass];
  const raceInfo = RACES[race];

  // Generate attribute scores based on roll mode
  const mode = options?.rollMode || 'standard';
  const rawScores: number[] = [];
  for (let i = 0; i < 6; i++) {
    if (mode === 'heroic') {
      rawScores.push(Math.max(12, roll4d6DropLowest() + 1));
    } else if (mode === 'chaotic') {
      rawScores.push(Math.floor(Math.random() * 18) + 3);
    } else {
      rawScores.push(roll4d6DropLowest());
    }
  }

  // Sort descending to assign high values to class priorities
  rawScores.sort((a, b) => b - a);

  const attributes: Attributes = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  };

  // Primary and secondary stats get highest rolls
  attributes[classInfo.primaryAttr] = rawScores[0];
  attributes[classInfo.secondaryAttr] = rawScores[1];

  const remainingKeys: (keyof Attributes)[] = (
    ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as (keyof Attributes)[]
  ).filter((k) => k !== classInfo.primaryAttr && k !== classInfo.secondaryAttr);

  remainingKeys.forEach((key, idx) => {
    attributes[key] = rawScores[2 + idx];
  });

  // Apply racial bonus
  attributes[raceInfo.bonusAttr] = Math.min(20, attributes[raceInfo.bonusAttr] + 2);

  const level = 1;
  const conMod = calculateModifier(attributes.constitution);
  const dexMod = calculateModifier(attributes.dexterity);

  // HP = Class HitDie max + Con modifier (min 6)
  const hitPoints = Math.max(6, classInfo.hitDie + conMod);

  // Armor Class base calculation
  let baseAC = 10;
  if (characterClass === 'Warrior' || characterClass === 'Paladin') {
    baseAC = 16; // heavy plate / mail
  } else if (characterClass === 'Rogue' || characterClass === 'Ranger') {
    baseAC = 12 + Math.max(0, dexMod); // light leather
  } else if (characterClass === 'Mage' || characterClass === 'Warlock') {
    baseAC = 10 + Math.max(0, dexMod); // robes / mage armor
  } else if (characterClass === 'Monk') {
    baseAC = 10 + Math.max(0, dexMod) + Math.max(0, calculateModifier(attributes.wisdom));
  } else {
    baseAC = 14 + Math.min(2, Math.max(0, dexMod)); // medium mail
  }

  const firstName = getRandomItem(FIRST_NAMES);
  const surname = getRandomItem(SURNAMES);
  const epithet = getRandomItem(EPITHETS);
  const fullName = `${firstName} ${surname}`;

  const abilityObj = getRandomItem(classInfo.abilities);
  const signatureAbility = `${abilityObj.name} — ${abilityObj.description}`;

  // Generate specifically requested Player Card stats: Health, Mana, Strength
  let baseHealthPool = 80;
  let baseManaPool = 50;
  if (characterClass === 'Warrior' || characterClass === 'Paladin') {
    baseHealthPool = 140;
    baseManaPool = 40;
  } else if (characterClass === 'Mage' || characterClass === 'Warlock') {
    baseHealthPool = 80;
    baseManaPool = 160;
  } else if (characterClass === 'Cleric' || characterClass === 'Druid') {
    baseHealthPool = 100;
    baseManaPool = 130;
  } else if (characterClass === 'Rogue' || characterClass === 'Ranger') {
    baseHealthPool = 105;
    baseManaPool = 70;
  } else if (characterClass === 'Bard' || characterClass === 'Monk') {
    baseHealthPool = 95;
    baseManaPool = 90;
  }

  const health = baseHealthPool + calculateModifier(attributes.constitution) * 8 + Math.floor(Math.random() * 20);
  const mana = baseManaPool + calculateModifier(attributes.intelligence + attributes.wisdom) * 6 + Math.floor(Math.random() * 25);
  const strengthStat = attributes.strength;
  const portrait = CLASS_PORTRAITS[characterClass];

  return {
    id: `hero-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: firstName,
    surname,
    epithet,
    fullName,
    characterClass,
    race,
    alignment: getRandomItem(ALIGNMENTS),
    level,
    hitPoints,
    armorClass: baseAC,
    health: Math.max(50, health),
    mana: Math.max(20, mana),
    strength: Math.max(8, strengthStat),
    attributes,
    primaryWeapon: getRandomItem(classInfo.weapons),
    armorOrAttire: getRandomItem(classInfo.attire),
    signatureAbility,
    originRealm: getRandomItem(REALMS),
    personalityTrait: getRandomItem(PERSONALITY_TRAITS),
    flaw: getRandomItem(FLAWS),
    quote: getRandomItem(QUOTES),
    portraitUrl: portrait,
    createdAt: Date.now(),
  };
}

export function exportCharacterToMarkdown(c: Character): string {
  return `# ${c.fullName}, ${c.epithet}
**Race & Class:** ${c.race} ${c.characterClass} (Level ${c.level})
**Alignment:** ${c.alignment} | **Origin:** ${c.originRealm}
**Player Card Stats:** ❤️ Health: ${c.health} | 🔷 Mana: ${c.mana} | ⚔️ Strength: ${c.strength}
**Armor Class:** ${c.armorClass} | **Hit Points:** ${c.hitPoints} HP

## Ability Scores
- **Strength (STR):** ${c.attributes.strength} (${formatModifier(calculateModifier(c.attributes.strength))})
- **Dexterity (DEX):** ${c.attributes.dexterity} (${formatModifier(calculateModifier(c.attributes.dexterity))})
- **Constitution (CON):** ${c.attributes.constitution} (${formatModifier(calculateModifier(c.attributes.constitution))})
- **Intelligence (INT):** ${c.attributes.intelligence} (${formatModifier(calculateModifier(c.attributes.intelligence))})
- **Wisdom (WIS):** ${c.attributes.wisdom} (${formatModifier(calculateModifier(c.attributes.wisdom))})
- **Charisma (CHA):** ${c.attributes.charisma} (${formatModifier(calculateModifier(c.attributes.charisma))})

## Equipment & Combat
- **Primary Weapon:** ${c.primaryWeapon}
- **Armor / Attire:** ${c.armorOrAttire}
- **Signature Technique:** ${c.signatureAbility}

## Lore & Personality
- **Personality Trait:** ${c.personalityTrait}
- **Flaw:** ${c.flaw}
- **Famous Words:** ${c.quote}
${c.backstory ? `\n## Origin Backstory\n${c.backstory}\n` : ''}`;
}
