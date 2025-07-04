import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import {
  PlayfairDisplay_600SemiBold,
} from '@expo-google-fonts/playfair-display';
import {
  Montserrat_400Regular,
} from '@expo-google-fonts/montserrat';
import { createThemeWithColors, ThemeName } from './theme';
import { Box, Text } from './components';
import { ThemeSwitcherButton } from './components/ThemeSwitcherButton';
import { PageTitle } from './components/PageTitle';
import { SavingsBalance } from './components/SavingsBalance';
import { IconActionButton } from './components/IconActionButton';
import { TransactionList } from './components/TransactionList';

export default function App() {
  const [currentThemeName, setCurrentThemeName] = useState<ThemeName>('lightPink');
  const activeTheme = createThemeWithColors(currentThemeName);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    Montserrat_400Regular,
  });

  // Sample transaction data
  const sampleTransactions = [
    { id: '1', amount: '+ 100 xUSD', date: '17th June 2025' },
    { id: '2', amount: '- 25 xUSD', date: '15th June 2025' },
    { id: '3', amount: '+ 250 xUSD', date: '12th June 2025' },
    { id: '4', amount: '+ 75 xUSD', date: '10th June 2025' },
    { id: '5', amount: '- 50 xUSD', date: '8th June 2025' },
  ];

  const handleMinusPress = () => {
    console.log('Minus pressed');
  };

  const handlePlusPress = () => {
    console.log('Plus pressed');
  };

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <ThemeProvider theme={activeTheme}>
      <Box flex={1} backgroundColor="mainBackground">
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" paddingHorizontal="l" paddingTop="xxl">
          <PageTitle title="Your savings" />
          <ThemeSwitcherButton 
            currentTheme={currentThemeName}
            onThemeChange={setCurrentThemeName}
          />
        </Box>
        
        <Box paddingTop="l" alignItems="center">
          <SavingsBalance 
            balance="1,765.02"
            currentTheme={currentThemeName}
          />
          
          <Box 
            flexDirection="row" 
            justifyContent="space-between" 
            width="80%" 
            marginTop="l"
          >
            <IconActionButton
              iconName="minus"
              currentTheme={currentThemeName}
              onPress={handleMinusPress}
              size={70}
            />
            
            <IconActionButton
              iconName="plus"
              currentTheme={currentThemeName}
              onPress={handlePlusPress}
              size={70}
            />
          </Box>
        </Box>
        
        <Box flex={1} marginTop="l" paddingBottom="xl" paddingHorizontal="s">
          <TransactionList
            transactions={sampleTransactions}
            currentTheme={currentThemeName}
          />
        </Box>
        
        <StatusBar style="auto" />
      </Box>
    </ThemeProvider>
  );
}
