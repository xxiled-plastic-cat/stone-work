import React from 'react';
import { Box, Text } from '../components';
import { ThemeName, colorThemes } from '../theme';

interface SavingsBalanceProps {
  balance: string;
  currentTheme: ThemeName;
}

export const SavingsBalance: React.FC<SavingsBalanceProps> = ({
  balance,
  currentTheme,
}) => {
  // Get the background color for the current theme
  const highlightColor = colorThemes[currentTheme].background;

  // Dynamic font sizing based on balance length
  const calculateFontSize = (balanceText: string): number => {
    const length = balanceText.length;
    
    // Base font size inversely proportional to length - increased for better visibility
    if (length <= 6) return 56;      // Short numbers like "100.02"
    if (length <= 8) return 50;      // Medium like "1,234.56"
    if (length <= 10) return 46;     // Longer like "12,345.67" (current case: "1,765.02")
    if (length <= 12) return 40;     // Long like "123,456.78"
    if (length <= 14) return 36;     // Very long like "1,234,567.89"
    if (length <= 16) return 32;     // Extremely long
    return 28;                       // Super long numbers
  };

  const fontSize = calculateFontSize(balance);
  const lineHeight = fontSize * 1.15; // Maintain proportional line height

  return (
    <Box
      width={360}
      height={360}
      borderRadius={180}
      backgroundColor="mainBackground"
      justifyContent="center"
      alignItems="center"
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 11,
          height: 14,
        },
        shadowOpacity: 0.3,
        shadowRadius: 22,
        elevation: 22,
      }}
    >
      <Box
        width={350}
        height={350}
        borderRadius={175}
        backgroundColor="mainBackground"
        justifyContent="center"
        alignItems="center"
        style={{
          shadowColor: highlightColor,
          shadowOffset: {
            width: -7,
            height: -11,
          },
          shadowOpacity: 0.6,
          shadowRadius: 18,
          elevation: 0,
        }}
      >
        <Box
          width={348}
          height={348}
          borderRadius={174}
          backgroundColor="backgroundDarker"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width={338}
            height={338}
            borderRadius={169}
            backgroundColor="mainBackground"
            justifyContent="center"
            alignItems="center"
          >
            <Text variant="body" color="bodyText" marginBottom="s">
              Your xUSD savings:
            </Text>
            <Text 
              variant="body" 
              color="headerText"
              style={{ 
                fontSize: fontSize, 
                lineHeight: lineHeight,
                textAlign: 'center',
                maxWidth: 300, // Ensure text stays within container
              }}
            >
              {balance}
            </Text>
            <Text variant="body" color="bodyText" marginTop="s">
              current interest rate: 3.5%
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}; 