import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, ThemeButton } from './index';

const ThemeButtonWithProvider = (props: any) => (
  <ThemeProvider>
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <ThemeButton {...props} />
    </View>
  </ThemeProvider>
);

const meta: Meta<typeof ThemeButton> = {
  title: 'Components/ThemeButton',
  component: ThemeButtonWithProvider,
  parameters: {
    layout: 'centered',
    notes: 'Interactive theme switcher for the xUSD Staking app',
  },
  argTypes: {
    compact: {
      control: 'boolean',
      description: 'Show compact version with small circles',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    compact: false,
  },
};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const WithCustomStyle: Story = {
  args: {
    compact: false,
    style: { backgroundColor: 'white', borderRadius: 8, padding: 10 },
  },
}; 