/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors (will be dynamically set)
        background: 'var(--background)',
        backgroundDark: 'var(--background-dark)',
        backgroundLight: 'var(--background-light)',
        headerText: 'var(--header-text)',
        bodyText: 'var(--body-text)',
        error: 'var(--error)',
        loading: 'var(--loading)',
        success: 'var(--success)',
        
        // Pink theme
        pink: {
          background: '#FDEEF4',
          backgroundDark: '#F8D3E1',
          backgroundLight: '#FFFFFF',
          headerText: '#4A2F35',
          bodyText: '#6E4A50',
          error: '#E53935',
          loading: '#FFCDD2',
          success: '#66BB6A',
        },
        
        // Terracotta theme
        terracotta: {
          background: '#E2725B',
          backgroundDark: '#C05C4A',
          backgroundLight: '#F1A087',
          headerText: '#3E231E',
          bodyText: '#5E3D36',
          error: '#B71C1C',
          loading: '#F8B4A8',
          success: '#81C784',
        },
        
        // Grey theme
        grey: {
          background: '#E0E0E0',
          backgroundDark: '#BDBDBD',
          backgroundLight: '#F5F5F5',
          headerText: '#212121',
          bodyText: '#424242',
          error: '#D32F2F',
          loading: '#EEEEEE',
          success: '#388E3C',
        },
        
        // Granite theme
        granite: {
          background: '#757575',
          backgroundDark: '#5F5F5F',
          backgroundLight: '#9E9E9E',
          headerText: '#F5F5F5',
          bodyText: '#E0E0E0',
          error: '#C62828',
          loading: '#BDBDBD',
          success: '#388E3C',
        },
        
        // Obsidian theme
        obsidian: {
          background: '#1A1A1A',
          backgroundDark: '#0F0F0F',
          backgroundLight: '#2E2E2E',
          headerText: '#FFFFFF',
          bodyText: '#CCCCCC',
          error: '#EF5350',
          loading: '#424242',
          success: '#66BB6A',
        },
      },
      fontFamily: {
        'heading': ['PlayfairDisplay-Regular', 'Playfair Display', 'serif'],
        'body': ['Montserrat-Regular', 'Montserrat', 'sans-serif'],
        'heading-bold': ['PlayfairDisplay-Bold', 'Playfair Display', 'serif'],
        'body-bold': ['Montserrat-Bold', 'Montserrat', 'sans-serif'],
        'body-medium': ['Montserrat-Medium', 'Montserrat', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}; 