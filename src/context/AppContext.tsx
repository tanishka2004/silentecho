"use client";

import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { PASSCODE_KEY, AUTH_STATUS_KEY, RECIPIENT_EMAIL_KEY, DEFAULT_RECIPIENT_EMAIL } from '@/lib/constants';

interface AppContextType {
  isPasscodeSet: boolean;
  setIsPasscodeSet: (isSet: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  recipientEmail: string;
  setRecipientEmailState: (email: string) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPasscodeSet, setIsPasscodeSetState] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(false);
  const [recipientEmail, setRecipientEmailInternal] = useState<string>(DEFAULT_RECIPIENT_EMAIL);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedPasscode = localStorage.getItem(PASSCODE_KEY);
      setIsPasscodeSetState(!!storedPasscode);

      const authStatus = localStorage.getItem(AUTH_STATUS_KEY);
      setIsAuthenticatedState(authStatus === 'true');
      
      const storedEmail = localStorage.getItem(RECIPIENT_EMAIL_KEY);
      setRecipientEmailInternal(storedEmail || DEFAULT_RECIPIENT_EMAIL);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      // Set defaults if localStorage is unavailable
      setIsPasscodeSetState(false);
      setIsAuthenticatedState(false);
      setRecipientEmailInternal(DEFAULT_RECIPIENT_EMAIL);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setIsPasscodeSet = (isSet: boolean) => {
    setIsPasscodeSetState(isSet);
  };

  const setIsAuthenticated = (auth: boolean) => {
    setIsAuthenticatedState(auth);
    try {
      localStorage.setItem(AUTH_STATUS_KEY, auth.toString());
    } catch (error) {
      console.error("Error setting auth status in localStorage:", error);
    }
  };
  
  const setRecipientEmailState = (email: string) => {
    setRecipientEmailInternal(email);
    try {
      localStorage.setItem(RECIPIENT_EMAIL_KEY, email);
    } catch (error) {
      console.error("Error setting recipient email in localStorage:", error);
    }
  };

  if (isLoading) {
    // You can return a loader here if needed
    return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;
  }

  return (
    <AppContext.Provider value={{ 
      isPasscodeSet, setIsPasscodeSet, 
      isAuthenticated, setIsAuthenticated,
      recipientEmail, setRecipientEmailState,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
