import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from './components';
import { ThemeName, colorThemes } from './theme';

interface ThemeSwitcherButtonProps {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

export const ThemeSwitcherButton: React.FC<ThemeSwitcherButtonProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const themeNames: ThemeName[] = ['lightPink', 'terracotta', 'grey', 'granite', 'obsidian'];
  
  const handlePress = () => {
    const currentIndex = themeNames.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    onThemeChange(themeNames[nextIndex]);
  };

  // Get the background color for the current theme
  const highlightColor = colorThemes[currentTheme].background;

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Box
        width={80}
        height={80}
        borderRadius={40}
        backgroundColor="mainBackground"
        justifyContent="center"
        alignItems="center"
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 4,
            height: 6,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Box
          width={78}
          height={78}
          borderRadius={39}
          backgroundColor="mainBackground"
          style={{
            shadowColor: highlightColor,
            shadowOffset: {
              width: -3,
              height: -5,
            },
            shadowOpacity: 0.6,
            shadowRadius: 8,
            elevation: 0,
          }}
        />
      </Box>
    </TouchableOpacity>
  );
}; 