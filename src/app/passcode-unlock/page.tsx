"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PASSCODE_KEY } from '@/lib/constants';
import { useAppContext } from '@/context/AppContext';
import { ShieldCheck } from 'lucide-react';

export default function PasscodeUnlockPage() {
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const { setIsAuthenticated, isPasscodeSet, isLoading } = useAppContext();
  const [storedPasscode, setStoredPasscode] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isPasscodeSet) {
      router.replace('/passcode-setup'); // Redirect if passcode isn't set
    }
    try {
        const pc = localStorage.getItem(PASSCODE_KEY);
        setStoredPasscode(pc);
    } catch (error) {
        console.error("Error reading passcode from localStorage:", error);
        toast({ title: 'Error', description: 'Could not retrieve passcode information.', variant: 'destructive' });
        router.replace('/passcode-setup'); 
    }
  }, [isPasscodeSet, router, isLoading, toast]);

  const handleUnlock = () => {
    if (!storedPasscode) {
      toast({ title: 'Error', description: 'Passcode not set. Please set up a passcode.', variant: 'destructive' });
      router.replace('/passcode-setup');
      return;
    }
    if (enteredPasscode === storedPasscode) {
      setIsAuthenticated(true);
      toast({ title: 'Unlocked!', description: 'Welcome back to SilentEcho.' });
      router.replace('/dashboard');
    } else {
      toast({ title: 'Incorrect Passcode', description: 'Please try again.', variant: 'destructive' });
      setEnteredPasscode('');
    }
  };
  
  if (isLoading || storedPasscode === null && isPasscodeSet) { // also check if passcode is expected but not loaded
    return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/30 via-background to-accent/30 p-4">
      <Card className="w-full max-w-md shadow-soft-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-heading">Unlock SilentEcho</CardTitle>
          <CardDescription className="text-muted-foreground">Enter your passcode to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="password"
            placeholder="Enter passcode"
            value={enteredPasscode}
            onChange={(e) => setEnteredPasscode(e.target.value)}
            maxLength={6}
            className="text-center text-lg tracking-widest"
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={handleUnlock} className="w-full tap-scale">
            Unlock
          </Button>
           <Button variant="link" onClick={() => router.push('/passcode-setup')} className="text-sm">
            Forgot passcode? Reset it.
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
