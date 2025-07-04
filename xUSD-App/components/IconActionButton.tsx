import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Box } from '../components';
import { ThemeName, colorThemes } from '../theme';

interface IconActionButtonProps {
  iconName: string;
  currentTheme: ThemeName;
  onPress: () => void;
  size?: number;
}

export const IconActionButton: React.FC<IconActionButtonProps> = ({
  iconName,
  currentTheme,
  onPress,
  size = 60,
}) => {
  // Get the background color for the current theme
  const highlightColor = colorThemes[currentTheme].background;
  const borderRadius = size / 2;
  const innerSize = size - 5;
  const innerBorderRadius = innerSize / 2;
  const innerCircleSize = size - 6;
  const innerCircleBorderRadius = innerCircleSize / 2;
  const contentSize = size - 11;
  const contentBorderRadius = contentSize / 2;
  const iconSize = size * 0.3; // 30% of button size

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
          <Box
            width={innerCircleSize}
            height={innerCircleSize}
            borderRadius={innerCircleBorderRadius}
            backgroundColor="backgroundDarker"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              width={contentSize}
              height={contentSize}
              borderRadius={contentBorderRadius}
              backgroundColor="mainBackground"
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                name={iconName}
                size={iconSize}
                color={colorThemes[currentTheme].headerText}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}; 