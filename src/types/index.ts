// Core app types for xUSD Staking

export type Theme = 'pink' | 'terracotta' | 'grey' | 'granite' | 'obsidian';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  stakedBalance: number;
}

export interface StakingState {
  isStaking: boolean;
  isUnstaking: boolean;
  pendingAmount: number;
  error: string | null;
  lastUpdated: Date | null;
}

export interface AppState {
  wallet: WalletState;
  staking: StakingState;
  theme: Theme;
  isLoading: boolean;
}

export interface TransactionState {
  type: 'stake' | 'unstake' | null;
  amount: number;
  status: 'idle' | 'pending' | 'success' | 'error';
  hash: string | null;
  error: string | null;
}

// Component prop types
export interface ThemedComponentProps {
  colorType?:
    | 'background'
    | 'backgroundDark'
    | 'backgroundLight'
    | 'headerText'
    | 'bodyText'
    | 'error'
    | 'success';
}

export interface FontProps {
  fontType?: 'heading' | 'body';
  fontWeight?: 'regular' | 'medium' | 'semiBold' | 'bold' | 'black';
}

// API types
export interface StakingInfo {
  totalStaked: number;
  rewards: number;
  apy: number;
  lastRewardDate: Date;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
