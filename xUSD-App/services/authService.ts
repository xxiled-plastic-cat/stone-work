import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User,
  UserCredential 
} from 'firebase/auth';
import { auth } from '../firebase.config';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  provider: string;
  algorandAddress?: string;
}

// Mock Algorand wallet generation for now
// TODO: Replace with actual Web3Auth + Algorand integration
const generateAlgorandWallet = async (user: User): Promise<string> => {
  // This is a mock implementation
  // In the real implementation, this would use Web3Auth SFA to generate
  // an Algorand wallet using the user's Firebase JWT token
  const mockAddress = `ALGO${user.uid.substring(0, 8).toUpperCase()}${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  console.log('Generated mock Algorand address:', mockAddress);
  return mockAddress;
};

export const authService = {
  // Sign up with email and password
  signUpWithEmail: async (email: string, password: string): Promise<AuthUser> => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Generate Algorand wallet for the new user
      const algorandAddress = await generateAlgorandWallet(user);
      
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || email.split('@')[0],
        provider: 'email',
        algorandAddress,
      };
    } catch (error: any) {
      console.error('Email sign up error:', error);
      throw new Error(getFirebaseErrorMessage(error.code));
    }
  },

  // Sign in with email and password
  signInWithEmail: async (email: string, password: string): Promise<AuthUser> => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Generate or retrieve Algorand wallet for existing user
      const algorandAddress = await generateAlgorandWallet(user);
      
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || email.split('@')[0],
        provider: 'email',
        algorandAddress,
      };
    } catch (error: any) {
      console.error('Email sign in error:', error);
      throw new Error(getFirebaseErrorMessage(error.code));
    }
  },

  // Sign out
  signOut: async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error('Failed to sign out');
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },
};

// Helper function to convert Firebase error codes to user-friendly messages
const getFirebaseErrorMessage = (errorCode: string): string => {
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
}; 