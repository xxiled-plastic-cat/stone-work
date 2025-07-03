import * as Font from 'expo-font';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_900Black,
} from '@expo-google-fonts/playfair-display';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

export const customFonts = {
  'PlayfairDisplay-Regular': PlayfairDisplay_400Regular,
  'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
  'PlayfairDisplay-Black': PlayfairDisplay_900Black,
  'Montserrat-Regular': Montserrat_400Regular,
  'Montserrat-Medium': Montserrat_500Medium,
  'Montserrat-SemiBold': Montserrat_600SemiBold,
  'Montserrat-Bold': Montserrat_700Bold,
};

export async function loadFonts() {
  try {
    await Font.loadAsync(customFonts);
    return true;
  } catch (error) {
    console.warn('Error loading fonts:', error);
    return false;
  }
}

// Font family mappings for different text types
export const fontFamilies = {
  heading: {
    regular: 'PlayfairDisplay-Regular',
    bold: 'PlayfairDisplay-Bold',
    black: 'PlayfairDisplay-Black',
  },
  body: {
    regular: 'Montserrat-Regular',
    medium: 'Montserrat-Medium',
    semiBold: 'Montserrat-SemiBold',
    bold: 'Montserrat-Bold',
  },
};

// Get font family based on type and weight
export function getFontFamily(
  type: 'heading' | 'body',
  weight: 'regular' | 'medium' | 'semiBold' | 'bold' | 'black' = 'regular'
): string {
  if (type === 'heading') {
    switch (weight) {
      case 'bold':
      case 'semiBold':
        return fontFamilies.heading.bold;
      case 'black':
        return fontFamilies.heading.black;
      default:
        return fontFamilies.heading.regular;
    }
  } else {
    switch (weight) {
      case 'medium':
        return fontFamilies.body.medium;
      case 'semiBold':
        return fontFamilies.body.semiBold;
      case 'bold':
      case 'black':
        return fontFamilies.body.bold;
      default:
        return fontFamilies.body.regular;
    }
  }
} 