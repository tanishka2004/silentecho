
export const PASSCODE_KEY = 'silentEchoPasscode';
export const AUTH_STATUS_KEY = 'silentEchoAuthStatus';
export const NOTES_KEY = 'silentEchoNotes';
export const RECIPIENT_EMAIL_KEY = 'silentEchoRecipientEmail';
export const DEFAULT_RECIPIENT_EMAIL = 'you@youremail.com';

export type Mood = {
  emoji: string;
  descriptor: string;
};

export const MOOD_OPTIONS: Mood[] = [
  { emoji: '🤔', descriptor: 'Pondering' },
  { emoji: '😔', descriptor: 'Sad' }, // Changed from 😢 for variety
  { emoji: '😠', descriptor: 'Angry' }, // Changed from 😡 for variety
  { emoji: '😰', descriptor: 'Anxious' },
  { emoji: '😟', descriptor: 'Worried' },
  { emoji: '😫', descriptor: 'Stressed' },
  { emoji: '😤', descriptor: 'Frustrated' },
  { emoji: '😒', descriptor: 'Annoyed' },
  { emoji: '😑', descriptor: 'Irritated' },
  { emoji: '😞', descriptor: 'Disappointed' },
  { emoji: '😖', descriptor: 'Miserable' },
  { emoji: '😩', descriptor: 'Exhausted' },
  { emoji: '🤯', descriptor: 'Overwhelmed' },
  { emoji: '😭', descriptor: 'Devastated' },
  { emoji: '💔', descriptor: 'Heartbroken' },
  { emoji: '🙁', descriptor: 'Lonely' },
  { emoji: '😬', descriptor: 'Uneasy' },
  { emoji: '😕', descriptor: 'Confused' },
  { emoji: '😶', descriptor: 'Numb' },
  { emoji: '🤐', descriptor: 'Silenced' },
  { emoji: '🥺', descriptor: 'Vulnerable' },
  { emoji: '🤨', descriptor: 'Skeptical' },
  { emoji: '🙄', descriptor: 'Exasperated' },
  { emoji: '🤢', descriptor: 'Disgusted' },
  { emoji: '😣', descriptor: 'Resentful' }, // Using 😣 for Resentful
  { emoji: '😥', descriptor: 'Regretful' }, // Added Regretful
  { emoji: '😌', descriptor: 'Calm' },
  { emoji: '😊', descriptor: 'Okay' }, // More neutral than Happy
  { emoji: '😴', descriptor: 'Tired' },
];

export const APP_NAME = "SilentEcho";
