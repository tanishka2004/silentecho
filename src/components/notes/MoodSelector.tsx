"use client";

import type React from 'react';
import { MOOD_OPTIONS, type Mood } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelectMood: (mood: Mood) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">How are you feeling?</p>
      <TooltipProvider delayDuration={100}>
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((mood) => (
            <Tooltip key={mood.descriptor}>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedMood?.emoji === mood.emoji ? "secondary" : "outline"}
                  onClick={() => onSelectMood(mood)}
                  className={cn(
                    "p-2 h-auto rounded-lg flex flex-col items-center gap-1 w-20 min-w-20 tap-scale transition-all duration-150 ease-in-out",
                    selectedMood?.emoji === mood.emoji && "ring-2 ring-primary shadow-md scale-105"
                  )}
                  aria-pressed={selectedMood?.emoji === mood.emoji}
                  aria-label={mood.descriptor}
                >
                  <span className="text-3xl leading-none">{mood.emoji}</span>
                  <span className="text-xs text-muted-foreground">{mood.descriptor}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{mood.descriptor}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};
