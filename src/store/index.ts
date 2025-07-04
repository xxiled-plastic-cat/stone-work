// Zustand store for xUSD Staking App state management

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  WalletState,
  StakingState,
  TransactionState,
  Theme,
} from '../types';
import { DEFAULT_THEME, MOCK_DATA, STORAGE_KEYS } from '../constants';

// Wallet store
interface WalletStore extends WalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  updateBalance: (balance: number) => void;
  updateStakedBalance: (stakedBalance: number) => void;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, _get) => ({
      // Initial state
      isConnected: false,
      address: null,
      balance: 0,
      stakedBalance: 0,

      // Actions
      connectWallet: async () => {
        try {
          // Mock wallet connection - replace with actual wallet integration
          await new Promise(resolve => setTimeout(resolve, 1000));

          set({
            isConnected: true,
            address: MOCK_DATA.WALLET_ADDRESS,
            balance: MOCK_DATA.AVAILABLE_BALANCE,
            stakedBalance: MOCK_DATA.STAKED_BALANCE,
          });
        } catch (error) {
          console.error('Wallet connection failed:', error);
        }
      },

      disconnectWallet: () => {
        set({
          isConnected: false,
          address: null,
          balance: 0,
          stakedBalance: 0,
        });
      },

      updateBalance: (balance: number) => {
        set({ balance });
      },

      updateStakedBalance: (stakedBalance: number) => {
        set({ stakedBalance });
      },
    }),
    {
      name: STORAGE_KEYS.WALLET_ADDRESS,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// Staking store
interface StakingStore extends StakingState {
  startStaking: (amount: number) => Promise<void>;
  startUnstaking: (amount: number) => Promise<void>;
  clearError: () => void;
  updateLastUpdated: () => void;
}

export const useStakingStore = create<StakingStore>((set, _get) => ({
  // Initial state
  isStaking: false,
  isUnstaking: false,
  pendingAmount: 0,
  error: null,
  lastUpdated: null,

  // Actions
  startStaking: async (amount: number) => {
    set({ isStaking: true, pendingAmount: amount, error: null });

    try {
      // Mock staking transaction - replace with actual blockchain integration
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update wallet balances
      const walletStore = useWalletStore.getState();
      walletStore.updateBalance(walletStore.balance - amount);
      walletStore.updateStakedBalance(walletStore.stakedBalance + amount);

      set({
        isStaking: false,
        pendingAmount: 0,
        lastUpdated: new Date(),
      });
    } catch (error) {
      set({
        isStaking: false,
        pendingAmount: 0,
        error: 'Staking failed. Please try again.',
      });
    }
  },

  startUnstaking: async (amount: number) => {
    set({ isUnstaking: true, pendingAmount: amount, error: null });

    try {
      // Mock unstaking transaction - replace with actual blockchain integration
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update wallet balances
      const walletStore = useWalletStore.getState();
      walletStore.updateBalance(walletStore.balance + amount);
      walletStore.updateStakedBalance(walletStore.stakedBalance - amount);

      set({
        isUnstaking: false,
        pendingAmount: 0,
        lastUpdated: new Date(),
      });
    } catch (error) {
      set({
        isUnstaking: false,
        pendingAmount: 0,
        error: 'Unstaking failed. Please try again.',
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  updateLastUpdated: () => {
    set({ lastUpdated: new Date() });
  },
}));

// Theme store
interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, _get) => ({
      // Initial state
      theme: DEFAULT_THEME,

      // Actions
      setTheme: (theme: Theme) => {
        set({ theme });
      },

      initializeTheme: async () => {
        try {
          const savedTheme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
          if (savedTheme) {
            set({ theme: savedTheme as Theme });
          }
        } catch (error) {
          console.error('Failed to load theme:', error);
        }
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// Transaction store
interface TransactionStore extends TransactionState {
  setTransaction: (type: 'stake' | 'unstake', amount: number) => void;
  setStatus: (status: TransactionState['status']) => void;
  setError: (error: string) => void;
  setSuccess: (hash: string) => void;
  clearTransaction: () => void;
}

export const useTransactionStore = create<TransactionStore>((set, _get) => ({
  // Initial state
  type: null,
  amount: 0,
  status: 'idle',
  hash: null,
  error: null,

  // Actions
  setTransaction: (type: 'stake' | 'unstake', amount: number) => {
    set({ type, amount, status: 'pending', error: null, hash: null });
  },

  setStatus: (status: TransactionState['status']) => {
    set({ status });
  },

  setError: (error: string) => {
    set({ status: 'error', error });
  },

  setSuccess: (hash: string) => {
    set({ status: 'success', hash, error: null });
  },

  clearTransaction: () => {
    set({
      type: null,
      amount: 0,
      status: 'idle',
      hash: null,
      error: null,
    });
  },
}));

// App store (combines all stores)
interface AppStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  initializeApp: () => Promise<void>;
}

export const useAppStore = create<AppStore>((set, _get) => ({
  // Initial state
  isLoading: true,

  // Actions
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  initializeApp: async () => {
    set({ isLoading: true });

    try {
      // Initialize theme
      await useThemeStore.getState().initializeTheme();

      // Add any other initialization logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading

      set({ isLoading: false });
    } catch (error) {
      console.error('App initialization failed:', error);
      set({ isLoading: false });
    }
  },
}));
