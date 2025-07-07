# Web3Auth Integration Plan for xUSD React Native App

## Overview
This document outlines the integration strategy for implementing Web3Auth social login with Algorand wallet generation in the xUSD React Native app, based on a proven implementation from another Algorand app.

## Current Web3Auth Status
- **Acquisition**: Web3Auth has been acquired by Consensys Software Inc. ([Web3Auth](https://web3auth.io/))
- **Multi-Party Computation (MPC)**: Uses advanced MPC for non-custodial wallet generation
- **Social Logins**: Supports Google, Apple, X (Twitter), Email, Passkeys, and custom authentication
- **React Native SDK**: Available with both Plug & Play and Single Factor Auth options

## Proven Algorand Integration Solution ✅
### Key Discovery
- **Algorand IS Supported**: Using `CHAIN_NAMESPACES.OTHER` with custom chain config
- **Direct Implementation**: Web3Auth Single Factor Auth + CommonPrivateKeyProvider works perfectly
- **Firebase Integration**: Uses Firebase JWT tokens for authentication
- **No Custom Provider Needed**: Uses existing Web3Auth infrastructure with Algorand-specific configuration

### Architecture Overview
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Firebase Auth  │───▶│  Web3Auth SFA    │───▶│ Algorand Wallet │
│ (Google/Apple)  │    │ (JWT + Private   │    │ (Address + SK)  │
│                 │    │  Key Provider)   │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Recommended Integration Approach (Proven Solution)

### Core Implementation Strategy
Based on the proven implementation, we'll use:
1. **Firebase Auth** for social authentication (Google, Apple, Email)
2. **Web3Auth Single Factor Auth** with Firebase JWT tokens
3. **CommonPrivateKeyProvider** with Algorand chain configuration
4. **In-Memory Storage** to prevent session persistence (fresh login each time)

### Web3Auth Configuration
```javascript
import { CHAIN_NAMESPACES, IBaseProvider } from '@web3auth/base'
import { CommonPrivateKeyProvider } from '@web3auth/base-provider'
import { Web3Auth, SDK_MODE } from '@web3auth/single-factor-auth'
import algosdk from 'algosdk'

// In-memory storage for non-persistent sessions
class InMemoryStorage {
  private storage: Map<string, string> = new Map()
  
  async getItem(key: string): Promise<string | null> {
    return this.storage.get(key) || null
  }
  
  async setItem(key: string, value: string): Promise<void> {
    this.storage.set(key, value)
  }
  
  async removeItem(key: string): Promise<void> {
    this.storage.delete(key)
  }
  
  async clear(): Promise<void> {
    this.storage.clear()
  }
}

// Algorand chain configuration
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.OTHER,
  chainId: 'algorand',
  rpcTarget: 'https://mainnet-api.algonode.cloud',
  displayName: 'Algorand Mainnet',
  blockExplorer: 'https://allo.info',
  ticker: 'ALGO',
  tickerName: 'Algorand',
}

// Private key provider for Algorand
const privateKeyProvider = new CommonPrivateKeyProvider({
  config: { chainConfig },
}) as IBaseProvider<string>

// Web3Auth instance
export const web3auth = new Web3Auth({
  clientId: process.env.EXPO_PUBLIC_WEB3AUTH_CLIENT_ID ?? '',
  web3AuthNetwork: 'sapphire_mainnet', // or 'sapphire_devnet' for development
  storage: new InMemoryStorage(),
  mode: SDK_MODE.REACT_NATIVE,
  privateKeyProvider,
})
```

### Algorand Wallet Functions
```javascript
// Initialize Web3Auth
export const initWeb3Auth = async (): Promise<void> => {
  await web3auth.init()
}

// Connect with Firebase JWT
export const connectWeb3Auth = async (
  idToken: string,
  verifierId: string,
): Promise<void> => {
  const verifier = 'xusd-verifier' // Your verifier name from Web3Auth dashboard
  
  await web3auth.connect({
    verifier,
    verifierId,
    idToken,
  })
}

// Get Algorand address from Web3Auth private key
export const getAlgorandAddressFromWeb3Auth = async (): Promise<string> => {
  const privateKey = await web3auth.provider?.request({
    method: 'private_key',
  }) as string
  
  const cleanPrivateKey = privateKey.startsWith('0x') 
    ? privateKey.slice(2) 
    : privateKey
  const privateKeyBytes = new Uint8Array(Buffer.from(cleanPrivateKey, 'hex'))
  
  const account = algosdk.mnemonicToSecretKey(
    algosdk.secretKeyToMnemonic(privateKeyBytes),
  )
  
  return account.addr.toString()
}

// Get mnemonic for backup
export const getAlgorandMnemonicFromWeb3Auth = async (): Promise<string> => {
  const privateKey = await web3auth.provider?.request({
    method: 'private_key',
  }) as string
  
  const cleanPrivateKey = privateKey.startsWith('0x') 
    ? privateKey.slice(2) 
    : privateKey
  const privateKeyBytes = new Uint8Array(Buffer.from(cleanPrivateKey, 'hex'))
  
  return algosdk.secretKeyToMnemonic(privateKeyBytes)
}

// Transaction signer for Algorand
export const createWeb3AuthSigner = (): algosdk.TransactionSigner => {
  return async (
    txnGroup: algosdk.Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]> => {
    const privateKey = await web3auth.provider?.request({
      method: 'private_key',
    }) as string
    
    const cleanPrivateKey = privateKey.startsWith('0x') 
      ? privateKey.slice(2) 
      : privateKey
    const privateKeyBytes = new Uint8Array(Buffer.from(cleanPrivateKey, 'hex'))
    
    const account = algosdk.mnemonicToSecretKey(
      algosdk.secretKeyToMnemonic(privateKeyBytes),
    )
    
    const signedTxns: Uint8Array[] = []
    
    for (const index of indexesToSign) {
      const txn = txnGroup[index]
      const signedTxn = algosdk.signTransaction(txn, account.sk)
      signedTxns.push(signedTxn.blob)
    }
    
    return signedTxns
  }
}
```

## Implementation Steps

### Step 1: Setup Web3Auth Dashboard
1. Create project at [Web3Auth Dashboard](https://dashboard.web3auth.io/)
2. Configure social login providers:
   - Google OAuth
   - Apple Sign In
   - Email/Password
3. Add React Native app bundle ID to whitelist URLs
4. Note down Client ID and Project ID

### Step 2: Install Dependencies
```bash
# Core Web3Auth dependencies
npm install @web3auth/single-factor-auth
npm install @web3auth/base
npm install @web3auth/base-provider

# Algorand SDK
npm install algosdk

# Firebase for authentication
npm install @react-native-firebase/app
npm install @react-native-firebase/auth
npm install @react-native-google-signin/google-signin

# Optional: Apple Sign In
npm install @react-native-apple-authentication
```

### Step 3: Create Authentication Service
```javascript
// services/AuthService.js
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { initWeb3Auth, connectWeb3Auth, getAlgorandAddressFromWeb3Auth } from './Web3AuthService';

class AuthService {
  constructor() {
    this.initialized = false;
  }
  
  async initialize() {
    if (this.initialized) return;
    
    // Configure Google Sign In
    GoogleSignin.configure({
      webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
    });
    
    // Initialize Web3Auth
    await initWeb3Auth();
    this.initialized = true;
  }
  
  async signInWithGoogle() {
    try {
      // Google Sign In
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      
      // Firebase Auth
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const firebaseUser = await auth().signInWithCredential(googleCredential);
      
      // Get Firebase ID token for Web3Auth
      const firebaseIdToken = await firebaseUser.user.getIdToken();
      
      // Connect Web3Auth with Firebase JWT
      await connectWeb3Auth(firebaseIdToken, firebaseUser.user.uid);
      
      // Get Algorand address
      const algorandAddress = await getAlgorandAddressFromWeb3Auth();
      
      return {
        user: firebaseUser.user,
        algorandAddress,
        firebaseIdToken
      };
    } catch (error) {
      console.error('Google sign in failed:', error);
      throw error;
    }
  }
  
  async signInWithApple() {
    // Similar implementation for Apple Sign In
    // Using @react-native-apple-authentication
  }
  
  async signOut() {
    await auth().signOut();
    await GoogleSignin.signOut();
    // Web3Auth will be cleared due to in-memory storage
  }
}

export default new AuthService();
```

### Step 4: UI Integration
```javascript
// components/SignUpScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AuthService from '../services/AuthService';

const SignUpScreen = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [algorandAddress, setAlgorandAddress] = useState('');
  
  useEffect(() => {
    // Initialize auth service
    AuthService.initialize().catch(console.error);
  }, []);
  
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await AuthService.signInWithGoogle();
      setUser(result.user);
      setAlgorandAddress(result.algorandAddress);
      
      Alert.alert(
        'Success!', 
        `Welcome ${result.user.displayName}!\nYour Algorand address: ${result.algorandAddress}`
      );
    } catch (error) {
      console.error('Auth failed:', error);
      Alert.alert('Error', 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAppleLogin = async () => {
    setLoading(true);
    try {
      const result = await AuthService.signInWithApple();
      setUser(result.user);
      setAlgorandAddress(result.algorandAddress);
    } catch (error) {
      console.error('Apple auth failed:', error);
      Alert.alert('Error', 'Apple authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignOut = async () => {
    await AuthService.signOut();
    setUser(null);
    setAlgorandAddress('');
  };
  
  if (user) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Welcome, {user.displayName}!</Text>
        <Text>Email: {user.email}</Text>
        <Text>Algorand Address: {algorandAddress}</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={{ padding: 20 }}>
      <Text>Sign up for xUSD</Text>
      
      <TouchableOpacity 
        onPress={handleGoogleLogin}
        disabled={loading}
        style={{ padding: 15, backgroundColor: '#4285f4', margin: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {loading ? 'Signing in...' : 'Sign up with Google'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={handleAppleLogin}
        disabled={loading}
        style={{ padding: 15, backgroundColor: '#000', margin: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {loading ? 'Signing in...' : 'Sign up with Apple'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
```

## Key Advantages of This Approach

### ✅ Proven Solution Benefits
1. **Deterministic Wallet Generation**: Same user always gets same Algorand address
2. **Non-Custodial**: Private keys derived from Web3Auth's MPC, never stored on servers
3. **Social Login UX**: Familiar Google/Apple login flow for users
4. **Transaction Signing**: Built-in transaction signer for Algorand operations
5. **Backup & Recovery**: Mnemonic phrases available for wallet backup
6. **Fresh Sessions**: In-memory storage prevents automatic session restoration

### 🔒 Security Features
- **MPC-based Key Generation**: Web3Auth's Multi-Party Computation ensures security
- **No Server-Side Keys**: Private keys never touch your servers
- **Firebase JWT Verification**: Secure authentication token validation
- **Deterministic Derivation**: Same social login = same Algorand wallet every time

### 🎯 User Experience
- **One-Click Signup**: Google/Apple login generates Algorand wallet instantly
- **No Seed Phrases**: Users don't need to manage complex recovery phrases initially
- **Familiar Flow**: Standard social login UX that users already know
- **Cross-Platform**: Works on iOS, Android, and Web with same codebase

## Security Considerations

### Private Key Management (Handled by Web3Auth)
1. **MPC Key Generation**: Web3Auth handles secure key derivation using Multi-Party Computation
2. **No Local Storage**: Private keys are derived on-demand, not stored locally
3. **Deterministic Generation**: Same social login always generates same private key
4. **In-Memory Only**: Using InMemoryStorage prevents session persistence

### Additional Security Measures
```javascript
// Optional: Add biometric authentication before accessing wallet
import TouchID from 'react-native-touch-id';

const authenticateUser = async () => {
  try {
    const biometryType = await TouchID.isSupported();
    if (biometryType) {
      await TouchID.authenticate('Authenticate to access your wallet');
    }
    return true;
  } catch (error) {
    console.error('Biometric authentication failed:', error);
    return false;
  }
};

// Use before sensitive operations
const handleSensitiveOperation = async () => {
  const authenticated = await authenticateUser();
  if (!authenticated) {
    Alert.alert('Authentication Required', 'Please authenticate to continue');
    return;
  }
  
  // Proceed with operation
};
```

### Backup Strategy
```javascript
// Allow users to view and backup their mnemonic
const showBackupMnemonic = async () => {
  try {
    const mnemonic = await getAlgorandMnemonicFromWeb3Auth();
    Alert.alert(
      'Backup Your Wallet',
      `Please write down these 25 words in order:\n\n${mnemonic}`,
      [{ text: 'I have written it down', style: 'default' }]
    );
  } catch (error) {
    Alert.alert('Error', 'Failed to retrieve backup phrase');
  }
};
```

## Testing Strategy

### Phase 1: Authentication Testing
1. Test social login flows (Google, Apple, Email)
2. Verify JWT token handling
3. Test offline/online state management

### Phase 2: Wallet Generation Testing
1. Test Algorand account generation
2. Verify private key security
3. Test wallet backup/recovery flows

### Phase 3: Integration Testing
1. End-to-end authentication to wallet creation
2. Transaction signing capabilities
3. Network connectivity handling

## Timeline and Milestones (Revised)

### Week 1: Setup & Configuration
- [ ] Set up Web3Auth dashboard and create verifier
- [ ] Configure Firebase project with Google/Apple authentication
- [ ] Install and configure all required dependencies
- [ ] Create Web3Auth service with Algorand configuration

### Week 2: Core Authentication
- [ ] Implement Firebase authentication (Google/Apple)
- [ ] Integrate Web3Auth Single Factor Auth
- [ ] Test end-to-end authentication flow
- [ ] Verify Algorand address generation

### Week 3: UI Integration
- [ ] Create SignUpScreen component with social login buttons
- [ ] Implement loading states and error handling
- [ ] Add wallet address display and user profile
- [ ] Test user experience flows

### Week 4: Advanced Features & Testing
- [ ] Add biometric authentication for sensitive operations
- [ ] Implement mnemonic backup functionality
- [ ] Add transaction signing capabilities
- [ ] Comprehensive testing on iOS and Android

## Cost Considerations

### Web3Auth Pricing
- **Free Tier**: Up to 1,000 Monthly Active Wallets (MAWs)
- **Growth Plan**: $0.02 per MAW after free tier
- **Enterprise**: Custom pricing for advanced features

### Development Costs
- **Custom Provider Development**: 2-3 weeks of development time
- **Alternative Solutions**: May require additional third-party service costs
- **Testing & Security**: Additional time for proper security implementation

## Recommendations

### ✅ Immediate Implementation (This Approach)
1. **Use the proven Firebase + Web3Auth + Algorand solution** exactly as shown
2. **Implement InMemoryStorage** to ensure fresh authentication sessions
3. **Start with Google Sign-In** as the primary authentication method
4. **Add Apple Sign-In** for iOS users

### Production Considerations
1. **Add biometric authentication** for enhanced security
2. **Implement proper error handling** and user feedback
3. **Add mnemonic backup functionality** for wallet recovery
4. **Consider adding email/password authentication** as fallback option

### Integration with xUSD App
1. **Replace existing auth flow** with this Web3Auth implementation
2. **Use the transaction signer** for Algorand operations in your app
3. **Store user preferences** separately from wallet data
4. **Integrate with your existing theme system** for consistent UI

## Next Steps

1. **Set up Web3Auth dashboard** and create a verifier for xUSD app
2. **Configure Firebase project** with Google/Apple authentication
3. **Create Web3AuthService.js** file with the proven implementation
4. **Build SignUpScreen component** and integrate with existing app
5. **Test end-to-end flow** from social login to Algorand address generation

## Environment Variables Required

```bash
# .env file
EXPO_PUBLIC_WEB3AUTH_CLIENT_ID=your_web3auth_client_id
GOOGLE_WEB_CLIENT_ID=your_google_web_client_id
FIREBASE_PROJECT_ID=your_firebase_project_id
```

## Resources

- [Web3Auth Documentation](https://web3auth.io/docs/)
- [Web3Auth React Native SDK](https://web3auth.io/docs/sdk/pnp/react-native)
- [Algorand JavaScript SDK](https://github.com/algorand/js-algorand-sdk)
- [React Native Algorand Library](https://github.com/Jesulonimi21/react-native-algo)
- [WalletConnect Algorand Example](https://github.com/TxnLab/algorand-wc2)
- [Algorand Wallet Select](https://github.com/xBacked-DAO/algorand-wallet-select)

---

*This plan should be reviewed and updated based on technical feasibility testing and Web3Auth's evolving Algorand support.* 