import React from 'react';
import { View, Text, ScrollView } from 'react-native';

// Simple Storybook placeholder - we'll set up individual stories
export default function StorybookUI() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        xUSD Staking Components
      </Text>
      <ScrollView>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Component stories will be loaded here.
        </Text>
        <Text style={{ fontSize: 14, color: '#666' }}>
          Run: npm run storybook to see interactive components
        </Text>
      </ScrollView>
    </View>
  );
} 