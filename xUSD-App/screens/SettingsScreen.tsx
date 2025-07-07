import React from 'react';
import { Box, Text, ThemeSwitcherButton, IconActionButton } from '../components';
import { useAppContext } from '../contexts/AppContext';

const SettingsScreen = () => {
  const { currentThemeName, setCurrentThemeName, onSignOut } = useAppContext();

  return (
    <Box flex={1} backgroundColor="mainBackground" alignItems="center" justifyContent="center">
      <Text variant="header" marginBottom="l">Settings</Text>
      <ThemeSwitcherButton
        currentTheme={currentThemeName}
        onThemeChange={setCurrentThemeName}
      />
      <Box marginTop="xl">
        <IconActionButton
          iconName="sign-out"
          currentTheme={currentThemeName}
          onPress={onSignOut}
          size={50}
        />
        <Text variant="caption" marginTop="s">Sign Out</Text>
      </Box>
    </Box>
  );
};

export default SettingsScreen; 