// Utility functions for xUSD Staking App

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';
import type { Theme } from '../types';

// Format currency values
export const formatCurrency = (
  amount: number,
  decimals: number = 2,
): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
};

// Format xUSD amounts
export const formatXUSD = (amount: number): string => {
  return `${formatCurrency(amount)} xUSD`;
};

// Format percentage
export const formatPercentage = (
  value: number,
  decimals: number = 2,
): string => {
  return `${value.toFixed(decimals)}%`;
};

// Truncate wallet address for display
export const truncateAddress = (
  address: string,
  startChars: number = 6,
  endChars: number = 4,
): string => {
  if (address.length <= startChars + endChars) {
    return address;
  }
  return `${address.substring(0, startChars)}...${address.substring(
    address.length - endChars,
  )}`;
};

// Validate amount input
export const validateAmount = (
  amount: string,
  maxAmount: number,
): { isValid: boolean; error?: string } => {
  const numAmount = parseFloat(amount);

  if (isNaN(numAmount) || numAmount <= 0) {
    return { isValid: false, error: 'Please enter a valid amount' };
  }

  if (numAmount > maxAmount) {
    return { isValid: false, error: 'Amount exceeds available balance' };
  }

  return { isValid: true };
};

// Storage utilities
export const storage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

// Theme utilities
export const themeUtils = {
  async saveTheme(theme: Theme): Promise<void> {
    await storage.setItem(STORAGE_KEYS.THEME, theme);
  },

  async loadTheme(): Promise<Theme | null> {
    return (await storage.getItem(STORAGE_KEYS.THEME)) as Theme | null;
  },
};

// Debounce function for input handling
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function for frequent updates
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Generate random ID
export const generateId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// Sleep utility for delays
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Check if value is empty
export const isEmpty = (value: any): boolean => {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
