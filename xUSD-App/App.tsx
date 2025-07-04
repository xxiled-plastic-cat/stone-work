import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import { useState } from 'react';
import { createThemeWithColors, ThemeName } from './theme';
import { Box, Text } from './components';
import { ThemeSwitcherButton } from './ThemeSwitcherButton';

export default function App() {
  const [currentThemeName, setCurrentThemeName] = useState<ThemeName>('lightPink');
  const activeTheme = createThemeWithColors(currentThemeName);

  return (
    <ThemeProvider theme={activeTheme}>
      <Box flex={1} backgroundColor="mainBackground" justifyContent="center" alignItems="center" padding="m">
        <Text variant="header" marginBottom="xxl">xUSD APP</Text>
        
        <ThemeSwitcherButton 
          currentTheme={currentThemeName}
          onThemeChange={setCurrentThemeName}
        />
        
        <StatusBar style="auto" />
      </Box>
    </ThemeProvider>
  );
}
