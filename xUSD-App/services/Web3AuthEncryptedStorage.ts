import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Web3Auth-compatible storage using react-native-encrypted-storage.
 * Implements the async storage interface expected by Web3Auth.
 */
const Web3AuthEncryptedStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      const value = await EncryptedStorage.getItem(key);
      return value ?? null;
    } catch (e) {
      console.warn('EncryptedStorage getItem error:', e);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      await EncryptedStorage.setItem(key, value);
    } catch (e) {
      console.warn('EncryptedStorage setItem error:', e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (e) {
      console.warn('EncryptedStorage removeItem error:', e);
    }
  },
};

export default Web3AuthEncryptedStorage; 