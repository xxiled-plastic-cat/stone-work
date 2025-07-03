import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, ThemedText, FontLoadingWrapper } from './index';

const ThemedTextWithProvider = (props: any) => (
  <ThemeProvider>
    <FontLoadingWrapper>
      <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
        <ThemedText {...props} />
      </View>
    </FontLoadingWrapper>
  </ThemeProvider>
);

const meta: Meta<typeof ThemedText> = {
  title: 'Components/ThemedText',
  component: ThemedTextWithProvider,
  parameters: {
    layout: 'centered',
    notes: 'Theme-aware text component with custom fonts',
  },
  argTypes: {
    colorType: {
      control: 'select',
      options: ['headerText', 'bodyText', 'error', 'success'],
      description: 'Color type from current theme',
    },
    fontType: {
      control: 'select',
      options: ['heading', 'body'],
      description: 'Font family - Playfair Display or Montserrat',
    },
    fontWeight: {
      control: 'select',
      options: ['regular', 'medium', 'semiBold', 'bold', 'black'],
      description: 'Font weight',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BodyText: Story = {
  args: {
    children: 'This is body text using Montserrat font',
    colorType: 'bodyText',
    fontType: 'body',
    fontWeight: 'regular',
  },
};

export const Heading: Story = {
  args: {
    children: 'This is a heading with Playfair Display',
    colorType: 'headerText',
    fontType: 'heading',
    fontWeight: 'bold',
  },
};

export const ErrorText: Story = {
  args: {
    children: 'This is an error message',
    colorType: 'error',
    fontType: 'body',
    fontWeight: 'medium',
  },
};

export const SuccessText: Story = {
  args: {
    children: 'Transaction completed successfully!',
    colorType: 'success',
    fontType: 'body',
    fontWeight: 'medium',
  },
};

export const LargeHeading: Story = {
  args: {
    children: 'xUSD Staking',
    colorType: 'headerText',
    fontType: 'heading',
    fontWeight: 'black',
    style: { fontSize: 32 },
  },
}; 