import { CharacterClass, CharacterRace, CharacterAlignment, Attributes } from '../types/character';

export const CLASS_PORTRAITS: Partial<Record<CharacterClass, string>> = {
  Warrior: '/src/assets/images/fantasy_warrior_portrait_1793717679568.jpg',
  Mage: '/src/assets/images/fantasy_mage_portrait_1793717680064.jpg',
  Rogue: '/src/assets/images/fantasy_rogue_portrait_1793717680609.jpg',
};

export const CARTOON_CLASS_PORTRAITS: Partial<Record<CharacterClass, string[]>> = {
  Warrior: [
    '/src/assets/images/cartoon_warrior_art_1793718104846.jpg',
  ],
  Mage: [
    '/src/assets/images/cartoon_mage_art_1793718104610.jpg',
  ],
  Rogue: [
    '/src/assets/images/cartoon_rogue_art_1793718105656.jpg',
  ],
  Paladin: [
    '/src/assets/images/cartoon_paladin_art_1793718129330.jpg',
  ],
  Ranger: [
    '/src/assets/images/cartoon_ranger_art_1793718129482.jpg',
  ],
  Cleric: [
    '/src/assets/images/cartoon_cleric_art_1793718130649.jpg',
  ],
};

export const CLASS_DETAILS: Record<
  CharacterClass,
  {
    role: string;
    description: string;
    hitDie: number;
    primaryAttr: keyof Attributes;
    secondaryAttr: keyof Attributes;
    weapons: string[];
    attire: string[];
    abilities: { name: string; description: string }[];
    color: string;
    accentColor: string;
  }
