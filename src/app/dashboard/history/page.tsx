"use client";

import { useNotes } from '@/hooks/useNotes';
import { NoteCard } from '@/components/notes/NoteCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle, Edit3, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from 'react'; // For managing AlertDialog state.

export default function HistoryPage() {
  const { notes, deleteNote, isLoading } = useNotes();
  const { toast } = useToast();
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);


  const handleDeleteConfirmation = (noteId: string) => {
    setNoteToDelete(noteId);
  };

  const handleDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete);
      toast({ title: 'Note Deleted', description: 'The note has been removed.' });
      setNoteToDelete(null);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10 text-muted-foreground">Loading notes...</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-10 flex flex-col items-center animate-fade-in">
        <FileText className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-heading mb-2">No Notes Yet</h2>
        <p className="text-muted-foreground mb-6">Your thoughts and feelings will appear here once you save them.</p>
        <Button asChild className="tap-scale">
          <Link href="/dashboard/new-note" className="flex items-center gap-2">
            <Edit3 className="w-5 h-5" /> Create Your First Note
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading">Note History</h1>
        <Button asChild className="tap-scale">
          <Link href="/dashboard/new-note">
            <Edit3 className="mr-2 h-4 w-4" /> New Note
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
           <AlertDialog key={note.id}>
            <NoteCard note={note} onDelete={() => handleDeleteConfirmation(note.id)} />
            {noteToDelete === note.id && (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the note titled "{note.title}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setNoteToDelete(null)}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}
          </AlertDialog>
        ))}
      </div>

      <AlertDialog>
          {/* This empty trigger is for potential future use if a global delete confirmation is needed elsewhere without NoteCard context.
              Or, it ensures AlertDialog logic is available if NoteCard is conditionally rendered without its own trigger. */}
      </AlertDialog>
    </div>
  );
}
