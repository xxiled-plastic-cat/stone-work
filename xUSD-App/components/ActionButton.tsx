import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Box } from '../components';
import { ThemeName, colorThemes } from '../theme';

interface ActionButtonProps {
  icon: ImageSourcePropType;
  currentTheme: ThemeName;
  onPress: () => void;
  size?: number;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  currentTheme,
  onPress,
  size = 60,
}) => {
  // Get the background color for the current theme
  const highlightColor = colorThemes[currentTheme].background;
  const borderRadius = size / 2;
  const innerSize = size - 5;
  const innerBorderRadius = innerSize / 2;
  const iconSize = size * 0.4; // 40% of button size

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Box
        width={size}
        height={size}
        borderRadius={borderRadius}
        backgroundColor="mainBackground"
        justifyContent="center"
        alignItems="center"
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: size * 0.05,
            height: size * 0.067,
          },
          shadowOpacity: 0.3,
          shadowRadius: size * 0.2,
          elevation: size * 0.2,
        }}
      >
        <Box
          width={innerSize}
          height={innerSize}
          borderRadius={innerBorderRadius}
          backgroundColor="mainBackground"
          justifyContent="center"
          alignItems="center"
          style={{
            shadowColor: highlightColor,
            shadowOffset: {
              width: -(size * 0.033),
              height: -(size * 0.05),
            },
            shadowOpacity: 0.6,
            shadowRadius: size * 0.133,
            elevation: 0,
          }}
        >
          <Image
            source={icon}
            style={{
              width: iconSize,
              height: iconSize,
            }}
            resizeMode="contain"
          />
        </Box>
      </Box>
    </TouchableOpacity>
  );
}; 