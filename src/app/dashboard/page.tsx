
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Feather, Edit3, History, Sparkle } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DashboardPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <Card className="shadow-soft-lg overflow-hidden">
        <CardHeader className="bg-primary/10 p-8">
          <div className="flex items-center space-x-4">
            <Feather className="w-16 h-16 text-primary" />
            <div>
              <CardTitle className="text-4xl font-heading">Welcome to {APP_NAME}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-1">Your safe place to share anything.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <Image 
            src="/assests/pexels-pixabay-80453.jpg" 
            alt="Pastel illustration" 
            width={600} 
            height={300} 
            className="rounded-lg mx-auto mb-8 shadow-md"
            data-ai-hint="pastel abstract"
          />
          <p className="text-lg mb-8 text-foreground/80">
            Ready to express your thoughts? Create a new note or revisit your past entries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="tap-scale shadow-md">
              <Link href="/dashboard/new-note" className="flex items-center gap-2">
                <Edit3 className="w-5 h-5" /> Create New Note
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="tap-scale shadow-md">
              <Link href="/dashboard/history" className="flex items-center gap-2">
                <History className="w-5 h-5" /> View History
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Alert className="shadow-soft border-primary/30">
        <Sparkle className="h-5 w-5 text-primary" />
        <AlertTitle className="font-heading text-lg text-primary">A Little Reminder</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          This journal is for you. Feel free to write about anything on your mind. Your thoughts are valued and safe here.
        </AlertDescription>
      </Alert>
    </div>
  );
}