> = {
  Warrior: {
    role: 'Frontline Vanguard',
    description: 'Masters of martial combat, heavy armor, and tactical battlefield dominance.',
    hitDie: 10,
    primaryAttr: 'strength',
    secondaryAttr: 'constitution',
    weapons: [
      'Gilded Greatsword of Valyria',
      'Dragonbone Warhamer',
      'Twin Damascus Steel Battleaxes',
      'Runic Broadsword & Kite Shield',
      'Adamantine Halberd',
    ],
    attire: [
      'Ornate Dragonscale Plate',
      'Forgemaster Steel Full-Plate',
      'Hardened Iron Splint Armor',
      'Reinforced Vanguard Cuirass',
    ],
    abilities: [
      { name: 'Whirlwind Cleave', description: 'Sweeps weapon in an arc, cleaving through multiple foes.' },
      { name: 'Bastion of Iron', description: 'Locks down stance, reducing incoming damage by half.' },
      { name: 'War Cry of the Ancients', description: 'Bolsters allies’ attack morale with an ear-shattering roar.' },
    ],
    color: 'text-amber-400',
    accentColor: 'border-amber-500/40 bg-amber-500/10',
  },
  Mage: {
    role: 'Arcane Conduit',
    description: 'Scholars of the arcane mysteries who weave cosmic energy into devastating incantations.',
    hitDie: 6,
    primaryAttr: 'intelligence',
    secondaryAttr: 'wisdom',
    weapons: [
      'Starlight Spire Crystal Staff',
      'Tome of Celestial Equations',
      'Wand of Frost & Void',
      'Silverbound Ritual Athame',
      'Astral Prism Focus',
    ],
    attire: [
      'Embroidered Midnight Robes',
      'Silk Shroud of the Astral Conclave',
      'Runed Linen Vestments',
      'Veil of the Sapphire Scribes',
    ],
    abilities: [
      { name: 'Arcane Singularity', description: 'Collapses cosmic ether into a gravity vortex that detonates.' },
      { name: 'Chronoshift Ward', description: 'Reverses localized time by 3 seconds to negate fatal strikes.' },
      { name: 'Frostfire Cascade', description: 'Unleashes alternating lances of freezing frost and scorching pyre.' },
    ],
    color: 'text-sky-400',
    accentColor: 'border-sky-500/40 bg-sky-500/10',
  },
  Rogue: {
    role: 'Shadow Infiltrator',
    description: 'Agile scoundrels, scouts, and assassins who strike from the dark with lethal precision.',
    hitDie: 8,
    primaryAttr: 'dexterity',
    secondaryAttr: 'charisma',
    weapons: [
      'Dual Serrated Shadow Daggers',
      'Whispering Recurve Bow',
      'Nightfall Stiletto & Parrying Main-Gauche',
      'Concealed Wrist Crossbow',
      'Venom-Tipped Rapier',
    ],
    attire: [
      'Supple Shadow-Leather Cowl & Tunic',
      'Muffled Raven-Feather Gambeson',
      'Studded Gloomstalker Leathers',
      'Darkened Spidersilk Garments',
    ],
    abilities: [
      { name: 'Shadowstep Ambush', description: 'Melts through adjacent shadows to strike from behind.' },
      { name: 'Venomous Flurry', description: 'Unleashes rapid precision strikes coated with paralytic venom.' },
      { name: 'Smoke & Mirage', description: 'Deploys an alchemical flashbang that blinds attackers and creates decoys.' },
    ],
    color: 'text-emerald-400',
    accentColor: 'border-emerald-500/40 bg-emerald-500/10',
  },
  Paladin: {
    role: 'Holy Champion',
    description: 'Sworn protectors bound by solemn sacred oaths to vanquish evil and shield the innocent.',
    hitDie: 10,
    primaryAttr: 'strength',
    secondaryAttr: 'charisma',
    weapons: [
      'Sunburst Flanged Mace & Tower Shield',
      'Consecrated Bastard Sword',
      'Silver Morningstar',
      'Radiant Greatlance',
    ],
    attire: [
      'Gleaming Sunforged Plate Armor',
      'Cloak of the Dawn Vow',
      'Blessed Crusader Mail',
    ],
    abilities: [
      { name: 'Divine Smite', description: 'Infuses a melee strike with burning solar wrath.' },
      { name: 'Aura of Courage', description: 'Emits a golden protective aura that immunizes allies to terror.' },
      { name: 'Lay on Hands', description: 'Channels miraculous radiant energy to mend mortal wounds.' },
    ],
    color: 'text-yellow-300',
    accentColor: 'border-yellow-500/40 bg-yellow-500/10',
  },
  Ranger: {
    role: 'Wilderness Marksman',
    description: 'Solitary stalkers of the uncharted frontiers who harmonize with primal beasts and flora.',
    hitDie: 10,
    primaryAttr: 'dexterity',
    secondaryAttr: 'wisdom',
    weapons: [
      'Heartwood Longbow',
      'Twin Hunting Shortswords',
      'Heavy Piercing Crossbow',
      'Thorn-Woven Spear',
    ],
    attire: [
      'Camouflaged Woodland Leathers',
      'Wolf-Hide Mantle & Bracers',
      'Elven Leaf-Weave Cuirass',
    ],
    abilities: [
      { name: 'Hail of Thorns', description: 'Fires an arrow that bursts into a storm of piercing briars.' },
      { name: "Hunter's Quarry", description: 'Marks a nemesis, revealing weaknesses and tracking their pulse.' },
      { name: 'Call of the Beast', description: 'Summons a spectral dire-wolf companion into the fray.' },
    ],
    color: 'text-teal-400',
    accentColor: 'border-teal-500/40 bg-teal-500/10',
  },
  Cleric: {
    role: 'Divine Healer & Priest',
    description: 'Direct emissaries of divine deities who wield miracles of healing, light, and judgment.',
    hitDie: 8,
    primaryAttr: 'wisdom',
    secondaryAttr: 'charisma',
    weapons: [
      'Luminescent Scepter of Grace',
      'Ancestral War Flail',
      'Censer of Holy Fire',
      'Engraved Reliquary Shield',
    ],
    attire: [
      'Sanctified Chainmail Vestments',
      'Robes of the High Altar',
      'Ivory Enamelled Breastplate',
    ],
    abilities: [
      { name: 'Circle of Restoration', description: 'Conjures a sanctuary of holy rain that restores party vigor.' },
      { name: 'Pillar of Radiance', description: 'Calls down a column of sacred sunlight to scorch unholy fiends.' },
      { name: 'Sanctuary Ward', description: 'Wards an imperiled ally against hostile aggression.' },
    ],
    color: 'text-cyan-300',
    accentColor: 'border-cyan-500/40 bg-cyan-500/10',
  },
  Bard: {
    role: 'Skald & Enchanter',
    description: 'Masters of story, song, and subtle enchantment whose melodies reshape reality.',
    hitDie: 8,
    primaryAttr: 'charisma',
    secondaryAttr: 'dexterity',
    weapons: [
      'Gilded Elven Lute & Concealed Foil',
      'Silver Mandolin & Stiletto',
      'Carved Horn of Valor',
      'Enchanted Runic Flute',
    ],
    attire: [
      'Velvet Courtier Tunic & Feathered Cap',
      'Embroidered Troubadour Leathers',
      'Silk Cloak of Many Shimmers',
    ],
    abilities: [
      { name: 'Ballad of Inspiration', description: 'Inspires companion heroism, granting bonus prowess dice.' },
      { name: 'Dissonant Cacophony', description: 'Strums a discordant frequency that disrupts enemy focus.' },
      { name: 'Siren’s Lullaby', description: 'Weaves a hypnotic ballad that pacifies hostile foes.' },
    ],
    color: 'text-rose-400',
    accentColor: 'border-rose-500/40 bg-rose-500/10',
  },
  Druid: {
    role: 'Primal Shapeshifter',
    description: 'Guardians of ancient groves who channel nature spirits, storms, and beast aspects.',
    hitDie: 8,
    primaryAttr: 'wisdom',
    secondaryAttr: 'constitution',
    weapons: [
      'Living Ironwood Quarterstaff',
      'Flint-Tipped Scythe',
      'Totemic Ashwood Club',
      'Yew Bow strung with Vine',
    ],
    attire: [
      'Hide Garb with Birchbark Plates',
      'Mantle of Living Moss & Antlers',
      'Woven Briar Vestments',
    ],
    abilities: [
      { name: 'Wild Shape: Iron Bear', description: 'Morphs into an armored apex beast with shattering claws.' },
      { name: 'Call Lightning', description: 'Gathers tempest clouds to strike targeted ground repeatedly.' },
      { name: 'Entangling Roots', description: 'Surges thick briar vines from the ground to immobilize foes.' },
    ],
    color: 'text-lime-400',
    accentColor: 'border-lime-500/40 bg-lime-500/10',
  },
  Warlock: {
    role: 'Eldritch Pact-Binder',
    description: 'Seekers of forbidden knowledge bound to cosmic entities and shadow patrons.',
    hitDie: 8,
    primaryAttr: 'charisma',
    secondaryAttr: 'constitution',
    weapons: [
      'Obsidian Eldritch Rod',
      'Grimoire of the Void Sea',
      'Cursed Bloodglass Scimitar',
      'Pact Blade of the Pale Monarch',
    ],
    attire: [
      'Shadow-Silk Tattered Greatcoat',
      'Leather Bound with Abyssal Glyphs',
      'Veil of the Outer Void',
    ],
    abilities: [
      { name: 'Eldritch Blast', description: 'Hurls beams of crackling violet force that rupture armor.' },
      { name: 'Pact Ward of Agathys', description: 'Surrounds caster in frost armor that reflects strikes as icy spikes.' },
      { name: 'Gaze of the Void', description: 'Opens a mental rift to inflict maddening dread upon an enemy.' },
    ],
    color: 'text-purple-400',
    accentColor: 'border-purple-500/40 bg-purple-500/10',
  },
  Monk: {
    role: 'Martial Ascetic',
    description: 'Disciplined warriors who channel internal ki to move like wind and strike like thunder.',
    hitDie: 8,
    primaryAttr: 'dexterity',
    secondaryAttr: 'wisdom',
    weapons: [
      'Reinforced Brass Knuckles & Staff',
      'Spiked Cestus Wraps',
      'Twin Nunchaku of Gale Wood',
      'Bare Hands & Ki Focus',
    ],
    attire: [
      'Simple Ascetic Linen Wraps',
      'Monastery Training Gi',
      'Flowing Crane Robes',
    ],
    abilities: [
      { name: 'Flurry of Blows', description: 'Delivers four lightning-speed unarmed strikes in a single heartbeat.' },
      { name: 'Stunning Ki Palm', description: 'Disrupts the target’s vital energy flow, incapacitating them.' },
      { name: 'Step of the Wind', description: 'Channels ki to dash across vertical walls and leap chasm gaps.' },
    ],
    color: 'text-orange-400',
    accentColor: 'border-orange-500/40 bg-orange-500/10',
  },
};

