
export enum RelationType {
  BOYFRIEND = 'Boyfriend',
  GIRLFRIEND = 'Girlfriend',
  BESTIE = 'Best Friend',
  SPOUSE = 'Spouse',
  FAMILY = 'Family Member',
  CRUSH = 'Secret Crush'
}

export enum BirthdayVibe {
  GLITCH = 'Cyberpunk Neon',
  ROYAL = 'Royal Gold',
  PASTEL = 'Soft Pastel',
  PARTY = 'Vibrant Party'
}

export enum MessageTone {
  HYPE = 'Hype & Energetic',
  DEEP = 'Deeply Emotional',
  FUNNY = 'Witty & Sarcastic',
  POETIC = 'Classic Poetic'
}

export interface CardData {
  id?: string;
  senderName: string;
  recipientName: string;
  relation: RelationType;
  vibe: BirthdayVibe;
  tone: MessageTone;
  age?: string;
  favMemory: string;
  photoUrl: string | null;
  aiMessage?: string;
  createdAt?: string;
}
