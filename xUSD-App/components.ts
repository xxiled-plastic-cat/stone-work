import {
  createBox,
  createText,
} from '@shopify/restyle';
import { Theme } from './theme';

// Box component with spacing and color props
export const Box = createBox<Theme>();

// Text component with typography support
export const Text = createText<Theme>(); 