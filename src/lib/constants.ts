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
  { emoji: '😊', descriptor: 'Happy' },
  { emoji: '😢', descriptor: 'Sad' },
  { emoji: '😡', descriptor: 'Angry' },
  { emoji: '😰', descriptor: 'Anxious' },
  { emoji: '😌', descriptor: 'Calm' },
  { emoji: '💖', descriptor: 'Loved' },
  { emoji: '😴', descriptor: 'Tired' },
  { emoji: '🤯', descriptor: 'Overwhelmed' },
  { emoji: '😍', descriptor: 'Excited' },
  { emoji: '😭', descriptor: 'Devastated' },
  { emoji: '🤔', descriptor: 'Pondering' },
  { emoji: '🥳', descriptor: 'Celebratory' },
];

export const APP_NAME = "SilentEcho";
