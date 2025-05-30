
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodSelector } from '@/components/notes/MoodSelector';
import { IntensitySlider } from '@/components/notes/IntensitySlider';
import { useNotes } from '@/hooks/useNotes';
import { useToast } from '@/hooks/use-toast';
import type { Mood } from '@/lib/constants';
import { MOOD_OPTIONS } from '@/lib/constants';
import { ArrowLeft, Save, XCircle } from 'lucide-react'; // Changed Send to Save

export default function NewNotePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(MOOD_OPTIONS[0]);
  const [intensity, setIntensity] = useState(5);

  const router = useRouter();
  const { addNote } = useNotes();
  const { toast } = useToast();

  const handleReviewAndSave = () => {
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

    const noteData = { title, content, mood: selectedMood, intensity };
    const newNoteId = addNote(noteData);

    if (newNoteId) {
      toast({ 
        title: 'Note Saved!', 
        description: 'Review your note before submitting the grievance.',
      });
      router.push(`/dashboard/history/${newNoteId}`);
    } else {
      toast({ title: 'Error Saving Note', description: 'Could not save the note. Please try again.', variant: 'destructive' });
    }
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4 tap-scale">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card className="shadow-soft-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-heading">New Heartfelt Grievance</CardTitle>
          <CardDescription>Pour out your thoughts and feelings. They matter.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">Subject of your grievance?</label>
            <Input
              id="title"
              placeholder="A brief title for your concern..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-foreground mb-1">Details of your grievance...</label>
            <Textarea
              id="content"
              placeholder="Describe your grievance in detail..."
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
          <Button onClick={handleReviewAndSave} className="w-full sm:w-auto tap-scale">
            <Save className="mr-2 h-4 w-4" /> Review & Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
