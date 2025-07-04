import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Box } from '../components';
import { ThemeName, colorThemes } from '../theme';

interface ThemeSwitcherButtonProps {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

export const ThemeSwitcherButton: React.FC<ThemeSwitcherButtonProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const themeNames: ThemeName[] = ['lightPink', 'terracotta', 'grey', 'obsidian'];
  
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
        width={40}
        height={40}
        borderRadius={20}
        backgroundColor="mainBackground"
        justifyContent="center"
        alignItems="center"
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 3,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <Box
          width={39}
          height={39}
          borderRadius={19}
          backgroundColor="mainBackground"
          justifyContent="center"
          alignItems="center"
          style={{
            shadowColor: highlightColor,
            shadowOffset: {
              width: -1.5,
              height: -2.5,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            elevation: 0,
          }}
        >
          <Box
            width={38.5}
            height={38.5}
            borderRadius={19.25}
            backgroundColor="backgroundDarker"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              width={37}
              height={37}
              borderRadius={18.5}
              opacity={0.7}
              backgroundColor="mainBackground"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                source={require('../assets/themeswitcher.png')}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}; 