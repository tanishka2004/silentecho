"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Note } from '@/types';
import { NOTES_KEY } from '@/lib/constants';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem(NOTES_KEY);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Error loading notes from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveNotesToLocalStorage = useCallback((updatedNotes: Note[]) => {
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error saving notes to localStorage:", error);
    }
  }, []);

  const addNote = useCallback((newNote: Omit<Note, 'id' | 'createdAt'>) => {
    setNotes(prevNotes => {
      const noteWithIdAndDate: Note = {
        ...newNote,
        id: Date.now().toString(), // Simple unique ID
        createdAt: new Date().toISOString(),
      };
      const updatedNotes = [noteWithIdAndDate, ...prevNotes];
      saveNotesToLocalStorage(updatedNotes);
      return updatedNotes;
    });
  }, [saveNotesToLocalStorage]);

  const getNoteById = useCallback((id: string): Note | undefined => {
    return notes.find(note => note.id === id);
  }, [notes]);

  const deleteNote = useCallback((id: string) => {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.filter(note => note.id !== id);
      saveNotesToLocalStorage(updatedNotes);
      return updatedNotes;
    });
  }, [saveNotesToLocalStorage]);
  
  const updateNote = useCallback((updatedNote: Note) => {
    setNotes(prevNotes => {
      const noteIndex = prevNotes.findIndex(note => note.id === updatedNote.id);
      if (noteIndex === -1) return prevNotes;
      const newNotes = [...prevNotes];
      newNotes[noteIndex] = updatedNote;
      saveNotesToLocalStorage(newNotes);
      return newNotes;
    });
  }, [saveNotesToLocalStorage]);


  return { notes, addNote, getNoteById, deleteNote, updateNote, isLoading };
}
