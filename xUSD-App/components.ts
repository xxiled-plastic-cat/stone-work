import {
  createBox,
  createText,
} from '@shopify/restyle';
import { Theme } from './theme';

// Box component with spacing and layout support
export const Box = createBox<Theme>();

// Text component with typography support
export const Text = createText<Theme>();

export { ThemeSwitcherButton } from './components/ThemeSwitcherButton';
export { PageTitle } from './components/PageTitle';
export { SavingsBalance } from './components/SavingsBalance';
export { IconActionButton } from './components/IconActionButton';
export { TransactionItem } from './components/TransactionItem';
export { TransactionList } from './components/TransactionList'; 