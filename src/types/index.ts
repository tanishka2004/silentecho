import type { Mood } from '@/lib/constants';

export interface Note {
  id: string;
  title: string;
  content: string;
  mood: Mood;
  intensity: number; // 1-10
  createdAt: string; // ISO date string
}
