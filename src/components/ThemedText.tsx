import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from './ThemeContext';
import { getFontFamily } from '../utils/fonts';

interface ThemedTextProps extends TextProps {
  colorType?: 'headerText' | 'bodyText' | 'error' | 'success';
  fontType?: 'heading' | 'body';
  fontWeight?: 'regular' | 'medium' | 'semiBold' | 'bold' | 'black';
  children?: React.ReactNode;
}

export function ThemedText({ 
  colorType = 'bodyText',
  fontType = 'body',
  fontWeight = 'regular',
  style, 
  children, 
  ...props 
}: ThemedTextProps) {
  const { colors } = useTheme();
  
  const color = colors[colorType];
  const fontFamily = getFontFamily(fontType, fontWeight);
  
  return (
    <Text 
      style={[{ color, fontFamily }, style]} 
      {...props}
    >
      {children}
    </Text>
  );
}

export default ThemedText; 