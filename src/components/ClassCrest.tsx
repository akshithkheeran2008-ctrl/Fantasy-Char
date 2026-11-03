import React from 'react';
import { CharacterClass } from '../types/character';
import {
  Shield,
  Wand2,
  Sword,
  Sparkles,
  Crosshair,
  Flame,
  Music,
  Trees,
  Eye,
  Zap,
} from 'lucide-react';

interface ClassCrestProps {
  characterClass: CharacterClass;
  className?: string;
  size?: number;
}

export const ClassCrest: React.FC<ClassCrestProps> = ({ characterClass, className = '', size = 20 }) => {
  switch (characterClass) {
    case 'Warrior':
      return <Shield className={className} size={size} />;
    case 'Mage':
      return <Wand2 className={className} size={size} />;
    case 'Rogue':
      return <Sword className={className} size={size} />;
    case 'Paladin':
      return <Flame className={className} size={size} />;
    case 'Ranger':
      return <Crosshair className={className} size={size} />;
    case 'Cleric':
      return <Sparkles className={className} size={size} />;
    case 'Bard':
      return <Music className={className} size={size} />;
    case 'Druid':
      return <Trees className={className} size={size} />;
    case 'Warlock':
      return <Eye className={className} size={size} />;
    case 'Monk':
      return <Zap className={className} size={size} />;
    default:
      return <Shield className={className} size={size} />;
  }
};
