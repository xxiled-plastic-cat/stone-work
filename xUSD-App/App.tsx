import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import {
  PlayfairDisplay_600SemiBold,
} from '@expo-google-fonts/playfair-display';
import {
  Montserrat_400Regular,
} from '@expo-google-fonts/montserrat';
import { createThemeWithColors, ThemeName } from './theme';
import { Box, Text } from './components';
import { ThemeSwitcherButton } from './components/ThemeSwitcherButton';
import { PageTitle } from './components/PageTitle';
import { SavingsBalance } from './components/SavingsBalance';
import { IconActionButton } from './components/IconActionButton';
import { TransactionList } from './components/TransactionList';
import { AuthScreen } from './components/AuthScreen';
import { authService, AuthUser } from './services/authService';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';
import Navigation from './Navigation';
import { AppContext } from './contexts/AppContext';

export default function App() {
  const [currentThemeName, setCurrentThemeName] = useState<ThemeName>('lightPink');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const activeTheme = createThemeWithColors(currentThemeName);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    Montserrat_400Regular,
  });

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, create our AuthUser object
        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          provider: 'email',
          algorandAddress: `ALGO${firebaseUser.uid.substring(0, 8).toUpperCase()}${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        };
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  // Sample transaction data
  const sampleTransactions = [
    { id: '1', amount: '+ 100 xUSD', date: '17th June 2025' },
    { id: '2', amount: '- 25 xUSD', date: '15th June 2025' },
    { id: '3', amount: '+ 250 xUSD', date: '12th June 2025' },
    { id: '4', amount: '+ 75 xUSD', date: '10th June 2025' },
    { id: '5', amount: '- 50 xUSD', date: '8th June 2025' },
  ];

  const handleSignIn = async (provider: 'google' | 'apple') => {
    try {
      // TODO: Implement actual Web3Auth integration for social providers
      console.log(`Signing in with ${provider}...`);
      throw new Error(`${provider} sign-in not implemented yet. Please use email/password for now.`);
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const handleEmailSignUp = async (email: string, password: string) => {
    try {
      const authUser = await authService.signUpWithEmail(email, password);
      // The onAuthStateChanged listener will update the user state
      console.log('Account created successfully:', authUser.email);
    } catch (error) {
      console.error('Email sign up failed:', error);
      throw error;
    }
  };

  const handleEmailSignIn = async (email: string, password: string) => {
    try {
      const authUser = await authService.signInWithEmail(email, password);
      // The onAuthStateChanged listener will update the user state
      console.log('Signed in successfully:', authUser.email);
    } catch (error) {
      console.error('Email sign in failed:', error);
      throw error;
    }
  };

  const handleMinusPress = () => {
    console.log('Minus pressed');
  };

  const handlePlusPress = () => {
    console.log('Plus pressed');
  };

  if (!fontsLoaded || loading) {
    return null; // or a loading screen
  }

  // Show AuthScreen if user is not signed in
  if (!user) {
    return (
      <ThemeProvider theme={activeTheme}>
        <AuthScreen 
          currentTheme={currentThemeName}
          onSignIn={handleSignIn}
          onEmailSignUp={handleEmailSignUp}
          onEmailSignIn={handleEmailSignIn}
        />
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      // The onAuthStateChanged listener will update the user state
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <ThemeProvider theme={activeTheme}>
      <AppContext.Provider
        value={{
          currentThemeName,
          setCurrentThemeName,
          user: user!,
          onSignOut: handleSignOut,
        }}
      >
        <Navigation />
        <StatusBar style="auto" />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