export const FIRST_NAMES = [
  'Aeloria', 'Thrumbar', 'Kaelen', 'Vespera', 'Morgran', 'Zephyr',
  'Belladonna', 'Alistair', 'Branok', 'Seraphina', 'Valerius', 'Ignatius',
  'Evelyn', 'Ronin', 'Orryn', 'Fenwick', 'Cassian', 'Mirella', 'Thorin',
  'Lyanna', 'Drakon', 'Gwyneira', 'Balthazar', 'Rowan', 'Sylas', 'Elion',
  'Astrid', 'Corvus', 'Danica', 'Faelan', 'Garrick', 'Hespera', 'Isolde',
  'Kallias', 'Leona', 'Merrick', 'Nyx', 'Oakhaven', 'Peregrine', 'Quinn',
  'Rhiannon', 'Sariel', 'Theron', 'Una', 'Vael', 'Wren', 'Xanthos', 'Yvaine', 'Zarek'
];

export const SURNAMES = [
  'Stormstrider', 'Ironvein', 'Shadowwhisper', 'Emberheart', 'Starfall',
  'Dawnbringer', 'Runebreaker', 'Nightshade', 'Frostguard', 'Voidwalker',
  'Moonwillow', 'Deepdelver', 'Ashford', 'Blackwood', 'Silvermane',
  'Gravewatcher', 'Sunshield', 'Winterborn', 'Stonecarver', 'Swiftfoot',
  'Goldengrove', 'Drakewing', 'Bloodthorn', 'Spellweaver', 'Ironhide',
  'Brightsteel', 'Ravenclaw', 'Hearthkeeper', 'Silentbrook', 'Nethergaze'
];

