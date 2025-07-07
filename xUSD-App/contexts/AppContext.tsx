import React, { createContext, useContext } from 'react';
import { ThemeName } from '../theme';
import { AuthUser } from '../services/authService';

interface AppContextProps {
  currentThemeName: ThemeName;
  setCurrentThemeName: (theme: ThemeName) => void;
  user: AuthUser;
  onSignOut: () => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContext.Provider');
  return ctx;
}; 