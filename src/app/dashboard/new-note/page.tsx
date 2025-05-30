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
import { useAppContext } from '@/context/AppContext';
import type { Mood } from '@/lib/constants';
import { MOOD_OPTIONS } from '@/lib/constants'; // Import default mood if needed
import { ArrowLeft, Send, Sparkles, XCircle } from 'lucide-react';

export default function NewNotePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(MOOD_OPTIONS[0]);
  const [intensity, setIntensity] = useState(5);

  const router = useRouter();
  const { addNote } = useNotes();
  const { toast } = useToast();
  const { recipientEmail } = useAppContext();

  const handleSaveAndEmail = () => {
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
    addNote(noteData);

    const subject = `[Heart-to-Heart] ${title}`;
    const emailBody = `
Date: ${new Date().toLocaleString()}
Mood: ${selectedMood.emoji} (${selectedMood.descriptor})
Intensity: ${intensity}/10

Message:
${content}
    `;

    // Using mailto link for "zero-backend" email dispatch
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    try {
      window.location.href = mailtoLink; // This will open the default email client
      toast({ 
        title: 'Note Saved & Email Ready!', 
        description: 'Your note is saved. Please send the pre-filled email from your mail client.',
        action: <Sparkles className="text-accent" />,
      });
      router.push('/dashboard/history');
    } catch (e) {
       console.error("Failed to open mailto link", e);
       toast({ title: 'Note Saved!', description: 'Your note has been saved locally. Could not open email client.', variant: 'default' });
       router.push('/dashboard/history');
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
          <CardTitle className="text-3xl font-heading">New Heartfelt Note</CardTitle>
          <CardDescription>Pour out your thoughts and feelings. They matter.</CardDescription>
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
          <Button onClick={handleSaveAndEmail} className="w-full sm:w-auto tap-scale">
            <Send className="mr-2 h-4 w-4" /> Save & Prepare Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
