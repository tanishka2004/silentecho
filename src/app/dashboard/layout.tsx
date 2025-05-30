"use client";

import type React from 'react';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, PlusCircle, BookOpen, Settings, LogOut, Menu, Sun, Moon, Feather } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { useTheme } from "next-themes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, setIsAuthenticated, isLoading, isPasscodeSet } = useAppContext();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (isLoading) return;

    if (!isPasscodeSet) {
      router.replace('/passcode-setup');
    } else if (!isAuthenticated) {
      router.replace('/passcode-unlock');
    }
  }, [isAuthenticated, isPasscodeSet, router, isLoading]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.replace('/passcode-unlock');
  };

  if (isLoading || (!isPasscodeSet && !pathname.includes('passcode')) || (!isAuthenticated && !pathname.includes('passcode'))) {
    return <div className="flex items-center justify-center min-h-screen bg-background">Loading Dashboard...</div>;
  }
  
  if (!isAuthenticated) return null; // Or a redirect component

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/new-note', label: 'New Note', icon: PlusCircle },
    { href: '/dashboard/history', label: 'History', icon: BookOpen },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const NavLinks: React.FC<{isMobile?: boolean}> = ({ isMobile }) => (
    <nav className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2 md:space-x-4'}`}>
      {navItems.map((item) => (
        <Button
          key={item.label}
          variant={pathname === item.href ? 'secondary' : 'ghost'}
          asChild
          className={`justify-start tap-scale ${isMobile ? 'w-full' : ''}`}
        >
          <Link href={item.href} className="flex items-center gap-2">
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md shadow-soft">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-2xl font-heading text-primary tap-scale">
            <Feather className="w-7 h-7" />
            {APP_NAME}
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
            <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} variant="ghost" size="icon" className="tap-scale">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="icon" className="tap-scale">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="tap-scale">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-6 bg-card">
                <div className="flex flex-col space-y-6">
                  <Link href="/dashboard" className="flex items-center gap-2 text-xl font-heading text-primary mb-4">
                     <Feather className="w-6 h-6" />
                     {APP_NAME}
                  </Link>
                  <NavLinks isMobile />
                  <div className="border-t pt-6 space-y-4">
                    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} variant="outline" className="w-full justify-start gap-2 tap-scale">
                      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      Toggle Theme
                    </Button>
                    <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive tap-scale">
                      <LogOut className="h-5 w-5" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="py-6 text-center text-xs text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. Your personal safe space.</p>
      </footer>
    </div>
  );
}
