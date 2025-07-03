import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { ThemeProvider, ThemedView, ThemedText, ThemeButton, FontLoadingWrapper } from './src/components';

const ComponentShowcase = () => {
  return (
    <ThemeProvider>
      <FontLoadingWrapper>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <ThemedView colorType="background" style={{ padding: 20 }}>
              
              {/* Header */}
              <ThemedText 
                fontType="heading" 
                fontWeight="bold" 
                colorType="headerText"
                style={{ fontSize: 28, textAlign: 'center', marginBottom: 20 }}
              >
                xUSD Staking Components
              </ThemedText>

              {/* Theme Switcher Section */}
              <ThemedView colorType="backgroundLight" style={{ marginBottom: 20, borderRadius: 12, padding: 16 }}>
                <ThemedText 
                  fontType="body" 
                  fontWeight="medium" 
                  colorType="headerText"
                  style={{ fontSize: 16, marginBottom: 12 }}
                >
                  Theme Switcher
                </ThemedText>
                <ThemeButton compact={false} />
                
                <View style={{ marginTop: 12 }}>
                  <ThemedText 
                    fontType="body" 
                    fontWeight="regular" 
                    colorType="bodyText"
                    style={{ fontSize: 14, marginBottom: 8 }}
                  >
                    Compact version:
                  </ThemedText>
                  <ThemeButton compact={true} />
                </View>
              </ThemedView>

              {/* Typography Section */}
              <ThemedView colorType="backgroundLight" style={{ marginBottom: 20, borderRadius: 12, padding: 16 }}>
                <ThemedText 
                  fontType="body" 
                  fontWeight="medium" 
                  colorType="headerText"
                  style={{ fontSize: 16, marginBottom: 12 }}
                >
                  Typography Samples
                </ThemedText>
                
                <ThemedText 
                  fontType="heading" 
                  fontWeight="bold" 
                  colorType="headerText"
                  style={{ fontSize: 24, marginBottom: 8 }}
                >
                  Playfair Display Bold
                </ThemedText>
                
                <ThemedText 
                  fontType="heading" 
                  fontWeight="regular" 
                  colorType="headerText"
                  style={{ fontSize: 20, marginBottom: 8 }}
                >
                  Playfair Display Regular
                </ThemedText>
                
                <ThemedText 
                  fontType="body" 
                  fontWeight="bold" 
                  colorType="bodyText"
                  style={{ fontSize: 16, marginBottom: 8 }}
                >
                  Montserrat Bold
                </ThemedText>
                
                <ThemedText 
                  fontType="body" 
                  fontWeight="regular" 
                  colorType="bodyText"
                  style={{ fontSize: 16, marginBottom: 8 }}
                >
                  Montserrat Regular body text
                </ThemedText>
                
                <ThemedText 
                  fontType="body" 
                  fontWeight="medium" 
                  colorType="error"
                  style={{ fontSize: 14, marginBottom: 4 }}
                >
                  Error message style
                </ThemedText>
                
                <ThemedText 
                  fontType="body" 
                  fontWeight="medium" 
                  colorType="success"
                  style={{ fontSize: 14 }}
                >
                  Success message style
                </ThemedText>
              </ThemedView>

              {/* Card Examples */}
              <ThemedView colorType="backgroundLight" style={{ marginBottom: 20, borderRadius: 12, padding: 16 }}>
                <ThemedText 
                  fontType="body" 
                  fontWeight="medium" 
                  colorType="headerText"
                  style={{ fontSize: 16, marginBottom: 12 }}
                >
                  Card Components
                </ThemedText>
                
                {/* Balance Card */}
                <ThemedView 
                  colorType="backgroundLight" 
                  style={{ 
                    marginBottom: 12, 
                    borderRadius: 8, 
                    padding: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                    borderWidth: 1,
                    borderColor: '#e0e0e0'
                  }}
                >
                  <ThemedText 
                    fontType="body" 
                    fontWeight="regular" 
                    colorType="bodyText"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Staked Balance
                  </ThemedText>
                  <ThemedText 
                    fontType="heading" 
                    fontWeight="bold" 
                    colorType="headerText"
                    style={{ fontSize: 28 }}
                  >
                    1,250.00 xUSD
                  </ThemedText>
                </ThemedView>
                
                {/* Dark Card */}
                <ThemedView 
                  colorType="backgroundDark" 
                  style={{ 
                    borderRadius: 8, 
                    padding: 16,
                    alignItems: 'center',
                  }}
                >
                  <ThemedText 
                    fontType="body" 
                    fontWeight="semiBold" 
                    colorType="headerText"
                    style={{ fontSize: 16 }}
                  >
                    Action Button Style
                  </ThemedText>
                </ThemedView>
              </ThemedView>

            </ThemedView>
          </ScrollView>
        </SafeAreaView>
      </FontLoadingWrapper>
    </ThemeProvider>
  );
};

export default ComponentShowcase; 