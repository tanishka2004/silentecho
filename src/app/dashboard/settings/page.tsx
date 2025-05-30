"use client";

import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Mail, Palette, Bell, Save, KeyRound, Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { recipientEmail, setRecipientEmailState } = useAppContext();
  const [currentRecipientEmail, setCurrentRecipientEmail] = useState(recipientEmail);
  const [dailyReminderEnabled, setDailyReminderEnabled] = useState(false); // Placeholder
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setCurrentRecipientEmail(recipientEmail);
  }, [recipientEmail]);

  const handleSaveRecipientEmail = () => {
    if (!currentRecipientEmail.includes('@') || !currentRecipientEmail.includes('.')) {
        toast({ title: 'Invalid Email', description: 'Please enter a valid email address.', variant: 'destructive' });
        return;
    }
    setRecipientEmailState(currentRecipientEmail);
    toast({ title: 'Recipient Email Updated', description: `Notes will now be prepared for ${currentRecipientEmail}.` });
  };

  const handleReminderToggle = async () => {
    if (!dailyReminderEnabled) { // User is trying to enable
        if (!('Notification' in window)) {
            toast({ title: 'Notifications Not Supported', description: 'Your browser does not support desktop notifications.', variant: 'destructive'});
            return;
        }
        if (Notification.permission === 'granted') {
            setDailyReminderEnabled(true);
            toast({ title: 'Daily Reminders Enabled (Conceptual)', description: 'You would receive daily prompts.' });
            // Here you would set up actual reminder logic (e.g., with service worker)
        } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setDailyReminderEnabled(true);
                toast({ title: 'Daily Reminders Enabled (Conceptual)', description: 'You would receive daily prompts.' });
                 // Here you would set up actual reminder logic
                new Notification("SilentEcho Reminders Active!", { body: "You'll get gentle prompts to share."});
            } else {
                toast({ title: 'Permission Denied', description: 'Notifications permission was not granted.', variant: 'destructive'});
            }
        } else { // Permission denied
             toast({ title: 'Permission Denied', description: 'Notifications are blocked. Please check your browser settings.', variant: 'destructive'});
        }
    } else { // User is trying to disable
        setDailyReminderEnabled(false);
        toast({ title: 'Daily Reminders Disabled (Conceptual)', description: 'You will no longer receive daily prompts.' });
        // Here you would clear any existing reminders
    }
  };
  
  const handleResetPasscode = () => {
    // For true reset, clear passcode from local storage and redirect to setup.
    // This needs careful implementation to ensure user intent.
    // For now, redirect to setup which allows overwriting.
    router.push('/passcode-setup');
    toast({ title: 'Redirecting to Passcode Setup', description: 'You can set a new passcode there.' });
  };


  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <h1 className="text-3xl font-heading">Settings</h1>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5 text-primary" />Recipient Email</CardTitle>
          <CardDescription>Set the email address where your notes will be sent.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="recipientEmail">Email Address</Label>
          <div className="flex gap-2">
            <Input
              id="recipientEmail"
              type="email"
              value={currentRecipientEmail}
              onChange={(e) => setCurrentRecipientEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <Button onClick={handleSaveRecipientEmail} className="tap-scale shrink-0">
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-primary" />Theme</CardTitle>
          <CardDescription>Choose your preferred look for SilentEcho.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-toggle" className="text-base">
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </Label>
            <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} variant="outline" size="icon" className="tap-scale">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><KeyRound className="w-5 h-5 text-primary" />Passcode</CardTitle>
          <CardDescription>Manage your application passcode.</CardDescription>
        </CardHeader>
        <CardContent>
           <Button onClick={handleResetPasscode} variant="outline" className="w-full sm:w-auto tap-scale">
            Reset Passcode
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            This will allow you to set a new passcode.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-primary" />Daily Reminders</CardTitle>
          <CardDescription>Get a gentle nudge to share your thoughts (conceptual).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="dailyReminder" className="text-base">Enable Daily Reminders</Label>
            <Switch
              id="dailyReminder"
              checked={dailyReminderEnabled}
              onCheckedChange={handleReminderToggle}
              aria-label="Toggle daily reminders"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Note: This is a conceptual feature. Full background reminders require advanced browser features and permissions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
