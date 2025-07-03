import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme, ThemeName } from './ThemeContext';

interface ThemeButtonProps {
  compact?: boolean;
  style?: any;
}

export function ThemeButton({ compact = false, style }: ThemeButtonProps) {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  const getThemeDisplayName = (theme: ThemeName): string => {
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  const getThemePreviewColor = (theme: ThemeName): string => {
    switch (theme) {
      case 'pink':
        return '#FDEEF4';
      case 'terracotta':
        return '#E2725B';
      case 'grey':
        return '#E0E0E0';
      case 'granite':
        return '#757575';
      case 'obsidian':
        return '#1A1A1A';
      default:
        return '#E0E0E0';
    }
  };

  if (compact) {
    return (
      <View style={[{ flexDirection: 'row', gap: 8 }, style]}>
        {availableThemes.map((theme) => (
          <TouchableOpacity
            key={theme}
            onPress={() => setTheme(theme)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: getThemePreviewColor(theme),
              borderWidth: currentTheme === theme ? 3 : 1,
              borderColor: currentTheme === theme ? '#007AFF' : '#CCC',
            }}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={[{ padding: 16 }, style]}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 12,
          color: '#333',
        }}
      >
        Choose Theme
      </Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {availableThemes.map((theme) => (
          <TouchableOpacity
            key={theme}
            onPress={() => setTheme(theme)}
            style={{
              alignItems: 'center',
              padding: 12,
              borderRadius: 12,
              backgroundColor: getThemePreviewColor(theme),
              borderWidth: currentTheme === theme ? 3 : 1,
              borderColor: currentTheme === theme ? '#007AFF' : '#CCC',
              minWidth: 80,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: getThemePreviewColor(theme),
                marginBottom: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: theme === 'obsidian' || theme === 'granite' ? '#FFF' : '#333',
                textAlign: 'center',
              }}
            >
              {getThemeDisplayName(theme)}
            </Text>
            {currentTheme === theme && (
              <Text
                style={{
                  fontSize: 10,
                  color: theme === 'obsidian' || theme === 'granite' ? '#FFF' : '#666',
                  marginTop: 2,
                }}
              >
                ✓ Active
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default ThemeButton; 