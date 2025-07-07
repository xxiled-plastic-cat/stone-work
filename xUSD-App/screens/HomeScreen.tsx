import React from "react";
import {
  Box,
  Text,
  PageTitle,
  ThemeSwitcherButton,
  SavingsBalance,
  IconActionButton,
} from "../components";
import { useAppContext } from "../contexts/AppContext";

const HomeScreen = () => {
  const { currentThemeName, setCurrentThemeName, user } = useAppContext();

  const handleMinusPress = () => {
    console.log("Minus pressed");
  };

  const handlePlusPress = () => {
    console.log("Plus pressed");
  };

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="l"
        paddingTop="xxl"
      >
        <PageTitle title="Your savings" />
        <Box flexDirection="row" alignItems="center">
          <ThemeSwitcherButton
            currentTheme={currentThemeName}
            onThemeChange={setCurrentThemeName}
          />
        </Box>
      </Box>

      <Box flex={1} alignItems="center" justifyContent="center">
        <SavingsBalance balance="1,765.02" currentTheme={currentThemeName} />

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
    </Box>
  );
};

export default HomeScreen;
