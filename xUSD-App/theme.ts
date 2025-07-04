import { createTheme } from '@shopify/restyle';

// Define all 5 color themes from the CSV
export const colorThemes = {
  lightPink: {
    background: '#FDEEF4',
    backgroundDarker: '#F8D3E1',
    backgroundLighter: '#FFFFFF',
    headerText: '#4A2F35',
    bodyText: '#6E4A50',
    error: '#E53935',
    loading: '#FFCDD2',
    success: '#66BB6A',
  },
  terracotta: {
    background: '#E2725B',
    backgroundDarker: '#C05C4A',
    backgroundLighter: '#F1A087',
    headerText: '#3E231E',
    bodyText: '#5E3D36',
    error: '#B71C1C',
    loading: '#F8B4A8',
    success: '#81C784',
  },
  grey: {
    background: '#E0E0E0',
    backgroundDarker: '#BDBDBD',
    backgroundLighter: '#F5F5F5',
    headerText: '#212121',
    bodyText: '#424242',
    error: '#D32F2F',
    loading: '#EEEEEE',
    success: '#388E3C',
  },
  granite: {
    background: '#757575',
    backgroundDarker: '#5F5F5F',
    backgroundLighter: '#9E9E9E',
    headerText: '#F5F5F5',
    bodyText: '#E0E0E0',
    error: '#C62828',
    loading: '#BDBDBD',
    success: '#388E3C',
  },
  obsidian: {
    background: '#1A1A1A',
    backgroundDarker: '#0F0F0F',
    backgroundLighter: '#2E2E2E',
    headerText: '#FFFFFF',
    bodyText: '#CCCCCC',
    error: '#EF5350',
    loading: '#424242',
    success: '#66BB6A',
  },
};

// Current active theme (can be changed to switch themes)
export type ThemeName = keyof typeof colorThemes;
export const currentTheme: ThemeName = 'lightPink'; // Change this to switch themes

// Create the theme using the selected color theme
const selectedColors = colorThemes[currentTheme];

const theme = createTheme({
  colors: {
    mainBackground: selectedColors.background,
    backgroundDarker: selectedColors.backgroundDarker,
    backgroundLighter: selectedColors.backgroundLighter,
    headerText: selectedColors.headerText,
    bodyText: selectedColors.bodyText,
    error: selectedColors.error,
    loading: selectedColors.loading,
    success: selectedColors.success,
    
    // Legacy color mappings for compatibility
    primary: selectedColors.headerText,
    secondary: selectedColors.success,
    text: selectedColors.headerText,
    textSecondary: selectedColors.bodyText,
    border: selectedColors.backgroundDarker,
    danger: selectedColors.error,
    warning: '#FFA500',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 64,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'headerText',
    },
    subheader: {
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'headerText',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'bodyText',
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      color: 'bodyText',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export default theme;

// Helper function to create a theme with a specific color scheme
export const createThemeWithColors = (themeName: ThemeName) => {
  const colors = colorThemes[themeName];
  
  return createTheme({
    colors: {
      mainBackground: colors.background,
      backgroundDarker: colors.backgroundDarker,
      backgroundLighter: colors.backgroundLighter,
      headerText: colors.headerText,
      bodyText: colors.bodyText,
      error: colors.error,
      loading: colors.loading,
      success: colors.success,
      
      // Legacy color mappings for compatibility
      primary: colors.headerText,
      secondary: colors.success,
      text: colors.headerText,
      textSecondary: colors.bodyText,
      border: colors.backgroundDarker,
      danger: colors.error,
      warning: '#FFA500',
    },
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 40,
      xxl: 64,
    },
    textVariants: {
      header: {
        fontWeight: 'bold',
        fontSize: 34,
        lineHeight: 42.5,
        color: 'headerText',
      },
      subheader: {
        fontWeight: '600',
        fontSize: 28,
        lineHeight: 36,
        color: 'headerText',
      },
      body: {
        fontSize: 16,
        lineHeight: 24,
        color: 'bodyText',
      },
      caption: {
        fontSize: 12,
        lineHeight: 16,
        color: 'bodyText',
      },
    },
    breakpoints: {
      phone: 0,
      tablet: 768,
    },
  });
}; 