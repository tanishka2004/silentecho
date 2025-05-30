"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useNotes } from '@/hooks/useNotes';
import type { Note } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CalendarDays, Edit, HeartCrack, Thermometer, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
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
import { useToast } from '@/hooks/use-toast';

export default function NoteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { getNoteById, deleteNote, isLoading: notesLoading } = useNotes();
  const [note, setNote] = useState<Note | null | undefined>(undefined); // undefined for loading, null for not found
  const { toast } = useToast();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


  const noteId = typeof params.id === 'string' ? params.id : undefined;

  useEffect(() => {
    if (noteId && !notesLoading) {
      const foundNote = getNoteById(noteId);
      setNote(foundNote);
    }
  }, [noteId, getNoteById, notesLoading]);

  const handleDelete = () => {
    if (note) {
      deleteNote(note.id);
      toast({ title: 'Note Deleted', description: 'The note has been removed.' });
      router.push('/dashboard/history');
    }
    setShowDeleteConfirm(false);
  };

  if (notesLoading || note === undefined) {
    return <div className="text-center py-10 text-muted-foreground">Loading note details...</div>;
  }

  if (note === null) {
    return (
      <div className="text-center py-10 flex flex-col items-center animate-fade-in">
        <HeartCrack className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-heading mb-2">Note Not Found</h2>
        <p className="text-muted-foreground mb-6">The note you are looking for doesn't exist or may have been deleted.</p>
        <Button variant="outline" onClick={() => router.push('/dashboard/history')} className="tap-scale">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to History
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Button variant="ghost" onClick={() => router.push('/dashboard/history')} className="mb-4 tap-scale">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to History
      </Button>
      <Card className="shadow-soft-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-3xl font-heading">{note.title}</CardTitle>
            <span className="text-5xl" aria-label={`Mood: ${note.mood.descriptor}`}>{note.mood.emoji}</span>
          </div>
          <CardDescription className="text-sm text-muted-foreground flex items-center gap-2">
            <CalendarDays className="w-4 h-4" /> {format(parseISO(note.createdAt), "EEEE, MMMM d, yyyy 'at' h:mm a")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm sm:prose dark:prose-invert max-w-none bg-secondary/30 p-4 rounded-md border">
            <p className="whitespace-pre-wrap text-foreground/90">{note.content}</p>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-accent/20 rounded-md border border-accent/50">
            <Thermometer className="w-6 h-6 text-accent-foreground" />
            <div>
              <p className="text-sm font-medium text-accent-foreground">Intensity</p>
              <p className="text-lg font-semibold text-accent-foreground">{note.intensity}/10</p>
            </div>
            <div className="ml-auto">
                <p className="text-sm font-medium text-accent-foreground">Mood</p>
                <p className="text-lg font-semibold text-accent-foreground">{note.mood.descriptor}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 border-t pt-4">
          {/* Edit functionality can be added later. For now, link to new note or placeholder */}
          <Button variant="outline" asChild className="w-full sm:w-auto tap-scale">
             <Link href={`/dashboard/edit-note/${note.id}`}> {/* Placeholder for edit route */}
                <Edit className="mr-2 h-4 w-4" /> Edit (Coming Soon)
             </Link>
          </Button>
          <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto tap-scale">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Note
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this note.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Yes, delete it
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
