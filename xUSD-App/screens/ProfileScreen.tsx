import React from "react";
import {
  Box,
  Text,
  PageTitle,
  ThemeSwitcherButton,
  IconActionButton,
} from "../components";
import { useAppContext } from "../contexts/AppContext";

const ProfileScreen = () => {
  const { user, currentThemeName, setCurrentThemeName, onSignOut } =
    useAppContext();

  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
      paddingHorizontal="l"
      paddingTop="xxl"
    >
      <PageTitle title="Profile" />
      <Box marginTop="xl">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="m"
        >
          <Text variant="body" color="bodyText">
            Email
          </Text>
          <Text variant="body" color="headerText">
            {user.email}
          </Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="m"
        >
          <Text variant="body" color="bodyText">
            Wallet
          </Text>
          <Text
            variant="caption"
            color="headerText"
            selectable
            numberOfLines={1}
            style={{ maxWidth: 180, textAlign: "right" }}
          >
            {user.algorandAddress}
          </Text>
        </Box>
      </Box>

      <Box marginTop="xl" justifyContent="flex-end">
        <IconActionButton
          iconName="sign-out"
          currentTheme={currentThemeName}
          onPress={onSignOut}
          size={50}
        />
        <Text variant="caption" marginTop="s" color="bodyText">
          Sign Out
        </Text>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
