import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from './ThemeContext';

interface ThemedViewProps extends ViewProps {
  colorType?: 'background' | 'backgroundDark' | 'backgroundLight';
  children?: React.ReactNode;
}

export function ThemedView({ 
  colorType = 'background', 
  style, 
  children, 
  ...props 
}: ThemedViewProps) {
  const { colors } = useTheme();
  
  const backgroundColor = colors[colorType];
  
  return (
    <View 
      style={[{ backgroundColor }, style]} 
      {...props}
    >
      {children}
    </View>
  );
}

export default ThemedView; 