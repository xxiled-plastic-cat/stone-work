import { useState, useEffect } from 'react';
import { loadFonts } from '../utils/fonts';

export function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAppFonts() {
      try {
        const loaded = await loadFonts();
        setFontsLoaded(loaded);
        if (!loaded) {
          setFontError('Failed to load custom fonts');
        }
      } catch (error) {
        setFontError('Error loading fonts: ' + (error as Error).message);
        setFontsLoaded(false);
      }
    }

    loadAppFonts();
  }, []);

  return { fontsLoaded, fontError };
} 