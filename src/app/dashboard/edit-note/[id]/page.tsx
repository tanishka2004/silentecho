"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodSelector } from '@/components/notes/MoodSelector';
import { IntensitySlider } from '@/components/notes/IntensitySlider';
import { useNotes } from '@/hooks/useNotes';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/context/AppContext';
import type { Mood } from '@/lib/constants';
import { MOOD_OPTIONS } from '@/lib/constants';
import { ArrowLeft, Save, XCircle, HeartCrack } from 'lucide-react';
import type { Note } from '@/types';

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams();
  const noteId = typeof params.id === 'string' ? params.id : undefined;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(MOOD_OPTIONS[0]);
  const [intensity, setIntensity] = useState(5);
  const [originalNote, setOriginalNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { getNoteById, updateNote, isLoading: notesLoading } = useNotes();
  const { toast } = useToast();
  const { recipientEmail } = useAppContext();

  useEffect(() => {
    if (noteId && !notesLoading) {
      const noteToEdit = getNoteById(noteId);
      if (noteToEdit) {
        setOriginalNote(noteToEdit);
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
        setSelectedMood(noteToEdit.mood);
        setIntensity(noteToEdit.intensity);
      }
      setIsLoading(false);
    } else if (!notesLoading) {
      setIsLoading(false); // No noteId or notes finished loading
    }
  }, [noteId, getNoteById, notesLoading]);

  const handleUpdateNote = () => {
    if (!originalNote) return;
    if (!title.trim()) {
      toast({ title: 'Title Missing', description: 'Please enter a title for your note.', variant: 'destructive' });
      return;
    }
    if (!content.trim()) {
      toast({ title: 'Content Missing', description: 'Please write something in your note.', variant: 'destructive' });
      return;
    }
    if (!selectedMood) {
      toast({ title: 'Mood Missing', description: 'Please select your mood.', variant: 'destructive' });
      return;
    }

    const updatedNoteData: Note = {
      ...originalNote,
      title,
      content,
      mood: selectedMood,
      intensity,
      // createdAt remains the same, or you could add an updatedAt field
    };
    
    updateNote(updatedNoteData);

    toast({ 
      title: 'Note Updated!', 
      description: 'Your changes have been saved.',
    });
    router.push(`/dashboard/history/${originalNote.id}`);
  };

  const handleCancel = () => {
    if (originalNote) {
      router.push(`/dashboard/history/${originalNote.id}`);
    } else {
      router.push('/dashboard/history');
    }
  };

  if (isLoading || notesLoading) {
    return <div className="text-center py-10 text-muted-foreground">Loading note for editing...</div>;
  }

  if (!originalNote && !isLoading) {
     return (
      <div className="text-center py-10 flex flex-col items-center animate-fade-in">
        <HeartCrack className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-heading mb-2">Note Not Found</h2>
        <p className="text-muted-foreground mb-6">The note you are trying to edit doesn't exist or may have been deleted.</p>
        <Button variant="outline" onClick={() => router.push('/dashboard/history')} className="tap-scale">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to History
        </Button>
      </div>
    );
  }


  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4 tap-scale">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card className="shadow-soft-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-heading">Edit Note</CardTitle>
          <CardDescription>Refine your thoughts and feelings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">What’s on your heart?</label>
            <Input
              id="title"
              placeholder="A thought, a feeling, a moment..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-foreground mb-1">Your message...</label>
            <Textarea
              id="content"
              placeholder="Let your words flow freely..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="text-base leading-relaxed"
            />
          </div>
          <MoodSelector selectedMood={selectedMood} onSelectMood={setSelectedMood} />
          <IntensitySlider value={intensity} onChange={setIntensity} />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-3">
          <Button variant="outline" onClick={handleCancel} className="w-full sm:w-auto tap-scale">
            <XCircle className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button onClick={handleUpdateNote} className="w-full sm:w-auto tap-scale">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
