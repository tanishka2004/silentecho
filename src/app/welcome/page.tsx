"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export default function WelcomePage() {
  const router = useRouter();

  // This page might be shown once after first login, or removed if dashboard welcome is sufficient.
  // For now, let's assume it's part of an initial flow if desired.
  // The main page.tsx handles redirection logic to dashboard or auth pages.

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 p-6 text-center">
      <style jsx global>{`
        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-gentle-pulse {
          animation: gentle-pulse 2s infinite ease-in-out;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; opacity:0; }
        .delay-400 { animation-delay: 0.4s; opacity:0; }
        .delay-600 { animation-delay: 0.6s; opacity:0; }
      `}</style>
      
      <div className="animate-fade-in-up">
        <Image 
          src="https://placehold.co/300x200.png" 
          alt="Hand-drawn doodles"
          width={300}
          height={200}
          className="rounded-lg mb-8 shadow-soft-lg"
          data-ai-hint="pastel doodle heart"
        />
      </div>
      
      <h1 className="text-5xl font-heading text-primary mb-4 animate-fade-in-up delay-200">
        SilentEcho
      </h1>
      <p className="text-xl text-foreground/80 mb-8 max-w-md animate-fade-in-up delay-400">
        Your safe place to share anything. Your thoughts, your feelings, your heart.
      </p>
      <Button 
        size="lg" 
        onClick={() => router.push('/dashboard')} 
        className="animate-gentle-pulse tap-scale shadow-lg animate-fade-in-up delay-600"
      >
        <Heart className="mr-2 h-5 w-5" /> Continue to Your Journal
      </Button>
    </div>
  );
}
