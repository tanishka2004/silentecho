"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';

export default function HomePage() {
  const router = useRouter();
  const { isPasscodeSet, isAuthenticated, isLoading } = useAppContext();

  useEffect(() => {
    if (isLoading) {
      return; // Wait for context to load
    }

    if (!isPasscodeSet) {
      router.replace('/passcode-setup');
    } else if (!isAuthenticated) {
      router.replace('/passcode-unlock');
    } else {
      router.replace('/dashboard');
    }
  }, [isPasscodeSet, isAuthenticated, router, isLoading]);

  // Optional: Show a loading state while redirecting or context is loading
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <p className="text-lg text-foreground">Loading SilentEcho...</p>
    </div>
  );
}
