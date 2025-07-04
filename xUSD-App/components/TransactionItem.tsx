import React from 'react';
import { Box, Text } from '../components';
import { ThemeName, colorThemes } from '../theme';

interface TransactionItemProps {
  amount: string;
  date: string;
  currentTheme: ThemeName;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  amount,
  date,
  currentTheme,
}) => {
  // Get the background color for the current theme
  const highlightColor = colorThemes[currentTheme].background;
  
  // Determine if this is a positive or negative transaction
  const isPositive = amount.startsWith('+');
  
  return (
    <Box
      width="100%"
      height={45}
      borderRadius={22.5}
      backgroundColor="mainBackground"
      justifyContent="center"
      alignItems="center"
      marginBottom="m"
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
        width="98%"
        height={43}
        borderRadius={21.5}
        backgroundColor="mainBackground"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="m"
        style={{
          shadowColor: highlightColor,
          shadowOffset: {
            width: -1.5,
            height: -2,
          },
          shadowOpacity: 0.6,
          shadowRadius: 3,
          elevation: 0,
        }}
      >
        <Text 
          variant="body" 
          color={isPositive ? "success" : "error"}
          style={{ fontSize: 14, fontWeight: '600' }}
        >
          {amount}
        </Text>
        <Text 
          variant="body" 
          color="bodyText"
          style={{ fontSize: 12 }}
        >
          {date}
        </Text>
      </Box>
    </Box>
  );
}; 