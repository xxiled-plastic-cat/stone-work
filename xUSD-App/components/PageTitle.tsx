import React from 'react';
import { Box, Text } from '../components';

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Box>
      <Text variant="header" color="headerText">
        {title}
      </Text>
    </Box>
  );
}; 