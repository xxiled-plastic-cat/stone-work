import React, { useState } from 'react';
import { TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Box, Text } from '../components';
import { ThemeName, colorThemes } from '../theme';

interface AuthScreenProps {
  currentTheme: ThemeName;
  onSignIn: (provider: 'google' | 'apple') => Promise<void>;
  onEmailSignUp: (email: string, password: string) => Promise<void>;
  onEmailSignIn: (email: string, password: string) => Promise<void>;
}

interface AuthButtonProps {
  provider: 'google' | 'apple';
  currentTheme: ThemeName;
  onPress: () => void;
  loading: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  provider,
  currentTheme,
  onPress,
  loading,
}) => {
  const highlightColor = colorThemes[currentTheme].background;
  const size = 280;
  const height = 60;
  const borderRadius = height / 2;
  const innerHeight = height - 4;
  const innerBorderRadius = innerHeight / 2;
  const innerCircleHeight = height - 5;
  const innerCircleBorderRadius = innerCircleHeight / 2;
  const contentHeight = height - 10;
  const contentBorderRadius = contentHeight / 2;
  
  const iconName = provider === 'google' ? 'google' : 'apple';
  const buttonText = provider === 'google' ? 'Continue with Google' : 'Continue with Apple';
  const iconColor = provider === 'google' ? '#4285F4' : '#000';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} disabled={loading}>
      <Box
        width={size}
        height={height}
        borderRadius={borderRadius}
        backgroundColor="mainBackground"
        justifyContent="center"
        alignItems="center"
        marginBottom="m"
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 3,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 12,
        }}
      >
        <Box
          width={size - 4}
          height={innerHeight}
          borderRadius={innerBorderRadius}
          backgroundColor="mainBackground"
          justifyContent="center"
          alignItems="center"
          style={{
            shadowColor: highlightColor,
            shadowOffset: {
              width: -2,
              height: -3,
            },
            shadowOpacity: 0.6,
            shadowRadius: 8,
            elevation: 0,
          }}
        >
            <Box
              width={size - 10}
              height={contentHeight}
              borderRadius={contentBorderRadius}
              backgroundColor="mainBackground"
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
            >
              {loading ? (
                <ActivityIndicator 
                  size="small" 
                  color={colorThemes[currentTheme].headerText} 
                />
              ) : (
                <>
                  <Icon
                    name={iconName}
                    size={20}
                    color={provider === 'apple' ? colorThemes[currentTheme].headerText : iconColor}
                    style={{ marginRight: 12 }}
                  />
                  <Text variant="body" color="headerText">
                    {buttonText}
                  </Text>
                </>
              )}
            </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

interface EmailInputProps {
  currentTheme: ThemeName;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
  currentTheme,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  const highlightColor = colorThemes[currentTheme].background;
  const width = 280;
  const height = 50;
  const borderRadius = 12; // Much less rounded, more rectangular

  return (
    <Box
      width={width}
      height={height}
      borderRadius={borderRadius}
      backgroundColor="mainBackground"
      justifyContent="center"
      alignItems="flex-start" // Align content to the left
      marginBottom="m"
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Box
        width={width - 3}
        height={height - 3}
        borderRadius={borderRadius - 1}
        backgroundColor="mainBackground"
        justifyContent="center"
        alignItems="flex-start" // Align content to the left
        style={{
          shadowColor: highlightColor,
          shadowOffset: {
            width: -1,
            height: -2,
          },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 0,
        }}
      >
          <Box
            width={width - 8}
            height={height - 8}
            borderRadius={borderRadius - 2}
            backgroundColor="mainBackground"
            justifyContent="center"
            alignItems="flex-start" // Align content to the left
            paddingLeft="m" // Add left padding for the input
          >
            <TextInput
              style={{
                width: width - 32, // Account for left padding
                height: height - 16,
                fontSize: 16,
                color: colorThemes[currentTheme].headerText,
                fontFamily: 'Montserrat_400Regular',
                textAlign: 'left', // Left-align the text
              }}
              placeholder={placeholder}
              placeholderTextColor={colorThemes[currentTheme].bodyText}
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              keyboardType={secureTextEntry ? 'default' : 'email-address'}
            />
          </Box>
      </Box>
    </Box>
  );
};

