// Core constants for xUSD Staking App

export const APP_NAME = 'xUSD Staking';
export const APP_VERSION = '1.0.0';

// Theme constants
export const THEMES = {
  PINK: 'pink',
  TERRACOTTA: 'terracotta',
  GREY: 'grey',
  GRANITE: 'granite',
  OBSIDIAN: 'obsidian',
} as const;

export const DEFAULT_THEME = THEMES.PINK;

// Storage keys
export const STORAGE_KEYS = {
  THEME: '@xUSDStaking:theme',
  WALLET_ADDRESS: '@xUSDStaking:walletAddress',
  LAST_BALANCE_UPDATE: '@xUSDStaking:lastBalanceUpdate',
  USER_PREFERENCES: '@xUSDStaking:userPreferences',
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Mock data for development
export const MOCK_DATA = {
  WALLET_ADDRESS: '7ZUECA7HFLZTXENRV24SHLU4AVPUTMTTDUFUBNBD64C73F3UHRTHAIOF6Q',
  STAKED_BALANCE: 1250.0,
  AVAILABLE_BALANCE: 750.0,
  TOTAL_BALANCE: 2000.0,
  CURRENT_APY: 5.25,
  REWARDS_EARNED: 65.3,
} as const;

// App states
export const APP_STATES = {
  WALLET_DISCONNECTED: 'wallet_disconnected',
  WALLET_CONNECTED: 'wallet_connected',
  LOADING: 'loading',
  ERROR: 'error',
} as const;

// Transaction types
export const TRANSACTION_TYPES = {
  STAKE: 'stake',
  UNSTAKE: 'unstake',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  WALLET_CONNECTION_FAILED: 'Failed to connect wallet. Please try again.',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction.',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_AMOUNT: 'Please enter a valid amount.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully!',
  TRANSACTION_COMPLETE: 'Transaction completed successfully!',
  STAKE_ADDED: 'Stake added successfully!',
  UNSTAKE_COMPLETE: 'Unstake completed successfully!',
} as const;
