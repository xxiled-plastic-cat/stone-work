import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, ThemedView, ThemedText } from './index';

const ThemedViewWithProvider = (props: any) => (
  <ThemeProvider>
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <ThemedView {...props} />
    </View>
  </ThemeProvider>
);

const meta: Meta<typeof ThemedView> = {
  title: 'Components/ThemedView',
  component: ThemedViewWithProvider,
  parameters: {
    layout: 'centered',
    notes: 'Theme-aware view component with background colors',
  },
  argTypes: {
    colorType: {
      control: 'select',
      options: ['background', 'backgroundDark', 'backgroundLight'],
      description: 'Background color type from current theme',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Background: Story = {
  args: {
    colorType: 'background',
    style: { padding: 20, borderRadius: 8, minHeight: 100 },
    children: (
      <ThemedText colorType="headerText" fontType="body" fontWeight="medium">
        Background View
      </ThemedText>
    ),
  },
};

export const BackgroundDark: Story = {
  args: {
    colorType: 'backgroundDark',
    style: { padding: 20, borderRadius: 8, minHeight: 100 },
    children: (
      <ThemedText colorType="headerText" fontType="body" fontWeight="medium">
        Dark Background View
      </ThemedText>
    ),
  },
};

export const BackgroundLight: Story = {
  args: {
    colorType: 'backgroundLight',
    style: { padding: 20, borderRadius: 8, minHeight: 100 },
    children: (
      <ThemedText colorType="bodyText" fontType="body" fontWeight="regular">
        Light Background View
      </ThemedText>
    ),
  },
};

export const Card: Story = {
  args: {
    colorType: 'backgroundLight',
    style: { 
      padding: 20, 
      borderRadius: 12, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    children: (
      <View>
        <ThemedText 
          colorType="headerText" 
          fontType="heading" 
          fontWeight="bold"
          style={{ fontSize: 18, marginBottom: 8 }}
        >
          Staked Balance
        </ThemedText>
        <ThemedText 
          colorType="bodyText" 
          fontType="body" 
          fontWeight="regular"
          style={{ fontSize: 24, fontWeight: 'bold' }}
        >
          1,250.00 xUSD
        </ThemedText>
      </View>
    ),
  },
}; 