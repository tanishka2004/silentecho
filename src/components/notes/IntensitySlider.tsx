"use client";

import type React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const IntensitySlider: React.FC<IntensitySliderProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label htmlFor="intensity" className="text-sm font-medium text-foreground">
          Intensity: <span className="font-bold text-primary">{value}</span>/10
        </Label>
      </div>
      <Slider
        id="intensity"
        min={1}
        max={10}
        step={1}
        value={[value]}
        onValueChange={(newValues) => onChange(newValues[0])}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
};
