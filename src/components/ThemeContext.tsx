import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeName = 'pink' | 'terracotta' | 'grey' | 'granite' | 'obsidian';

export interface ThemeColors {
  background: string;
  backgroundDark: string;
  backgroundLight: string;
  headerText: string;
  bodyText: string;
  error: string;
  loading: string;
  success: string;
}

export const THEMES: Record<ThemeName, ThemeColors> = {
  pink: {
    background: '#FDEEF4',
    backgroundDark: '#F8D3E1',
    backgroundLight: '#FFFFFF',
    headerText: '#4A2F35',
    bodyText: '#6E4A50',
    error: '#E53935',
    loading: '#FFCDD2',
    success: '#66BB6A',
  },
  terracotta: {
    background: '#E2725B',
    backgroundDark: '#C05C4A',
    backgroundLight: '#F1A087',
    headerText: '#3E231E',
    bodyText: '#5E3D36',
    error: '#B71C1C',
    loading: '#F8B4A8',
    success: '#81C784',
  },
  grey: {
    background: '#E0E0E0',
    backgroundDark: '#BDBDBD',
    backgroundLight: '#F5F5F5',
    headerText: '#212121',
    bodyText: '#424242',
    error: '#D32F2F',
    loading: '#EEEEEE',
    success: '#388E3C',
  },
  granite: {
    background: '#757575',
    backgroundDark: '#5F5F5F',
    backgroundLight: '#9E9E9E',
    headerText: '#F5F5F5',
    bodyText: '#E0E0E0',
    error: '#C62828',
    loading: '#BDBDBD',
    success: '#388E3C',
  },
  obsidian: {
    background: '#1A1A1A',
    backgroundDark: '#0F0F0F',
    backgroundLight: '#2E2E2E',
    headerText: '#FFFFFF',
    bodyText: '#CCCCCC',
    error: '#EF5350',
    loading: '#424242',
    success: '#66BB6A',
  },
};

interface ThemeContextType {
  currentTheme: ThemeName;
  colors: ThemeColors;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeName[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('grey');

  // Load saved theme from storage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && savedTheme in THEMES) {
          setCurrentTheme(savedTheme as ThemeName);
        }
      } catch (error) {
        console.warn('Failed to load theme from storage:', error);
      }
    };
    loadTheme();
  }, []);

  const setTheme = async (theme: ThemeName) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
      setCurrentTheme(theme);
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
      // Still update the theme even if storage fails
      setCurrentTheme(theme);
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    colors: THEMES[currentTheme],
    setTheme,
    availableThemes: Object.keys(THEMES) as ThemeName[],
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 