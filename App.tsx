/**
 * xUSD Staking App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  ThemeProvider,
  ThemedView,
  ThemedText,
  FontLoadingWrapper,
} from './src/components';
import './global.css';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider>
      <FontLoadingWrapper>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ThemedView
          colorType="background"
          className="flex-1 justify-center items-center p-6"
        >
          <ThemedText
            fontType="heading"
            fontWeight="bold"
            colorType="headerText"
            className="text-3xl mb-4 text-center"
          >
            xUSD Staking
          </ThemedText>
          <ThemedText
            fontType="body"
            fontWeight="regular"
            colorType="bodyText"
            className="text-base text-center mb-8"
          >
            Welcome to the xUSD Staking App. Your gateway to earning rewards on
            the Algorand blockchain.
          </ThemedText>
          <ThemedText
            fontType="body"
            fontWeight="medium"
            colorType="success"
            className="text-sm text-center"
          >
            ✅ Phase 1 Complete: NativeWind + Custom Themes + Typography
          </ThemedText>
        </ThemedView>
      </FontLoadingWrapper>
    </ThemeProvider>
  );
}

export default App;