export const EPITHETS = [
  'the Undaunted', 'the Spellweaver', 'Blade of the Eclipse', 'the Silent Whisper',
  'Seeker of Dawn', 'the Pyrebound', 'Keeper of Ancient Lore', 'Bane of Wyrms',
  'the Relentless', 'of the Whispering Crag', 'the Unbroken', 'Shadow of Oakhaven',
  'the Iron-Hearted', 'the Star-Eyed', 'Hand of Justice', 'the Cursed Wanderer',
  'Sovereign of Ash', 'Warden of the Deep', 'the Ghost of Sunspire', 'the Tempest-Born'
];

export const RACES: Record<
  CharacterRace,
  { trait: string; bonusAttr: keyof Attributes; description: string }
> = {
  Human: { trait: 'Adaptable Grit', bonusAttr: 'constitution', description: 'Versatile and resilient survivors possessing unmatched ambition.' },
  'High Elf': { trait: 'Arcane Heritage', bonusAttr: 'intelligence', description: 'Graceful immortals with centuries of refined arcane practice.' },
  'Mountain Dwarf': { trait: 'Stoneborn Resilience', bonusAttr: 'strength', description: 'Hardy craftsmen forged in subterranean magma forges.' },
  Dragonborn: { trait: 'Draconic Breath', bonusAttr: 'strength', description: 'Noble reptilian champions boasting dragon blood and elemental wrath.' },
  Tiefling: { trait: 'Infernal Cunning', bonusAttr: 'charisma', description: 'Cunning scions carrying the enigmatic planar spark of the netherworld.' },
  'Wood Elf': { trait: 'Fleet of Foot', bonusAttr: 'dexterity', description: 'Nimble rangers in tune with the ancient rhythm of primordial canopies.' },
  Halfling: { trait: "Lucky Fortune", bonusAttr: 'dexterity', description: 'Unassuming nomads whose uncanny fortune defies the odds.' },
  'Half-Orc': { trait: 'Relentless Endurance', bonusAttr: 'strength', description: 'Fearsome brawlers possessing sheer willpower to shrug off defeat.' },
  'Deep Gnome': { trait: 'Subterranean Stealth', bonusAttr: 'intelligence', description: 'Secretive delve-dwellers skilled in illusion and gemstone artifice.' },
  Aasimar: { trait: 'Celestial Radiance', bonusAttr: 'charisma', description: 'Touched by the upper planes to bear divine light into the mortal realm.' },
};

export const ALIGNMENTS: CharacterAlignment[] = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
];

export const REALMS = [
  'Citadel of Highcrag', 'Sunken Spires of Valyria', 'Whispering Woods of Eldoria',
  'Obsidian Sanctum of Drakon', 'Gilded Port of Oakhaven', 'Frostfall Reach',
  'Ashen Steppes of Morzan', 'The Astral Rift of Sylas', 'Deepforge Bastion',
  'Emerald Vale of Sylvanor', 'Ruins of the Sunken Kingdom', 'Isles of the Mistral Winds'
];

export const PERSONALITY_TRAITS = [
  'Speaks in measured, calm whispers even under dire peril.',
  'Always inspects the structural integrity of stone walls before sitting.',
  'Collects curious ancient coins from every tavern and dungeon.',
  'Cannot resist a polite wager or a game of dice.',
  'Quotes obscure philosophical verses in the middle of battle.',
  'Intensely loyal to whoever shares campfire bread with them.',
  'Never breaks a signed contract or a sworn word of honor.',
  'Relentlessly optimistic, viewing every catastrophe as an opportunity.'
];

export const FLAWS = [
  'Secretly dreads deep subterranean waters and sea monsters.',
  'Overly prideful about their martial or arcane lineage.',
  'Impulsive—charges into danger before tactical plans are set.',
  'Hoards shiny curiosities even when encumbered.',
  'Struggles to trust authorities or crowned monarchs.',
  'Cannot turn down a challenge to their reputation or honor.',
  'Haunted by memories of a fallen companion from past campaigns.'
];

export const QUOTES = [
  '"Honor is forged in the fire of crisis, not during peacetime feasts."',
  '"The arcane currents do not answer to wishful thinking; they answer to mastery."',
  '"In the dark, a silent dagger speaks louder than an army’s war horn."',
  '"Faith is not a shield against tragedy; it is the compass to walk through it."',
  '"A true ranger never leaves footprints where a beast could follow."',
  '"The songs we write today become the courage of the next generation."',
  '"Even the strongest mountain stone eventually bows to running water."',
  '"When the void whispers, you had better answer with drawn steel."'
];
