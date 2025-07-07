import { CHAIN_NAMESPACES, IBaseProvider } from '@web3auth/base';
import { CommonPrivateKeyProvider } from '@web3auth/base-provider';
import { Web3Auth, SDK_MODE } from '@web3auth/single-factor-auth';
import algosdk from 'algosdk';
import Web3AuthEncryptedStorage from './Web3AuthEncryptedStorage';

// In-memory storage for non-persistent sessions (as recommended in the plan)
class InMemoryStorage {
  private storage: Map<string, string> = new Map();
  
  async getItem(key: string): Promise<string | null> {
    return this.storage.get(key) || null;
  }
  
  async setItem(key: string, value: string): Promise<void> {
    this.storage.set(key, value);
  }
  
  async removeItem(key: string): Promise<void> {
    this.storage.delete(key);
  }
  
  async clear(): Promise<void> {
    this.storage.clear();
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
};

// Private key provider for Algorand
const privateKeyProvider = new CommonPrivateKeyProvider({
  config: { chainConfig },
}) as IBaseProvider<string>;

// Web3Auth instance
export const web3auth = new Web3Auth({
  clientId: process.env.EXPO_PUBLIC_WEB3AUTH_CLIENT_ID ?? '',
  web3AuthNetwork: 'sapphire_devnet', // Use 'sapphire_devnet' for development
  storage: Web3AuthEncryptedStorage,
  mode: SDK_MODE.REACT_NATIVE,
  privateKeyProvider,
});

// Initialize Web3Auth
export const initWeb3Auth = async (): Promise<void> => {
  try {
    await web3auth.init();
    console.log('Web3Auth initialized successfully');
  } catch (error) {
    console.error('Web3Auth initialization failed:', error);
    throw error;
  }
};

// Connect with Firebase JWT
export const connectWeb3Auth = async (
  idToken: string,
  verifierId: string,
): Promise<void> => {
  try {
    const verifier = 'haven-verifier'; // Your verifier name from Web3Auth dashboard
    
    await web3auth.connect({
      verifier,
      verifierId,
      idToken,
    });
    
    console.log('Web3Auth connected successfully');
  } catch (error) {
    console.error('Web3Auth connection failed:', error);
    throw error;
  }
};

// Get Algorand address from Web3Auth private key
export const getAlgorandAddressFromWeb3Auth = async (): Promise<string> => {
  try {
    const privateKey = await web3auth.provider?.request({
      method: 'private_key',
    }) as string;
    
    if (!privateKey) {
      throw new Error('No private key available from Web3Auth');
    }
    
    const cleanPrivateKey = privateKey.startsWith('0x') 
      ? privateKey.slice(2) 
      : privateKey;
    const privateKeyBytes = new Uint8Array(Buffer.from(cleanPrivateKey, 'hex'));
    
    const account = algosdk.mnemonicToSecretKey(
      algosdk.secretKeyToMnemonic(privateKeyBytes),
    );
    
    console.log('Generated Algorand address:', account.addr.toString());
    return account.addr.toString();
  } catch (error) {
    console.error('Failed to get Algorand address:', error);
    throw error;
  }
};

// Get mnemonic for backup
export const getAlgorandMnemonicFromWeb3Auth = async (): Promise<string> => {
  try {
    const privateKey = await web3auth.provider?.request({
      method: 'private_key',
    }) as string;
    
    if (!privateKey) {
      throw new Error('No private key available from Web3Auth');
    }
    
    const cleanPrivateKey = privateKey.startsWith('0x') 
      ? privateKey.slice(2) 
      : privateKey;
    const privateKeyBytes = new Uint8Array(Buffer.from(cleanPrivateKey, 'hex'));
    
    return algosdk.secretKeyToMnemonic(privateKeyBytes);
  } catch (error) {
    console.error('Failed to get mnemonic:', error);
    throw error;
  }
};

// Transaction signer for Algorand
export const createWeb3AuthSigner = (): algosdk.TransactionSigner => {
  return async (
    txnGroup: algosdk.Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]> => {
    try {
      const privateKey = await web3auth.provider?.request({
        method: 'private_key',
      }) as string;
      
      if (!privateKey) {
        throw new Error('No private key available from Web3Auth');
      }
      
      const cleanPrivateKey = privateKey.startsWith('0x') 
        ? privateKey.slice(2) 
        : privateKey;
      const privateKeyBytes = new Uint8Array(Buffer.from(cleanPrivateKey, 'hex'));
      
      const account = algosdk.mnemonicToSecretKey(
        algosdk.secretKeyToMnemonic(privateKeyBytes),
      );
      
      const signedTxns: Uint8Array[] = [];
      
      for (const index of indexesToSign) {
        const txn = txnGroup[index];
        const signedTxn = algosdk.signTransaction(txn, account.sk);
        signedTxns.push(signedTxn.blob);
      }
      
      return signedTxns;
    } catch (error) {
      console.error('Transaction signing failed:', error);
      throw error;
    }
  };
};

// Disconnect Web3Auth
export const disconnectWeb3Auth = async (): Promise<void> => {
  try {
    await web3auth.logout();
    console.log('Web3Auth disconnected successfully');
  } catch (error) {
    console.error('Web3Auth disconnect failed:', error);
    throw error;
  }
};

// Check if Web3Auth is connected
export const isWeb3AuthConnected = (): boolean => {
  return web3auth.connected;
};

// Get Web3Auth user info
export const getWeb3AuthUserInfo = async () => {
  try {
    return await web3auth.getUserInfo();
  } catch (error) {
    console.error('Failed to get user info:', error);
    throw error;
  }
};