export const AuthScreen: React.FC<AuthScreenProps> = ({
  currentTheme,
  onSignIn,
  onEmailSignUp,
  onEmailSignIn,
}) => {
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | 'email' | null>(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (provider: 'google' | 'apple') => {
    setLoadingProvider(provider);
    try {
      await onSignIn(provider);
    } catch (error) {
      console.error(`${provider} sign in failed:`, error);
      Alert.alert(
        'Sign In Failed',
        `Unable to sign in with ${provider === 'google' ? 'Google' : 'Apple'}. Please try again.`
      );
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    setLoadingProvider('email');
    try {
      if (isSignUp) {
        await onEmailSignUp(email, password);
      } else {
        await onEmailSignIn(email, password);
      }
    } catch (error) {
      console.error(`Email ${isSignUp ? 'sign up' : 'sign in'} failed:`, error);
      Alert.alert(
        `${isSignUp ? 'Sign Up' : 'Sign In'} Failed`,
        `Unable to ${isSignUp ? 'create account' : 'sign in'}. Please try again.`
      );
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
      justifyContent="center"
      alignItems="center"
      paddingHorizontal="xl"
    >
      {/* App Logo/Title */}
      <Box marginBottom="xxl" alignItems="center">
        <Text variant="header" color="headerText" textAlign="center" marginBottom="s">
          Welcome to Haven
        </Text>
        <Text variant="body" color="bodyText" textAlign="center" maxWidth={300}>
          Save simply. Earn effortlessly.
        </Text>
      </Box>

      {/* Email/Password Form */}
      <Box alignItems="center" marginBottom="l">
        <EmailInput
          currentTheme={currentTheme}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
        />
        
        <EmailInput
          currentTheme={currentTheme}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        
        <TouchableOpacity onPress={handleEmailAuth} activeOpacity={0.9} disabled={loadingProvider === 'email'}>
          <Box
            width={280}
            height={60}
            borderRadius={30}
            backgroundColor="mainBackground"
            justifyContent="center"
            alignItems="center"
            marginBottom="m"
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 3,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 12,
            }}
          >
            <Box
              width={276}
              height={56}
              borderRadius={28}
              backgroundColor="mainBackground"
              justifyContent="center"
              alignItems="center"
              style={{
                shadowColor: colorThemes[currentTheme].background,
                shadowOffset: {
                  width: -2,
                  height: -3,
                },
                shadowOpacity: 0.6,
                shadowRadius: 8,
                elevation: 0,
              }}
            >
                <Box
                  width={270}
                  height={50}
                  borderRadius={25}
                  backgroundColor="mainBackground"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="row"
                >
                  {loadingProvider === 'email' ? (
                    <ActivityIndicator 
                      size="small" 
                      color={colorThemes[currentTheme].headerText} 
                    />
                  ) : (
                    <>
                      <Icon
                        name="envelope"
                        size={20}
                        color={colorThemes[currentTheme].headerText}
                        style={{ marginRight: 12 }}
                      />
                      <Text variant="body" color="headerText">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                      </Text>
                    </>
                  )}
                </Box>
            </Box>
          </Box>
        </TouchableOpacity>
        
        {/* Toggle between Sign Up and Sign In */}
        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={{ marginTop: 8 }}>
          <Text variant="body" color="bodyText" textAlign="center">
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </Box>

      {/* Divider */}
      <Box alignItems="center" marginBottom="l">
        <Text variant="body" color="bodyText">
          or
        </Text>
      </Box>

      {/* Social Sign In Options */}
      <Box alignItems="center" marginBottom="xl">
        <AuthButton
          provider="google"
          currentTheme={currentTheme}
          onPress={() => handleSignIn('google')}
          loading={loadingProvider === 'google'}
        />
        
        <AuthButton
          provider="apple"
          currentTheme={currentTheme}
          onPress={() => handleSignIn('apple')}
          loading={loadingProvider === 'apple'}
        />
      </Box>

      {/* Terms and Privacy */}
      <Box alignItems="center" paddingHorizontal="m">
        <Text variant="caption" color="bodyText" textAlign="center" lineHeight={18}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
          Your wallet will be created securely using Web3Auth.
        </Text>
      </Box>
    </Box>
  );
}; 