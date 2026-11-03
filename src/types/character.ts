export type CharacterClass =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Paladin'
  | 'Ranger'
  | 'Cleric'
  | 'Bard'
  | 'Druid'
  | 'Warlock'
  | 'Monk';

export type CharacterRace =
  | 'Human'
  | 'High Elf'
  | 'Mountain Dwarf'
  | 'Dragonborn'
  | 'Tiefling'
  | 'Wood Elf'
  | 'Halfling'
  | 'Half-Orc'
  | 'Deep Gnome'
  | 'Aasimar';

export type CharacterAlignment =
  | 'Lawful Good'
  | 'Neutral Good'
  | 'Chaotic Good'
  | 'Lawful Neutral'
  | 'True Neutral'
  | 'Chaotic Neutral'
  | 'Lawful Evil'
  | 'Neutral Evil'
  | 'Chaotic Evil';

export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Character {
  id: string;
  name: string;
  surname: string;
  epithet: string;
  fullName: string;
  characterClass: CharacterClass;
  race: CharacterRace;
  alignment: CharacterAlignment;
  level: number;
  hitPoints: number;
  armorClass: number;
  // Specific requested Player Card stats
  health: number;
  mana: number;
  strength: number;
  attributes: Attributes;
  primaryWeapon: string;
  armorOrAttire: string;
  signatureAbility: string;
  originRealm: string;
  personalityTrait: string;
  flaw: string;
  quote: string;
  backstory?: string;
  portraitUrl?: string;
  cartoonPortraitUrl?: string;
  activePortraitMode?: 'realistic' | 'cartoon';
  createdAt: number;
  isFavorite?: boolean;
}

export type RollMode = 'standard' | 'heroic' | 'chaotic';
