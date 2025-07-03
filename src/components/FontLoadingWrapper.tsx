import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFonts } from '../hooks/useFonts';
import { useTheme } from './ThemeContext';

interface FontLoadingWrapperProps {
  children: React.ReactNode;
}

export function FontLoadingWrapper({ children }: FontLoadingWrapperProps) {
  const { fontsLoaded, fontError } = useFonts();
  const { colors } = useTheme();

  if (fontError) {
    // If fonts fail to load, still render the app with system fonts
    console.warn('Font loading error:', fontError);
    return <>{children}</>;
  }

  if (!fontsLoaded) {
    return (
      <View 
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator 
          size="large" 
          color={colors.bodyText} 
          style={{ marginBottom: 16 }}
        />
        <Text 
          style={{
            color: colors.bodyText,
            fontSize: 16,
            textAlign: 'center',
          }}
        >
          Loading fonts...
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}

export default FontLoadingWrapper; 