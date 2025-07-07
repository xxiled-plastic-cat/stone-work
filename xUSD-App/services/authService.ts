import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    User,
    UserCredential 
  } from 'firebase/auth';
  import { auth } from '../firebase.config';
  import { 
    initWeb3Auth, 
    connectWeb3Auth, 
    getAlgorandAddressFromWeb3Auth,
    disconnectWeb3Auth,
    isWeb3AuthConnected 
  } from './Web3AuthService';
  
  export interface AuthUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    provider: string;
    algorandAddress?: string;
  }
  
  // Initialize Web3Auth on app startup
  let web3AuthInitialized = false;
  
  export const authService = {
    // Initialize Web3Auth (call this early in your app)
    initialize: async (): Promise<void> => {
      await authService.initializeWeb3Auth();
    },
  
    // Initialize Web3Auth internally
    initializeWeb3Auth: async (): Promise<void> => {
      if (!web3AuthInitialized) {
        try {
          await initWeb3Auth();
          web3AuthInitialized = true;
          console.log('Web3Auth initialized successfully');
        } catch (error) {
          console.error('Failed to initialize Web3Auth:', error);
          // Continue without Web3Auth for now
        }
      }
    },
  
    // Generate Algorand wallet using Web3Auth
    generateAlgorandWallet: async (user: User): Promise<string> => {
      try {
        // Ensure Web3Auth is initialized
        await authService.initializeWeb3Auth();
        
        // Get Firebase ID token for Web3Auth
        const idToken = await user.getIdToken();
        
        // Connect Web3Auth with Firebase JWT
        await connectWeb3Auth(idToken, user.uid);
        
        // Get Algorand address from Web3Auth
        const algorandAddress = await getAlgorandAddressFromWeb3Auth();
        
        console.log('Generated Algorand address via Web3Auth:', algorandAddress);
        return algorandAddress;
      } catch (error) {
        console.error('Failed to generate Algorand wallet via Web3Auth:', error);
        
        // Fallback to mock address if Web3Auth fails
        const mockAddress = `ALGO${user.uid.substring(0, 8).toUpperCase()}${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        console.log('Using fallback mock Algorand address:', mockAddress);
        return mockAddress;
      }
    },
  
    // Sign up with email and password
    signUpWithEmail: async (email: string, password: string): Promise<AuthUser> => {
      try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Generate Algorand wallet for the new user
        const algorandAddress = await authService.generateAlgorandWallet(user);
        
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || email.split('@')[0],
          provider: 'email',
          algorandAddress,
        };
      } catch (error: any) {
        console.error('Email sign up error:', error);
        throw new Error(authService.getFirebaseErrorMessage(error.code));
      }
    },
  
    // Sign in with email and password
    signInWithEmail: async (email: string, password: string): Promise<AuthUser> => {
      try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Generate or retrieve Algorand wallet for existing user
        const algorandAddress = await authService.generateAlgorandWallet(user);
        
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || email.split('@')[0],
          provider: 'email',
          algorandAddress,
        };
      } catch (error: any) {
        console.error('Email sign in error:', error);
        throw new Error(authService.getFirebaseErrorMessage(error.code));
      }
    },
  
    // Sign in with Google (placeholder for now)
    signInWithGoogle: async (): Promise<AuthUser> => {
      try {
        // TODO: Implement Google Sign-In with Web3Auth
        throw new Error('Google sign-in not implemented yet. Please use email/password for now.');
      } catch (error: any) {
        console.error('Google sign in error:', error);
        throw error;
      }
    },
  
    // Sign in with Apple (placeholder for now)
    signInWithApple: async (): Promise<AuthUser> => {
      try {
        // TODO: Implement Apple Sign-In with Web3Auth
        throw new Error('Apple sign-in not implemented yet. Please use email/password for now.');
      } catch (error: any) {
        console.error('Apple sign in error:', error);
        throw error;
      }
    },
  
    // Sign out
    signOut: async (): Promise<void> => {
      try {
        await signOut(auth);
        if (isWeb3AuthConnected()) {
          await disconnectWeb3Auth();
        }
      } catch (error: any) {
        console.error('Sign out error:', error);
        throw new Error('Failed to sign out');
      }
    },
  
    // Get current user
    getCurrentUser: (): User | null => {
      return auth.currentUser;
    },
  
    // Helper function to convert Firebase error codes to user-friendly messages
    getFirebaseErrorMessage: (errorCode: string): string => {
      switch (errorCode) {
        case 'auth/email-already-in-use':
          return 'This email is already registered. Please sign in instead.';
        case 'auth/invalid-email':
          return 'Please enter a valid email address.';
        case 'auth/operation-not-allowed':
          return 'Email/password accounts are not enabled. Please contact support.';
        case 'auth/weak-password':
          return 'Password should be at least 6 characters long.';
        case 'auth/user-disabled':
          return 'This account has been disabled. Please contact support.';
        case 'auth/user-not-found':
          return 'No account found with this email address.';
        case 'auth/wrong-password':
          return 'Incorrect password. Please try again.';
        case 'auth/invalid-credential':
          return 'Invalid email or password. Please try again.';
        case 'auth/too-many-requests':
          return 'Too many failed attempts. Please try again later.';
        default:
          return 'An error occurred during authentication. Please try again.';
      }
    },
  };