"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PASSCODE_KEY } from '@/lib/constants';
import { useAppContext } from '@/context/AppContext';
import { LockKeyhole } from 'lucide-react';

export default function PasscodeSetupPage() {
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const { setIsPasscodeSet, setIsAuthenticated } = useAppContext();

  const handleSetupPasscode = () => {
    if (passcode.length < 4 || passcode.length > 6) {
      toast({ title: 'Invalid Passcode', description: 'Passcode must be 4-6 digits.', variant: 'destructive' });
      return;
    }
    if (passcode !== confirmPasscode) {
      toast({ title: 'Passcodes Mismatch', description: 'The entered passcodes do not match.', variant: 'destructive' });
      return;
    }
    try {
      localStorage.setItem(PASSCODE_KEY, passcode); // In a real app, hash this
      setIsPasscodeSet(true);
      setIsAuthenticated(true); // Auto-login after setup
      toast({ title: 'Passcode Set!', description: 'Your passcode has been set up successfully.' });
      router.replace('/dashboard');
    } catch (error) {
      console.error("Error saving passcode to localStorage:", error);
      toast({ title: 'Error', description: 'Could not save passcode. Please try again.', variant: 'destructive' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/30 via-background to-accent/30 p-4">
      <Card className="w-full max-w-md shadow-soft-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <LockKeyhole className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-heading">Set Your Passcode</CardTitle>
          <CardDescription className="text-muted-foreground">Create a 4-6 digit passcode to secure your journal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="password"
            placeholder="Enter 4-6 digit passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            maxLength={6}
            className="text-center text-lg tracking-widest"
          />
          <Input
            type="password"
            placeholder="Confirm passcode"
            value={confirmPasscode}
            onChange={(e) => setConfirmPasscode(e.target.value)}
            maxLength={6}
            className="text-center text-lg tracking-widest"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSetupPasscode} className="w-full tap-scale">
            Set Passcode & Enter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
