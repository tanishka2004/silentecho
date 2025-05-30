"use client";

import type React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Note } from '@/types';
import { Eye, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  return (
    <Card className="shadow-soft hover:shadow-soft-lg transition-shadow duration-200 flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-heading mb-1">{note.title}</CardTitle>
          <span className="text-4xl" aria-label={`Mood: ${note.mood.descriptor}`}>{note.mood.emoji}</span>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          {format(parseISO(note.createdAt), "MMMM d, yyyy 'at' h:mm a")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80 line-clamp-3">{note.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4 mt-auto">
        <div className="text-xs text-muted-foreground">
          Intensity: <span className="font-semibold text-primary">{note.intensity}/10</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild className="tap-scale">
            <Link href={`/dashboard/history/${note.id}`} aria-label="View note">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(note.id)} className="text-destructive hover:text-destructive-foreground hover:bg-destructive tap-scale" aria-label="Delete note">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
